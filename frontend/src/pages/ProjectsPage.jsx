import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Folder, ExternalLink, Github, Star, Clock, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import profile from '../content/profile';

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Completed' },
  draft: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Coming Soon' },
  'in-progress': { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'In Progress' },
};

const categoryColors = {
  'NLP/ML': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Full Stack': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Data Engineering': 'bg-green-500/10 text-green-600 border-green-500/20',
  'ML Infrastructure': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

const ProjectCard = ({ project, index, isInView, featured = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const StatusIcon = statusConfig[project.status]?.icon || AlertCircle;
  const statusStyle = statusConfig[project.status] || statusConfig.draft;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Card className={`h-full card-hover border-border/50 bg-card/50 backdrop-blur overflow-hidden ${
        featured ? 'ring-1 ring-primary/20' : ''
      } ${project.status === 'draft' ? 'opacity-80' : ''}`}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${statusStyle.bg}`}>
                <Folder size={20} className={statusStyle.color} />
              </div>
              <div>
                {featured && (
                  <Badge className="mb-2 text-xs gap-1" variant="default">
                    <Star size={12} />
                    Featured Project
                  </Badge>
                )}
                <h3 className="font-medium text-lg">{project.title}</h3>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`shrink-0 text-xs ${categoryColors[project.category] || ''}`}
            >
              {project.category}
            </Badge>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-4">
            <StatusIcon size={14} className={statusStyle.color} />
            <span className={`text-xs ${statusStyle.color}`}>{statusStyle.label}</span>
          </div>

          {/* Content */}
          {project.status !== 'draft' ? (
            <>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Problem
                  </h4>
                  <p className="text-sm text-foreground/90">{project.problem}</p>
                </div>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Approach
                      </h4>
                      <p className="text-sm text-foreground/90">{project.approach}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Impact
                      </h4>
                      <p className="text-sm text-foreground/90">{project.impact}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Expand/Collapse */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-xs"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </Button>
            </>
          ) : (
            <div className="py-4 text-center">
              <p className="text-sm text-muted-foreground italic">
                {project.problem}
              </p>
            </div>
          )}

          {/* Stack */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-muted px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="mt-4 flex gap-2">
              {project.demoUrl && (
                <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={14} />
                    Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Separate featured and regular projects
  const featuredProject = profile.projects.find(p => p.featured);
  const regularProjects = profile.projects.filter(p => !p.featured);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Project Lab</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects exploring data engineering, ML systems, and analytics.
            More projects coming soon!
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {/* Featured project spans 2 columns */}
          {featuredProject && (
            <ProjectCard 
              project={featuredProject} 
              index={0} 
              isInView={isInView} 
              featured 
            />
          )}
          
          {/* Regular projects */}
          {regularProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Add Projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 rounded-lg border border-dashed border-border bg-muted/20">
            <p className="text-sm text-muted-foreground mb-2">
              🛠️ More projects in development
            </p>
            <p className="text-xs text-muted-foreground">
              Check back soon for updates!
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectsPage;
