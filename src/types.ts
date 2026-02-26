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
}