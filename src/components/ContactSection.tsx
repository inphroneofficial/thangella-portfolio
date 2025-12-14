import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  ExternalLink,
  Rocket,
  Instagram,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:thangella17@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      toast.success("Opening email client...");
      setIsSubmitting(false);
    }, 500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "thangella17@gmail.com",
      href: "mailto:thangella17@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7207840501",
      href: "tel:+917207840501",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      href: "#",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "gthangella",
      href: "https://linkedin.com/in/gthangella",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
    >
      {/* BACKGROUND BLOBS (CLICK SAFE) */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div ref={ref}>
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.span
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <Rocket className="h-3 w-3" />
              GET IN TOUCH
            </motion.span>

            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              Let&apos;s <span className="gradient-text">Connect</span>
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              Actively seeking DevOps, Cloud, Data Analytics, or AI roles.
            </motion.p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="mb-6 text-lg font-semibold">
                Contact Information
              </h3>

              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={
                      item.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg"
                    whileHover={{ x: 6 }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary">
                      <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="truncate font-medium">
                        {item.value}
                      </p>
                    </div>

                    {item.href.startsWith("http") && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* SOCIAL ICONS — FIXED */}
              <div className="mt-8 relative z-20">
                <h4 className="mb-4 text-sm font-medium text-muted-foreground">
                  Follow Me
                </h4>

                <div className="flex gap-3">
  {[
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/gthangella",
    },
    {
      icon: Github,
      href: "https://github.com",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/g_thangella_k",
    },
  ].map((social, index) => {
    const Icon = social.icon;

    return (
      <motion.a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-30 pointer-events-auto flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/60 transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/25"
        whileHover={{ scale: 1.12, rotate: 6 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary-foreground" />
      </motion.a>
    );
  })}
</div>

              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="mb-6 text-lg font-semibold">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  placeholder="Your Name"
                  className="w-full rounded-xl border bg-card/50 px-4 py-3"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-xl border bg-card/50 px-4 py-3"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <textarea
                  required
                  rows={4}
                  placeholder="Message"
                  className="w-full rounded-xl border bg-card/50 px-4 py-3 resize-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
