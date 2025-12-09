import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
}

const colors = [
  "hsl(var(--primary))",
  "hsl(199, 89%, 60%)",
  "hsl(217, 91%, 60%)",
  "hsl(38, 92%, 50%)",
  "hsl(270, 80%, 60%)",
];

const MouseParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const createParticle = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      },
    };
  }, []);

  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;
    let lastTime = Date.now();
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle particle creation
      if (now - lastTime > 30) {
        setMousePos({ x: e.clientX, y: e.clientY });
        setIsMoving(true);
        
        // Create 2-3 particles per movement
        const newParticles = Array.from({ length: Math.floor(Math.random() * 2) + 2 }, () =>
          createParticle(e.clientX, e.clientY)
        );
        
        setParticles((prev) => [...prev.slice(-30), ...newParticles]);
        lastTime = now;
      }
      
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(moveTimeout);
    };
  }, [createParticle]);

  // Cleanup old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((_, i) => i > prev.length - 25));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Main cursor glow */}
      <motion.div
        className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.6), transparent 70%)",
          boxShadow: isMoving ? "0 0 30px 10px hsl(var(--primary) / 0.3)" : "0 0 15px 5px hsl(var(--primary) / 0.2)",
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isMoving ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Trail particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${particle.color}, transparent 70%)`,
              width: particle.size,
              height: particle.size,
            }}
            initial={{
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              x: particle.x + particle.velocity.x * 30 - particle.size / 2,
              y: particle.y + particle.velocity.y * 30 - particle.size / 2,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Magnetic ring around cursor */}
      <motion.div
        className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isMoving ? 1.3 : 1,
          opacity: isMoving ? 0.5 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
      />
      
      {/* Large ambient glow */}
      <motion.div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      />
    </div>
  );
};

export default MouseParticles;
