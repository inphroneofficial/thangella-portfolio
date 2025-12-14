import { motion } from "framer-motion";
import { Terminal, Heart, Linkedin, Github, Mail, ExternalLink, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/gthangella", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:bg-gray-700" },
    { icon: Mail, href: "mailto:thangella17@gmail.com", label: "Email", color: "hover:bg-red-500" },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur-sm overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="container relative mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              className="inline-flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Terminal className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <span className="font-mono text-2xl font-bold">
                  <span className="text-primary"></span>Thangella
                </span>
                <p className="text-xs text-muted-foreground">DevOps | Cloud | Data Analyst | AI</p>
              </div>
            </motion.a>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Computer Science graduate with expertise in AWS Cloud, DevOps automation, 
              Data Analytics, and AI Prompt Engineering. Ready to contribute to MNCs and product-based companies.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 7207840501</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  whileHover={{ x: 5 }}
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/50 transition-all ${social.color} hover:border-transparent hover:text-white hover:shadow-lg`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                    
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 group-hover:opacity-100 transition-opacity">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Resume link */}
            <motion.a
              href="https://thangella-craftech-solutions.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Portfolio
              <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <motion.div 
          className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Gadidamalla Thangella. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
