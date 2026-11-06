import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef } from "react";
import { useFastFloat } from "@/hooks/useFastFloat";

const Hero = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const blobA = useRef<HTMLDivElement | null>(null);
  const blobB = useRef<HTMLDivElement | null>(null);
  const blobC = useRef<HTMLDivElement | null>(null);
  const blobD = useRef<HTMLDivElement | null>(null);
  const { animate } = useFastFloat();

  useEffect(() => {
    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;
    const update = () => {
      const inner = typeof window !== 'undefined' ? window.innerWidth <= 767 : false;
      setIsMobile((mq && mq.matches) || inner);
    };
    update();
    mq?.addEventListener?.('change', update);
    return () => mq?.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 360px)') : null;
    const update = () => {
      const inner = typeof window !== 'undefined' ? window.innerWidth <= 360 : false;
      setIsNarrow((mq && mq.matches) || inner);
    };
    update();
    mq?.addEventListener?.('change', update);
    return () => mq?.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const stopA = animate(blobA.current);
      const stopB = animate(blobB.current);
      const stopC = animate(blobC.current);
      const stopD = animate(blobD.current);
      return () => {
        stopA(); stopB(); stopC(); stopD();
      };
    }
    [blobA, blobB, blobC, blobD].forEach((r) => { if (r.current) r.current.style.transform = ''; });
    return;
  }, [isMobile]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
    }
  };

  const MouseIndicator = () => (
    <button
      type="button"
      onClick={scrollToNext}
      className="inline-flex flex-col items-center gap-1.5 cursor-pointer group text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
      aria-label="Scroll to explore more"
    >
      <div className="w-[22px] h-[34px] rounded-full border-2 border-foreground/40 dark:border-white/40 group-hover:border-foreground dark:group-hover:border-white transition-colors flex justify-center pt-1.5 shadow-sm">
        <div className="w-1 h-2 rounded-full bg-foreground/70 dark:bg-white/70 group-hover:bg-foreground dark:group-hover:bg-white animate-mouse-wheel" />
      </div>
      <span className="text-xs font-medium tracking-wide">
        Scroll to explore more
      </span>
    </button>
  );

  return (
    <section ref={heroRef} className="min-h-[85vh] bg-background relative overflow-hidden pt-[88px] sm:pt-[90px] lg:pt-[92px] pb-6 sm:pb-8 flex flex-col justify-start">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={blobA}
          className={`absolute top-20 left-10 w-48 h-48 rounded-full will-change-transform ${isMobile ? '' : 'animate-float-sm md:animate-float'}`}
          style={{ background: 'radial-gradient(circle, rgba(191,219,254,0.3) 0%, rgba(191,219,254,0) 70%)' }}
        />
        <div
          ref={blobB}
          className={`absolute top-40 right-20 w-64 h-64 rounded-full will-change-transform ${isMobile ? '' : 'animate-float-sm md:animate-float'}`}
          style={{ background: 'radial-gradient(circle, rgba(233,213,255,0.2) 0%, rgba(233,213,255,0) 70%)', animationDelay: '1s' }}
        />
        <div
          ref={blobC}
          className={`absolute bottom-40 left-1/4 w-56 h-56 rounded-full will-change-transform ${isMobile ? '' : 'animate-float-sm md:animate-float'}`}
          style={{ background: 'radial-gradient(circle, rgba(251,207,232,0.2) 0%, rgba(251,207,232,0) 70%)', animationDelay: '2s' }}
        />
        <div
          ref={blobD}
          className={`absolute top-1/3 right-1/3 w-40 h-40 rounded-full will-change-transform ${isMobile ? '' : 'animate-float-sm md:animate-float'}`}
          style={{ background: 'radial-gradient(circle, rgba(165,243,252,0.3) 0%, rgba(165,243,252,0) 70%)', animationDelay: '0.5s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 lg:gap-8 items-start relative z-10 w-full">
        {/* Command Palette Hint - Overlaid on main content top right */}
        <div className="absolute top-0 right-0 z-20 hidden sm:block">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-card text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-black/20 dark:border-white/10 transform-gpu">
            Press <kbd className="px-2 py-0.5 mx-1 bg-gray-300/60 dark:bg-gray-800/60 border border-black/20 dark:border-white/20 rounded text-xs font-mono font-semibold">Ctrl+K</kbd> to open the command palette
          </div>
        </div>

        {/* Left Content */}
        <div className={`flex flex-col ${heroVisible ? 'scroll-animate' : ''}`}>
          <div className="space-y-5 lg:space-y-6">
            {/* Role Badge */}
            <div className="inline-block mb-3 sm:mb-5 lg:mb-6">
              {isNarrow ? (
                <div className="marquee" aria-hidden>
                  <div className="marquee__inner bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                    <span>Full Stack Developer • AI Engineer • Competitive Programmer</span>
                  </div>
                </div>
              ) : (
                <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                  Full Stack Developer • AI Engineer • Competitive Programmer
                </span>
              )}
            </div>

            {/* Heading */}
            <h1 className="tracking-tight leading-none">
              <span className="block text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-2">
                Hi, I'm
              </span>
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[4.2rem] font-bold text-foreground">
                Aditya Chauhan
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              I solve real problems through thoughtful engineering, combining strong fundamentals with practical execution. I care deeply about performance, clarity, and building systems that scale beyond prototypes.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-1">
              <Button
                size="lg"
                className="rounded-full gap-2 px-8 py-5 text-base font-medium btn-premium-shine"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View my work
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full gap-2 px-8 py-5 text-base font-medium border-2 border-primary dark:border-white hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-white dark:hover:text-black dark:hover:border-black btn-premium-shine"
                onClick={() => window.open('https://drive.google.com/file/d/12E7e1ekxWTeVEhGxGmEuJIaZjH-E4Ht5/view?usp=sharing', '_blank')}
              >
                View Resume
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Desktop Mouse Scroll Indicator - Lifted above the bottom, to the left of image and right of buttons */}
          <div className="hidden lg:flex justify-end pt-5 lg:pt-7 pr-6 xl:pr-12">
            <MouseIndicator />
          </div>
        </div>

        {/* Right Content - Profile Image */}
        <div className={`relative mt-8 lg:mt-0 ${heroVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Subtle framed border */}
            <div className="rounded-3xl p-1 bg-white/60 dark:bg-card/30 relative">
              <img
                src="/Aditya-PFP.webp"
                alt="Profile"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-[360px] sm:h-[400px] md:h-[440px] lg:h-[460px] xl:h-[475px] object-cover rounded-2xl transition-transform duration-500 scale-150 sm:scale-100 sm:group-hover:scale-105"
              />
              {/* Vignette effect overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none block"
                style={{
                  background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 100%)'
                }}
              ></div>
            </div>

            {/* Mantra — touches base of photo with a small gap */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pointer-events-none">
              <p className="text-xs sm:text-xs text-yellow-400 tracking-wide font-medium drop-shadow-md">|| ॐ कृष्णाय नमः || ॐ नमः शिवाय ||</p>
            </div>

            {/* Available / CTA text — sits right above the mantra, with safe right padding to never collide with the floating AI button */}
            <div className="absolute bottom-6 left-4 right-4 rounded-2xl px-4 pt-4 pb-2 pr-16 sm:pr-20 md:pr-24 text-white border-white/10 drop-shadow-lg">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider mb-1 text-white/80 font-semibold">Available for work</p>
              <p className="text-sm sm:text-base md:text-lg font-semibold leading-snug max-w-sm sm:max-w-md">Let's talk systems and architecture, or collaborate on our next big idea!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Mouse Scroll Indicator - Centered below on smaller devices */}
      <div className="flex lg:hidden justify-center w-full pt-8 pb-4 relative z-10">
        <MouseIndicator />
      </div>
    </section>
  );
};

export default Hero;
