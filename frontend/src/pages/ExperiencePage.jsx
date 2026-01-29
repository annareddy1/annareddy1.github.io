import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, ChevronRight, Building2, BookOpen, Beaker, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import profile from '../content/profile';

const typeIcons = {
  current: Building2,
  research: Beaker,
  internship: Briefcase,
  teaching: GraduationCap,
};

const typeColors = {
  current: 'bg-green-500',
  research: 'bg-blue-500',
  internship: 'bg-purple-500',
  teaching: 'bg-orange-500',
};

const ExperiencePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Experience</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey building data systems, ML pipelines, and analytics platforms
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          {/* Experience items */}
          <div className="space-y-8">
            {profile.experience.map((exp, index) => {
              const TypeIcon = typeIcons[exp.type] || Building2;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-8 -translate-x-1/2 items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${typeColors[exp.type]} ring-4 ring-background`} />
                  </div>

                  {/* Card */}
                  <Card className="md:ml-20 border-border/50 bg-card/50 backdrop-blur overflow-hidden group hover:border-primary/30 transition-colors">
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className="p-6 border-b border-border/50">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-2.5 rounded-lg ${typeColors[exp.type].replace('bg-', 'bg-')}/10`}>
                              <TypeIcon size={24} className={typeColors[exp.type].replace('bg-', 'text-').replace('-500', '-600')} />
                            </div>
                            <div>
                              <h3 className="font-medium text-xl mb-1">{exp.title}</h3>
                              <p className="text-primary font-medium">{exp.company}</p>
                            </div>
                          </div>
                          <Badge variant={exp.type === 'current' ? 'default' : 'secondary'} className="shrink-0">
                            {exp.type === 'current' ? 'Current' : exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {exp.dates}
                          </span>
                        </div>
                      </div>

                      {/* Impact bullets */}
                      <div className="p-6">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Contributions</h4>
                        <ul className="space-y-3">
                          {exp.impacts.map((impact, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-foreground/90">{impact}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech stack */}
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* What I learned */}
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen size={14} className="text-primary" />
                            <h4 className="text-sm font-medium">Key Takeaway</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{exp.learned}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExperiencePage;
