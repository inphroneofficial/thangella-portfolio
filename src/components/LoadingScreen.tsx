import { motion } from "framer-motion";
import { Cloud, Database, Bot, BarChart3, Server, Code2 } from "lucide-react";

const LoadingScreen = () => {
  const techIcons = [
    { Icon: Cloud, label: "AWS", color: "hsl(33 100% 50%)" },
    { Icon: Server, label: "DevOps", color: "hsl(199 89% 48%)" },
    { Icon: Bot, label: "AI", color: "hsl(280 70% 60%)" },
    { Icon: BarChart3, label: "Analytics", color: "hsl(142 71% 45%)" },
    { Icon: Database, label: "Data", color: "hsl(339 90% 51%)" },
    { Icon: Code2, label: "Code", color: "hsl(45 93% 47%)" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-background">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative flex flex-col items-center gap-6 px-4">
        {/* Main GT Logo - Clean fade in */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main container */}
          <motion.div
            className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 30px hsl(var(--primary) / 0.3)",
                "0 0 50px hsl(var(--primary) / 0.5)",
                "0 0 30px hsl(var(--primary) / 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
            </motion.div>
            
            <span className="font-mono text-4xl sm:text-5xl font-bold text-primary-foreground drop-shadow-lg">
              GT
            </span>
          </motion.div>
        </motion.div>

        {/* Tech icons row */}
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {techIcons.map((tech, i) => (
            <motion.div
              key={tech.label}
              className="flex items-center justify-center rounded-lg bg-card/60 backdrop-blur-sm p-2 border border-border/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -4, 0],
              }}
              transition={{
                opacity: { delay: 0.4 + i * 0.08 },
                scale: { delay: 0.4 + i * 0.08 },
                y: { delay: 0.6 + i * 0.15, duration: 2.5, repeat: Infinity },
              }}
              style={{ boxShadow: `0 0 12px ${tech.color}25` }}
            >
              <tech.Icon className="h-4 w-4" style={{ color: tech.color }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
            <span className="text-muted-foreground">loading</span>
            <span className="text-foreground font-semibold">portfolio</span>
            <motion.span
              className="inline-block w-2 h-4 bg-primary rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          {/* Progress bar */}
          <div className="relative w-40 sm:w-48">
            <div className="h-1 overflow-hidden rounded-full bg-secondary/40">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: "0%" }}
                animate={{ 
                  width: "100%",
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{ 
                  width: { duration: 2.2, ease: "easeInOut" },
                  backgroundPosition: { duration: 1, repeat: Infinity, ease: "linear" },
                }}
              />
            </div>
            
            {/* Stage labels */}
            <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] text-muted-foreground/60 font-mono">
              {["AWS", "DevOps", "AI", "Ready"].map((stage, i) => (
                <motion.span
                  key={stage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.3 }}
                >
                  {stage}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;