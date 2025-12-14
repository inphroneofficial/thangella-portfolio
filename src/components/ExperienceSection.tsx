import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const education = [
  {
    degree: "BSc (Hons) – Computer Science",
    institution: "Backstage Pass Institute of Gaming",
    year: "2024",
    duration: "",
    icon: GraduationCap,
  },
  {
    degree: "Intermediate – MPC",
    institution: "Sri Gayatri Junior College",
    year: "2019",
    duration: "",
    icon: BookOpen,
  },
  {
    degree: "SSC",
    institution: "Lotus Lap Public School",
    year: "2017",
    duration: "",
    icon: Award,
  },
];

const certifications = [
  "AWS Cloud Practitioner (In Progress)",
  "Advanced Excel & Data Analytics",
  "DevOps & CI/CD Practices",
  "AI Prompt Engineering",
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div ref={ref}>
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.span
              className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              BACKGROUND
            </motion.span>
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Education & <span className="gradient-text">Journey</span>
            </motion.h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Education Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-8 text-xl font-semibold">Education</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />

                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.degree}
                      className="relative pl-16"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
                        <edu.icon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {edu.year}
                          </span>
                          {edu.duration && (
                            <span className="text-xs text-muted-foreground">{edu.duration}</span>
                          )}
                        </div>
                        <h4 className="mb-1 font-bold text-foreground">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills & Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-8 text-xl font-semibold">Certifications & Training</h3>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>

              {/* Languages */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
              >
                <h3 className="mb-4 text-xl font-semibold">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {["English", "Hindi", "Telugu"].map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-border bg-card/50 px-4 py-2 font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Career Focus */}
              <motion.div
                className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <h4 className="mb-3 font-bold text-primary">Career Focus</h4>
                <p className="text-sm text-muted-foreground">
                  Actively seeking opportunities in <span className="text-foreground font-medium">DevOps, 
                  Cloud Operations, Data Analytics, SRE, or AI Prompt Engineering</span> roles 
                  at MNCs and product-based companies. Ready to contribute to building robust, 
                  automated systems and data-driven solutions.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
