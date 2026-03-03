// src/types.ts
export interface Job {
  id: number;
  title: string;
  company: string;
  desc: string;
  class: string;
  thumbnail: string
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  mockup: boolean;
  tech: string[];
}
export interface Tech {
  name: string;
  img: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  experience: string;
  techStack: Tech[];
  jobs: Job[];
  education: Education[];
  projects: Project[];
  whatsApp: string;
}

// --- Basic Building Blocks ---

export interface Tech {
  name: string;
  img: string;
}


export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[]; // SVGs for the project tech stack
  link: string;
  mockup: boolean;
}

// --- The Content Wrapper ---

export interface IPortfolioContent {
  name: string;
  role: string;
  experience: string;
  techStack: Tech[];
  jobs: Job[];
  education: Education[];
  projects: Project[];
}

// --- The Root User Object (Matches MongoDB) ---

export interface IUser {
  _id?: string; // MongoDB auto-generated ID
  username: string;
  passwordHash: string;
  email: string;
  config: {
    theme: string;
    isDark: boolean;
  };
  content?: IPortfolioContent;
  createdAt?: string;
  updatedAt?: string;
}


