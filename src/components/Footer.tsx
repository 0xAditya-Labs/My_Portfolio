import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [lcRating, setLcRating] = useState<number | null>(null);
  const [lcTitle, setLcTitle] = useState<string>("Knight");

  useEffect(() => {
    fetch("/coding-journey-stats.json")
      .then((res) => res.json())
      .then((data) => {
        const rating = data?.leetcode?.currentRating || data?.leetcode?.maxRating;
        if (rating) {
          setLcRating(rating);
          if (rating >= 2150) setLcTitle("Guardian");
          else if (rating >= 1850) setLcTitle("Knight");
          else setLcTitle("User");
        }
      })
      .catch((err) => console.error("Failed to fetch LC stats for footer", err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <footer className="bg-[#0a0a0a] pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-12 lg:pb-6 relative overflow-hidden text-neutral-300">
      {/* Black atmospheric lighting system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        <div className="absolute -bottom-28 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-8 sm:px-16 lg:px-20 relative z-10">
        {/* Main Upper Section: Left Brand + Right Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12 mb-6 lg:mb-8">
          {/* Left Column: Identity & Positioning */}
          <div className="space-y-5 max-w-sm lg:w-1/3">
            {/* Primary & Secondary Identity Lockup: adityac.codes + [AC] */}
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                adityac<span className="text-neutral-500 font-normal">.codes</span>
              </h3>
              <div
                className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center overflow-hidden flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity shadow-inner"
                title="AC Seal"
              >
                <img
                  src="/preloader.svg"
                  alt="AC"
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              Building intelligent systems where AI meets full stack development. Final year CSE student at NIT Jalandhar.
            </p>

            {/* Social Links with Refined Software-Product Affordance */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="mailto:aditya.chauhan.nitj.ac@gmail.com"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white hover:border-white text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label="Send email to Aditya"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/aditya-chauhan-nitj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white hover:border-white text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label="Aditya's LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/0xAditya-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white hover:border-white text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label="Aditya's GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/AdityaNitj1204"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white hover:border-white text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label="Aditya's X (Twitter) profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>



          {/* Right Column: Anchored Navigation */}
          <div className="lg:text-right lg:w-1/3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-2.5 lg:items-end">
              <a
                href="/"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
              >
                Home
              </a>
              <a
                href="#projects"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
              >
                Projects
              </a>
              <a
                href="#about"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
              >
                Contact
              </a>
              <a
                href="#faq"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
              >
                FAQs
              </a>
            </nav>
          </div>
        </div>

        {/* Centered Back to Top - Positioned just above the line */}
        <div className="flex justify-center mb-4 lg:mb-6">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none underline underline-offset-4"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span className="font-medium">Back to top</span>
          </button>
        </div>

        {/* Lower Structure: Divided by Subtle Border */}
        <div className="pt-5 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <p className="text-sm text-neutral-400">
                © 2026 Aditya Chauhan. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.4)] animate-pulse" />
                LeetCode: <span className="text-neutral-200 font-mono">{lcTitle}</span>
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.4)] animate-pulse" />
                Rating: <span className="text-neutral-200 font-mono">{lcRating !== null ? lcRating : 1959}</span>
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.4)] animate-pulse" />
                CGPA: <span className="text-neutral-200 font-mono">8.53</span>
              </span>
            </div>
            
            <div className="flex flex-col items-center md:items-end text-sm text-neutral-400">
              <p>
                Made with <span className="inline-block text-rose-500/90 text-xs mx-0.5">❤️</span> in BLR
              </p>
              <span className="block text-[11px] text-white/40 mt-1 md:ml-6 tracking-wider">|| ਜੈ ਪ੍ਰਮਾਤਮਾ ||</span>
            </div>
          </div>

          {/* Center / Lower: Command Palette Affordance (Exact Copy, Tactile Keycap) */}
          <div className="mt-5 pt-2 flex justify-center">
            <button
              onClick={handleOpenCommandPalette}
              className="group inline-flex items-center gap-2 text-[11px] sm:text-xs text-neutral-400 hover:text-neutral-200 bg-white/[0.02] hover:bg-white/[0.05] active:bg-white/[0.08] px-3.5 sm:px-4 py-1.5 rounded-full border border-white/[0.08] hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Press Ctrl+K to open the command palette"
            >
              <span>Press</span>
              <kbd className="inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700/80 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.5)] group-hover:border-neutral-600 transition-colors">
                Ctrl+K
              </kbd>
              <span>to open the command palette</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
