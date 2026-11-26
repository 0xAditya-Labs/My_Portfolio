import { useState, useEffect, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface AnalogItem {
  id: string;
  title: string;
  category: "sketches" | "other";
  medium: string;
  description: string;
  image: string;
}

const analogItems: AnalogItem[] = [
  {
    id: "ash-kalos-pencil",
    title: "Ash Ketchum (Pencil Study)",
    category: "sketches",
    medium: "Graphite on paper",
    description: "Hand-drawn graphite study exploring proportions and pencil shading.",
    image: "/analog_side/sketches/Ash-Kalos-1-pencil.webp",
  },
  {
    id: "ash-greninja",
    title: "Ash-Greninja (Bond Phenomenon)",
    category: "sketches",
    medium: "Ink & charcoal",
    description: "High-contrast pen-and-ink composition capturing the sync form.",
    image: "/analog_side/sketches/Ash-Greninja-1-BlackNWhite.webp",
  },
  {
    id: "ash-kalos-ink",
    title: "Ash Ketchum (Kalos Arc)",
    category: "sketches",
    medium: "Fine liner ink",
    description: "Focused character study emphasizing clean linework and detailing.",
    image: "/analog_side/sketches/Ash-Kalos-1-BlackNWhite.webp",
  },
];

const categories = [
  { id: "all", label: "All Works", count: analogItems.length },
  { id: "sketches", label: "✏️ Sketches", count: analogItems.length },
  { id: "future", label: "🏸 More Hobbies", count: 0, comingSoon: true },
];

const AnalogSide = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === "all"
    ? analogItems
    : analogItems.filter((item) => item.category === selectedCategory);

  const activeItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [activeModalIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [activeModalIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, handleClose, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  return (
    <section
      id="analog-side"
      ref={sectionRef}
      className="py-16 lg:py-20 bg-transparent relative scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header - Consistent with Projects, About & FAQ */}
        <div className={`mb-10 ${isVisible ? 'scroll-animate' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Beyond The Screen
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground">
                The Analog Side
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
                Life beyond terminals, compilers, and algorithmic contests. This is where I document offline pursuits, hands-on crafts, sports, and creative hobbies—grounding the digital work with physical patience, visual thinking, and balance.
              </p>
            </div>

            {/* Filter Tabs matching Projects style */}
            <div className="flex justify-start overflow-x-auto pb-2 md:pb-0 shrink-0">
              <div className="inline-flex items-center bg-secondary/50 rounded-full p-1.5 border border-border shadow-sm min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (!cat.comingSoon) setSelectedCategory(cat.id);
                    }}
                    disabled={cat.comingSoon}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      cat.comingSoon
                        ? "opacity-50 cursor-not-allowed text-muted-foreground"
                        : selectedCategory === cat.id
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/60 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {cat.label}
                    {cat.comingSoon ? (
                      <span className="ml-1.5 text-[10px] uppercase font-normal opacity-75">(Soon)</span>
                    ) : (
                      <span className="ml-1.5 text-xs opacity-70">({cat.count})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Cards Grid - Compact sizing */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${isVisible ? 'scroll-animate scroll-animate-delay-1' : ''}`}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveModalIndex(index)}
              className="group relative bg-card rounded-xl border border-border/70 hover:border-blue-500/50 dark:hover:border-blue-400/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
            >
              {/* Image Frame - Compact height */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-muted/30 flex items-center justify-center p-2.5">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-[1.03]"
                />

                {/* Subtle Hover Action */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/95 text-foreground text-xs font-medium shadow-sm">
                    <Maximize2 className="w-3 h-3 text-blue-500" />
                    <span>View</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Blue Text Transition on Hover */}
              <div className="p-3.5 border-t border-border/50 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground/80">
                  <span className="font-medium text-foreground/70">
                    {item.medium}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    View &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous sketch"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next sketch"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-card border border-border rounded-xl p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center max-h-[72vh] mb-3 overflow-hidden rounded bg-muted/20 p-2">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded"
              />
            </div>

            <div className="w-full flex items-center justify-between pt-2 border-t border-border/50">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {itemMediumSummary(activeItem.medium, activeItem.description)}
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {activeModalIndex! + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function itemMediumSummary(medium: string, description: string): string {
  return `${medium} • ${description}`;
}

export default AnalogSide;
