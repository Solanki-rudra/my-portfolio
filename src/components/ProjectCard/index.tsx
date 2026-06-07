"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { GithubIcon, ExternalLinkIcon, CloseIcon } from "@/components/Icons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    description,
    technologies,
    githubUrl,
    liveUrl,
    image,
    featured,
    keyFeatures,
    roadmap,
    images,
  } = project;

  // Set the default cover image
  const defaultImage = "/default-project-img.avif";
  const coverImage =
    image || (images && images.length > 0 ? images[0] : defaultImage);

  const [activeImage, setActiveImage] = useState(coverImage);
  const [isExpanded, setIsExpanded] = useState(false);

  // Block body scroll when details modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  return (
    <div
      className={`group flex flex-col h-full bg-bg-primary border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 ${
        featured
          ? "border-accent/40 ring-1 ring-accent/10"
          : "border-border-color"
      }`}
    >
      {/* Project Image Gallery or Default Cover */}
      <div className="relative aspect-video w-full bg-bg-secondary overflow-hidden border-b border-border-color">
        {images && images.length > 0 ? (
          images.map((img) => (
            <Image
              key={`card-img-${img}`}
              src={img}
              alt={`${title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover group-hover:scale-102 transition-opacity duration-300 ${
                activeImage === img
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              loading="lazy"
            />
          ))
        ) : (
          <Image
            src={coverImage}
            alt={`${title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* Thumbnail Selector Overlay */}
        {images && images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1.5 z-20 bg-black/60 backdrop-blur-xs p-1 rounded-md border border-white/10">
            {images.map((img, index) => (
              <button
                key={img}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImage(img);
                }}
                className={`relative w-8 h-5 rounded overflow-hidden border transition-all ${
                  activeImage === img
                    ? "border-accent scale-105"
                    : "border-white/30 hover:border-white/70"
                } cursor-pointer`}
                aria-label={`View screenshot ${index + 1}`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Featured Tag */}
        {featured && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent text-black text-xs font-bold rounded shadow-sm z-10">
            Featured
          </div>
        )}
      </div>

      {/* Project Metadata */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-1 mb-2">
          {title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono font-medium rounded bg-bg-secondary text-text-primary border border-border-color/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Navigation / Action Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-border-color/60 mt-auto">
          {githubUrl && githubUrl !== "PRIVATE" ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label={`View GitHub repository for ${title}`}
            >
              <GithubIcon className="w-4 h-4" />
              Code
            </a>
          ) : githubUrl === "PRIVATE" ? (
            <span
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary/50 cursor-not-allowed select-none"
              title="Private Repository"
            >
              <GithubIcon className="w-4 h-4 text-text-secondary/40" />
              Private Repo
            </span>
          ) : null}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label={`Visit live deployment for ${title}`}
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}

          {/* Toggle details section */}
          {(keyFeatures || roadmap) && (
            <button
              onClick={() => setIsExpanded(true)}
              className="ml-auto text-xs font-bold uppercase tracking-wider text-accent border border-accent/40 rounded px-2.5 py-1.5 hover:bg-accent hover:text-black transition-colors duration-200 cursor-pointer"
            >
              More Details
            </button>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none"
          onClick={() => setIsExpanded(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-primary border border-border-color rounded-2xl shadow-2xl flex flex-col md:flex-row select-text animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Large image display */}
            <div className="md:w-1/2 p-6 bg-bg-secondary/20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-color/60">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border-color bg-bg-secondary">
                {images && images.length > 0 ? (
                  images.map((img) => (
                    <Image
                      key={`modal-img-${img}`}
                      src={img}
                      alt={`${title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-opacity duration-300 ${
                        activeImage === img
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                    />
                  ))
                ) : (
                  <Image
                    src={coverImage}
                    alt={`${title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>

              {/* Thumbnail Selector inside modal */}
              {images && images.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {images.map((img, index) => (
                    <button
                      key={`modal-thumb-${img}`}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-14 h-9 rounded overflow-hidden border transition-all ${
                        activeImage === img
                          ? "border-accent scale-105"
                          : "border-border-color hover:border-accent/50"
                      } cursor-pointer`}
                      aria-label={`View screenshot ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Information panels */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between relative">
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close details modal"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <span className="text-xs font-mono font-bold tracking-wider text-accent uppercase block mb-1">
                  {featured ? "Featured Project" : "Project"}
                </span>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {description}
                </p>

                {/* Tech Badges */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-text-primary mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <span
                        key={`modal-tech-${tech}`}
                        className="px-2 py-0.5 text-xs font-mono font-medium rounded bg-bg-secondary text-text-primary border border-border-color/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                {keyFeatures && keyFeatures.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-text-primary mb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-1.5 text-xs text-text-secondary">
                      {keyFeatures.map((feature) => (
                        <li
                          key={`modal-feat-${feature}`}
                          className="flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Roadmap */}
                {roadmap && roadmap.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-text-primary mb-2">
                      Roadmap
                    </h4>
                    <ul className="space-y-1.5 text-xs text-text-secondary">
                      {roadmap.map((item, index) => (
                        <li
                          key={`modal-road-${item}`}
                          className="flex items-start gap-2"
                        >
                          <span className="text-accent/60 font-mono font-bold">
                            {index + 1}.
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-border-color/60 mt-6">
                {githubUrl && githubUrl !== "PRIVATE" ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200"
                    aria-label={`View GitHub repository for ${title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                    Code
                  </a>
                ) : githubUrl === "PRIVATE" ? (
                  <span
                    className="flex items-center gap-1.5 text-sm font-medium text-text-secondary/50 cursor-not-allowed select-none"
                    title="Private Repository | Contact me for more information"
                  >
                    <GithubIcon className="w-4 h-4 text-text-secondary/40" />
                    Private Repo
                  </span>
                ) : null}

                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200"
                    aria-label={`Visit live deployment for ${title}`}
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
