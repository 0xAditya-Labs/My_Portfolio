import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStackScroller from "@/components/TechStackScroller";
import About from "@/components/About";
import Timeline from "../components/Timeline";
import Projects from "@/components/Projects";
const CodingDashboard = lazy(() => import("@/components/CodingDashboard"));
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  // Sensible default (~520px) prevents the curtain margin from collapsing to 0
  const [footerHeight, setFooterHeight] = useState(520);
  const observerRef = useRef<ResizeObserver | null>(null);
  const isMobile = useIsMobile();

  // Handle scroll restoration and hash navigation when component mounts
  useEffect(() => {
    // Force manual scroll restoration to prevent browser from remembering scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Callback ref ensures ResizeObserver attaches reliably whenever the desktop footer node mounts,
  // preventing stale height or missed attachments after responsive transitions or route changes.
  const footerCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const updateHeight = (h: number) => {
        if (h > 0) setFooterHeight(Math.round(h));
      };

      const initialHeight = node.getBoundingClientRect().height || node.offsetHeight;
      updateHeight(initialHeight);

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
            updateHeight(h);
          }
        });
        observer.observe(node);
        observerRef.current = observer;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Mobile: keep normal static scroll (no curtain / fixed footer)
  if (isMobile) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <Hero />
        <TechStackScroller />
        
        <div className="bg-muted/30 dark:bg-card/40 transition-colors duration-300">
          <About />
        </div>
        
        <Timeline />
        
        <div className="bg-muted/30 dark:bg-card/40 transition-colors duration-300">
          <Projects />
        </div>
        
        <Suspense fallback={<div className="py-24" />}>
          <CodingDashboard />
        </Suspense>
        
        <div className="bg-muted/30 dark:bg-card/40 transition-colors duration-300">
          <FAQ />
        </div>
        
        <Contact />
        <Footer />
        <MobileFAB />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      
      {/* MAIN CONTENT CURTAIN 
        Given z-10 and a solid background to cover the footer.
        The margin-bottom allows you to scroll past the content just enough to reveal the footer.
      */}
      <main 
        className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-b-[2.5rem] sm:rounded-b-[3rem] overflow-hidden"
        style={{ marginBottom: footerHeight }}
      >
        <Navbar />
        <Hero />
        <TechStackScroller />
        
        <div className="bg-muted/30 dark:bg-card/40 transition-colors duration-300">
          <About />
        </div>
        
        <Timeline />
        
        <div className="bg-muted/30 dark:bg-card/40 transition-colors duration-300">
          <Projects />
        </div>
        
        <Suspense fallback={<div className="py-24" />}>
          <CodingDashboard />
        </Suspense>
        
        <div className="bg-muted/30 dark:bg-card/40 transition-colors duration-300">
          <FAQ />
        </div>
        
        <Contact />
      </main>
{/* FIXED FOOTER */}
      {/* 1. inset-0 and h-full make this wrapper cover the whole screen behind the curtain.
        2. flex & justify-end push the actual footer to the very bottom.
        3. IMPORTANT: Change 'bg-black' to whatever background color class your <Footer /> component uses!
      */}
      <div 
        className="fixed inset-0 w-full h-full z-0 flex flex-col justify-end bg-[#0a0a0a]"
      >
        <div ref={footerCallbackRef} className="w-full">
          <Footer />
        </div>
      </div>

      {/* Kept outside the stacking contexts so it remains floating above all */}
      <MobileFAB />
    </div>
  );
};

export default Index;