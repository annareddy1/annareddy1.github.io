import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import profile from '../../content/profile';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-semibold text-xl">
                Rithika<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-3 text-muted-foreground text-sm max-w-md">
              Software Engineer building reliable systems for financial data,
              real-time analytics, and production-grade infrastructure.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  {profile.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500" /> and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;