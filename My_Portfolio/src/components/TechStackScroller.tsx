import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const techStack = [
  "C++", "Python", "JavaScript", "React.js", "Node.js", "FastAPI",
  "MongoDB", "MySQL", "ChromaDB", "LangChain", "Git"
];

const TechList = () => (
  <div className="flex items-center shrink-0">
    {techStack.map((tech, index) => (
      <div key={index} className="flex items-center shrink-0 group">
        <span className="text-2xl font-medium text-background dark:text-foreground whitespace-nowrap group-hover:text-background/80 dark:group-hover:text-foreground/80">
          {tech}
        </span>
        <span className="mx-8 text-background/40 dark:text-foreground/40 transition-colors group-hover:text-background/60 dark:group-hover:text-foreground/60">
          •
        </span>
      </div>
    ))}
  </div>
);

const TechStackScroller = () => {
  const { ref: scrollerRef, isVisible: scrollerVisible } = useScrollAnimation();

  return (
    <section ref={scrollerRef} className={`py-16 bg-foreground dark:bg-background overflow-hidden ${scrollerVisible ? 'scroll-animate-fade' : 'opacity-0'}`}>
      <div className="max-w-full relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-foreground dark:from-background via-foreground/90 dark:via-background/90 to-transparent z-10" style={{ left: '-1px' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-foreground dark:from-background via-foreground/90 dark:via-background/90 to-transparent z-10" style={{ right: '-1px' }} />
        
        <div className="flex animate-scroll w-max">
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
`;

// Only inject if not already present
if (!document.getElementById("tech-scroller-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "tech-scroller-styles";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
