"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle";
import { personalInfo } from "@/constants/personal";
import { MenuIcon, CloseIcon } from "@/components/Icons";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs to lock scroll updates during manual clicks
  const isManualScrollRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for shadow/border on navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Intersection Observer to highlight active navigation link
  useEffect(() => {
    const observers = navItems.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isManualScrollRef.current) {
            setActiveSection(item.id);
          }
        },
        {
          rootMargin: "-30% 0px -50% 0px", // Trigger when section is in the center-top of viewport
          threshold: 0.1,
        },
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  // Handle click scroll
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const target = document.getElementById(id);
    if (target) {
      isManualScrollRef.current = true;
      setActiveSection(id);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      timeoutRef.current = setTimeout(() => {
        isManualScrollRef.current = false;
      }, 800);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full ${
        isScrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-accent"
          : "bg-bg-primary"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="text-lg font-bold tracking-tight text-text-primary hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          {personalInfo.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Desktop navigation"
        >
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm font-medium transition-colors duration-200 py-2 relative focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-border-color mx-2" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation controls */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-md border border-border-color hover:bg-bg-secondary text-text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
          >
            {isMobileMenuOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-b border-border-color bg-bg-primary w-full shadow-lg"
        >
          <nav
            className="max-w-7xl mx-auto px-6 py-4"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block py-2 text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-accent pl-2 border-l-2 border-accent"
                        : "text-text-secondary hover:text-text-primary pl-0"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
