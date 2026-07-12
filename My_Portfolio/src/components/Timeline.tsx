import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TimelineItem {
  date: string;
  title: string;
  company?: string;
  companyUrl?: string;
  logo?: string;
  period?: string;
  summary: string;
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    date: "JUN 2026 – JUL 2026",
    title: "Software Development Engineer Intern",
    company: "Accenture",
    companyUrl: "https://accenture.com",
    logo: "/icons/Accenture-Logo (2).png",
    period: "Jun 2026 – Jul 2026",
    summary:
      "Decreased RAG input-token usage by 34% for ContextIQ using LangChain chunking, and slashed vector-search latency by 69% by refactoring the ChromaDB client into a singleton.",
    tags: ["LangChain", "Langfuse", "OpenTelemetry", "ChromaDB", "RAG", "Python"],
  },
  {
    date: "DEC 2024 – PRESENT",
    title: "Software Development & CP Core Team Co-Lead",
    company: "Google Developer Group, NIT Jalandhar",
    companyUrl: "https://gdg.community.dev/gdg-on-campus-dr-b-r-ambedkar-national-institute-of-technology-jalandhar-india/",
    logo: "/icons/gdg-logo.svg",
    period: "Dec 2024 – Present",
    summary:
      "Increased contest performance by 40% and junior participation by 30% through structured DSA mentoring; coordinated CodeVerse and CodeHunt for 90+ participants",
    tags: ["Mentorship", "DSA", "Community Leadership", "Contest Design"],
  },
  {
    date: "DEC 2023 – MAY 2026",
    title: "Group Representative",
    company: "NIT Jalandhar",
    companyUrl: "https://departments.nitj.ac.in/dept/cse/home",
    logo: "/icons/NIT-Jalandhar-Logo.webp",
    period: "Dec 2023 – May 2026",
    summary:
      "Represented 1 of 6 CSE groups (28 members), streamlining faculty-student communication; initiated process re-engineering across 10+ departments, reducing paperwork by 75%.",
    tags: ["Leadership", "Process Improvement", "Cross-functional Coordination"],
  },
];

const Timeline = () => {
  const { ref, isVisible } = useScrollAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const scrollAccumulator = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight && elementTop > -elementHeight) {
        const progress = Math.max(
          0,
          Math.min(100, ((windowHeight - elementTop) / (windowHeight + elementHeight)) * 100)
        );
        setScrollProgress(progress);
      }

      // Fix for refresh: if we load the page and timeline is already past the top, 
      // reveal all items so they don't get stuck at 1.
      if (elementTop < 0) {
        setVisibleItems(timelineData.length);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!timelineRef.current) return;

      // Only apply scroll-jacking on desktop (lg breakpoint = 1024px)
      if (window.innerWidth < 1024) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;

      // Only lock scroll if scrolling down and we have more items to show.
      // This allows scrolling back (up) smoothly without hiding items like a stack.
      if (isInView && e.deltaY > 0 && visibleItems < timelineData.length) {
        e.preventDefault();
        scrollAccumulator.current += e.deltaY;

        // "Wait for very less like 5 scrolls extra" -> reduced threshold to 50
        if (scrollAccumulator.current > 50) {
          setVisibleItems((prev) => Math.min(prev + 1, timelineData.length));
          scrollAccumulator.current = 0;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [visibleItems]);

  return (
    <section
      ref={timelineRef}
      className="py-0 px-6 lg:px-8 relative overflow-hidden"
      id="timeline"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title with Google Intern Badge */}
        <div ref={ref} className={`${isVisible ? "scroll-animate" : "opacity-0"} flex items-center justify-center gap-8 mb-20 flex-wrap`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center">
            Tracing the Arc...
          </h2>
          {/* <img 
            src="/icons/aditya-intern.png" 
            alt="Aditya Intern '26" 
            className="object-contain w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 flex-shrink-0"
          /> */}
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block relative">
          {/* Background Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />

          {/* Animated Progress Line */}
          <div
            className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${(visibleItems / timelineData.length) * 100}%` }}
          />

          {/* Timeline Items */}
          <div className="grid grid-flow-col auto-cols-fr gap-8 relative items-stretch">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${index < visibleItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
              >
                {/* Dot */}
                <div className="relative flex justify-center mb-8">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${index < visibleItems
                      ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50 scale-125"
                      : "bg-background border-border"
                      }`}
                  />
                </div>

                {/* Content Card */}
                <div className="p-5 rounded-xl group cursor-default border border-black/60 dark:border-gray-400 transition-transform duration-200 ease-out transform hover:-translate-y-1 hover:shadow-lg bg-white/5 dark:bg-white/3 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 w-full">
                      {item.logo && (
                        <div className="w-12 h-12 rounded bg-slate-100/80 dark:bg-slate-200/90 p-1.5 flex items-center justify-center shrink-0 border border-border/50 shadow-sm mt-1">
                          <img src={item.logo} alt={item.company} className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">{item.period || item.date}</p>
                        <div className="mt-1 flex items-start justify-between gap-3">
                          <h3 className="text-xl font-bold text-foreground leading-snug">{item.title}</h3>
                        </div>
                        {item.company && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.companyUrl ? (
                              <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline relative pr-6">
                                <span>{item.company}</span>
                                <ArrowRight className="absolute top-0 right-0 w-5 h-5 -rotate-45 text-accent" />
                              </a>
                            ) : (
                              <>{item.company}</>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted/80 text-foreground font-medium dark:bg-muted/70 dark:text-foreground"
                        style={{ borderRadius: '9999px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden relative pl-8">
          {/* Background Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          {/* Animated Progress Line */}
          <div
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative ${isVisible ? `scroll-animate scroll-animate-delay-${index + 1}` : "opacity-0"
                  }`}
              >
                {/* Dot */}
                <div className="absolute -left-[26px] top-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${scrollProgress > (index / (timelineData.length - 1)) * 100
                      ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50 scale-125"
                      : "bg-background border-border"
                      }`}
                  />
                </div>

                {/* Content Card */}
                <div className="bg-background/80 backdrop-blur-md p-6 rounded-xl group cursor-default border border-black/60 dark:border-gray-400 ml-4">
                  <div className="flex gap-4">
                    {item.logo && (
                      <div className="w-12 h-12 rounded bg-slate-100/80 dark:bg-slate-200/90 p-1.5 flex items-center justify-center shrink-0 border border-border/50 shadow-sm mt-1">
                        <img src={item.logo} alt={item.company} className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">{item.period || item.date}</p>
                      <h3 className="text-xl font-bold mb-1 text-foreground mt-1">{item.title}</h3>
                      {item.company && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.companyUrl ? (
                            <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline relative pr-6">
                              <span>{item.company}</span>
                              <ArrowRight className="absolute top-0 right-0 w-5 h-5 -rotate-45 text-accent" />
                            </a>
                          ) : (
                            <>{item.company}</>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/80 text-foreground font-medium dark:bg-muted/70 dark:text-foreground"
                        style={{ borderRadius: '9999px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
