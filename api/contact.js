export default async function handler(req, res) {
  // CORS (so your Amplify site can call this)
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, message, honeypot } = req.body || {};

    // Honeypot (bots)
    if (honeypot) return res.status(200).json({ success: true, message: "Thanks!" });

    // Validation (match your backend constraints)
    if (!name || String(name).trim().length < 2) {
      return res.status(400).json({ success: false, message: "Name must be at least 2 characters." });
    }
    const emailStr = String(email || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailStr)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    const msgStr = String(message || "").trim();
    if (msgStr.length < 10) {
      return res.status(400).json({ success: false, message: "Message must be at least 10 characters." });
    }
    if (msgStr.length > 5000) {
      return res.status(400).json({ success: false, message: "Message is too long." });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "rithikaannareddy962@gmail.com";

    if (!RESEND_API_KEY) {
      return res.status(500).json({ success: false, message: "RESEND_API_KEY not configured." });
    }

    // Call Resend API directly
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        reply_to: emailStr,
        subject: `New portfolio message from ${String(name).trim()}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5">
            <h2>New Contact Form Submission</h2>
            <p><b>Name:</b> ${String(name).trim()}</p>
            <p><b>Email:</b> <a href="mailto:${emailStr}">${emailStr}</a></p>
            <p><b>Message:</b></p>
            <pre style="white-space:pre-wrap">${msgStr.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          </div>
        `,
        text: `Name: ${String(name).trim()}\nEmail: ${emailStr}\n\nMessage:\n${msgStr}`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      return res.status(500).json({
        success: false,
        message: "Failed to send email.",
        detail: errText,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! I’ll get back to you within 24 hours.",
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
}
