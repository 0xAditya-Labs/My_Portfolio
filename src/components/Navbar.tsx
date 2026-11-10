import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  Sheet,
  SheetPortal,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    let mouseRaf: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRaf) return;
      mouseRaf = requestAnimationFrame(() => {
        mouseRaf = null;
        if (window.innerWidth < 915) return;
        const updatePupil = (eye: HTMLDivElement | null, pupil: HTMLDivElement | null) => {
          if (!eye || !pupil) return;
          const rect = eye.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;
          const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
          const distance = Math.min(
            4,
            Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 100
          );
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          pupil.style.transform = `translate(${x}px, ${y}px)`;
        };
        updatePupil(leftEyeRef.current, leftPupilRef.current);
        updatePupil(rightEyeRef.current, rightPupilRef.current);
      });
    };

    let scrollRaf: number | null = null;
    let lastIsScrolled = false;
    let lastActiveSection = "";

    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

        if (scrollProgressRef.current) {
          scrollProgressRef.current.style.width = `${progress * 100}%`;
        }

        const nextScrolled = scrollTop > 20;
        if (nextScrolled !== lastIsScrolled) {
          lastIsScrolled = nextScrolled;
          setIsScrolled(nextScrolled);
        }

        const sections = [
          "about",
          "projects",
          "coding-dashboard",
          "opensource",
        ];
        const scrollPosition = scrollTop + 150;
        let foundSection = "";
        for (const sectionId of sections) {
          const element =
            document.getElementById(sectionId) ||
            document.querySelector(`[data-section="${sectionId}"]`);
          if (element instanceof HTMLElement) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              foundSection = sectionId;
              break;
            }
          }
        }

        if (scrollTop < 100) foundSection = "";
        if (foundSection !== lastActiveSection) {
          lastActiveSection = foundSection;
          setActiveSection(foundSection);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "About", path: "#about", section: "about" },
    { name: "Projects", path: "#projects", section: "projects" },
    { name: "Problem Solving", path: "#coding-dashboard", section: "coding-dashboard" },
    { name: "Open Source", path: "#opensource", section: "opensource" },
  ];

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (mobileMenuOpen) {
      try {
        const active = document.activeElement as HTMLElement | null;
        if (active && typeof active.blur === "function") active.blur();
        document.body.style.overflow = "hidden";
      } catch {
        /* ignore */
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  if (!isMounted) return null;

  return (
    <>
      <style>{`
        @keyframes nav-slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes nav-slide-out {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "px-4 sm:px-6 pt-6" : "px-0 pt-0"
        }`}
      >
        <nav
          className={`mx-auto px-4 sm:px-8 py-4 flex items-center relative transition-all duration-300 overflow-hidden ${
            isScrolled
              ? "max-w-[85em] rounded-full premium-nav"
              : "max-w-full rounded-none premium-nav border-x-0 border-t-0"
          }`}
        >
          {/* ✅ Scroll Underline */}
          <div
            ref={scrollProgressRef}
            className="absolute bottom-0 left-0 h-[3px] rounded-b-full z-[5] transition-opacity duration-300 ease-out dark:bg-white bg-black pointer-events-none"
            style={{
              width: "0%",
              opacity: isScrolled ? 1 : 0,
              boxShadow:
                "0 0 6px rgba(0,0,0,0.3), 0 0 6px rgba(255,255,255,0.2)",
            }}
          />

          {/* Left - Logo (Clicking navigates/scrolls to landing page) */}
          <Link
            to="/"
            title="adityac.codes — Home"
            onClick={(e) => {
              if (window.location.pathname === "/" || window.location.pathname === "") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                if (window.location.hash) {
                  history.pushState(null, "", window.location.pathname);
                }
              }
            }}
            className="text-xl font-bold z-10 flex-shrink-0 cursor-pointer group"
          >
            <span className="text-foreground whitespace-nowrap transition-colors group-hover:text-primary">adityac</span>
            <span className="text-muted-foreground whitespace-nowrap">.codes</span>
          </Link>

          {/* Center - Eyes */}
          <div className="hidden min-[915px]:flex items-center gap-1.5 z-10 flex-1 justify-center mx-4">
            <div
              ref={leftEyeRef}
              className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center relative overflow-hidden"
            >
              <div
                ref={leftPupilRef}
                className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full absolute will-change-transform"
              />
            </div>
            <div
              ref={rightEyeRef}
              className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center relative overflow-hidden"
            >
              <div
                ref={rightPupilRef}
                className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full absolute will-change-transform"
              />
            </div>
          </div>

          {/* Right - Navigation */}
          <div className="z-10 flex items-center gap-2 flex-shrink-0 ml-auto">
            <div className="hidden min-[915px]:flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === link.section
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <ThemeToggle />
              <Button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-full gap-2 px-6 py-2.5 text-sm font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 ml-2 btn-premium-shine cursor-pointer"
              >
                Let's talk
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile */}
            <div className="flex min-[915px]:hidden items-center gap-2">
              <ThemeToggle />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    aria-label="Open menu"
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-md"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetPortal>
                  <div
                    className={`fixed inset-0 z-[9998] bg-black/80 transition-opacity duration-300 ease-in-out ${
                      mobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                    onClick={closeMenu}
                  />

                  <div
                    className="fixed inset-y-0 right-0 z-[9999] h-full border-l bg-background shadow-2xl transform overflow-y-auto"
                    aria-hidden={!mobileMenuOpen}
                    style={{
                      animation: mobileMenuOpen
                        ? "nav-slide-in 300ms forwards ease-out"
                        : "nav-slide-out 300ms forwards ease-in",
                      willChange: "transform",
                      width: "min(85vw, 400px)",
                      maxWidth: "400px",
                    }}
                  >
                    <div className="p-6 h-full w-full">
                      <Button
                        type="button"
                        onClick={closeMenu}
                        className="absolute right-4 top-4 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 flex items-center justify-center p-0 z-10"
                      >
                        <X className="h-5 w-5 text-foreground" />
                        <span className="sr-only">Close</span>
                      </Button>

                      <div className="pt-12 w-full">
                        <SheetTitle className="text-xl font-bold mb-2">
                          Menu
                        </SheetTitle>
                        <SheetDescription className="text-sm text-muted-foreground mb-6">
                          Navigate to different sections
                        </SheetDescription>

                        <nav className="flex flex-col gap-2 w-full">
                          {navLinks.map((link) => (
                            <a
                              key={link.name}
                              href={link.path}
                              onClick={closeMenu}
                              className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                                activeSection === link.section
                                  ? "bg-foreground text-background"
                                  : "text-foreground hover:bg-secondary"
                              }`}
                            >
                              {link.name}
                            </a>
                          ))}
                          <Button
                            onClick={() => {
                              closeMenu();
                              const contactSection = document.getElementById("contact");
                              if (contactSection) {
                                contactSection.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className="w-full rounded-full gap-2 px-6 py-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 mt-4 cursor-pointer"
                          >
                            Let's talk
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </SheetPortal>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
