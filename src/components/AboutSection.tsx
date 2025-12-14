import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, GraduationCap, Briefcase, Code2, Database, Cloud, Zap } from "lucide-react";
import Typewriter from "./Typewriter";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);
  const [showFourthLine, setShowFourthLine] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const stats = [
    { label: "Projects", value: "9+", icon: Code2 },
    { label: "Technologies", value: "20+", icon: Database },
    { label: "Cloud", value: "AWS", icon: Cloud },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.span
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Zap className="h-3 w-3" />
              ABOUT ME
            </motion.span>
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Building the <span className="gradient-text">Future</span>
            </motion.h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Bio */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Profile Photo Card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                className="mx-auto mb-8 w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden 
                           border border-primary/30 shadow-xl backdrop-blur-md bg-white/5 
                           flex items-center justify-center relative group"
              >
                <img
                  src="/GTK.jpg"
                  alt="Gadidamalla Thangella"
                  className="w-full h-full object-cover rounded-2xl 
                             group-hover:scale-105 transition-all duration-500"
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-20 transition-all duration-500" />
              </motion.div>

              <div className="space-y-5">
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I'm a <span className="font-semibold text-foreground">Computer Science graduate</span> with 
                  hands-on experience in AWS Cloud, DevOps automation, Data Analytics, and AI Prompt Engineering.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  My passion lies in building <span className="text-primary font-medium">scalable infrastructure</span> and 
                  creating <span className="text-primary font-medium">AI-powered applications</span> that solve real-world problems.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Currently seeking opportunities in <span className="font-semibold text-foreground">DevOps, 
                  Cloud, Data Analysis, or SRE roles</span> at MNCs and product companies.
                </p>

                {/* Quick Info */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { icon: MapPin, label: "Location", value: "Hyderabad, India" },
                    { icon: Calendar, label: "Experience", value: "Fresh Graduate" },
                    { icon: GraduationCap, label: "Education", value: "BSc (Hons) CS" },
                    { icon: Briefcase, label: "Status", value: "Open to Work", highlight: true },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className={`text-sm font-medium truncate ${item.highlight ? "text-primary" : ""}`}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats & Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="group relative rounded-2xl border border-border bg-card/50 p-4 text-center backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="mb-3 flex justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </motion.div>
                    <div className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Terminal Card with Typing Animation */}
              <motion.div
                className="mt-6 overflow-hidden rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">about.sh</span>
                </div>
                <div className="p-4 font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground">
                    <span className="text-primary">$</span> cat skills.txt
                  </div>
                  <div className="mt-2 space-y-1">
                    <div>
                      <span className="text-primary">→</span>{" "}
                      {isInView && (
                        <Typewriter 
                          text="AWS Cloud & Infra" 
                          delay={30} 
                          onComplete={() => setShowSecondLine(true)}
                        />
                      )}
                    </div>
                    {showSecondLine && (
                      <div>
                        <span className="text-primary">→</span>{" "}
                        <Typewriter 
                          text="CI/CD & DevOps" 
                          delay={30}
                          onComplete={() => setShowThirdLine(true)}
                        />
                      </div>
                    )}
                    {showThirdLine && (
                      <div>
                        <span className="text-primary">→</span>{" "}
                        <Typewriter 
                          text="Data Analytics" 
                          delay={30}
                          onComplete={() => setShowFourthLine(true)}
                        />
                      </div>
                    )}
                    {showFourthLine && (
                      <div>
                        <span className="text-primary">→</span>{" "}
                        <Typewriter 
                          text="AI Prompt Engineering" 
                          delay={30}
                          onComplete={() => setShowStatus(true)}
                        />
                      </div>
                    )}
                  </div>
                  {showStatus && (
                    <>
                      <div className="mt-3 text-muted-foreground">
                        <span className="text-primary">$</span> echo $STATUS
                      </div>
                      <motion.div 
                        className="mt-1 text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Typewriter text="Ready for new challenges! 🚀" delay={40} />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
