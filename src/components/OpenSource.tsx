import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Star,
  Sparkles,
  BookOpen,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const OpenSource = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="opensource"
      ref={sectionRef}
      className="py-16 px-6 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Single Section Heading ── */}
        <div className={`text-center mb-8 ${isVisible ? "scroll-animate" : ""}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Open source contribution
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-2">
            Open-source developer tooling and verified AI reference memory
          </p>
        </div>

        {/* ── Wide Full-Width Card (Sleek, Compact & Readable at a Glance) ── */}
        <div className={`w-full ${isVisible ? "scroll-animate scroll-animate-delay-1" : ""}`}>
          <Card className="w-full rounded-2xl sm:rounded-3xl border border-border/60 bg-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-5">
              
              {/* ── Header: Contribution #01 distinctly separated from Star and Verified pills ── */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/40">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Contribution #01 Tag - Distinctly highlighted & separated */}
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider shadow-sm">
                    Contribution #01
                  </span>

                  {/* Visual separation */}
                  <span className="text-border dark:text-border/60 hidden sm:inline select-none">
                    |
                  </span>

                  {/* Supporting pills */}
                  <a
                    href="https://github.com/xerj-org/xerj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5 hover:bg-amber-500/20 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    ★ &gt; 19,000 Stars
                  </a>

                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Reference
                  </span>
                </div>

                {/* Live Official Contributor Badge */}
                <div className="shrink-0 flex items-center">
                  <a
                    href="https://hub.xerj.org/contributors/0xAditya-Labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-85 transition-opacity"
                    title="XERJ Corpus Hub Verified Contributor Profile"
                  >
                    <img
                      src="https://hub.xerj.org/contributors/0xAditya-Labs/badge.svg"
                      alt="XERJ Corpus Hub Contributor Badge"
                      className="h-5 sm:h-6 object-contain"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>

              {/* ── Core Content: Clear & Scannable in 5 Seconds (No Internal Cards) ── */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-foreground shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    xerj-org / xerj
                  </h3>
                  <span className="text-xs text-muted-foreground hidden md:inline">
                    &bull; High-performance Rust AI Search Engine &amp; MCP Server
                  </span>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Selected as an official reference contributor for the <strong className="text-foreground font-semibold">XERJ Corpus Hub</strong> (&gt;19,000 GitHub stars). My implementation in <code className="text-xs bg-muted/80 px-1.5 py-0.5 rounded text-foreground font-mono">0xAditya-Labs/My_Portfolio</code> (commit <span className="font-mono text-foreground font-medium">4c18ca9098</span>) was curated into the global memory index — enabling autonomous AI coding agents to search, cite, and retrieve production-grade TypeScript &amp; 3D canvas patterns instead of hallucinating code.
                </p>
              </div>

              {/* ── Tags: Clean inline pills ── */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Rust (Upstream)",
                  "Model Context Protocol (MCP)",
                  "TypeScript",
                  "AI Search Engine",
                  "Agent Reference Memory",
                  "MIT License",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/80 border border-border/50 text-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* ── Blue Action Links (Consistent with other components) ── */}
              <div className="pt-4 border-t border-border/40 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="https://github.com/xerj-org/xerj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>View xerj-org/xerj on GitHub (★ 19k+)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://hub.xerj.org/contributors/0xAditya-Labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>View Contributor Profile (@0xAditya-Labs)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://hub.xerj.org/corpus/0xaditya-labs--my-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Inspect My_Portfolio Corpus on Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
