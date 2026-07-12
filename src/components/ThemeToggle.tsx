import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("theme-reminder-seen")) {
      setHasDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || hasDismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 500 && !hasDismissed && !showReminder) {
        setShowReminder(true);
        setTimeout(() => {
          setShowReminder(false);
          setHasDismissed(true);
          localStorage.setItem("theme-reminder-seen", "true");
        }, 6000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, hasDismissed, showReminder]);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <Button
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
      {/* Theme Reminder Popup styled like AI Sparkle */}
      {showReminder && (
        <div 
          className="fixed top-20 right-4 sm:top-20 sm:right-16 z-[100] bg-black/90 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm border border-black/10 dark:border-white/10 max-w-[200px] text-center animate-in fade-in duration-500 pointer-events-none"
        >
          Try changing the theme ✨
          {/* Arrow pointing UP towards the button */}
          <div className="absolute bottom-full right-4 sm:right-6 transform w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-black/90 dark:border-b-white/90" />
        </div>
      )}
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-all duration-300 rotate-0 text-foreground/70 group-hover:text-foreground" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-300 rotate-0 text-foreground/70 group-hover:text-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
