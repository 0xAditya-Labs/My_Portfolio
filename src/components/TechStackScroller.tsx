import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";

const techStack = [
  "C++", "Python", "JavaScript", "React.js", "Node.js", "FastAPI",
  "MongoDB", "MySQL", "ChromaDB", "LangChain", "Git"
];

const TechStackScroller = () => {
  const { ref: scrollerRef, isVisible: scrollerVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Find all items and calculate distance to mouse
    const items = containerRef.current.querySelectorAll('.tech-item');
    let closestItem: Element | null = null;
    let minDistance = Infinity;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - itemCenterX);

      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    items.forEach((item) => {
      if (item === closestItem) {
        item.classList.add('is-active');
        item.classList.remove('is-dimmed');
      } else {
        item.classList.add('is-dimmed');
        item.classList.remove('is-active');
      }
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.tech-item');
    items.forEach((item) => {
      item.classList.remove('is-active', 'is-dimmed');
    });
  };

  const TechList = () => (
    <div className="flex items-center shrink-0">
      {techStack.map((tech, index) => (
        <div key={index} className="flex items-center shrink-0">
          <span className="tech-item px-4 text-2xl font-medium text-background dark:text-foreground whitespace-nowrap transition-all duration-300 cursor-pointer">
            {tech}
          </span>
          <span className="mx-4 text-background/40 dark:text-foreground/40 transition-opacity duration-300 tech-dot">
            •
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={scrollerRef} className={`py-16 bg-foreground dark:bg-card overflow-hidden ${scrollerVisible ? 'scroll-animate-fade' : 'opacity-0'}`}>
      <div
        className="max-w-full relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-foreground dark:from-card via-foreground/90 dark:via-card/90 to-transparent z-10 pointer-events-none" style={{ left: '-1px' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-foreground dark:from-card via-foreground/90 dark:via-card/90 to-transparent z-10 pointer-events-none" style={{ right: '-1px' }} />

        <div className="flex animate-scroll w-max hover:[animation-play-state:paused]">
          <TechList />
          <TechList />
        </div>
      </div>
    </section>
  );
};

export default TechStackScroller;

// Add styles to your index.css or a similar global stylesheet
const styles = `
  @keyframes scroll {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .animate-scroll {
    animation: scroll 20s linear infinite;
    will-change: transform;
  }
  
  .scroll-animate-fade {
    transition: opacity 0.8s ease-out;
    opacity: 1;
  }

  .tech-item {
    opacity: 1;
  }
  .tech-item.is-dimmed {
    opacity: 0.2;
  }
  .tech-item.is-active {
    opacity: 1;
    transform: scale(1.1);
    color: #3b82f6; /* Vibrant blue glow */
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
  }
  .tech-dot {
    opacity: 1;
  }
  .is-dimmed + .tech-dot {
    opacity: 0.2;
  }
`;

// Only inject if not already present
if (!document.getElementById("tech-scroller-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "tech-scroller-styles";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
