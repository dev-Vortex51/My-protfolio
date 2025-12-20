
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
  status: 'production' | 'beta' | 'archived';
  metrics?: { stars: number; forks: number; coverage: string };
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
  category: 'frontend' | 'backend' | 'devops' | 'other';
  pid: string; // Process ID simulation
}

export interface Message {
  id: string;
  sender: string;
  email: string;
  subject: string;
  body: string;
  priority: 'Low' | 'Normal' | 'Urgent';
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  messages: Message[];
  stats: {
    uptime: string;
    commits: number;
    visitors: number;
    lighthouse: number;
  };
}
