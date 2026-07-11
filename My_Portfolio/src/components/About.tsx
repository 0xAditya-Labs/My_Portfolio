import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  
  const skills = {
    languages: ["C++", "Python", "C", "JavaScript"],
    frameworks: ["React.js", "Node.js", "Express.js", "FastAPI", "TailwindCSS", "DaisyUI"],
    databases: ["MongoDB", "MySQL", "ChromaDB"],
    ai: ["LangChain", "Langfuse", "OpenTelemetry", "Scikit-learn", "Pandas", "SHAP", "SMOTE"],
    core: ["Data Structures & Algorithms", "OOPs", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
    tools: ["Git", "GitHub", "Postman", "REST APIs", "WebSockets", "JWT"]
  };

  return (
    <section id="about" ref={aboutRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className={`space-y-8 ${aboutVisible ? 'scroll-animate' : ''}`}>
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                About Me
              </p>
              <h2 className="text-5xl font-bold mb-8">My background</h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                I'm a third-year Computer Science Engineering student at Dr. B.R. Ambedkar National Institute of Technology, Jalandhar, maintaining a <span className="font-bold text-black dark:text-white">CGPA of 8.53 (Top 4%ile)</span>. Currently, I work as a Software Development Engineer Intern at Accenture, where I've built a RAG-based Q&A microservice that reduced manual review time by 45%.
              </p>

              <p>
                My work sits at the intersection of systems engineering and applied AI — I genuinely enjoy reasoning through concurrency, system design, and OS internals, not just building on top of them. I've engineered a thread-safe LRU cache handling 15,000+ QPS at 3ms p99 latency, and a real-time RAG messaging platform delivering sub-50ms under concurrent load. I've also solved <span className="font-bold text-black dark:text-white">1,200+ DSA problems</span>, earning Specialist on Codeforces, Knight on LeetCode, and 3-star on CodeChef.
              </p>

              <p>
                What drives me is solving hard problems with measurable impact — whether it's high-throughput caching architecture, production-grade RAG pipelines, or leading algorithmic training for 150+ students as Co-Lead of the Google Developer Group at NIT Jalandhar.
              </p>
            </div>

          </div>

          {/* Right Content - Skills Card */}
          <div className={`bg-background/80 border border-border/50 backdrop-blur-md rounded-3xl p-8 shadow-xl ${aboutVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}>
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
