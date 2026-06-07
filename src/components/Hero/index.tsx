"use client";

import { personalInfo } from "@/constants/personal";
import SocialLinks from "../SocialLinks";

export default function Hero() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center min-h-[calc(100vh-4rem)] py-20 bg-bg-primary"
      aria-label="Hero Section"
    >
      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col justify-center">
        {/* Short intro line */}
        <span className="text-sm md:text-base font-mono font-semibold tracking-wider text-accent uppercase mb-4">
          Hi, my name is
        </span>

        {/* Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-text-primary tracking-tight mb-2 leading-none">
          {personalInfo.name}
        </h1>

        {/* Role */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-text-secondary tracking-tight mb-6">
          {personalInfo.role}
        </h2>

        {/* Tagline / Intro description */}
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed mb-8">
          {personalInfo.tagline}
        </p>

        {/* Tech Stack Summary */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10 text-sm font-mono text-text-secondary border-l-2 border-accent/60 pl-4">
          <span className="font-semibold text-text-primary uppercase tracking-wide text-xs">
            Tech Stack:
          </span>
          {personalInfo.techStackSummary.map((tech, idx) => (
            <span key={tech} className="flex items-center">
              {tech}
              {idx < personalInfo.techStackSummary.length - 1 && (
                <span className="text-accent/60 mx-2" aria-hidden="true">
                  •
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center mb-12">
          <a
            href="#projects"
            onClick={(e) => handleScrollToSection(e, "projects")}
            className="px-6 py-3 bg-accent text-black font-semibold rounded-md border border-accent hover:bg-transparent hover:text-accent hover:border-accent transition-all duration-200 text-center text-sm md:text-base focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollToSection(e, "contact")}
            className="px-6 py-3 bg-transparent text-text-primary font-semibold rounded-md border border-border-color hover:border-accent hover:text-accent transition-all duration-200 text-center text-sm md:text-base focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="pt-6 border-t border-border-color/60 max-w-xs">
          <span className="block text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">
            Connect with me
          </span>
          <SocialLinks iconClassName="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
