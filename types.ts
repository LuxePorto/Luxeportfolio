
// Fix: Added React import to provide access to the React namespace for types
import React from 'react';

export enum ThemeVariation {
  DARK_NEON = 'dark',
  LIGHT_MINIMAL = 'light'
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
}

export interface Skill {
  name: string;
  // Fix: React.ReactNode requires the React namespace to be imported
  icon: React.ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
}