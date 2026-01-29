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


# -----------------------------
# Config / Setup
# -----------------------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("portfolio-api")

# Mongo (optional)
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "portfolio")

client = AsyncIOMotorClient(MONGO_URL) if MONGO_URL else None
db = client[DB_NAME] if client else None

# Resend (email)
resend.api_key = os.environ.get("RESEND_API_KEY", "")

# ✅ You want emails here:
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "rithikaannareddy962@gmail.com")

# Rate limiting
RATE_LIMIT_SECONDS = int(os.environ.get("RATE_LIMIT_SECONDS", "60"))  # 1/min/IP


app = FastAPI(title="Rithika Annareddy Portfolio API")
api_router = APIRouter(prefix="/api")


# -----------------------------
# Models
# -----------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    ip_hash: str = ""
    user_agent: str = ""
    email_sent: bool = False

    @field_validator("name")
    @classmethod
    def sanitize_name(cls, v: str) -> str:
        return v.strip()

    @field_validator("message")
    @classmethod
    def sanitize_message(cls, v: str) -> str:
        return v.strip()


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)
    honeypot: Optional[str] = ""  # optional spam trap


class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None


# -----------------------------
# Helpers
# -----------------------------
def hash_ip(ip: str) -> str:
    """Hash IP address for privacy-preserving rate limiting."""
    return hashlib.sha256(ip.encode("utf-8")).hexdigest()[:16]


def get_client_ip(request: Request) -> str:
    """Extract client IP from request, handling proxies."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def check_rate_limit(ip_hash: str) -> bool:
    """Return True if allowed; False if rate limited."""
    if db is None:
        # If DB not configured, allow (still protected by frontend rate-limit)
        return True

    cutoff = datetime.now(timezone.utc) - timedelta(seconds=RATE_LIMIT_SECONDS)

    # We store created_at as ISO string for Mongo simplicity.
    recent = await db.contact_submissions.find_one(
        {
            "ip_hash": ip_hash,
            "created_at": {"$gte": cutoff.isoformat()},
        },
        {"_id": 0},
    )
    return recent is None


async def send_notification_email(submission: ContactSubmission) -> bool:
    """Send email notification using Resend."""
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not configured; skipping email send.")
        return False

    try:
        params = {
            # NOTE: For production you should use a verified domain instead of onboarding@resend.dev
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": [CONTACT_EMAIL],
            "subject": f"New Portfolio Message from {submission.name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px;">
              <h2 style="margin: 0 0 12px;">New Contact Form Submission</h2>

              <div style="background:#f6f7f9; padding: 14px; border-radius: 10px; margin-bottom: 14px;">
                <p style="margin: 0 0 6px;"><b>Name:</b> {submission.name}</p>
                <p style="margin: 0 0 6px;"><b>Email:</b> <a href="mailto:{submission.email}">{submission.email}</a></p>
                <p style="margin: 0;"><b>Time (UTC):</b> {submission.created_at.strftime('%Y-%m-%d %H:%M:%S')}</p>
              </div>

              <div style="border:1px solid #e5e7eb; padding: 14px; border-radius: 10px;">
                <p style="margin: 0 0 8px;"><b>Message:</b></p>
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">{submission.message}</p>
              </div>

              <p style="color:#6b7280; font-size: 12px; margin-top: 16px;">
                Sent from your portfolio contact form.
              </p>
            </div>
            """,
            "text": f"""New Portfolio Message

Name: {submission.name}
Email: {submission.email}
Time (UTC): {submission.created_at.isoformat()}

Message:
{submission.message}
""",
        }

        resend.Emails.send(params)
        logger.info(f"Email sent for contact submission {submission.id}")
        return True

    except Exception as e:
        logger.error(f"Resend email failed: {e}")
        return False


# -----------------------------
# Routes
# -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)

    if db is not None:
        doc = status_obj.model_dump()
        doc["timestamp"] = status_obj.timestamp.isoformat()
        await db.status_checks.insert_one(doc)

    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        return []

    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get("timestamp"), str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(req: ContactRequest, request: Request):
    # Basic spam trap
    if req.honeypot:
        # Pretend success to bots
        return ContactResponse(success=True, message="Thanks! Message received.")

    client_ip = get_client_ip(request)
    ip_hash = hash_ip(client_ip)

    allowed = await check_rate_limit(ip_hash)
    if not allowed:
        raise HTTPException(status_code=429, detail="Please wait before submitting again.")

    submission = ContactSubmission(
        name=req.name,
        email=req.email,
        message=req.message,
        ip_hash=ip_hash,
        user_agent=request.headers.get("user-agent", ""),
    )

    inserted_id = None
    if db is not None:
        try:
            doc = submission.model_dump()
            doc["created_at"] = submission.created_at.isoformat()
            await db.contact_submissions.insert_one(doc)
            inserted_id = submission.id
        except Exception as e:
            logger.warning(f"Mongo insert failed (continuing anyway): {e}")

    email_sent = await send_notification_email(submission)

    # optionally update db with email_sent flag
    if db is not None and inserted_id is not None:
        try:
            await db.contact_submissions.update_one(
                {"id": inserted_id},
                {"$set": {"email_sent": email_sent}},
            )
        except Exception:
            pass

    return ContactResponse(
        success=True,
        message="Thank you for reaching out! I'll get back to you within 24 hours.",
        id=inserted_id,
    )


# -----------------------------
# App wiring / middleware
# -----------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
