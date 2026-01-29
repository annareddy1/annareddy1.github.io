# API Contracts - Rithika Annareddy Portfolio

## Overview
Backend API for portfolio website with contact form submission and email notifications.

---

## Environment Variables

### Backend (.env)
```
MONGO_URL=<existing>
DB_NAME=<existing>
RESEND_API_KEY=<to be provided>
CONTACT_EMAIL=annareddy.1@osu.edu
```

---

## API Endpoints

### 1. POST /api/contact
Submit contact form and send email notification.

**Request Body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, 10-5000 chars)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you for reaching out! I'll get back to you within 24 hours.",
  "id": "contact_submission_id"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**Response (429 Too Many Requests):**
```json
{
  "success": false,
  "message": "Please wait before submitting again."
}
```

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Failed to send message. Please try again later."
}
```

---

### 2. GET /api/contact (Admin - optional)
Retrieve contact submissions (for future admin panel).

**Response:**
```json
{
  "submissions": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "message": "string",
      "created_at": "ISO datetime",
      "ip_address": "string (hashed)",
      "email_sent": true
    }
  ]
}
```

---

### 3. GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "ISO datetime"
}
```

---

## MongoDB Collections

### contact_submissions
```json
{
  "_id": "ObjectId",
  "id": "UUID string",
  "name": "string",
  "email": "string", 
  "message": "string",
  "created_at": "datetime",
  "ip_hash": "string (SHA256 hash for rate limiting)",
  "email_sent": "boolean",
  "user_agent": "string"
}
```

**Indexes:**
- `id`: unique
- `created_at`: descending (for sorting)
- `ip_hash, created_at`: compound (for rate limiting)

---

## Frontend Integration

### Current Mock Data Location
- `/app/frontend/src/data/mock.js` - mockContactSubmission

### Integration Points
Replace mock API call in `/app/frontend/src/pages/ContactPage.jsx`:

**Before (mock):**
```javascript
await new Promise(resolve => setTimeout(resolve, 1500));
if (mockContactSubmission.success) { ... }
```

**After (real API):**
```javascript
const response = await axios.post(`${API}/contact`, {
  name: formData.name,
  email: formData.email,
  message: formData.message
});
if (response.data.success) { ... }
```

---

## Rate Limiting
- 1 submission per IP per 60 seconds
- Implemented via IP hash lookup in MongoDB

---

## Email Template
Using Resend API to send:
1. Notification to site owner (annareddy.1@osu.edu)
2. Confirmation to sender (optional)

---

## Security Considerations
- Honeypot field (frontend) - already implemented
- Rate limiting (backend) - to implement
- Input sanitization - to implement
- IP hashing for privacy - to implement
