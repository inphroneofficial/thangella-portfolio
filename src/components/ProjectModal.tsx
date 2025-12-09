import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, ArrowLeft, Github, Check, Star } from "lucide-react";
import { Button } from "./ui/button";

export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  demoLink: string;
  githubLink?: string;
  downloadLink?: string;
  category: string;
  color: string;
  image: string;
  benefits: string[];
  impact: string;
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  // Handle back button on mobile
  const handleBackClick = () => {
    onClose();
    // Push state for browser history
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/90 backdrop-blur-lg p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className={`relative h-48 md:h-64 bg-gradient-to-br ${project.color} overflow-hidden`}>
              {/* Project Image/Preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-30"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Back Button (Mobile-friendly) */}
              <motion.button
                onClick={handleBackClick}
                className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-background/20 backdrop-blur-md px-4 py-2 text-white transition-all hover:bg-background/40"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </motion.button>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-4 top-4 z-20 rounded-full bg-background/20 backdrop-blur-md text-white hover:bg-background/40"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold">About</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Benefits */}
              {project.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold">Key Features</h3>
                  <ul className="space-y-2">
                    {project.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact */}
              {project.impact && (
                <div className="mb-6 rounded-xl bg-primary/5 border border-primary/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-primary">Impact</h3>
                  </div>
                  <p className="text-muted-foreground">{project.impact}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="lg" asChild>
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </motion.div>

                {project.downloadLink && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="accent" size="lg" asChild>
                      <a href={project.downloadLink} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                        Download App
                      </a>
                    </Button>
                  </motion.div>
                )}

                {project.githubLink && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
