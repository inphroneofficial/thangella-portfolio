import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Cloud, 
  BarChart3, 
  Cpu, 
  Code2,
  Layers
} from "lucide-react";

const skillCategories = [
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "AWS (EC2, S3, IAM, VPC, RDS)", level: 85 },
      { name: "Terraform", level: 80 },
      { name: "Docker & Kubernetes", level: 75 },
      { name: "Jenkins & CI/CD", level: 85 },
      { name: "Ansible", level: 75 },
    ],
  },
  {
    title: "Data & Analytics",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "SQL & MySQL", level: 85 },
      { name: "Power BI", level: 80 },
      { name: "Tableau", level: 75 },
      { name: "Excel (Advanced)", level: 90 },
      { name: "Data Cleaning & DAX", level: 75 },
    ],
  },
  {
    title: "AI / Prompt Engineering",
    icon: Cpu,
    color: "from-amber-500 to-orange-500",
    skills: [
      { name: "ChatGPT & AI Prompts", level: 90 },
      { name: "AI-assisted Development", level: 85 },
      { name: "Prompt-based UI/UX", level: 80 },
      { name: "AI Workflow Design", level: 85 },
      { name: "AI Code Generators", level: 85 },
    ],
  },
  {
    title: "Programming & Web",
    icon: Code2,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "React & TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Shell Scripting", level: 80 },
      { name: "Java & C/C++", level: 70 },
    ],
  },
];

const tools = [
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "⎈" },
  { name: "Terraform", icon: "🏗️" },
  { name: "Jenkins", icon: "🔧" },
  { name: "Git", icon: "📦" },
  { name: "Linux", icon: "🐧" },
  { name: "Power BI", icon: "📊" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Prometheus", icon: "🔥" },
  { name: "Grafana", icon: "📈" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div ref={ref}>
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.span
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Layers className="h-3 w-3" />
              SKILLS & EXPERTISE
            </motion.span>
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Technical <span className="gradient-text">Arsenal</span>
            </motion.h2>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="group rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Category Header */}
                <div className="mb-5 flex items-center gap-3">
                  <motion.div 
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${category.color}`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <category.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="truncate text-foreground pr-2">{skill.name}</span>
                        <span className="shrink-0 font-mono text-xs text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Marquee */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h3 className="mb-6 text-center text-sm font-semibold text-muted-foreground">
              Tools & Technologies
            </h3>
            <div className="relative overflow-hidden">
              <div className="flex animate-[scroll_20s_linear_infinite] gap-4">
                {[...tools, ...tools].map((tool, index) => (
                  <motion.div
                    key={`${tool.name}-${index}`}
                    className="flex min-w-max items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="text-sm font-medium">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Additional Skills Tags */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {["Linux Admin", "Shell Scripting", "Maven", "Nexus", "CloudWatch", "CodeDeploy", "Blue/Green Deploy", "IaC", "SRE"].map((skill) => (
                <motion.span
                  key={skill}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
