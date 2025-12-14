import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles, Eye } from "lucide-react";
import { Button } from "./ui/button";
import ProjectModal, { ProjectDetails } from "./ProjectModal";

const projects: ProjectDetails[] = [
 {
    id: 1,
    title: "Rewind-It",
    description: "A private, offline-first memory journal for capturing and reliving meaningful moments.",
    fullDescription: "Rewind-It is a beautiful, privacy-first memory journaling app designed to capture and protect your most important life moments. All data is stored safely on your device with zero cloud uploads or tracking. Featuring rich media support, mood tracking, time capsules, analytics, and visual memory insights, Rewind-It becomes your personal time machine.",
    tags: ["React", "TypeScript", "Tailwind", "AI"],
    demoLink: "https://rewindit.vercel.app/",
    downloadLink: "https://drive.google.com/file/d/1z6xKlz6VympQ6NlchXRD75xh13swQSJe/view?usp=sharing",
    category: "AI Project",
    color: "from-violet-500 to-purple-600",
    image: "/rewind-it.png",
    benefits: [
      "100% private & offline — all data stored locally",
      "Rich media memories including photos, voice notes, moods",
      "Automatic tag suggestions for intelligent organization",
      "Daily flashbacks that resurface forgotten moments",
      "Time capsules to hide and unlock memories later",
    ],
    impact: "Encourages emotional well-being by helping users reflect on their lives and build positive memory habits while ensuring complete digital privacy.",
  },
  {
    id: 2,
    title: "INVALSER",
    description: "Premium service platform connecting customers with verified professionals.",
    fullDescription: "INVALSER is a premium service provider platform designed to connect customers with trusted professionals across India. It supports intelligent search, location-based matching, real-time availability, and a seamless booking flow. Built with modern technologies for lightning-fast performance.",
    tags: ["React", "React Query", "Framer Motion"],
    demoLink: "https://invalser.vercel.app/",
    category: "Full Stack",
    color: "from-blue-500 to-cyan-500",
    image: "/invalser.png",
    benefits: [
      "Covers 20+ cities across India",
      "500+ verified professionals",
      "Smart location-based matching",
      "Transparent pricing and real-time booking",
    ],
    impact: "Digitizing service discovery and improving transparency while enabling professional growth for service providers.",
  },
  {
    id: 3,
    title: "Listeners",
    description: "Compassionate platform connecting individuals with trained listeners for support.",
    fullDescription: "Listeners is a modern, empathy-driven platform designed to provide emotional support through trained listeners. With a soothing UI, dark/light themes, immersive animations, and an AI-powered chatbot, the platform offers a comforting space for individuals dealing with stress or life challenges.",
    tags: ["React", "TypeScript", "AI Chatbot"],
    demoLink: "https://listeners.vercel.app/",
    category: "AI Project",
    color: "from-pink-500 to-rose-500",
    image: "/listeners.png",
    benefits: [
      "AI chatbot with FAQ and smooth chat animations",
      "Search listeners by expertise, language, ratings",
      "Direct contact with no platform commission",
      "Accessible design following WCAG standards",
    ],
    impact: "Fills an important gap in mental wellness by offering affordable, stigma-free emotional support.",
  },
  {
    id: 4,
    title: "Game Spot",
    description: "Free, ad-less gaming platform with 36+ instant-play games.",
    fullDescription: "Game Spot is a lightweight, fast, ad-free gaming platform featuring 36+ interactive games across multiple categories such as logic, puzzles, memory, reflex, and kids-friendly games. Built for smooth performance on any device with instant play.",
    tags: ["React", "TypeScript", "Local Storage"],
    demoLink: "https://game-spot-by-gtk.vercel.app/",
    category: "Web App",
    color: "from-green-500 to-emerald-500",
    image: "/gamespot.png",
    benefits: [
      "36+ mini-games across multiple categories",
      "Ad-free, tracker-free experience",
      "Progress saved locally",
      "Mobile-first UI with smooth animations",
    ],
    impact: "Provides free educational and entertainment platform accessible to everyone, regardless of device capability.",
  },
  {
    id: 5,
    title: "Code Craft Toolkit",
    description: "Suite of tools to divide, merge, and compare code snippets.",
    fullDescription: "Code Craft Toolkit is a powerful suite of tools built to simplify code management for developers. It includes features like automatic language detection, code merging, and visual diffing.",
    tags: ["Vite", "TypeScript", "Node.js"],
    demoLink: "https://code-craft-tool.vercel.app/",
    category: "Developer Tool",
    color: "from-amber-500 to-orange-500",
    image: "/HOME-1.png",
    benefits: [
      "Automatic language detection in mixed code",
      "Easy merge multiple files with proper sections",
      "Visual compare with highlighted changes",
      "Clean interface for developers",
    ],
    impact: "Changing how developers manage code by providing simple, efficient tools for code management.",
  },
  {
    id: 6,
    title: "Lifespan Estimator",
    description: "Tool to estimate potential lifespan based on health factors.",
    fullDescription: "Lifespan Estimator provides an estimate of your remaining lifespan based on health, lifestyle habits, and environmental factors. This tool takes into account medical conditions, diet, exercise, and mental well-being.",
    tags: ["React", "Recharts", "shadcn/ui"],
    demoLink: "https://lifespan-estimator.vercel.app/",
    category: "Health Tech",
    color: "from-teal-500 to-green-500",
    image: "/Lifespan-Estimator.png",
    benefits: [
      "Estimate based on personal data and lifestyle",
      "Understand health and environment influence",
      "Learn about factors affecting life expectancy",
      "Encourages proactive health behaviors",
    ],
    impact: "Raises awareness about the impact of daily habits on longevity.",
  },
  {
    id: 7,
    title: "Reel Revival",
    description: "Platform to book exclusive private screenings for classic films.",
    fullDescription: "Reel Revival connects movie enthusiasts with theaters for private screenings of classic films or movies missed during their theatrical run. We provide a customizable viewing experience in premium theaters.",
    tags: ["React", "TypeScript", "Tailwind"],
    demoLink: "https://reel-revival.vercel.app/",
    category: "Entertainment",
    color: "from-red-500 to-pink-500",
    image: "/Reel-Revival.png",
    benefits: [
      "Private theater screenings",
      "Classic movie selection",
      "Customizable events for special occasions",
      "Support for local theaters",
    ],
    impact: "Allows film lovers to relive movie magic while supporting local theaters.",
  },
  {
    id: 8,
    title: "Need2Fix",
    description: "Smart platform connecting verified professionals with customers.",
    fullDescription: "Need2Fix is a revolutionary digital marketplace designed to bridge the gap between skilled service providers and customers seeking trusted professionals. It offers instant location-based matching and verified profiles.",
    tags: ["React", "TypeScript", "Framer Motion"],
    demoLink: "https://need2fix-v1.vercel.app/",
    category: "Marketplace",
    color: "from-indigo-500 to-purple-500",
    image: "/need2fix-home.png",
    benefits: [
      "Smart GPS-enabled location detection",
      "Verified and background-checked professionals",
      "WhatsApp integration and one-click calling",
      "Mobile-first, fast-loading design",
    ],
    impact: "Transforms the traditional service market by digitizing access to quality providers.",
  },
  {
    id: 9,
    title: "CineLaunch",
    description: "Crowdfunding platform empowering filmmakers worldwide.",
    fullDescription: "CineLaunch is a comprehensive crowdfunding platform designed to empower filmmakers by connecting them with a global community of film enthusiasts and investors. It offers multiple funding pathways.",
    tags: ["React", "TypeScript", "Crowdfunding"],
    demoLink: "https://cine-launch-v1.vercel.app/",
    category: "Crowdfunding",
    color: "from-yellow-500 to-amber-500",
    image: "/cine-launch.png",
    benefits: [
      "Multiple funding options: crowdfunding, investors, grants",
      "High success rates with global community",
      "Step-by-step campaign guidance",
      "Access to investor networks",
    ],
    impact: "Democratizes film production by enabling creators worldwide to finance projects.",
  },
];

const devOpsProjects = [
  {
    title: "AWS CI/CD Pipeline - Blue/Green",
    description: "Designed and automated AWS cloud infrastructure using Terraform with multistage CI/CD pipelines using Jenkins Pipeline-as-Code. Integrated AWS CodeDeploy with Blue/Green deployment for zero-downtime releases.",
    tools: ["Terraform", "Jenkins", "Maven", "CodeDeploy", "EC2", "S3"],
    impact: "2.5× faster deployments, 60% less manual work",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Kubernetes Cluster with Observability",
    description: "Provisioned multi-node Kubernetes cluster on AWS using Kops with custom VPC networking. Set up Prometheus metrics and Grafana dashboards for real-time visualization and alerting.",
    tools: ["Kops", "Docker", "Helm", "Prometheus", "Grafana"],
    impact: "Real-time monitoring & optimized resources",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Infrastructure Automation - Terraform",
    description: "Developed Terraform modules for EC2, VPC, subnets, RDS, IAM roles, S3, and ALB. Implemented remote state management and automated maintenance with Shell scripts and AWS CLI.",
    tools: ["Terraform", "AWS CLI", "Git", "TFLint"],
    impact: "Secure, version-controlled infrastructure",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Containerization & Deployment",
    description: "Containerized microservices with optimized Dockerfiles and multi-stage builds. Automated CI/CD integration with Kubernetes using Jenkins + Helm upgrade pipelines with rolling deployments.",
    tools: ["Docker", "Kubernetes", "Jenkins", "Nexus", "NGINX"],
    impact: "Reduced deployment errors with strict versioning",
    color: "from-orange-500 to-amber-500",
  },
];

const dataAnalyticsProjects = [
  {
    title: "E-Commerce Sales Analysis",
    description: "Analyzed e-commerce dataset to identify top products, regional sales trends, and revenue contributions. Created interactive Tableau/Power BI dashboards for business insights.",
    tools: ["SQL", "Python", "Pandas", "Tableau", "Power BI"],
    impact: "20% of products generate 75% revenue",
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Customer Churn Prediction",
    description: "Built predictive model using logistic regression and decision trees to identify customers likely to churn. Performed feature engineering and model evaluation with accuracy, F1-score, AUC.",
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    impact: "Data-driven retention strategies",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Social Media Sentiment Analysis",
    description: "Analyzed customer feedback from social media to determine positive, negative, or neutral sentiment trends using NLP. Visualized insights with Matplotlib/Seaborn.",
    tools: ["Python", "NLTK", "TextBlob", "Matplotlib", "Seaborn"],
    impact: "Product feedback insights for teams",
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "Financial Fraud Detection",
    description: "Analyzed financial transactions to detect unusual patterns and potential fraud. Built dashboards for risk monitoring and anomaly detection based on transaction patterns.",
    tools: ["SQL", "Python", "Pandas", "NumPy", "Excel", "Tableau"],
    impact: "Risk monitoring & fraud prevention",
    color: "from-red-500 to-orange-500",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      setSelectedProject(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProject = (project: ProjectDetails) => {
    setSelectedProject(project);
    window.history.pushState({ projectId: project.id }, "", `#project-${project.id}`);
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      
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
              <Sparkles className="h-3 w-3" />
              PORTFOLIO
            </motion.span>
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
          </div>

          {/* AI Projects Grid */}
          <div className="mb-12">
            <h3 className="mb-8 text-xl font-semibold text-muted-foreground">
              AI-Powered & Full-Stack Projects
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openProject(project)}
                >
                  {/* Gradient Header */}
                  <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
                  
                  <div className="flex flex-1 flex-col p-5">
                    {/* Category Badge */}
                    <span className="mb-3 inline-block w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                      {project.category}
                    </span>
                    
                    {/* Title */}
                    <h4 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* View Details Button */}
                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium text-primary"
                      whileHover={{ x: 5 }}
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-20 bg-gradient-to-br ${project.color} blur-xl`} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="mt-8 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentPage === i ? "w-6 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* DevOps Projects */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h3 className="mb-8 text-xl font-semibold text-muted-foreground">
              AWS & DevOps Projects
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {devOpsProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${project.color}`} />
                  <h4 className="mb-2 text-base font-bold line-clamp-2 min-h-[3rem]">{project.title}</h4>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3 min-h-[4rem]">
                    {project.description}
                  </p>
                  
                  {/* Tools */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Impact */}
                  <div className="rounded-lg bg-primary/5 p-2.5">
                    <span className="text-xs font-medium text-primary">Impact: </span>
                    <span className="text-xs text-muted-foreground">{project.impact}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Data Analytics Projects */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            <h3 className="mb-8 text-xl font-semibold text-muted-foreground">
              Data Analytics Projects
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {dataAnalyticsProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${project.color}`} />
                  <h4 className="mb-2 text-base font-bold line-clamp-2 min-h-[3rem]">{project.title}</h4>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3 min-h-[4rem]">
                    {project.description}
                  </p>
                  
                  {/* Tools */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Impact */}
                  <div className="rounded-lg bg-primary/5 p-2.5">
                    <span className="text-xs font-medium text-primary">Impact: </span>
                    <span className="text-xs text-muted-foreground">{project.impact}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View All Projects CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="lg" asChild>
                <a href="https://thangella-craftech-solutions.vercel.app/" target="_blank" rel="noopener noreferrer">
                  View All Projects <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
