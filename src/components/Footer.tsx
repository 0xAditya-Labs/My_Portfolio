import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <footer className="bg-[#0a0a0a] py-16 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-6 max-w-md">
            <h3 className="text-2xl font-bold text-white">adityac.codes</h3>
            <p className="text-gray-400">
              Building intelligent systems where AI meets full stack development. Final year CSE student at NIT Jalandhar.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:aditya.chauhan.nitj.ac@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://linkedin.com/in/aditya-chauhan-nitj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://github.com/0xAditya-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://x.com/AdityaNitj1204"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Right Column - Navigation */}
          <div className="lg:justify-self-end lg:text-right">
            <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
            <nav className="space-y-2">
              <a href="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="#projects" className="block text-gray-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQs
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2026 Aditya Chauhan. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors ml-0 sm:ml-4"
              >
                <span>Back to top</span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>
            </div>
            <div className="flex gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                LeetCode: {lcTitle}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Rating: {lcRating !== null ? lcRating : 1956}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                CGPA: 8.53
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Made with ❤️ in BLR
              <span className="block text-xs text-white/40 mt-1 ml-6">|| ਜੈ ਪ੍ਰਮਾਤਮਾ ||</span>
            </p>
          </div>

          {/* Command Palette Hint */}
          <div className="mt-6 hidden sm:flex justify-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span>Press</span>
              <kbd className="px-2 py-1 text-xs font-semibold bg-white/10 border border-white/20 rounded text-white">
                Ctrl+K
              </kbd>
              <span>to open the command palette</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
