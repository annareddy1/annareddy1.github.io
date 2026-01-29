import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, FileText, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import profile from '../content/profile';
import { mockBlogContent } from '../data/mock';

// Blog List Page
const BlogListPage = () => {
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
          <h1 className="text-4xl sm:text-5xl font-light mb-4">Technical Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep dives into data engineering, ML systems, and analytics best practices.
            These are portfolio writing samples demonstrating my technical communication.
          </p>
        </motion.div>

        {/* Draft notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
        >
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
            <FileText size={16} />
            <span>These posts are <strong>draft writing samples</strong> showcasing my technical documentation style.</span>
          </p>
        </motion.div>

        {/* Blog posts */}
        <div ref={ref} className="space-y-6">
          {profile.blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <Card className="card-hover border-border/50 bg-card/50 backdrop-blur group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-500/30">
                            Draft
                          </Badge>
                        </div>
                        <h2 className="font-medium text-xl mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-4">
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

// Blog Post Page
const BlogPostPage = () => {
  const { slug } = useParams();
  const post = profile.blogPosts.find(p => p.slug === slug);
  const content = mockBlogContent[slug];

  if (!post || !content) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-light mb-4">Post not found</h1>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="gap-2 -ml-3">
              <ArrowLeft size={16} />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Draft banner */}
          <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              📝 <strong>Draft / Writing Sample</strong> - This is a portfolio piece demonstrating technical documentation skills.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <Badge variant="outline" className="text-yellow-600 border-yellow-500/30">
              Draft
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-light mb-4">{post.title}</h1>
          
          <p className="text-lg text-muted-foreground mb-6">{post.summary}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-neutral dark:prose-invert max-w-none"
        >
          <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
            <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
              {content.content}
            </pre>
          </div>
        </motion.div>

        {/* Key Takeaways Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                About This Writing Sample
              </h3>
              <p className="text-sm text-muted-foreground">
                This draft demonstrates my approach to technical documentation: clear structure,
                practical code examples, and actionable takeaways. The content is based on my
                real experience but written as a portfolio piece.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Back to all posts
            </Button>
          </Link>
        </motion.div>
      </article>
    </main>
  );
};

export { BlogListPage, BlogPostPage };
