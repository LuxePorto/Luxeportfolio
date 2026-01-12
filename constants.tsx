
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
    title: "Cloudrestorestaurant",
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
  },
   {
    id: 8,
    title: "Lumina Festival",
    description: "Lumina isn't just a festival; it's a sensory expedition. We fuse cutting-edge audio technology with generative art to create a living, breathing ecosystem of sound.",
    tags: ["React", "Monaco", "WebContainers"],
    image: "luminafestival.PNG",
    github: "#",
    live: "https://luminafestival.netlify.app"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React / Next.js", icon: <Layout className="w-5 h-5" /> },
      { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
      { name: "Tailwind CSS", icon: <Layout className="w-5 h-5" /> },
      { name: "Three.js", icon: <Cpu className="w-5 h-5" /> },
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js / Express", icon: <Server className="w-5 h-5" /> },
      { name: "Python / Django", icon: <Terminal className="w-5 h-5" /> },
      { name: "Go Lang", icon: <Code2 className="w-5 h-5" /> },
      { name: "PostgreSQL", icon: <Server className="w-5 h-5" /> },
    ]
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker / K8s", icon: <Cloud className="w-5 h-5" /> },
      { name: "AWS / Vercel", icon: <Cloud className="w-5 h-5" /> },
      { name: "CI/CD Pipelines", icon: <Terminal className="w-5 h-5" /> },
      { name: "Terraform", icon: <Cloud className="w-5 h-5" /> },
    ]
  },
  {
    title: "Design & Tools",
    skills: [
      { name: "Figma", icon: <Figma className="w-5 h-5" /> },
      { name: "Git", icon: <Code2 className="w-5 h-5" /> },
      { name: "Jira / Linear", icon: <Layout className="w-5 h-5" /> },
      { name: "Mobile First", icon: <Smartphone className="w-5 h-5" /> },
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Apple Inc.",
    role: "Senior Software Engineer",
    period: "2021 — Present",
    description: "Leading the development of consumer-facing dashboard interfaces and ensuring high-performance standards across global user bases."
  },
  {
    company: "Stripe",
    role: "Frontend Architect",
    period: "2018 — 2021",
    description: "Architected internal UI libraries and optimized payment integration flows for millions of merchants worldwide."
  },
  {
    company: "Design Studio X",
    role: "Full Stack Developer",
    period: "2016 — 2018",
    description: "Delivered premium digital experiences for Fortune 500 clients, focusing on pixel-perfect motion and interactivity."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Rivera",
    role: "CTO",
    company: "TechNova",
    content: "One of the most talented engineers I've worked with. The attention to detail in the UI and the performance of the final product is unmatched.",
    avatar: "https://picsum.photos/seed/person1/100/100"
  },
  {
    name: "Sarah Chen",
    role: "Product Lead",
    company: "FlowState",
    content: "Transformed our vision into a stunning reality. A true master of both engineering and design aesthetics.",
    avatar: "https://picsum.photos/seed/person2/100/100"
  },
  {
    name: "Marcus Thorne",
    role: "Senior Designer",
    company: "Studio 12",
    content: "It's rare to find a developer who deeply understands design principles. A collaborative powerhouse.",
    avatar: "https://picsum.photos/seed/person3/100/100"
  }
];

export const BLOG_POSTS: BlogPostExtended[] = [
  {
    id: 1,
    title: "The Future of Web Interactivity",
    date: "Oct 12, 2024",
    readTime: "5 min read",
    excerpt: "Exploring how WebGL and Three.js are changing the way we perceive digital boundaries.",
    category: "Design",
    content: "In the rapidly evolving landscape of web development, interactivity has moved beyond simple hover states and transitions. We are entering an era where the browser is a canvas for immersive, high-fidelity experiences. By leveraging WebGL and frameworks like Three.js, developers can create spatial interfaces that feel more akin to premium native applications or video games.\n\nThis shift isn't just about 'eye candy'. It's about data density and spatial memory. When users can navigate information in 3D, they often find connections that 2D charts simply cannot reveal. As we look toward the future, the integration of generative AI with these visual technologies will allow for real-time, personalized interface generation that adapts to the user's specific cognitive load and goals.",
    author: {
      name: "Marcus Thorne",
      role: "Principal Designer",
      avatar: "https://picsum.photos/seed/author1/100/100"
    }
  },
  {
    id: 2,
    title: "Optimizing Core Web Vitals for scale",
    date: "Sep 28, 2024",
    readTime: "8 min read",
    excerpt: "A deep dive into performance patterns used at big tech companies to maintain speed.",
    category: "Engineering",
    content: "Maintaining a 99th percentile LCP (Largest Contentful Paint) across a global user base is no small feat. At companies like Apple and Stripe, performance isn't just a metric; it's a core feature. The strategy often involves a multi-layered approach: aggressive asset orchestration, edge-side rendering for critical data, and a relentless focus on minimizing the 'Long Tasks' on the main thread.\n\nOne often overlooked aspect is font loading strategies. By utilizing variable fonts and clever pre-loading, we can reduce layout shifts significantly. Additionally, the move toward fine-grained reactivity in modern frameworks allows us to update only what's necessary, keeping the UI snappy even on lower-end devices. Performance is a marathon, not a sprint, requiring constant monitoring and a culture that prioritizes the user's time above all else.",
    author: {
      name: "Alex Rivera",
      role: "CTO @ TechNova",
      avatar: "https://picsum.photos/seed/author2/100/100"
    }
  },
  {
    id: 3,
    title: "Crafting a Design System from Scratch",
    date: "Aug 15, 2024",
    readTime: "12 min read",
    excerpt: "Step-by-step guide to building scalable, consistent UI components with Tailwind and React.",
    category: "Development",
    content: "A design system is more than a set of UI components; it's a language shared between designers and developers. When starting from scratch, the first step is defining the 'Design Tokens'—the fundamental building blocks like color scales, typography ramps, and spacing units. Using Tailwind's theme configuration is a powerful way to codify these tokens.\n\nOnce the foundations are set, building atomic components (buttons, inputs, labels) with accessibility in mind is paramount. Every component should have clear focus states, ARIA support, and responsive variants. This architectural approach pays dividends as the project grows, enabling rapid feature development without sacrificing visual consistency. Remember: the best design systems are the ones that actually get used, so documentation and 'developer experience' are just as important as the pixels themselves.",
    author: {
      name: "Sarah Chen",
      role: "Product Lead @ FlowState",
      avatar: "https://picsum.photos/seed/author3/100/100"
    }
  }
];
