import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Gamity",
    description:
      "A browser-based game customization platform built with a modular game architecture. Users can play and personalize multiple games through configurable themes, presets, custom skins, audio packs, and shareable game configurations. Designed with extensibility in mind, allowing new games to be integrated through a plugin-like module system.",
    technologies: ["React", "TypeScript", "Phaser.js", "Zustand"],
    keyFeatures: [
      "Modular game runtime architecture",
      "Multi-game platform (Dino Runner, Flappy Bird)",
      "Config-driven customization system",
      "Theme and preset management",
      "Shareable game configurations via URLs",
      "Custom skin and audio uploads",
      "Plugin-style game registry",
      "Reusable asset upload pipeline",
      "Phaser.js powered game engine integration",
    ],
    roadmap: [
      "Real-time multiplayer race game using Socket.IO",
      "User authentication and cloud-synced presets",
      "Creator profiles and public game presets",
      "Asset marketplace for themes and sound packs",
      "Game SDK for third-party developers",
      "AI-generated skins, sounds, and themes",
      "Preset sharing and remixing ecosystem",
      "Cloud storage integration with S3/R2",
    ],
    githubUrl: "PRIVATE",
    liveUrl: "https://gamity.vercel.app/",
    featured: true,
    images: [
      "/project-1/img-1.png",
      "/project-1/img-2.png",
      "/project-1/img-3.png",
    ],
  },
];
