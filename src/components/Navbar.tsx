import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Terminal, Home, User, Code, Briefcase, FolderOpen, Mail } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-card py-3 shadow-lg shadow-background/10"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <nav className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Terminal className="h-5 w-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="font-mono text-lg sm:text-xl font-bold">
              <span className="text-primary"></span>
              <span className="text-foreground">Thangella</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 font-medium transition-all rounded-lg ${
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <>
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary/50"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                      layoutId="activeNavBg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </>
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Premium Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative h-10 w-10 rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isDark 
                    ? "linear-gradient(135deg, hsl(222 47% 20%), hsl(217 33% 17%))" 
                    : "linear-gradient(135deg, hsl(38 92% 50%), hsl(45 93% 47%))",
                }}
              />
              
              <AnimatePresence>
                {isDark && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`star-${i}`}
                        className="absolute h-1 w-1 rounded-full bg-white"
                        style={{
                          top: `${20 + i * 20}%`,
                          left: `${15 + i * 25}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0.5, 1, 0.5], 
                          scale: [0.8, 1, 0.8],
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <Moon className="h-5 w-5 text-blue-100" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className="relative"
                    >
                      <Sun className="h-5 w-5 text-yellow-900" />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute h-0.5 w-1 bg-yellow-600/50 rounded-full"
                            style={{
                              transform: `rotate(${i * 45}deg) translateX(12px)`,
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, hsl(199 89% 48% / 0.3), transparent 70%)"
                    : "radial-gradient(circle, hsl(38 92% 50% / 0.5), transparent 70%)",
                }}
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="relative h-10 w-10 rounded-xl border border-border bg-card/50 backdrop-blur-sm md:hidden flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Compact Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              className="relative flex h-full flex-col items-center justify-center px-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.1 }}
            >
              {/* Nav Items - Compact grid */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-[280px]">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.slice(1);
                  
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`group relative flex items-center gap-2 rounded-lg p-2.5 transition-all ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-card/60"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium">{item.name}</span>
                      
                      {isActive && (
                        <motion.div
                          className="absolute right-2 h-1.5 w-1.5 rounded-full bg-primary"
                          layoutId="mobileActiveIndicator"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Theme toggle */}
              <motion.div
                className="mt-4 flex items-center gap-2 rounded-lg bg-card/40 px-3 py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-xs text-muted-foreground">Theme</span>
                <motion.button
                  onClick={toggleTheme}
                  className={`relative h-6 w-12 rounded-full p-0.5 transition-colors ${
                    isDark ? "bg-slate-700" : "bg-amber-200"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`flex h-5 w-5 items-center justify-center rounded-full shadow ${
                      isDark ? "bg-slate-900" : "bg-white"
                    }`}
                    animate={{ x: isDark ? 0 : 24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {isDark ? (
                      <Moon className="h-2.5 w-2.5 text-blue-300" />
                    ) : (
                      <Sun className="h-2.5 w-2.5 text-amber-500" />
                    )}
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;