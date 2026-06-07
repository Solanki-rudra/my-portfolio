export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  keyFeatures?: string[];
  roadmap?: string[];
  images?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
