import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, File, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import profile from '../content/profile';

const ResumePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const downloadFormats = [
    { name: 'PDF', icon: FileText, available: true, href: '/resume.pdf' },
    { name: 'DOCX', icon: File, available: false, href: '#' },
    { name: 'Plain Text', icon: File, available: false, href: '#' },
  ];

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
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Resume</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download my resume or view the highlights below
          </p>
        </motion.div>

        <div ref={ref}>
          {/* Download Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="font-medium text-lg mb-4">Download Resume</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {downloadFormats.map((format) => (
                    <div key={format.name}>
                      {format.available ? (
                        <a href={format.href} download>
                          <Button variant="outline" className="w-full gap-2">
                            <format.icon size={18} />
                            {format.name}
                            <Download size={14} />
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="w-full gap-2" disabled>
                          <format.icon size={18} />
                          {format.name}
                          <span className="text-xs">(Soon)</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-medium text-lg mb-4">At a Glance</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Education */}
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Education</h3>
                  <p className="font-medium">{profile.education.university}</p>
                  <p className="text-sm text-muted-foreground">{profile.education.degree}</p>
                  <p className="text-sm text-muted-foreground">{profile.education.graduationDate}</p>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Location</h3>
                  <p className="font-medium">{profile.location}</p>
                  <p className="text-sm text-muted-foreground">Open to relocation</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-medium text-lg mb-4">Certifications</h2>
            <div className="space-y-3">
              {profile.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <Award size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm">{cert}</span>
                  <CheckCircle2 size={14} className="text-green-500 ml-auto flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Experience Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-medium text-lg mb-4">Experience Highlights</h2>
            <div className="space-y-4">
              {profile.experience.slice(0, 3).map((exp, index) => (
                <Card key={exp.id} className="border-border/50 bg-card/50">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{exp.title}</h3>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{exp.dates}</p>
                      </div>
                      <Badge variant={exp.type === 'current' ? 'default' : 'secondary'} className="shrink-0">
                        {exp.type === 'current' ? 'Current' : exp.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <h3 className="font-medium text-xl mb-2">Interested in working together?</h3>
                <p className="text-muted-foreground mb-6">
                  I'm open to opportunities in data engineering, analytics, and applied ML.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/resume.pdf" download>
                    <Button className="gap-2">
                      <Download size={18} />
                      Download Full Resume
                    </Button>
                  </a>
                  <a href={`mailto:${profile.email}`}>
                    <Button variant="outline" className="gap-2">
                      <ExternalLink size={18} />
                      Get in Touch
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

export default ResumePage;
