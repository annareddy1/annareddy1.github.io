import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Copy, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import profile from "../content/profile";

const ContactPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      alert("Email copied to clipboard");
    } catch {
      alert(profile.email);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I’m currently open to software engineering opportunities in fintech,
            backend systems, and real-time data infrastructure.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{profile.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{profile.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>

                <h2 className="text-2xl font-medium mb-3">Best way to reach me</h2>
                <p className="text-muted-foreground mb-8">
                  Email is the fastest way to reach me for roles, collaborations,
                  or conversations about backend systems, fintech, and applied AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a href={`mailto:${profile.email}`} className="flex-1">
                    <Button className="w-full gap-2">
                      <Mail size={18} />
                      Email Me
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    onClick={handleCopyEmail}
                    className="flex-1 gap-2"
                  >
                    <Copy size={18} />
                    Copy Email
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      <Linkedin size={18} />
                      LinkedIn
                    </Button>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      <Github size={18} />
                      GitHub
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;