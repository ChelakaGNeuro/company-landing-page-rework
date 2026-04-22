"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#our-work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-4 py-3 rounded-full bg-background/70 backdrop-blur-md border border-border"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">G</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">
            GNeuro Engineering
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-muted rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Sun size={18} className="hidden dark:block" />
            <Moon size={18} className="block dark:hidden" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-background/95 backdrop-blur-md border border-border"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-border my-2" />
            <Button
              variant="ghost"
              className="justify-start text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full">
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
