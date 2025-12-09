import { motion } from "framer-motion";
import { ArrowDown, Download, Linkedin, Github, Mail, ExternalLink, FileText } from "lucide-react";
import { Button } from "./ui/button";
import Hero3DScene from "./Hero3DScene";

const HeroSection = () => {
  const roles = ["DevOps Engineer", "Data Analyst", "AI Prompt Engineer", "Cloud Architect"];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden hero-gradient"
    >
      {/* 3D Background */}
      <Hero3DScene />

      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Terminal-style intro */}
          <motion.div
            className="mb-6 rounded-lg border border-border bg-card/80 px-4 py-2 font-mono text-sm backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&gt;</span>{" "}
            <span className="text-muted-foreground">~/portfolio $</span>{" "}
            <motion.span
              className="text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              whoami
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span className="block text-foreground">Gadidamalla</motion.span>
            <motion.span className="gradient-text text-glow">Thangella</motion.span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            className="mb-6 h-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, -40, -80, -120, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="flex h-10 items-center justify-center font-mono text-xl text-primary sm:text-2xl"
                >
                  {role}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Computer Science graduate specializing in{" "}
            <span className="font-medium text-primary">AWS Cloud & DevOps</span>,{" "}
            <span className="font-medium text-primary">CI/CD Automation</span>,{" "}
            <span className="font-medium text-primary">Data Analytics</span>, and{" "}
            <span className="font-medium text-primary">AI-powered solutions</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* View Projects */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="hero"
                size="lg"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* View Resume (PDF viewer) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="heroOutline" size="lg" asChild>
                <a
                  href="/THANGELLA_Promt Engineer_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                  <FileText className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            {/* Download CV */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="glass" size="lg" asChild>
                <a href="/THANGELLA_Promt Engineer_Resume.pdf" download>
                  Download CV
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: Linkedin, href: "https://linkedin.com/in/gthangella", label: "LinkedIn" },
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Mail, href: "mailto:thangella17@gmail.com", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/25"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary-foreground" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xs text-muted-foreground">Scroll Down</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
