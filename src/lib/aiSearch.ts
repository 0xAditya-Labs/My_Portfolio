// Resume context for AI assistant
const RESUME_CONTEXT = `PERSONAL INFORMATION & CONTACT:
Name: Aditya Chauhan
Role: Software Engineer & Competitive Programmer
Born: August 2005
Hometown: Ludhiana, Punjab
Languages: English, Hindi, Punjabi
Email: aditya.chauhan.nitj.ac@gmail.com
LinkedIn: linkedin.com/in/aditya-chauhan-nitj
GitHub: github.com/0xAditya-Labs
Portfolio: adityac.codes
EDUCATION & ACADEMICS:
1. Dr. B.R. Ambedkar National Institute of Technology Jalandhar (Aug 2023 – Jun 2027)
   Bachelor of Technology in Computer Science and Engineering | CGPA: 8.56 / 10.0 (Top 4%ile)
2. DAV Public School, BRS Nagar, Ludhiana (Jul 2022 – Jun 2023)
   Class XII, CBSE: 94%
3. DAV Public School, BRS Nagar, Ludhiana
   Class X, CBSE: 92%
4. Competitive Exams: JEE Main & Advanced (AIR 12,000)
PROFESSIONAL SUMMARY:
Aditya Chauhan is a final-year Computer Science Engineering student at NIT Jalandhar (CGPA 8.56, Top 4%ile). He recently completed a Software Engineering Internship at Accenture building GenAI and RAG-based systems. Currently, he is building scalable projects targeting real users, enjoying competitive programming, and actively exploring his next opportunity. He specializes in high-performance concurrent systems, applied AI, and full-stack web development, with a strong competitive programming background (Specialist on Codeforces, Knight on LeetCode, 3-star on CodeChef).
WORK EXPERIENCE:
1. Software Development Engineer Intern — Accenture, Bengaluru (Jun 2026 – Jul 2026)
   - Built an internal LangGraph ReAct agent prototype with a FastAPI backend to benchmark retrieval performance.
   - Optimized vector-search latency by 69% (to 180ms) via OpenTelemetry and refactoring ChromaDB client to singleton pattern.
   - Decreased LLM input-token usage by 34% via doc-string tool-gating, suppressing 93% of out-of-scope API calls.
2. Competitive Programming Lead — Google Developer Group, NIT Jalandhar (Dec 2024 – May 2026)
   - Mentored 70+ juniors in advanced DSA cohorts, boosting contest problem solve-rates by 40%.
   - Authored 35 original algorithmic problems with test cases and reference solutions across 16 campus contests; coordinated CodeVerse and CodeHunt for 90+ participants.
3. Group Representative — CSE, NIT Jalandhar (Dec 2023 – May 2025)
   - Represented 1 of 6 CSE groups (28 members), streamlining faculty-student communication and academic coordination.
TECHNICAL SKILLS:
- Languages: C++, Python, JavaScript, SQL, C
- Core CS: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, DBMS, Computer Networks, Low-Level Design, System Design
- Web Development: React.js, Node.js, Express.js, FastAPI, REST APIs, WebSockets, MongoDB, MySQL, Tailwind CSS, DaisyUI
- Generative AI & ML: Retrieval-Augmented Generation (RAG), LangChain, LangGraph, ChromaDB, Sentence Transformers, Langfuse, OpenTelemetry, Scikit-learn, Pandas, SMOTE, SHAP
- Systems & Tools: Multithreading, Concurrency, Redis, OpenTelemetry, Git, GitHub, Postman, Langfuse, JWT, Vercel
PROJECT PORTFOLIO:
1. SwiftCache – Thread-Safe Concurrent LRU Cache Server
   - Tech: C++17, TCP, POSIX Sockets, Concurrency, Multithreading
   - Architected a C++17 multithreaded TCP cache server featuring a custom binary/text wire protocol for network I/O.
   - Sustained 160,000+ QPS at p99 < 0.24ms by implementing a hybrid TTL eviction policy with active background reaping.
   - Mitigated hot-key contention across 512 concurrent connections via 16-shard lock striping, achieving linear scaling on a 1M-key Zipfian workload.
   - Profiled median RTT (87 µs), where C++ cache logic consumes <1% (~300ns), while the Linux TCP stack accounts for >99%.
2. Interlock – Distributed Real-Time Messaging Platform
   - Tech: MERN Stack, Socket.io, Redis, JWT, Cloudinary, TailwindCSS
   - Engineered distributed WebSocket connections and private API routes using JWT authentication and Bcrypt hashing.
   - Achieved 100% message delivery at 35ms p95 latency for 400 concurrent WebSockets by architecting a dual-server backend with Redis Pub/Sub to bypass event loop saturation.
   - Eliminated multi-tab false-offline race conditions by implementing atomic reference counting (INCR/DECR) in Redis.
   - Minimized message payloads by 80% by offloading media processing from base64 to an asynchronous Cloudinary CDN.
3. ContextIQ — RAG-Based IT Support Assistant
   - Tech: Python, LangGraph, FastAPI, ChromaDB, Langfuse, OpenTelemetry, Gemini API
   - Stateful ReAct assistant achieving 69% vector latency cut (to 180ms) and 34% token reduction via docstring tool-gating.
4. RetainOps / ISP Customer Retention Platform
   - Tech: React, FastAPI, Scikit-learn, SHAP Explainable AI
   - B2B churn prediction & decision dashboard addressing 3:1 class imbalance with SMOTE and explainable inference.
COMPETITIVE PROGRAMMING & ACHIEVEMENTS:
- Meta Hacker Cup 2025: Advanced to Round 2, securing Global Rank 3172 (AIR 875).
- Flipkart GRiD 2025 and 2026: Semi-Finalist in 7.0 (2025) and 8.0 (2026), placing in top 0.5% among 170K+ participants.
- Adobe University Hackathon 2026: Shortlisted for Round 2 (Top 1.5%) from 301K+ global applicants.
- LeetCode Knight (Top 1.5%): Peak rating 1982; Global Rank 315 in Biweekly Contest 172.
- Competitive Profiles: Specialist on Codeforces (Peak 1418) | 3-Star on CodeChef (Peak 1661).
- Algorithmic Proficiency: Solved 1,500+ complex algorithmic problems across various platforms.
- CodeStorms (GDG): Secured 3rd position in college-wide coding competition by GDG On Campus, NIT Jalandhar.
- Leadership: Competitive Programming Lead at Google Developer Group NIT Jalandhar, Group Representative for CSE, and previously Co-Lead of LADC.
- Hackmol: Organized Hackmol hackathon at NIT Jalandhar.
- Sports: Winner, Inter-School Badminton Competition.
ADDITIONAL INFORMATION:
Languages: English, Hindi, Punjabi
Availability: Open to full-time software engineering and applied AI roles starting mid-2027, and open to internship/collaboration opportunities before then.
`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

// Fallback responses for common queries when AI fails
const fallbackResponses: Record<string, string> = {
  "work style": "I like to understand problems deeply, including where they break under real load, choose the right technology, and follow a proper SDLC rather than jumping straight into code.",
  "experience": "I recently completed an SDE Internship at Accenture working on GenAI/RAG systems (optimizing latency by 69% and reducing token usage by 34%), and I serve as Competitive Programming Lead at Google Developer Group NIT Jalandhar. Currently, I'm building scalable projects and exploring my next opportunity.",
  "skills": "I specialize in C++ and Python for systems, MERN/FastAPI for full-stack, and have a growing focus on RAG pipelines, concurrency, and high-performance system design.",
  "education": "I'm a B.Tech CSE student at NIT Jalandhar (CGPA 8.56). I completed my 10th (92%) and 12th (94%) from DAV Public School, BRS Nagar, Ludhiana. I also secured AIR 12,000 in JEE Main and Advanced.",
  "hometown": "I am from Ludhiana, Punjab. I was born in August 2005.",
  "ludhiana": "I am from Ludhiana, Punjab.",
  "background": "I am from Ludhiana, Punjab, born in August 2005.",
  "projects": "My main projects include SwiftCache (160,000+ QPS concurrent LRU cache at p99 < 0.24ms), Interlock (distributed real-time messaging with Redis Pub/Sub clustering and 35ms p95 latency), and RetainOps / ContextIQ.",
  "contact": "You can reach me at aditya.chauhan.nitj.ac@gmail.com, or connect on LinkedIn (linkedin.com/in/aditya-chauhan-nitj).",
  "achievements": "I am a LeetCode Knight (peak 1982, top 1.5%), Codeforces Specialist (peak 1418), and CodeChef 3-star (peak 1661) with 1,500+ DSA problems solved. I also advanced to Round 2 in Meta Hacker Cup 2025 (Global Rank 3172, AIR 875) and was a Semi-Finalist in Flipkart GRiD 7.0 & 8.0 (top 0.5% of 170k+).",
  "leadership": "I am the Competitive Programming Lead for Google Developer Group NIT Jalandhar, Group Representative for CSE, and previously Co-Led the Literacy and Debating Club.",
  "availability": "I am open to full-time roles starting mid-2027, and open to internship/collaboration opportunities before then.",
  "text": "You can reach me through my website (adityac.codes), LinkedIn (linkedin.com/in/aditya-chauhan-nitj), or email (aditya.chauhan.nitj.ac@gmail.com).",
  "contact information": "Feel free to reach out via email at aditya.chauhan.nitj.ac@gmail.com or connect with me on LinkedIn.",
};

function getFallbackResponse(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();

  // Check for exact matches first
  if (fallbackResponses[normalizedQuery]) {
    return fallbackResponses[normalizedQuery];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(fallbackResponses)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      return value;
    }
  }

  return null;
}

export async function queryAI(query: string): Promise<string> {
  try {
    // Support multiple Gemini keys. The environment can provide:
    // - VITE_GEMINI_API_KEYS (comma-separated list)
    // - VITE_GEMINI_API_KEY1 ... VITE_GEMINI_API_KEY5
    // - fallback VITE_GEMINI_API_KEY (single key)
    const env = (import.meta as any).env || {};

    function getGeminiKeys(): string[] {
      const keys: string[] = [];
      if (env.VITE_GEMINI_API_KEYS) {
        keys.push(...String(env.VITE_GEMINI_API_KEYS).split(',').map((k: string) => k.trim()).filter(Boolean));
      }
      for (let i = 1; i <= 5; i++) {
        const k = env[`VITE_GEMINI_API_KEY${i}`];
        if (k) keys.push(String(k));
      }
      if (env.VITE_GEMINI_API_KEY) {
        keys.push(String(env.VITE_GEMINI_API_KEY));
      }
      // de-duplicate while preserving order
      return Array.from(new Set(keys));
    }

    // Persistent rotation index: pick a random initial key per user, then rotate
    function consumeStartIndex(n: number): number {
      if (n <= 0) return 0;
      try {
        const stored = localStorage.getItem('gemini_key_index');

        // If we have a stored next-index, use it. Otherwise, pick a random start
        if (stored) {
          let idx = parseInt(stored, 10);
          const start = idx % n;
          idx = (idx + 1) % n;
          localStorage.setItem('gemini_key_index', String(idx));
          return start;
        } else {
          const randomStart = Math.floor(Math.random() * n);
          const next = (randomStart + 1) % n;
          localStorage.setItem('gemini_key_index', String(next));
          return randomStart;
        }
      } catch (e) {
        // Non-browser or localStorage error: use a global fallback with random init
        const g = globalThis as any;
        if (typeof g.__GEMINI_ROTATION_INDEX !== 'number') {
          const randomStart = Math.floor(Math.random() * n);
          g.__GEMINI_ROTATION_INDEX = (randomStart + 1) % n;
          return randomStart;
        }
        const start = g.__GEMINI_ROTATION_INDEX % n;
        g.__GEMINI_ROTATION_INDEX = (g.__GEMINI_ROTATION_INDEX + 1) % n;
        return start;
      }
    }

    const keys = getGeminiKeys();
    if (!keys || keys.length === 0) {
      console.error("Gemini API key(s) not configured");
      return "AI feature not configured. Please check the environment variables.";
    }

    // Enhanced prompt with better context and instructions
    const prompt = `You are an AI assistant for Aditya Chauhan's portfolio website. You have access to Aditya's complete professional profile and should provide helpful, accurate responses to visitors' questions. Consider the following detailed information:
${RESUME_CONTEXT}

Question: ${query}
Instructions for providing responses:
1. Voice and Tone:
   - Answer in Aditya's voice (first person)
   - Be confident but humble
2. Content Guidelines:
   - Provide specific, data-backed information when available
   - Highlight achievements and metrics that support your answer
3. Response Structure:
  - Prefer concise answers, but always finish sentences and include proper punctuation. Do not truncate important details. And DON'T Exceed 2 lines in response.
  - Keep the response as condensed as possible while ensuring clarity and completeness.
  - Start with the most relevant information
5. Always:
   - Stay within the scope of the provided information
   - Maintain consistency with the portfolio website
Remember: You are representing a professional developer's portfolio. Your responses should reflect technical expertise while remaining accessible to all visitors.`;

    // Try each configured key in round-robin order. We consume a start index so
    // each call prefers a different primary key and will retry with others.
    const start = consumeStartIndex(keys.length);
    let lastErrorText: string | null = null;
    let data: GeminiResponse | null = null;
    let ok = false;

    for (let attempt = 0; attempt < keys.length; attempt++) {
      const key = keys[(start + attempt) % keys.length];
      try {
        const resp = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" + key,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.3,
                topP: 0.6,
                topK: 30,
              },
            }),
          }
        );

        if (!resp.ok) {
          const txt = await resp.text();
          lastErrorText = `status=${resp.status} body=${txt}`;
          // try the next key
          continue;
        }

        data = await resp.json();
        ok = true;
        break;
      } catch (err: any) {
        lastErrorText = String(err?.message || err);
        // try next key
        continue;
      }
    }

    if (!ok || !data) {
      console.error("All Gemini keys failed", lastErrorText);
      const fallback = getFallbackResponse(query);
      if (fallback) return fallback;
      return `I apologize, but I'm having trouble processing your query at the moment. Please try again or rephrase your question.`;
    }



    let text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // Validate and clean up the response
    if (!text || text.length < 10) {
      console.warn("Empty or very short response from API");
      const fallback = getFallbackResponse(query);
      if (fallback) {
        return fallback;
      }
      return "I'm sorry, but I couldn't generate a meaningful response. Please try rephrasing your question.";
    }

    return text;
  } catch (error) {
    console.error("Error in queryAI:", error);

    // Try to get a fallback response
    const fallback = getFallbackResponse(query);
    if (fallback) {
      return fallback;
    }

    return "I apologize, but I'm having trouble processing your request. Please try again in a moment.";
  }
}

export function isHardcodedQuery(query: string): boolean {
  const hardcodedKeywords = [
    // Navigation
    "projects",
    "contact",
    "resume",
    "theme",
    "cv",
    "github",
    "linkedin"
  ];

  const lowerQuery = query.toLowerCase().trim();

  // Check if query starts with or matches any hardcoded keyword (prefix matching)
  return hardcodedKeywords.some((keyword) =>
    keyword.startsWith(lowerQuery) || lowerQuery.startsWith(keyword)
  );
}
