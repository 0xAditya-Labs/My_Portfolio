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
    company: "Accenture, Bengaluru",
    companyUrl: "https://accenture.com",
    logo: "/icons/Accenture-Logo (2).webp",
    period: "Jun 2026 – Jul 2026",
    summary:
      "Built an internal LangGraph ReAct agent prototype with FastAPI to benchmark retrieval performance, decreasing LLM input-token usage by 34% via doc-string tool-gating (suppressing 93% of out-of-scope calls). Slashed vector-search latency by 69% (to 180ms) by tracing bottlenecks via OpenTelemetry and refactoring ChromaDB into a singleton.",
    tags: ["LangGraph", "FastAPI", "OpenTelemetry", "ChromaDB", "Langfuse", "Python", "RAG"],
  },
  {
    date: "DEC 2024 – MAY 2026",
    title: "Competitive Programming Lead",
    company: "Google Developer Group, NIT Jalandhar",
    companyUrl: "https://gdg.community.dev/gdg-on-campus-dr-b-r-ambedkar-national-institute-of-technology-jalandhar-india/",
    logo: "/icons/gdg-logo.svg",
    period: "Dec 2024 – May 2026",
    summary:
      "Mentored 70+ juniors in advanced DSA cohorts, boosting contest solve-rates by 40%; authored 35 original algorithmic problems with test cases and reference solutions across 16 campus contests; coordinated CodeVerse and CodeHunt for 90+ participants.",
    tags: ["Competitive Programming", "DSA", "Problem Setting", "Mentorship", "Leadership"],
  },
  {
    date: "DEC 2023 – MAY 2025",
    title: "Group Representative",
    company: "CSE, NIT Jalandhar",
    companyUrl: "https://departments.nitj.ac.in/dept/cse/home",
    logo: "/icons/NIT-Jalandhar-Logo.webp",
    period: "Dec 2023 – May 2025",
    summary:
      "Represented 1 of 6 CSE groups (28 members), streamlining faculty-student communication; initiated process re-engineering across 10+ departments, reducing paperwork by 75%.",
    tags: ["Leadership", "Process Improvement", "Cross-functional Coordination"],
  },
];

const Timeline = () => {
  const { ref, isVisible } = useScrollAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={timelineRef}
      className="py-16 lg:py-20 px-6 lg:px-8 relative overflow-hidden"
      id="timeline"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={ref} className={`${isVisible ? "scroll-animate" : "opacity-0"} flex items-center justify-center gap-8 mb-16 flex-wrap`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
            Tracing the Arc...
          </h2>
        </div>

        {/* Desktop Timeline - Horizontal (Responsive 3-Column Grid, Zero Scroll-Jacking) */}
        <div className="hidden lg:block relative">
          {/* Background Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />

          {/* Animated Progress Line */}
          <div
            className={`absolute top-8 left-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent transition-all duration-1000 ease-out ${
              isVisible ? "w-full" : "w-0"
            }`}
          />

          {/* Timeline Items */}
          <div className="grid grid-cols-3 gap-8 relative items-stretch">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Dot */}
                <div className="relative flex justify-center mb-8">
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-500 bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50 scale-125"
                  />
                </div>

                {/* Content Card */}
                <div 
                  className="premium-card p-5 rounded-xl group cursor-default h-[calc(100%-48px)] flex flex-col justify-between"
                >
                  <div>
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
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted/80 text-foreground font-medium border border-border/40 dark:bg-white/5 dark:border-white/10"
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
                <div 
                  className="premium-card p-6 rounded-xl group cursor-default ml-4"
                >
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
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/80 text-foreground font-medium border border-border/40 dark:bg-white/5 dark:border-white/10"
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
