import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Only show when user reaches near bottom (85%+ scrolled)
      setShowScrollTop(v > 0.85);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left"
        style={{
          scaleX,
          opacity,
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--chart-2)), hsl(var(--chart-3)))",
          boxShadow: "0 0 10px hsl(var(--primary) / 0.5)",
        }}
      />

      {/* Scroll to top button - smaller size */}
      <motion.button
        className="fixed bottom-5 left-5 z-40 group"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Button */}
        <div className="relative h-8 w-8 rounded-full p-[1.5px] bg-gradient-to-br from-primary to-primary/40">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background/90 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, -1.5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <ArrowUp className="h-3.5 w-3.5 text-primary" />
            </motion.div>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export default ScrollProgress;