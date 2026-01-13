import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUpRight, 
  Moon, 
  Sun,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Send,
  Zap,
  Layers, 
  Globe, 
  Monitor, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  CheckCircle2, 
  PlayCircle, 
  Code2, 
  Trophy, 
  Users, 
  Briefcase, 
  Cpu, 
  MousePointer2, 
  Sparkles, 
  Link as LinkIcon,
  Plus,
  Star,
  GitFork,
  Hash
} from 'lucide-react';
import { ThemeVariation, Project, SkillCategory } from './types';
import { 
  NAV_LINKS, 
  PROJECTS, 
  SKILL_CATEGORIES, 
  EXPERIENCES, 
  TESTIMONIALS, 
  BLOG_POSTS,
  BlogPostExtended
} from './constants';

/**
 * Hook: Magnetic Effect
 */
const useMagnetic = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

/**
 * Hook: Reveal Observer
 */
const useReveal = (trigger: any) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    setObserver(obs);
    return () => obs.disconnect();
  }, [trigger]);

  const setRef = useCallback((el: HTMLElement | null) => {
    if (el && observer) observer.observe(el);
  }, [observer]);

  return setRef;
};

/**
 * Component: Custom Cursor
 */
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('button, a, [role="button"]');
      if (isHoverable) {
        cursor.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};

/**
 * Component: Navbar
 */
const Navbar: React.FC<{ theme: ThemeVariation; toggleTheme: () => void; onNavigate: (id: string) => void; isDetailView?: boolean; onBack?: () => void }> = ({ theme, toggleTheme, onNavigate, isDetailView, onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept navigation links (starting with #), let external links work normally
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      if (isDetailView && onBack) {
        onBack();
        setTimeout(() => onNavigate(id), 20);
      } else {
        onNavigate(id);
      }
      setIsOpen(false);
    }
  };

  const isDark = theme === ThemeVariation.DARK_NEON;

  return (
    <>
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? (isDark ? 'glass-dark' : 'glass-light') + ' py-3' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, '#')} 
            className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-8 dark:focus-visible:ring-offset-black rounded-xl p-1"
          >
            <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center font-display font-bold text-white dark:text-black transition-transform group-hover:scale-110 shadow-lg">L</div>
            <span className={`font-display font-bold text-2xl tracking-tighter text-zinc-900 dark:text-white`}>Luxe<span className="text-neon-cyan">Porto</span></span>
          </a>

          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-semibold tracking-wide transition-all hover:text-neon-cyan relative group text-zinc-500 dark:text-zinc-400 focus-visible:text-neon-cyan px-2 py-1 rounded-md`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full"></span>
              </a>
            ))}
            <div className={`h-6 w-px bg-zinc-200 dark:bg-white/10`}></div>
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 active:scale-90 relative group overflow-hidden shadow-sm focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              {isDark ? <Sun className="w-5 h-5 text-neon-cyan" /> : <Moon className="w-5 h-5 text-zinc-900" />}
            </button>
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick(e, '#contact')} 
              className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-bold shadow-xl hover:shadow-neon-cyan/20 dark:hover:shadow-neon-cyan/40 hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              Start Project
            </a>
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            <button onClick={toggleTheme} className="p-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-zinc-900 dark:text-white focus-visible:ring-2 focus-visible:ring-neon-cyan">
               {isDark ? <Sun className="w-5 h-5 text-neon-cyan" /> : <Moon className="w-5 h-5 text-zinc-900" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu" className="p-2 relative w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus-visible:ring-2 focus-visible:ring-neon-cyan">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-white dark:bg-black z-[250] transition-all duration-700 lg:hidden flex flex-col items-center justify-center ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <button onClick={() => setIsOpen(false)} aria-label="Close Menu" className="absolute top-8 right-8 p-4 text-zinc-900 dark:text-white focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-full"><X className="w-10 h-10" /></button>
        <div className="space-y-8 text-center px-6">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="block text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white hover:text-neon-cyan transition-colors tracking-tight focus-visible:text-neon-cyan rounded-xl">{link.name}</a>
          ))}
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="inline-block mt-8 px-12 py-6 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-3xl text-xl sm:text-2xl font-bold shadow-2xl focus-visible:ring-4 focus-visible:ring-neon-cyan">Let's Talk</a>
        </div>
      </div>
    </>
  );
};

/**
 * Component: Hero
 */
const Hero: React.FC<{ reveal: (el: HTMLElement | null) => void; onNavigate: (id: string) => void }> = ({ reveal, onNavigate }) => {
  const magneticRef = useMagnetic() as React.RefObject<HTMLButtonElement>;
  
  return (
    <section className="relative min-h-screen flex items-center pt-40 sm:pt-48 md:pt-56 lg:pt-32 overflow-hidden bg-white dark:bg-[#030303] transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[20%] w-[100vw] h-[100vw] bg-neon-cyan/5 dark:bg-neon-cyan/10 blur-[180px] rounded-full animate-pulse-slow opacity-40" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[80vw] h-[80vw] bg-neon-indigo/5 dark:bg-neon-indigo/10 blur-[180px] rounded-full animate-float opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-12 sm:py-20">
        <div className="max-w-5xl">
          <div className="reveal inline-flex items-center space-x-3 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-xl text-[10px] sm:text-sm font-bold mb-10 sm:mb-12 shadow-sm text-zinc-900 dark:text-white" ref={reveal}>
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="tracking-widest uppercase opacity-80">Opening for Q1 2026 Partnerships</span>
          </div>
          
          <h1 className="reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 sm:mb-10 leading-[0.9] text-zinc-900 dark:text-white" ref={reveal}>
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-400 dark:to-zinc-600">Digital Value.</span>
          </h1>

          <p className="reveal text-lg sm:text-2xl md:text-3xl text-zinc-500 dark:text-zinc-400 max-w-3xl mb-12 sm:mb-14 leading-tight font-medium" ref={reveal}>
            I design and build <span className="text-zinc-900 dark:text-white font-semibold">ultra-premium production ecosystems</span> that combine aesthetic mastery with industrial-grade engineering.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-6 items-start sm:items-center" ref={reveal}>
            <button 
              ref={magneticRef}
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-display font-bold text-lg sm:text-xl flex items-center justify-center group shadow-2xl transition-all hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-neon-cyan"
            >
              The Portfolio <ArrowUpRight className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex -space-x-3 sm:-space-x-4 items-center">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/face${i}/100/100`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white dark:border-[#030303] shadow-xl" alt="Client" />
              ))}
              <div className="ml-4 sm:ml-6 pl-2 flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-wide uppercase">Trusted by</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Top 1% Creators</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center space-y-4 opacity-30 animate-bounce">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-900 dark:text-white">Scroll</span>
        <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-zinc-900 dark:from-white to-transparent"></div>
      </div>
    </section>
  );
};

/**
 * Component: Working Process
 */
const Process: React.FC<{ reveal: (el: HTMLElement | null) => void }> = ({ reveal }) => (
  <section className="py-24 sm:py-40 bg-zinc-50 dark:bg-black transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="mb-20 sm:mb-24 reveal" ref={reveal}>
        <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 sm:mb-8">Methodology</div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-zinc-900 dark:text-white tracking-tighter">How I Deliver <br />Success.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {[
          { icon: Sparkles, title: "Discovery", desc: "Understanding your vision, business goals, and defining the strategic roadmap for maximum impact." },
          { icon: MousePointer2, title: "Prototyping", desc: "Crafting interactive, high-fidelity prototypes that validate user flows and aesthetic direction early." },
          { icon: Cpu, title: "Execution", desc: "Industrial-grade engineering using the latest technologies to build scalable, high-performance systems." }
        ].map((step, i) => (
          <div key={i} className="reveal relative p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/10 shadow-sm" ref={reveal}>
             <div className="text-zinc-100 dark:text-white/5 absolute top-6 sm:top-8 right-6 sm:right-8 text-6xl sm:text-8xl font-display font-bold leading-none select-none">0{i+1}</div>
             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neon-cyan/10 rounded-2xl flex items-center justify-center text-neon-cyan mb-8 sm:mb-10 relative z-10">
               <step.icon className="w-6 h-6 sm:w-7 sm:h-7" />
             </div>
             <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 relative z-10">{step.title}</h3>
             <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium relative z-10">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Component: Stats
 */
const Stats: React.FC<{ reveal: (el: HTMLElement | null) => void }> = ({ reveal }) => (
  <section className="py-16 sm:py-20 border-y border-zinc-100 dark:border-white/5 bg-white dark:bg-[#030303]">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-zinc-900 dark:text-white">
      {[
        { label: 'YRS Experience', val: '08+', icon: Briefcase },
        { label: 'Global Clients', val: '45+', icon: Globe },
        { label: 'Projects Done', val: '120+', icon: Trophy },
        { label: 'Lines of Code', val: '2M+', icon: Code2 },
      ].map((stat, i) => (
        <div key={i} className="reveal text-center group" ref={reveal}>
          <div className="mb-3 sm:mb-4 flex justify-center text-neon-cyan opacity-60 group-hover:opacity-100 transition-all duration-500">
            <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-1 sm:mb-2">{stat.val}</div>
          <div className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

/**
 * Component: Expertise
 */
const Expertise: React.FC<{ reveal: (el: HTMLElement | null) => void }> = ({ reveal }) => (
  <section id="about" className="py-24 sm:py-40 relative bg-white dark:bg-[#030303]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-end mb-16 sm:mb-24">
        <div className="reveal" ref={reveal}>
          <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 sm:mb-8">Technical Stack</div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-tight tracking-tighter text-zinc-900 dark:text-white">The Toolkit <br className="hidden sm:block" />of Modern <br className="hidden sm:block" /><span className="text-zinc-300 dark:text-zinc-600">Product Engineering.</span></h2>
        </div>
        <p className="reveal text-lg sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed" ref={reveal}>
          I architect solutions using a stack built for massive scale, extreme performance, and high-fidelity motion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="p-8 sm:p-10 rounded-3xl sm:rounded-4xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 premium-card reveal" ref={reveal}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 sm:mb-10 text-neon-cyan shadow-sm dark:shadow-inner border border-zinc-100 dark:border-transparent">
              {idx === 0 && <Layers className="w-6 h-6 sm:w-8 sm:h-8" />}
              {idx === 1 && <Monitor className="w-6 h-6 sm:w-8 sm:h-8" />}
              {idx === 2 && <Globe className="w-6 h-6 sm:w-8 sm:h-8" />}
              {idx === 3 && <Zap className="w-6 h-6 sm:w-8 sm:h-8" />}
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-zinc-900 dark:text-white">{cat.title}</h3>
            <ul className="space-y-4 sm:space-y-5">
              {cat.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center text-zinc-500 dark:text-zinc-400 font-bold text-sm sm:text-base group">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mr-3 sm:mr-4 group-hover:scale-150 transition-transform"></div>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Component: ProjectCard
 */
const ProjectCard: React.FC<{ project: Project; index: number; onProjectClick: (project: Project) => void }> = ({ project, index, onProjectClick }) => {
  const isLarge = index === 0 || index === 3; 
  
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={() => onProjectClick(project)}
      onKeyDown={(e) => e.key === 'Enter' && onProjectClick(project)}
      aria-label={`View details for ${project.title}`}
      className={`group relative overflow-hidden transition-all duration-1000 outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan
        ${isLarge ? 'md:col-span-2 md:aspect-[21/9]' : 'md:col-span-1 md:aspect-[4/5] lg:aspect-[1/1]'}
        aspect-[4/5] rounded-3xl sm:rounded-[3rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-2xl`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale transition-all duration-[1.2s] ease-out group-hover:grayscale-0 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
      </div>

      <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 backdrop-blur-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-white rounded-lg border border-white/20">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-baseline space-x-2 sm:space-x-4">
             <span className="text-neon-cyan font-display font-bold text-base sm:text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500">0{index + 1}</span>
             <h3 className="text-xl sm:text-3xl lg:text-5xl font-display font-bold text-white tracking-tighter leading-tight group-hover:text-neon-cyan transition-colors duration-500">
               {project.title}
             </h3>
          </div>
          <p className="text-xs sm:text-lg text-zinc-300 max-w-2xl line-clamp-2 font-medium leading-relaxed translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
            {project.description}
          </p>
        </div>

        <div className="mt-6 sm:mt-10 flex items-center justify-between translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
           <div className="flex items-center space-x-3 sm:space-x-6">
              <span className="text-[8px] sm:text-[11px] font-bold text-white uppercase tracking-[0.4em]">Case Study</span>
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:bg-neon-cyan group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4 sm:w-7 sm:h-7" />
              </div>
           </div>
           <div className="hidden sm:block h-px flex-1 mx-8 bg-white/20" />
        </div>
      </div>

      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/20 group-hover:text-neon-cyan transition-colors duration-500">
        <Plus className="w-6 h-6 sm:w-10 sm:h-10" />
      </div>
    </div>
  );
};

/**
 * Component: Projects (Recent Artifacts)
 */
const Projects: React.FC<{ reveal: (el: HTMLElement | null) => void; onProjectClick: (project: Project) => void }> = ({ reveal, onProjectClick }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web', 'Mobile', 'AI', 'FinTech'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));
  }, [filter]);

  // Random Repository Data for Depth
const archiveItems = [
  {
    name: "website-builder-saas",
    stars: 0,
    forks: 0,
    tech: "TypeScript",
    version: "main",
    url: "https://github.com/Junaid12337012/website-builder-saas"
  },
  {
    name: "Newsblog",
    stars: 0,
    forks: 0,
    tech: "JavaScript",
    version: "main",
    url: "https://github.com/Junaid12337012/Newsblog"
  },
  {
    name: "own-write",
    stars: 0,
    forks: 0,
    tech: "TypeScript",
    version: "main",
    url: "https://github.com/Junaid12337012/own-writes-frontend"
  },
  {
    name: "IRONFORGE",
    stars: 1,
    forks: 2,
    tech: "Node.js",
    version: "main",
    url: "https://github.com/Junaid12337012/IRONFORGE"
  }
];


  return (
    <section id="projects" className="py-24 sm:py-48 bg-white dark:bg-[#030303] relative transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 sm:gap-16 mb-16 sm:mb-32">
          <div className="lg:col-span-8 reveal" ref={reveal}>
            <div className="text-neon-cyan font-bold uppercase tracking-[0.6em] text-[10px] sm:text-xs mb-8 flex items-center">
              <span className="w-8 sm:w-12 h-px bg-neon-cyan mr-4"></span>
              Selected Portfolios
            </div>
            <h2 className="text-5xl sm:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-zinc-900 dark:text-white leading-[0.85] mb-8 sm:mb-12">
              Recent <br /> <span className="text-zinc-200 dark:text-zinc-800">Artifacts.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 flex flex-col justify-end lg:items-end reveal" ref={reveal}>
            <p className="text-lg sm:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-10 lg:text-right max-w-md">
              A meticulously curated selection of engineering feats and aesthetic breakthroughs.
            </p>
            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 sm:px-8 sm:py-3 rounded-xl text-[8px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-neon-cyan
                    ${filter === cat ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl ring-2 ring-neon-cyan/20' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Adaptive Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 reveal" ref={reveal}>
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} onProjectClick={onProjectClick} />
          ))}
        </div>

        {/* EXPLORE GLOBAL REPOSITORY - Integrated Archive Section */}
        <div className="mt-32 sm:mt-56 pt-20 sm:pt-32 border-t border-zinc-200 dark:border-white/10 reveal" ref={reveal}>
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 sm:mb-24">
              <div className="max-w-2xl">
                 <p className="text-neon-cyan font-bold uppercase tracking-[0.5em] text-[10px] mb-6">Technical Ecosystem</p>
                 <h3 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-zinc-900 dark:text-white tracking-tighter leading-[1] sm:leading-[0.9]">
                    Explore Global <br className="hidden sm:block" /> <span className="text-zinc-400 dark:text-zinc-600">Repository Archive.</span>
                 </h3>
              </div>
              <div 
                role="button"
                tabIndex={0}
                className="group cursor-pointer flex flex-col items-start lg:items-end p-2 rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan" 
                onClick={() => window.open('https://github.com/Junaid12337012', '_blank')}
                onKeyDown={(e) => e.key === 'Enter' && window.open('https://github.com/Junaid12337012', '_blank')}
                aria-label="Visit Global GitHub Repository"
              >
                 <div className="flex items-center space-x-4 sm:space-x-6 mb-4">
                    <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Protocol: Master Node</span>
                    <div className="w-12 h-12 sm:w-20 sm:h-20 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110 shadow-2xl">
                       <Github className="w-7 h-7 sm:w-10 sm:h-10" />
                    </div>
                 </div>
                 <div className="h-0.5 w-full bg-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-700" />
              </div>
           </div>

           {/* Nested Technical Micro-Archives Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {archiveItems.map((repo, i) => (
                <div 
                   key={i}
                   role="button"
                   tabIndex={0}
                   aria-label={`Open GitHub repository ${repo.name}`}
                   onClick={() => window.open(repo.url, "_blank")}
                   onKeyDown={(e) => e.key === "Enter" && window.open(repo.url, "_blank")}
                   className="group p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem]
                   bg-zinc-50 dark:bg-zinc-900/50
                   border border-zinc-200 dark:border-white/5
                   hover:border-neon-cyan/50
                   transition-all duration-700
                   shadow-sm relative overflow-hidden
                   cursor-pointer
                   outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                   
                   <div className="flex justify-between items-start mb-8 sm:mb-10 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-black rounded-xl sm:rounded-2xl flex items-center justify-center text-neon-cyan shadow-sm border border-zinc-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                         <Hash className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-right">
                         <span className="block text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Version</span>
                         <span className="text-[9px] sm:text-[10px] font-bold text-zinc-900 dark:text-white font-mono">{repo.version}</span>
                      </div>
                   </div>

                   <h5 className="text-lg sm:text-xl font-display font-bold text-zinc-900 dark:text-white mb-2 sm:mb-3 group-hover:text-neon-cyan transition-colors relative z-10">{repo.name}</h5>
                   <div className="flex items-center space-x-2 sm:space-x-3 mb-8 sm:mb-12 relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></div>
                      <span className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest">{repo.tech}</span>
                   </div>

                   <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-zinc-200 dark:border-white/5 relative z-10">
                      <div className="flex items-center space-x-4 sm:space-x-6">
                         <div className="flex items-center space-x-1.5 sm:space-x-2 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-[10px] sm:text-xs font-bold">{repo.stars}</span>
                         </div>
                         <div className="flex items-center space-x-1.5 sm:space-x-2 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-[10px] sm:text-xs font-bold">{repo.forks}</span>
                         </div>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-black flex items-center justify-center text-zinc-300 group-hover:text-neon-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shadow-sm">
                         <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-16 sm:mt-20 flex flex-col md:flex-row items-center justify-between gap-8 py-8 sm:py-10 px-8 sm:px-10 rounded-3xl sm:rounded-[2rem] bg-zinc-900 dark:bg-white text-white dark:text-black">
              <div className="flex items-center space-x-4 sm:space-x-6 text-center sm:text-left">
                 <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-neon-cyan" />
                 <div>
                    <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">System Status</div>
                    <div className="text-base sm:text-lg font-display font-bold">120+ Micro-Modules Active</div>
                 </div>
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.5em] hidden lg:block opacity-40">Industrial Grade Codebase</div>
              <button 
                onClick={() => window.open('https://github.com/Junaid12337012', '_blank')} 
                className="w-full sm:w-auto px-10 py-4 bg-neon-cyan text-black rounded-xl font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl focus-visible:ring-4 focus-visible:ring-white"
              >
                 Sync Repository
              </button>
           </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>
    </section>
  );
};

/**
 * Component: ProjectDetail
 */
const ProjectDetail: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen pt-24 pb-24 sm:pt-32 bg-white dark:bg-[#030303] animate-in fade-in slide-in-from-bottom-8 duration-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button onClick={onBack} className="group flex items-center space-x-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-12 sm:mb-16 transition-all focus-visible:ring-2 focus-visible:ring-neon-cyan p-2 rounded-lg">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
          <span className="font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs">Archive Gallery</span>
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-16 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="aspect-[16/10] rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl sm:shadow-6xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 mb-8 sm:mb-12">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-8 sm:space-y-12">
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-xl sm:text-3xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed italic border-l-4 border-neon-cyan pl-6 sm:pl-8 mb-8 sm:mb-12">
                  Exploring the boundaries of digital experience through high-performance engineering and minimal design systems.
                </p>
                <div className="text-lg sm:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-6 sm:space-y-8 font-medium">
                  {project.description} This production-grade application was built with a focus on scalability, performance optimization, and high-fidelity motion. By utilizing industry-standard architecture, we achieved significant improvements in user engagement and system latency.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-40 w-full">
            <div className="p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 shadow-xl">
              <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] mb-4 sm:mb-6">Technical Specifications</div>
              <h1 className="text-3xl sm:text-6xl font-display font-bold mb-6 sm:mb-8 text-zinc-900 dark:text-white tracking-tight leading-none">{project.title}</h1>
              
              <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3 sm:mb-4">Ecosystem Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-zinc-200 dark:border-white/5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-1 sm:mb-2">Role</div>
                    <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">Lead Architect</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-1 sm:mb-2">Phase</div>
                    <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">Live Release</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 sm:py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl sm:rounded-2xl font-bold text-center text-base sm:text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 shadow-xl focus-visible:ring-4 focus-visible:ring-neon-cyan">
                  <span>Visit Product</span>
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 sm:py-5 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-xl sm:rounded-2xl font-bold text-center text-base sm:text-lg hover:bg-zinc-100 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center space-x-3 focus-visible:ring-4 focus-visible:ring-neon-cyan">
                  <span>Open Source</span>
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-32 pt-16 sm:pt-24 border-t border-zinc-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
           <div className="text-center sm:text-left">
             <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-2 sm:mb-4">Next Entry</div>
             <h2 
                role="button"
                tabIndex={0}
                className="text-2xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white group cursor-pointer hover:text-neon-cyan transition-colors focus-visible:ring-2 focus-visible:ring-neon-cyan p-2 rounded-xl" 
                onClick={onBack}
                onKeyDown={(e) => e.key === 'Enter' && onBack()}
              >
                Quantum Nexus
              </h2>
           </div>
           <button onClick={onBack} aria-label="Next Project" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black hover:scale-110 transition-transform shadow-2xl focus-visible:ring-4 focus-visible:ring-neon-cyan">
             <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
           </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Component: Experience
 */
const Experience: React.FC<{ reveal: (el: HTMLElement | null) => void }> = ({ reveal }) => (
  <section id="experience" className="py-24 sm:py-40 bg-white dark:bg-[#030303] transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 mb-16 sm:mb-24 items-end">
        <div className="reveal" ref={reveal}>
          <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 sm:mb-8">Career Path</div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-none tracking-tighter text-zinc-900 dark:text-white">Industrial <br />Experience.</h2>
        </div>
        <p className="reveal text-lg sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed" ref={reveal}>
          A history of architecting scalable systems and delivering pixel-perfect interfaces for tech leaders.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="reveal group relative p-8 sm:p-12 rounded-3xl sm:rounded-[3rem] bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 transition-all hover:bg-zinc-100 dark:hover:bg-white/10 shadow-sm" ref={reveal}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3 sm:space-y-4 text-zinc-900 dark:text-white">
                <div className="text-neon-cyan font-bold uppercase tracking-widest text-[10px] sm:text-xs">{exp.period}</div>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-tight">{exp.company}</h3>
                <div className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-bold">{exp.role}</div>
              </div>
              <p className="text-base sm:text-lg text-zinc-500 max-w-xl leading-relaxed font-medium">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Component: Testimonials
 */
const Testimonials: React.FC<{ reveal: (el: HTMLElement | null) => void }> = ({ reveal }) => (
  <section className="py-24 sm:py-40 bg-zinc-50 dark:bg-[#050505] transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 sm:mb-24">
      <div className="reveal" ref={reveal}>
        <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 sm:mb-8">Validation</div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter text-zinc-900 dark:text-white">Trust from the Best.</h2>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
      {TESTIMONIALS.map((t, idx) => (
        <div key={idx} className="reveal p-8 sm:p-10 rounded-3xl sm:rounded-[3rem] bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/10 relative shadow-sm" ref={reveal}>
          <div className="mb-8 text-neon-cyan opacity-40 dark:opacity-20">
            <Users className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 italic mb-10 sm:mb-12 leading-relaxed font-medium">"{t.content}"</p>
          <div className="flex items-center space-x-4">
            <img src={t.avatar} alt={t.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-zinc-100 dark:border-white/10 shadow-sm" />
            <div className="text-left">
              <div className="font-bold text-zinc-900 dark:text-white text-base sm:text-lg">{t.name}</div>
              <div className="text-[9px] sm:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{t.role} @ {t.company}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/**
 * Component: Blog
 */
const Blog: React.FC<{ reveal: (el: HTMLElement | null) => void; onReadPost: (post: BlogPostExtended) => void }> = ({ reveal, onReadPost }) => (
  <section id="blog" className="py-24 sm:py-40 bg-white dark:bg-[#030303] transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="mb-16 sm:mb-24 reveal" ref={reveal}>
        <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 sm:mb-8">Journal</div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter mb-6 sm:mb-8 text-zinc-900 dark:text-white">Intellectual <br />Property.</h2>
        <p className="text-lg sm:text-2xl text-zinc-500 max-w-2xl font-medium leading-tight">Sharing architectural patterns, design philosophies, and engineering deep-dives.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {BLOG_POSTS.map((post, idx) => (
          <article 
            key={post.id} 
            role="button" 
            tabIndex={0} 
            onClick={() => onReadPost(post)} 
            onKeyDown={(e) => e.key === 'Enter' && onReadPost(post)}
            className="group cursor-pointer reveal stagger-1 outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan p-4 rounded-3xl sm:rounded-[3rem]" 
            ref={reveal}
          >
            <div className="aspect-[4/3] rounded-3xl sm:rounded-[2.5rem] overflow-hidden mb-6 sm:mb-8 bg-zinc-100 dark:bg-zinc-900 shadow-xl relative">
               <img src={post.author.avatar} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10">
                 {post.category}
               </div>
            </div>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full"></span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white group-hover:text-neon-cyan transition-colors leading-tight tracking-tight">{post.title}</h3>
            <div className="inline-flex items-center text-[10px] sm:text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest group-hover:underline decoration-neon-cyan underline-offset-8">
              Open Journal <ChevronRight className="w-4 h-4 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Component: Contact
 */
const Contact: React.FC<{ reveal: (el: HTMLElement | null) => void }> = ({ reveal }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const magneticSubmitRef = useMagnetic() as React.RefObject<HTMLButtonElement>;

  return (
    <section id="contact" className="py-20 sm:py-48 bg-white dark:bg-[#030303] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-center">
          <div className="lg:col-span-5 reveal text-center lg:text-left" ref={reveal}>
            <div className="text-neon-cyan font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 sm:mb-8">Interaction</div>
            <h2 className="text-5xl sm:text-8xl font-display font-bold mb-6 sm:mb-10 text-zinc-900 dark:text-white tracking-tighter leading-none">Let's build <br />Value.</h2>
            <p className="text-lg sm:text-2xl text-zinc-500 dark:text-zinc-400 mb-10 sm:mb-16 leading-tight font-medium">Drop a brief or say hello. I'm usually around for high-end collaboration inquiries.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start sm:space-x-6 space-y-6 sm:space-y-0 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-2xl transition-transform group-hover:rotate-12"><Mail className="w-8 h-8 sm:w-10 sm:h-10" /></div>
              <div className="text-center sm:text-left">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-1">Electronic Mail</div>
                <div className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">hello@luxeporto.io</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal" ref={reveal}>
            <div className="p-6 sm:p-12 rounded-3xl sm:rounded-[3.5rem] bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 transition-all shadow-xl dark:shadow-6xl backdrop-blur-3xl overflow-hidden relative">
              {isSubmitted ? (
                <div className="py-16 sm:py-24 flex flex-col items-center text-center animate-in zoom-in-95 duration-700">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neon-cyan/10 rounded-full flex items-center justify-center text-neon-cyan mb-8 sm:mb-10 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white tracking-tight">Protocol Dispatched.</h3>
                  <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mb-10 sm:mb-12 font-medium">
                    Your request has been successfully transmitted. Expect a response within one business cycle.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all py-3 px-8 border border-zinc-200 dark:border-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-neon-cyan">Resubmit Protocol</button>
                </div>
              ) : (
                <form className="space-y-6 sm:space-y-10 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2 sm:space-y-3">
                      <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 ml-2" htmlFor="name-field">Identify</label>
                      <input id="name-field" type="text" placeholder="Your Name" className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 focus:border-neon-cyan/50 text-zinc-900 dark:text-white transition-all font-medium shadow-sm text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-neon-cyan outline-none" required />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 ml-2" htmlFor="email-field">Connection</label>
                      <input id="email-field" type="email" placeholder="Email Address" className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 focus:border-neon-cyan/50 text-zinc-900 dark:text-white transition-all font-medium shadow-sm text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-neon-cyan outline-none" required />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 ml-2" htmlFor="message-field">Manifesto</label>
                    <textarea id="message-field" rows={4} placeholder="Brief details about the project..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 focus:border-neon-cyan/50 text-zinc-900 dark:text-white transition-all resize-none font-medium shadow-sm text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-neon-cyan outline-none" required />
                  </div>
                  <button 
                    type="submit" 
                    ref={magneticSubmitRef}
                    className="w-full py-6 sm:py-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl sm:rounded-[2rem] font-display font-bold text-xl sm:text-2xl flex items-center justify-center group shadow-2xl hover:scale-[1.02] active:scale-95 transition-all focus-visible:ring-4 focus-visible:ring-neon-cyan"
                  >
                    Submit Proposal <ChevronRight className="ml-3 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Component: BlogDetail
 */
const BlogDetail: React.FC<{ post: BlogPostExtended; onBack: () => void }> = ({ post, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-[#030303] animate-in slide-in-from-right-10 fade-in duration-700 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <button onClick={onBack} className="group flex items-center space-x-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-16 sm:mb-20 transition-all focus-visible:ring-2 focus-visible:ring-neon-cyan p-2 rounded-lg">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
          <span className="font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs">Exit Article</span>
        </button>

        <div className="mb-12 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 sm:mb-10">
            <span className="inline-block px-5 py-2 bg-neon-cyan/10 text-neon-cyan text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-neon-cyan/20 w-max">{post.category}</span>
            <div className="flex items-center text-zinc-500 text-[10px] sm:text-xs font-bold space-x-6 tracking-widest uppercase">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {post.readTime}</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-display font-bold mb-8 sm:mb-12 text-zinc-900 dark:text-white leading-[1] sm:leading-[0.9] tracking-tighter">{post.title}</h1>
          <div className="flex items-center justify-between py-8 sm:py-10 border-y border-zinc-100 dark:border-white/5">
            <div className="flex items-center space-x-4 sm:space-x-5">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-zinc-100 dark:border-white/10" />
              <div>
                <div className="font-bold text-zinc-900 dark:text-white text-base sm:text-lg leading-tight">{post.author.name}</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">{post.author.role}</div>
              </div>
            </div>
            <button aria-label="Share post" className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all text-zinc-900 dark:text-white shadow-sm focus-visible:ring-2 focus-visible:ring-neon-cyan"><Share2 className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert prose-lg sm:prose-2xl max-w-none">
          <p className="text-xl sm:text-3xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-12 sm:mb-16 italic border-l-4 border-neon-cyan pl-6 sm:pl-8">{post.excerpt}</p>
          <div className="text-lg sm:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-10 sm:space-y-12 whitespace-pre-wrap font-medium">{post.content}</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Component: Footer
 */
const Footer: React.FC<{ onNavigate: (id: string) => void; isDetailView?: boolean; onBack?: () => void }> = ({ onNavigate, isDetailView, onBack }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    if (isDetailView && onBack) {
      onBack();
      setTimeout(() => onNavigate(id), 20);
    } else {
      onNavigate(id);
    }
  };

  return (
    <footer className="py-20 bg-zinc-50 dark:bg-black border-t border-zinc-100 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center space-x-4 group p-2 focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-xl">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center font-bold text-white dark:text-black text-xl transition-transform group-hover:rotate-12">L</div>
            <span className="font-display font-bold text-3xl text-zinc-900 dark:text-white tracking-tighter">LuxePorto.</span>
          </a>
          <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-6">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-[0.4em] focus-visible:text-neon-cyan px-2 py-1 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex space-x-8 text-zinc-400 dark:text-zinc-500">
            <Twitter className="w-6 h-6 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-all hover:scale-125 focus-visible:text-neon-cyan outline-none" tabIndex={0} />
            <Github className="w-6 h-6 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-all hover:scale-125 focus-visible:text-neon-cyan outline-none" tabIndex={0} />
            <Linkedin className="w-6 h-6 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-all hover:scale-125 focus-visible:text-neon-cyan outline-none" tabIndex={0} />
          </div>
        </div>
        <div className="pt-12 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-400 dark:text-zinc-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-center">
          <span>© 2024 LuxePorto Studio. All rights reserved.</span>
          <span>Crafted for excellence.</span>
        </div>
      </div>
    </footer>
  );
};

/**
 * Main App Container
 */
const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeVariation>(ThemeVariation.DARK_NEON);
  const [currentView, setCurrentView] = useState<'main' | 'blog-detail' | 'project-detail'>('main');
  const [selectedPost, setSelectedPost] = useState<BlogPostExtended | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reveal = useReveal(currentView);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === ThemeVariation.DARK_NEON);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === ThemeVariation.DARK_NEON ? ThemeVariation.LIGHT_MINIMAL : ThemeVariation.DARK_NEON);
  
  const handleReadPost = (post: BlogPostExtended) => {
    setSelectedPost(post);
    setCurrentView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  
  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedPost(null);
    setSelectedProject(null);
  };

  const scrollToSection = useCallback((id: string) => {
    if (id === '' || id === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="antialiased selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} onNavigate={scrollToSection} isDetailView={currentView !== 'main'} onBack={handleBackToMain} />
      <main className="transition-opacity duration-700">
        {currentView === 'main' ? (
          <>
            <Hero reveal={reveal} onNavigate={scrollToSection} />
            <div className="divider-line" />
            <Stats reveal={reveal} />
            <Expertise reveal={reveal} />
            <Process reveal={reveal} />
            <div className="divider-line" />
            <Projects reveal={reveal} onProjectClick={handleProjectClick} />
            <Experience reveal={reveal} />
            <Testimonials reveal={reveal} />
            <Blog reveal={reveal} onReadPost={handleReadPost} />
            <Contact reveal={reveal} />
          </>
        ) : currentView === 'blog-detail' && selectedPost ? (
          <BlogDetail post={selectedPost} onBack={handleBackToMain} />
        ) : currentView === 'project-detail' && selectedProject ? (
          <ProjectDetail project={selectedProject} onBack={handleBackToMain} />
        ) : null}
      </main>
      <Footer onNavigate={scrollToSection} isDetailView={currentView !== 'main'} onBack={handleBackToMain} />
    </div>
  );
};

export default App;
