import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import profile from "../content/profile";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080";

const DEFAULT_SUCCESS =
  "Thank you for reaching out! I'll get back to you within 24 hours.";

const ContactPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // spam protection
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(DEFAULT_SUCCESS);
  const [lastSubmit, setLastSubmit] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

  // Frontend validation
  if (formData.message.trim().length < 10) {
    setStatus('error');
    setErrorMsg('Message must be at least 10 characters.');
    return;
  }

    // Honeypot (bots)
    if (formData.honeypot) return;

    // Frontend rate limit: 30 seconds between successful submits
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      setStatus("error");
      setErrorMsg("Please wait before submitting again.");
      return;
    }

    setStatus("loading");

    try {
      const url = `${API_URL}/api/contact`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // If backend returned non-JSON, log the raw response once for debugging
        if (!data) {
          const raw = await res.text().catch(() => "");
          console.error("Non-JSON error response:", raw);
        }

        const msg =
          (data && (data.message || data.detail)) ||
          "Something went wrong. Please try again.";
        setStatus("error");
        setErrorMsg(msg);
        return;
      }

      // Only rate-limit after success
      setLastSubmit(now);

      setSuccessMsg(data?.message || DEFAULT_SUCCESS);
      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(
        "Network error. Is the backend running, and is CORS allowed for http://localhost:3000 / http://127.0.0.1:3000?"
      );
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Drop
            me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="space-y-6">
              <div>
                <h2 className="font-medium text-lg mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{profile.email}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">{profile.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Available for opportunities
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently open to full-time roles in data engineering,
                    analytics, and ML.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="font-medium text-xl mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">{successMsg}</p>
                    <Button variant="outline" onClick={() => setStatus("idle")}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot (hidden) */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your opportunity or project..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-background resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                      >
                        <AlertCircle size={18} />
                        <span className="text-sm">
                          {errorMsg || "Something went wrong."}
                        </span>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      I typically respond within 24 hours.
                    </p>

                    <p className="text-[11px] text-muted-foreground text-center">
                      API: <span className="font-mono">{API_URL}</span>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
