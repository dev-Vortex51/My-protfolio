export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image: string;
  featured: boolean;
  version?: string;
  status: "production" | "beta" | "archived";
  metrics?: { stars: number; forks: number; coverage: string };
  likes: number;
  comments: Comment[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "other";
  pid: string; // Process ID simulation
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  verified: boolean;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Conversational" | "Limited";
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Message {
  id: string;
  sender: string;
  email: string;
  subject: string;
  body: string;
  priority: "Low" | "Normal" | "Urgent";
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  headline?: string;
  tagline?: string;
  location: string;
  email: string;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  languages: Language[];
  socialLinks: SocialLinks;
  messages: Message[];
  stats: {
    uptime: string;
    commits: number;
    visitors: number;
    lighthouse: number;
  };
  testimonials: Testimonial[];
}
