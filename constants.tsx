
import React from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Cpu, 
  Smartphone, 
  Figma, 
  Terminal, 
  Cloud 
} from 'lucide-react';
import { Project, Experience, Testimonial, BlogPost, SkillCategory } from './types';

// Extended BlogPost type for detail view
export interface BlogPostExtended extends BlogPost {
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
 {
    id: 1,
    title: "Inkwell Bloging site",
    description: "Next-gen visualization platform for complex multi-dimensional datasets with real-time analytics.",
    tags: ["React", "Three.js", "D3.js", "WebGL"],
    image: "./inkwell.PNG",
    github: "#",
    live: "https://inkwell-modern-blogging-platform.netlify.app"
  },
  {
    id: 2,
    title: "aurum-ember",
    description: "A sanctuary of culinary artistry where tradition meets modern innovation. Experience the alchemy of flavor.",
    tags: ["TypeScript", "NestJS", "PostgreSQL", "Tailwind"],
    image: "arum & aumber.PNG",
    github: "#",
    live: "https://aurum-ember.netlify.app"
  },
  {
    id: 3,
    title: "PIXELNOVA",
    description: "Forging immersive digital experiences at the intersection of aesthetic precision and engineering performance.",
    tags: ["Go", "Kubernetes", "Redis", "gRPC"],
    image: "pixel nova.PNG",
    github: "#",
    live: "https://pixelnova-digital.netlify.app"
  },
  { 
    id: 4,
    title: " Novaa-studio",
    description: "We craft data-driven social media strategies that build communities, drive engagement, and deliver measurable results for your brand.",
    tags: ["React", "Gemini API", "Edge Functions"],
    image: "nova studio.PNG",
    github: "#",
    live: "https://novaa-studio.netlify.app"
  },
  {
    id: 5,
    title: "Cloud restorestaurant ",
    description: "Get AI-driven analysis on your restaurant's performance to identify trends, popular items, and opportunities for growth.",
    tags: ["React Native", "MQTT", "AWS", "Charts.js"],
    image: "cloud resto.PNG",
    github: "#",
    live: "https://cloudrestorestaurant.netlify.app"
  },
  {
    id: 6,
    title: "Aether-digital",
    description: "Aether is an ultra-premium digital agency crafting award-winning websites, apps, and brand identities for the world's most ambitious companies.",
    tags: ["React", "Monaco", "WebContainers"],
    image: "Aether.PNG",
    github: "#",
    live: "https://aether-digital.netlify.app"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React / Next.js", icon: <Layout className="w-5 h-5" /> },
      { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
      { name: "Tailwind CSS", icon: <Layout className="w-5 h-5" /> },
      { name: "Three.js / WebGL", icon: <Cpu className="w-5 h-5" /> },
      { name: "Framer Motion", icon: <Layout className="w-5 h-5" /> },
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js / Express", icon: <Server className="w-5 h-5" /> },
      { name: "Python / Django", icon: <Terminal className="w-5 h-5" /> },
      { name: "Go Lang", icon: <Code2 className="w-5 h-5" /> },
      { name: "PostgreSQL", icon: <Server className="w-5 h-5" /> },
      { name: "REST / GraphQL APIs", icon: <Server className="w-5 h-5" /> },
    ]
  },
  {
    title: "Design & Product",
    skills: [
      { name: "Figma", icon: <Figma className="w-5 h-5" /> },
      { name: "Design Systems", icon: <Layout className="w-5 h-5" /> },
      { name: "Accessibility (WCAG)", icon: <Layout className="w-5 h-5" /> },
      { name: "Mobile-First Design", icon: <Smartphone className="w-5 h-5" /> },
    ]
  },
  {
    title: "Workflow & Collaboration",
    skills: [
      { name: "Git / GitHub", icon: <Code2 className="w-5 h-5" /> },
      { name: "Jira / Linear", icon: <Layout className="w-5 h-5" /> },
      { name: "Agile / Scrum", icon: <Layout className="w-5 h-5" /> },
      { name: "Code Reviews", icon: <Code2 className="w-5 h-5" /> },
    ]
  }
];


export const EXPERIENCES: Experience[] = [
  {
    company: "POST-X",
    role: "Senior Software Engineer",
    period: "2026 — Present",
    description: "Leading the development of consumer-facing dashboard interfaces and ensuring high-performance standards across global user bases."
  },
  {
    company: "Design Studio X",
    role: "Full Stack Developer",
    period: "2022 — 2025",
    description: "Delivered premium digital experiences for Fortune 500 clients, focusing on pixel-perfect motion and interactivity."
  },
  {
    company: "CloudNova",
    role: "Frontend Engineer",
    period: "2020 — 2022",
    description: "Built scalable frontend architectures using React and TypeScript, collaborating closely with design teams to implement accessible UI systems."
  }
];


export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Elena Park",
    role: "Head of UX",
    company: "PixelCraft",
    content: "A rare blend of strategic thinking and hands-on execution. Every detail felt intentional, and the final experience exceeded expectations.",
    avatar: "https://picsum.photos/seed/person4/100/100"
  },
  {
    name: "Daniel Brooks",
    role: "Engineering Manager",
    company: "CloudAxis",
    content: "Consistently delivers clean, scalable solutions under real-world constraints. A strong technical lead you can rely on.",
    avatar: "https://picsum.photos/seed/person5/100/100"
  },
  {
    name: "Priya Nandakumar",
    role: "Accessibility Consultant",
    company: "Inclusive Web Co.",
    content: "Accessibility was built in from day one, not patched later. Thoughtful, inclusive work that sets a high standard.",
    avatar: "https://picsum.photos/seed/person6/100/100"
  }
];



export const BLOG_POSTS: BlogPostExtended[] = [
  {
    id: 1,
    title: "Why Motion Design Matters in Modern UX",
    date: "Nov 05, 2024",
    readTime: "6 min read",
    excerpt: "Understanding how motion guides users, reduces friction, and improves product clarity.",
    category: "Design",
    content: "Motion design is no longer a decorative layer added at the end of a project. When used intentionally, motion becomes a powerful communication tool that guides users through an interface. Subtle animations can explain cause and effect, confirm actions, and reduce the cognitive load required to understand complex flows.\n\nWell-designed motion helps establish hierarchy and rhythm. For example, staggered list animations signal order, while easing functions can communicate speed and importance. As tools like Framer Motion and CSS View Transitions mature, teams can implement expressive motion without sacrificing performance. The key is restraint: motion should always serve clarity, never distract from it.",
    author: {
      name: "Elena Park",
      role: "Senior UX Designer",
      avatar: "./01.jpg"
    }
  },
  {
    id: 2,
    title: "Scaling Frontend Architecture with Micro-Frontends",
    date: "Oct 22, 2024",
    readTime: "9 min read",
    excerpt: "How large teams ship faster by breaking monoliths into independent UI systems.",
    category: "Engineering",
    content: "As frontend applications grow, so do their teams—and coordination overhead can quickly become a bottleneck. Micro-frontends offer a way to decompose large applications into smaller, independently deployable units owned by autonomous teams. Each slice can evolve at its own pace without blocking the rest of the system.\n\nHowever, this approach comes with trade-offs. Shared design systems, consistent routing, and performance budgets become critical to avoid fragmentation. Techniques like module federation and edge composition help mitigate these challenges. When implemented thoughtfully, micro-frontends enable scalability not just in code, but in organizational structure as well.",
    author: {
      name: "Daniel Brooks",
      role: "Lead Frontend Engineer",
      avatar: "./02.jpg"
    }
  },
  {
    id: 3,
    title: "Building Accessible Interfaces That Scale",
    date: "Sep 10, 2024",
    readTime: "7 min read",
    excerpt: "Accessibility best practices that fit naturally into modern development workflows.",
    category: "Development",
    content: "Accessibility is often treated as a checklist item, but the most successful teams bake it directly into their component architecture. Starting with semantic HTML and progressive enhancement ensures a strong baseline before any JavaScript is added. From there, keyboard navigation and screen reader support should be considered first-class features.\n\nDesign systems play a crucial role in scaling accessibility. When components are accessible by default, every product built on top of them inherits those benefits. Automated testing tools can catch common issues, but manual audits and real user feedback remain essential. Accessibility isn't about perfection—it's about continuous improvement and inclusive intent.",
    author: {
      name: "Priya Nandakumar",
      role: "Accessibility Advocate",
      avatar: "./03.jpg"
    }
  }
];

