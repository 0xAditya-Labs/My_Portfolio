import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  
  const skills = {
    fullstack: [
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "MongoDB",
      "MySQL",
      "REST APIs",
      "WebSockets"
    ],
    ml: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "SMOTE"
    ],
    tools: [
      "C++",
      "C",
      "System Design",
      "Concurrency",
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Git",
      "GitHub",
      "Vercel"
    ],
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
          <div className={`glass-card rounded-3xl p-8 shadow-xl ${aboutVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}>
            <h3 className="text-2xl font-bold mb-8">Skills & Expertise</h3>

            <div className="space-y-8">
              {/* Software & Full-Stack Development */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Software & Full-Stack Development
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.fullstack.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Machine Learning & Computer Vision */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Machine Learning & Computer Vision
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.ml.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Developer Tools & Ecosystem */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Developer Tools & Ecosystem
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium border border-border hover:border-black dark:hover:border-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
