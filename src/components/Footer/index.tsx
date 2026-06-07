"use client";

import SocialLinks from "../SocialLinks";
import { personalInfo } from "@/constants/personal";
import { ArrowUpIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-bg-primary border-t border-border-color py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand / Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <span className="text-base font-bold text-text-primary">
            {personalInfo.name}
            <span className="text-accent">.</span>
          </span>
          <p className="text-sm text-text-secondary">
            &copy; {currentYear} All rights reserved. Built with 🤲 by{" "}
            <span className="text-accent">{personalInfo.name}</span>.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <SocialLinks iconClassName="w-5 h-5" />
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={handleBackToTop}
          className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1 px-2 border border-border-color/60 hover:bg-bg-secondary"
          aria-label="Scroll back to top of the page"
        >
          Back to Top
          <ArrowUpIcon className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
