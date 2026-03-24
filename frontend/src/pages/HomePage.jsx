import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  ChevronRight,
  Database,
  BarChart3,
  Brain,
  LineChart,
  MapPin,
  GraduationCap,
  Award,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import profile from '../content/profile';

// Hero Section
const HeroSection = ({ onEasterEggFound }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleEasterEgg = () => {
    setTooltipVisible(true);
    onEasterEggFound('tooltip');
    setTimeout(() => setTooltipVisible(false), 3000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div className="relative inline-block">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight cursor-default"
                onMouseEnter={handleEasterEgg}
              >
                <span className="text-foreground">{profile.name}</span>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-primary"
                >
                  .
                </motion.span>
              </h1>

              {tooltipVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap"
                >
                  {profile.hero.easterEggTooltip}
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-4"
          >
            {profile.hero.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {profile.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {profile.hero.credibilityChips.map((chip, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1.5 text-sm font-normal"
              >
                {chip}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link to="/contact">
              <Button size="lg" className="gap-2">
                Contact Me
                <ChevronRight size={18} />
              </Button>
            </Link>
            <a href="/Rithika_Annareddy_Resume.pdf" download>
              <Button variant="outline" size="lg" className="gap-2">
                <Download size={18} />
                Download Resume
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Specialties Section
const SpecialtiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const iconMap = {
    Database: Database,
    BarChart3: BarChart3,
    Brain: Brain,
    LineChart: LineChart,
  };

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">What I Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specializing in building reliable data infrastructure that powers analytics and ML systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {profile.specialties.map((specialty, index) => {
            const Icon = iconMap[specialty.icon] || Database;
            return (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full card-hover border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{specialty.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {specialty.description}
                        </p>
                        <p className="text-xs text-primary/80 font-mono">
                          → {specialty.proof}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSkill, setExpandedSkill] = useState(null);

  const filteredSkills = activeCategory === 'all'
    ? profile.skills.items
    : profile.skills.items.filter(skill => skill.categories.includes(activeCategory));

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Proficiencies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any skill to see how I've used it in production
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            All Skills
          </Button>
          {profile.skills.categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                backgroundColor: activeCategory === cat.id ? cat.color : undefined,
                borderColor: activeCategory !== cat.id ? cat.color : undefined,
                color: activeCategory === cat.id ? '#fff' : cat.color,
              }}
            >
              {cat.name}
            </Button>
          ))}
        </motion.div>

        <motion.div layout className="flex flex-wrap justify-center gap-3">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
            >
              <div
                className={`skill-node cursor-pointer ${
                  expandedSkill === skill.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
              >
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {skill.name}
                </Badge>
              </div>
              {expandedSkill === skill.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10 max-w-xs"
                >
                  <p className="text-sm text-foreground mb-2">{skill.usage}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.related.map((rel) => (
                      <span key={rel} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {rel}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <noscript>
          <ul className="mt-8 columns-2 md:columns-3 lg:columns-4 gap-4">
            {profile.skills.items.map((skill) => (
              <li key={skill.name} className="mb-2">{skill.name}</li>
            ))}
          </ul>
        </noscript>
      </div>
    </section>
  );
};

// Education Section
const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h3 className="font-medium text-xl mb-1">{profile.education.university}</h3>
                  <p className="text-muted-foreground mb-2">{profile.education.degree}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin size={14} />
                    <span>{profile.education.location}</span>
                    <span className="text-muted-foreground/50">|</span>
                    <span>{profile.education.graduationDate}</span>
                  </div>
                  {profile.education.honors.map((honor, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Award size={14} className="text-primary" />
                      <span>{honor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Certifications Section
const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!profile.certifications || profile.certifications.length === 0) return null;

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Certifications and credentials relevant to finance, cloud, and backend systems
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link || '#'}
              target={cert.link ? '_blank' : undefined}
              rel={cert.link ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="block"
            >
              <Card className="h-full card-hover border-border/50 bg-card/50 overflow-hidden">
                {cert.image && (
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-base leading-snug">{cert.title}</h3>
                      {cert.issuer && (
                        <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                      )}
                    </div>
                    {cert.link && <ExternalLink size={16} className="text-muted-foreground mt-1" />}
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Metrics Section
const MetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Proof of Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers that tell the story of real results
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {profile.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: 'spring' }}
                  className="text-4xl sm:text-5xl font-light text-primary mb-2"
                >
                  {metric.value}
                  <span className="text-2xl">{metric.suffix}</span>
                </motion.div>
                <p className="font-medium text-foreground mb-1">{metric.label}</p>
                <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {metric.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Work With Me Section
const WorkWithMeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Work With Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How I make teams more effective
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4 text-primary">Problems I Love</h3>
                <ul className="space-y-3">
                  {profile.workWithMe.problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4 text-primary">How I Operate</h3>
                <ul className="space-y-3">
                  {profile.workWithMe.approach.map((approach, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      {approach}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4 text-primary">What Teams Get</h3>
                <ul className="space-y-3">
                  {profile.workWithMe.teamGets.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Award size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">I can help with:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {profile.workWithMe.services.map((service, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                {service}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Let's build something great together
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I'm currently open to new opportunities in data engineering, analytics, and applied ML.
            Let's connect and discuss how I can contribute to your team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="gap-2">
                Get in Touch
                <ChevronRight size={18} />
              </Button>
            </Link>
            <Link to="/resume">
              <Button variant="outline" size="lg" className="gap-2">
                <Download size={18} />
                View Resume
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Page
const HomePage = ({ onEasterEggFound }) => {
  return (
    <main>
      <HeroSection onEasterEggFound={onEasterEggFound} />
      <SpecialtiesSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <MetricsSection />
      <WorkWithMeSection />
      <CTASection />
    </main>
  );
};

export default HomePage;