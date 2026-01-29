from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import hashlib
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'annareddy.1@osu.edu')

# Rate limiting settings
RATE_LIMIT_SECONDS = 60  # 1 submission per minute per IP

# Create the main app without a prefix
app = FastAPI(title="Rithika Annareddy Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Form Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ip_hash: str = ""
    email_sent: bool = False
    user_agent: str = ""

    @field_validator('name')
    @classmethod
    def sanitize_name(cls, v):
        # Basic sanitization - strip and limit special chars
        return v.strip()
    
    @field_validator('message')
    @classmethod
    def sanitize_message(cls, v):
        return v.strip()


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None


# Helper functions
def hash_ip(ip: str) -> str:
    """Hash IP address for privacy-preserving rate limiting"""
    return hashlib.sha256(ip.encode()).hexdigest()[:16]


def get_client_ip(request: Request) -> str:
    """Extract client IP from request, handling proxies"""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def check_rate_limit(ip_hash: str) -> bool:
    """Check if IP has submitted recently"""
    cutoff = datetime.now(timezone.utc) - timedelta(seconds=RATE_LIMIT_SECONDS)
    recent = await db.contact_submissions.find_one({
        "ip_hash": ip_hash,
        "created_at": {"$gte": cutoff.isoformat()}
    })
    return recent is None  # True if allowed, False if rate limited


async def send_notification_email(submission: ContactSubmission) -> bool:
    """Send email notification using Resend"""
    if not resend.api_key:
        logging.warning("RESEND_API_KEY not configured, skipping email")
        return False
    
    try:
        # Email to site owner
        params = {
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": [CONTACT_EMAIL],
            "subject": f"New Contact Form Submission from {submission.name}",
            "html": f"""
            <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #0EA5E9; margin-bottom: 20px;">New Contact Form Submission</h2>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0 0 10px 0;"><strong>From:</strong> {submission.name}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:{submission.email}">{submission.email}</a></p>
                    <p style="margin: 0;"><strong>Submitted:</strong> {submission.created_at.strftime('%B %d, %Y at %I:%M %p UTC')}</p>
                </div>
                
                <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
                    <h3 style="margin-top: 0; color: #333;">Message:</h3>
                    <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">{submission.message}</p>
                </div>
                
                <p style="color: #888; font-size: 12px; margin-top: 20px;">
                    This message was sent from your portfolio contact form.
                </p>
            </div>
            """,
            "text": f"""
New Contact Form Submission

From: {submission.name}
Email: {submission.email}
Submitted: {submission.created_at.strftime('%B %d, %Y at %I:%M %p UTC')}

Message:
{submission.message}

---
This message was sent from your portfolio contact form.
            """
        }
        
        resend.Emails.send(params)
        logging.info(f"Notification email sent for submission {submission.id}")
        return True
        
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()