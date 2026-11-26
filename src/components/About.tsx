import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchCodingJourneyStats } from "@/lib/codingStats";

const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();

  // Dynamic peak stats initialized with latest verified values to prevent layout shift
  const [stats, setStats] = useState({
    lcTitle: "Knight",
    lcPeak: 2003,
    lcTop: "2.6",
    cfRank: "Specialist",
    cfPeak: 1461,
    ccStars: "3-star",
    totalSolved: "1,500+"
  });

  useEffect(() => {
    fetchCodingJourneyStats()
      .then((data) => {
        if (!data) return;

        // 1. LeetCode peak rating, title and top percentile
        const lcPeak = data.leetcode?.maxRating ?? 2003;
        const lcTitle =
          lcPeak >= 2150 ? "Guardian" :
          lcPeak >= 1850 ? "Knight" : "Top Solver";
        const topPct = data.leetcode?.topPercentage;
        const lcTop =
          topPct != null
            ? (topPct % 1 !== 0 ? topPct.toFixed(1) : topPct.toString())
            : "2.6";

        // 2. Codeforces peak rating and rank title
        const cfPeak = data.codeforces?.maxRating ?? 1461;
        let cfRank = data.codeforces?.maxRankTitle;
        if (!cfRank) {
          if (cfPeak >= 2400) cfRank = "Grandmaster";
          else if (cfPeak >= 2100) cfRank = "Master";
          else if (cfPeak >= 1900) cfRank = "Candidate Master";
          else if (cfPeak >= 1600) cfRank = "Expert";
          else if (cfPeak >= 1400) cfRank = "Specialist";
          else if (cfPeak >= 1200) cfRank = "Pupil";
          else cfRank = "Newbie";
        } else {
          cfRank = cfRank.charAt(0).toUpperCase() + cfRank.slice(1);
        }

        // 3. CodeChef stars
        const ccPeak = data.codechef?.maxRating ?? 1661;
        let ccStars = "";
        if (data.codechef?.maxStars) {
          const count = (data.codechef.maxStars.match(/★/g) || []).length;
          if (count > 0) {
            ccStars = `${count}-star`;
          }
        }
        if (!ccStars) {
          if (ccPeak >= 2500) ccStars = "7-star";
          else if (ccPeak >= 2200) ccStars = "6-star";
          else if (ccPeak >= 2000) ccStars = "5-star";
          else if (ccPeak >= 1800) ccStars = "4-star";
          else if (ccPeak >= 1600) ccStars = "3-star";
          else if (ccPeak >= 1400) ccStars = "2-star";
          else ccStars = "1-star";
        }

        // 4. Total Solved across all platforms
        const total = data.totalSolvedAllPlatforms ?? 1522;
        const roundedSolved = Math.floor(total / 100) * 100;
        const totalSolved = `${roundedSolved.toLocaleString()}+`;

        setStats({
          lcTitle,
          lcPeak,
          lcTop,
          cfRank,
          cfPeak,
          ccStars,
          totalSolved
        });
      })
      .catch((err) => console.error("Failed to load coding stats for About section", err));
  }, []);

  const skills = {
    languages: ["C++", "Python", "JavaScript", "SQL", "C"],
    frameworks: ["React.js", "Node.js", "Express.js", "FastAPI", "TailwindCSS", "DaisyUI"],
    databases: ["MongoDB", "MySQL", "ChromaDB", "Redis"],
    ai: ["RAG", "LangChain", "LangGraph", "ChromaDB", "Sentence Transformers", "Langfuse", "OpenTelemetry", "Scikit-learn", "SHAP"],
    core: ["Data Structures & Algorithms", "Low-Level Design", "Concurrency", "Multithreading", "OOPs", "DBMS", "Operating Systems", "Computer Networks"],
    tools: ["Git", "GitHub", "Postman", "REST APIs", "WebSockets", "Redis", "JWT"]
  };

  return (
    <section id="about" ref={aboutRef} className="pt-12 pb-16 lg:pt-14 lg:pb-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className={`space-y-8 ${aboutVisible ? 'scroll-animate' : ''}`}>
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                About Me
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">My background</h2>
            </div>

            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Final-year CSE at <strong className="text-foreground font-semibold">NIT Jalandhar</strong> (<span className="font-semibold text-foreground">CGPA 8.56, Top 4%ile</span>). My focus is on first-principles systems engineering, OS internals, and concurrent architecture.
              </p>

              <p>
                Recently completed my SDE Internship at <strong className="text-foreground font-semibold">Accenture</strong>, engineering an internal LangGraph ReAct agent with FastAPI and OpenTelemetry that slashed vector retrieval latency by <span className="font-semibold text-foreground">69% (180ms)</span> and cut token usage by <span className="font-semibold text-foreground">34%</span>.
              </p>

              <div className="space-y-2 pl-4 border-l-2 border-border/80 text-sm md:text-base">
                <p>
                  <strong className="text-foreground font-semibold">SwiftCache</strong> — Thread-safe concurrent LRU cache in C++ sustaining <span className="font-semibold text-foreground">160,000+ QPS</span> at p99 &lt; 0.24ms.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">Interlock</strong> — Distributed real-time messaging engine delivering verified <span className="font-semibold text-foreground">35ms p95 latency</span> under saturated cluster load.
                </p>
              </div>

              <p className="text-sm md:text-base">
                Obsessed with algorithmic rigor: solved over <span className="font-semibold text-foreground">{stats.totalSolved} DSA problems</span>, achieving <strong className="text-foreground font-semibold">{stats.lcTitle} on LeetCode</strong> ({stats.lcPeak} peak, Top {stats.lcTop}%ile), <strong className="text-foreground font-bold">Codeforces {stats.cfRank}</strong> ({stats.cfPeak} peak), and <strong className="text-foreground font-semibold">CodeChef {stats.ccStars}</strong>. Qualified for <strong className="text-foreground font-semibold">Meta Hacker Cup Round 2</strong> and twice a national <strong className="text-foreground font-semibold">Flipkart GRiD Semi-Finalist</strong> (Top 0.5% of 170k+).
              </p>

              <p className="text-sm md:text-base">
                Official reference contributor to <strong className="text-foreground font-semibold">XERJ Corpus Hub</strong> (&gt;19k stars), and <strong className="text-foreground font-semibold">GDG CP Lead</strong> at NIT Jalandhar — authored 35 contest problems and mentored 70+ juniors in advanced DSA.
              </p>
            </div>

          </div>

          {/* Right Content - Skills Card */}
          <div
            className={`premium-card rounded-3xl p-8 ${aboutVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}
          >
            <h3 className="text-2xl font-bold mb-8">Skills & Expertise</h3>

            <div className="space-y-6">
              {Object.entries({
                "Languages": skills.languages,
                "Frameworks": skills.frameworks,
                "Databases": skills.databases,
                "AI / ML": skills.ai,
                "Core CS": skills.core,
                "Tools": skills.tools,
              }).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
