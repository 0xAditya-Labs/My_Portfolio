import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("theme-reminder-seen")) {
      setHasDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || hasDismissed) return;

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
        });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 400 && !hasDismissed && !showReminder) {
        updatePosition();
        setShowReminder(true);
        setTimeout(() => {
          setShowReminder(false);
          setHasDismissed(true);
          localStorage.setItem("theme-reminder-seen", "true");
        }, 6000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePosition);
    };
  }, [mounted, hasDismissed, showReminder]);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          setShowReminder(false);
          setHasDismissed(true);
          localStorage.setItem("theme-reminder-seen", "true");
        }}
        className="relative rounded-full w-10 h-10 hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 transition-all duration-300 rotate-0 text-foreground/70 group-hover:text-foreground" />
        ) : (
          <Moon className="h-5 w-5 transition-all duration-300 rotate-0 text-foreground/70 group-hover:text-foreground" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Theme Reminder Popup — Dynamically anchored right under the Moon/Sun icon */}
      {showReminder && coords && (
        <div
          className="fixed z-[100] -translate-x-1/2 bg-black/95 dark:bg-white/95 text-white dark:text-black px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-xl backdrop-blur-sm border border-black/10 dark:border-white/10 whitespace-nowrap text-center animate-in fade-in duration-300 pointer-events-none"
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
        >
          Try changing the theme ✨
          {/* Arrow pointing UP directly into the moon/sun icon */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-transparent border-b-black/95 dark:border-b-white/95" />
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
