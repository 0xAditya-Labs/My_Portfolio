export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  tags: string[];
  techStack: string[];
  category: string | string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  pitchDeckUrl?: string;
  features: string[];
  challenges: string[];
  metrics: {
    value: string;
    label: string;
    description?: string;
  }[];
  implementation: {
    approach: string;
    technologies: {
      name: string;
      reason: string;
    }[];
  };
  architecture?: string;
  documentation: Record<string, any>;
  repoNotes?: Record<string, any>;
}

export const projectsData: Project[] = [
  {
    id: "chatmind",
    title: "ChatMind — Real-Time Messaging Platform with RAG Q&A",
    description: "A real-time messaging platform with sub-50ms delivery, featuring a hybrid RAG pipeline for contextual question answering over chat history.",
    fullDescription: "ChatMind combines real-time bidirectional messaging with a retrieval-augmented generation system that lets users query their own chat history conversationally. WebSocket-based delivery keeps end-to-end latency under 50ms, while a hybrid retrieval pipeline — combining BM25 keyword search, vector similarity, and reciprocal rank fusion — surfaces the most contextually relevant messages before a cross-encoder reranker refines results for accuracy.",
    image: "/projects/chatmind_1.png",
    images: [
      "/projects/chatmind_1.png",
      "/projects/chatmind_2.png",
      "/projects/chatmind_3.png",
      "/projects/chatmind_4.png",
      "/projects/chatmind_5.png"
    ],
    tags: ["MERN", "FastAPI", "WebSockets", "RAG"],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "FastAPI", "WebSockets", "BM25", "Vector Retrieval"],
    category: ["web", "ai-ml"],
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/ChatMind",
    liveUrl: "https://chatmind-4wtp.onrender.com/",
    features: [
      "Real-time bidirectional messaging via WebSockets with sub-50ms end-to-end delivery.",
      "Hybrid RAG pipeline combining BM25 keyword search and dense vector retrieval.",
      "Reciprocal Rank Fusion (RRF) to merge and rank results from multiple retrieval methods.",
      "Cross-encoder reranking layer improving context relevance (MRR@5) by 35%.",
      "Conversational Q&A interface for querying chat history contextually."
    ],
    challenges: [
      "Balancing retrieval accuracy against latency — reranking improves relevance but adds compute overhead that had to stay within the sub-50ms delivery budget.",
      "Merging results from two structurally different retrieval methods (keyword-based BM25 and dense vector search) into one coherent ranked list via RRF."
    ],
    metrics: [
      { label: "Message Latency", value: "<50ms (20% faster)" },
      { label: "Context Relevance (MRR@5)", value: "+35%" }
    ],
    implementation: {
      approach: "Separated real-time delivery (WebSockets) from the RAG retrieval layer (FastAPI microservice), allowing each to scale and be optimized independently. Retrieval combines sparse (BM25) and dense (vector) methods, fused via RRF, then reranked with a cross-encoder before returning results.",
      technologies: [
        { name: "WebSockets", reason: "Required for real-time bidirectional message delivery with minimal latency overhead." },
        { name: "FastAPI", reason: "Serves the RAG retrieval pipeline as a fast, async-capable microservice separate from the main app." },
        { name: "BM25 + Vector Retrieval + RRF", reason: "Combines keyword precision with semantic understanding for more accurate contextual search than either method alone." }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/ChatMind.git && npm install && cd server && npm install",
      usage: "Users sign up, join real-time chat conversations, and can ask the built-in Q&A panel questions about past messages — the RAG pipeline retrieves and summarizes relevant chat history conversationally instead of requiring manual scrolling/search.",
      api: "POST /api/auth/signup :- Register a new user\nPOST /api/auth/login :- Authenticate using JWT\nGET /api/messages/:id :- Fetch conversation history\nPOST /api/messages :- Send a message\nWS /socket.io :- Real-time messaging\nPOST /api/rag/query :- Ask questions over chat history"
    }
  },
  {
    id: "contextiq",
    title: "ContextIQ — RAG-Based IT Support Assistant",
    description: "A LangChain-powered RAG agent that answers IT-support queries from a synthetic enterprise knowledge base, instrumented end-to-end with Langfuse and OpenTelemetry for full-stack observability.",
    fullDescription: "ContextIQ is a retrieval-augmented generation assistant built during my internship at Accenture to answer IT-support queries against a synthetic enterprise knowledge base. Beyond the core RAG pipeline, the project focused heavily on observability and architectural control: Langfuse traces LLM cost and output quality across requests, while OpenTelemetry instruments backend latency end-to-end. This layer directly enabled a 34% reduction in RAG input-token usage and a 69% cut in vector-search latency by making bottlenecks visible. Furthermore, to eliminate out-of-scope LLM hallucinations, the system was upgraded to a stateful ReAct agent in LangGraph that evaluates queries against tool docstrings before executing costly database retrievals.",
    image: "/projects/contextiq_2.png",
    images: [
      "/projects/contextiq_1.png",
      "/projects/contextiq_2.png",
      "/projects/contextiq_3.png",
      "/projects/contextiq_4.png"
    ],
    tags: ["Python", "LangGraph", "Gemini", "RAG", "Observability"],
    techStack: ["Python", "LangGraph", "Gemini API", "FastAPI", "ChromaDB", "Langfuse", "OpenTelemetry"],
    category: ["ai-ml", "backend"],
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/ContextIQ",
    liveUrl: "",
    demoVideoUrl: "https://youtu.be/iB0DpAtEWZA?si=DufV_p64cXk-fUmC",
    pitchDeckUrl: "https://docs.google.com/presentation/d/1YjKR_LsQPGX68dEUOVmqeWUsBH6sl-gq/edit",
    features: [
      "LangGraph ReAct Architecture: Dynamic docstring tool-gating that eliminated out-of-scope LLM hallucinations and reduced token waste.",
      "Langfuse instrumentation tracing LLM cost and output quality per request.",
      "OpenTelemetry tracing across the backend for end-to-end latency profiling.",
      "Singleton-refactored ChromaDB client eliminating a traced 400ms bottleneck."
    ],
    challenges: [
      "Handling out-of-scope IT queries without wasting API tokens or hallucinating answers — solved by designing a stateful ReAct agent in LangGraph that evaluates queries against tool docstrings before executing costly retrievals.",
      "Identifying the actual source of vector-search latency required instrumenting the full request path with OpenTelemetry rather than assuming the bottleneck's location — the real cause (repeated ChromaDB client instantiation) wasn't where it was initially suspected.",
      "Reducing token usage via chunking without degrading retrieval quality, validated quantitatively via Langfuse rather than by inspection alone."
    ],
    metrics: [
      { label: "RAG Input-Token Usage", value: "-34% (1800 → 1180 tokens/request)" },
      { label: "Vector-Search Latency", value: "-69% (580ms → 180ms)" },
      { label: "Bottleneck Identified", value: "400ms traced via OpenTelemetry" }
    ],
    implementation: {
      approach: "Built a stateful ReAct agent using LangGraph to orchestrate query tool-gating, ensuring out-of-scope queries are blocked before costly database retrievals. The system leverages Gemini API for generation and embeddings. Integrated Langfuse and OpenTelemetry to form a systematic observability layer — Langfuse for LLM cost/quality tracing, OpenTelemetry for backend latency — allowing for precise bottleneck identification and metric-driven optimization.",
      technologies: [
        { name: "LangGraph", reason: "Provides the ReAct architecture and stateful orchestration for the RAG agent." },
        { name: "Gemini API", reason: "Powers the LLM generations and high-quality vector embeddings for the knowledge base." },
        { name: "Langfuse", reason: "Traces LLM cost and quality per request, enabling measurable token-usage optimization." },
        { name: "OpenTelemetry", reason: "End-to-end backend latency tracing, used to locate and fix the 400ms ChromaDB bottleneck." }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/ContextIQ.git && pip install -r requirements.txt --break-system-packages",
      usage: "Users submit IT-support questions through the assistant interface. The LangGraph ReAct agent evaluates the query; if valid, it retrieves context and generates a grounded response using Gemini API. Out-of-scope queries are rejected to save tokens.",
      api: "POST /api/query :- Submit IT-support query\nPOST /api/retrieve :- Retrieve relevant knowledge chunks\nGET /api/traces :- View Langfuse request traces\nGET /api/metrics :- Retrieve observability metrics\nGET /api/health :- Health check endpoint"
,
      architecture: "LangGraph ReAct Agent orchestrates tool-gating and query execution. FastAPI handles routing, ChromaDB manages vector storage, and Gemini API powers generation. Full-stack observability is implemented with Langfuse and OpenTelemetry.",
      architectureImage: "/projects/contextiq_3.png"
    }
  },
  {
    id: "swiftcache",
    title: "SwiftCache — Thread-Safe Concurrent LRU Cache Server",
    description: "A high-performance, thread-safe TCP-based LRU cache server built in C++, sustaining 15,000+ QPS with sub-3ms p99 latency through deterministic O(1) operations.",
    fullDescription: "SwiftCache is a concurrent LRU cache server built from first principles in C++, combining a custom hash-map and doubly linked list to guarantee deterministic O(1) get/set operations with TTL-based eviction. Designed with correctness under concurrent load as the primary constraint, it uses fine-grained locking to sustain high throughput without sacrificing thread safety, and exposes a modular, self-serve configuration layer to reduce integration effort for new caching features.",
    image: "/projects/swiftcache_1.png",
    images: [
      "/projects/swiftcache_1.png"
    ],
    tags: ["C++", "Concurrency", "TCP/HTTP"],
    techStack: ["C++", "TCP/HTTP", "Multithreading", "Custom Hash-Map", "Doubly Linked List"],
    category: ["systems", "backend"],
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/SwiftCache",
    liveUrl: "",
    features: [
      "Deterministic O(1) get/set operations via custom hash-map + doubly linked list.",
      "TTL-based eviction with configurable expiry per cache entry.",
      "Sustains 15,000+ QPS with sub-3ms p99 latency under concurrent read/write workloads.",
      "Modular, self-serve caching architecture reducing new feature integration effort by 3x.",
      "Thread-safe design supporting simultaneous multi-client TCP connections."
    ],
    challenges: [
      "Ensuring correctness under high concurrent read/write contention without resorting to a single global lock, which would bottleneck throughput.",
      "Benchmarking realistic workloads to validate p99 latency claims rather than relying on average-case latency alone."
    ],
    metrics: [
      { label: "Throughput", value: "15,000+ QPS" },
      { label: "p99 Latency", value: "<3ms" },
      { label: "Feature Integration Effort", value: "3x faster" }
    ],
    implementation: {
      approach: "Built a custom hash-map and doubly linked list combination from scratch (rather than relying on standard library containers) to guarantee O(1) time complexity for all cache operations, paired with fine-grained locking to maximize concurrent throughput without sacrificing thread safety.",
      technologies: [
        { name: "C++", reason: "Low-level control over memory layout and locking primitives needed for deterministic performance guarantees." },
        { name: "TCP/HTTP", reason: "Enables the cache to be accessed as a networked service, not just an in-process library." }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/SwiftCache.git && cd SwiftCache && make",
      usage: "Client applications connect to the server over TCP and issue GET, SET, and DELETE commands against the cache; TTL-based expiry and LRU eviction are handled automatically under the hood.",
      api: "GET <key> :- Retrieve cached value\nSET <key> <value> [TTL] :- Store value with optional expiration\nDELETE <key> :- Remove cached entry\nEXISTS <key> :- Check key existence\nPING :- Verify server connectivity\nSTATS :- Retrieve cache statistics"
    }
  },
  {
    id: "isp-customer-retention",
    title: "ISP Customer Retention Command Center",
    description: "A production-ready full-stack B2B SaaS platform that helps ISPs proactively reduce customer churn using Machine Learning and Explainable AI (XAI). It intelligently prioritizes customers by churn risk and provides AI-generated explanations for personalized retention actions.",
    fullDescription: "The ISP Customer Retention Command Center transforms churn prediction into an actionable decision-making platform. By ingesting customer data via CSV, it predicts churn probability using a trained Machine Learning model and prioritizes at-risk customers. Crucially, it leverages SHAP Explainable AI to provide support agents with the underlying reasons for churn risk, enabling personalized retention strategies rather than generic offers.",
    image: "/projects/isp_1.png",
    images: [
      "/projects/isp_1.png",
      "/projects/isp_2.png",
      "/projects/isp_3.png",
      "/projects/isp_4.png"
    ],
    tags: ["React", "FastAPI", "Scikit-learn", "SHAP"],
    techStack: ["Scikit-learn", "FastAPI", "Uvicorn", "React", "Vite", "Tailwind CSS", "SHAP"],
    category: ["web", "ai-ml"],
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/ISP-Customer-retention-Recommender",
    liveUrl: "https://isp-customer-retention-recommender-chi.vercel.app/",
    features: [
      "Predicts customer churn probability and prioritizes at-risk customers using Scikit-learn models.",
      "Generates SHAP Explainable AI insights to reveal contributing factors for churn.",
      "Calculates domain-specific features dynamically, such as Loyalty Index and Customer Lifetime Value Proxy.",
      "Provides real-time inference separated from model training via a FastAPI service.",
      "Features a modern SaaS dashboard built with React and Tailwind CSS for seamless data ingestion and interactive analytics."
    ],
    challenges: [
      "Handling class imbalance (roughly 3:1) in the training data without simply overfitting to the majority class, addressed via SMOTE.",
      "Making a black-box classifier's predictions genuinely actionable for non-technical support agents, not just accurate — solved via SHAP explanations attached to each prediction."
    ],
    metrics: [
      { label: "Revenue-at-Risk Identified", value: "63.8% (top 20% of customers)" },
      { label: "Tuned Classifiers", value: "5" },
      { label: "Class Imbalance Handled", value: "3:1 (via SMOTE)" }
    ],
    implementation: {
      approach: "The inference pipeline is completely separated from model training, featuring serialized Scikit-learn models, versioned artifacts, and a FastAPI inference service handling concurrent requests via Uvicorn.",
      technologies: [
        { name: "FastAPI", reason: "Provides real-time inference and concurrent request handling for the machine learning model." },
        { name: "SHAP", reason: "Generates Explainable AI insights for every prediction to make the black-box model transparent." },
        { name: "React", reason: "Delivers a polished, responsive enterprise SaaS dashboard experience for end-users." }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/ISP-Customer-retention-Recommender.git && pip install -r requirements.txt --break-system-packages && npm install",
      usage: "Support teams upload a customer CSV to instantly see churn-risk rankings, with each at-risk customer flagged alongside a SHAP-generated explanation of why — enabling targeted retention offers instead of blanket discounts.",
      api: "POST /api/predict :- Predict churn probability from uploaded dataset\nPOST /api/upload :- Upload customer CSV\nGET /api/results :- Retrieve prediction results\nGET /api/shap/:customerId :- Fetch SHAP explanation for a customer\nGET /api/health :- Health check endpoint"
    }
  },
  {
    id: "software-engineer-portfolio",
    title: "Aditya Chauhan | Software Engineer Portfolio",
    description: "A performance-first personal portfolio and interactive resume built with React, Vite, and TypeScript. It features an integrated Gemini-powered AI command palette and a live competitive coding dashboard.",
    fullDescription: "A modern, highly performant personal developer portfolio engineered to showcase projects, technical skills, and competitive programming achievements. Built on the React and Vite ecosystem, the application utilizes Tailwind CSS and Shadcn/ui for a bespoke, accessible design system. Key technical implementations include a globally accessible Command Palette for rapid keyboard-first navigation, hardware-accelerated scroll animations, and a dynamic Coding Dashboard. This dashboard leverages Vercel Serverless Functions and custom scraping scripts to aggregate and normalize real-time statistics from platforms including LeetCode, CodeChef, Codeforces, and GeeksforGeeks.",
    image: "/projects/portfolio_1.png",
    images: [
      "/projects/portfolio_1.png",
      "/projects/portfolio_2.png",
      "/projects/portfolio_3.png",
      "/projects/portfolio_4.png",
      "/projects/portfolio_5.png"
    ],
    tags: ["React", "TypeScript", "Vite", "Gemini API"],
    techStack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "Google Gemini API", "Vercel"],
    category: ["web"],
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/My_Portfolio",
    liveUrl: "https://adityac.codes",
    features: [
      "Globally accessible Command Palette interface for intuitive site navigation",
      "Dynamic coding statistics dashboard integrating multiple external platforms",
      "Custom-built infinite tech stack scroller and timeline components",
      "Fully accessible, dark-mode compatible UI architecture",
      "Automated weekly statistics scraping via GitHub Actions workflow",
      "Vercel Serverless API routes for dynamic data aggregation"
    ],
    challenges: [
      "Architecting a resilient data aggregation layer to normalize disparate statistics from multiple competitive programming platforms",
      "Optimizing scroll-linked layout animations to maintain consistent 60 FPS performance across devices",
      "Implementing a robust, keyboard-first focus management system for the Command Palette interface"
    ],
    metrics: [
      { label: "Platform Integrations", value: "4+" },
      { label: "Animation Performance", value: "60 FPS" }
    ],
    implementation: {
      approach: "The application adopts a component-driven architecture using React and strict TypeScript. The UI is built using accessible Radix primitives styled with utility classes. Data hydration for the coding dashboard is handled via a dual approach: a scheduled GitHub Action that generates static JSON payloads, combined with dynamic Vercel serverless endpoints for real-time fetching. Architecture Flow: React SPA (Vite) → Vercel Edge Network → Serverless Functions → External APIs (LeetCode/GFG)",
      technologies: [
        { name: "Vite & React", reason: "Ensures an exceptional developer experience with rapid HMR and highly optimized production builds" },
        { name: "Shadcn/ui", reason: "Provides unstyled, accessible component primitives that integrate natively with Tailwind CSS" },
        { name: "Vercel Serverless", reason: "Enables lightweight backend execution for API routes without provisioning dedicated server infrastructure" },
        { name: "GitHub Actions", reason: "Automates the execution of Node.js scraping scripts to keep static platform statistics updated weekly" }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/My_Portfolio.git && cd My_Portfolio && npm install",
      usage: "Visitors browse the site normally or open the AI command palette with Ctrl+K to ask natural-language questions about my background, jump to any section instantly, or view live competitive programming stats on the Coding Journey dashboard.",
      api: "GET /api/coding/leetcode :- Fetch live LeetCode statistics\nGET /api/coding/codeforces :- Fetch Codeforces statistics\nGET /api/coding/codechef :- Fetch CodeChef statistics\nPOST /api/assistant :- Gemini-powered AI assistant\nGET /api/projects :- Retrieve project metadata"
    }
  },
  {
    id: "airline-reservation-system",
    title: "Airline Reservation System",
    description: "A modular Airline Management System built in C++ utilizing strict Object-Oriented Programming principles. It handles ticket booking, cancellation, and protected crew management.",
    fullDescription: "This Airline Management System is a robust C++ command-line application that demonstrates strong Object-Oriented Programming (OOP) architecture. It allows users to book and cancel tickets for up to 50 seats, auto-generates text-based tickets, and provides an admin-protected environment for crew management. The system heavily relies on core OOP concepts including abstraction, inheritance, polymorphism, and encapsulation to maintain data privacy and structural modularity.",
    image: "/projects/airline_1.png",
    images: [
      "/projects/airline_1.png",
      "/projects/airline_2.png"
    ],
    tags: ["C++", "OOP", "CLI"],
    techStack: ["C++"],
    category: ["tools"],
    featured: false,
    githubUrl: "https://github.com/0xAditya-Labs/Airline-Reservation-System-C-OOP-",
    liveUrl: "",
    features: [
      "Books and cancels flight tickets with a capacity of up to 50 seats per flight.",
      "Automatically generates printable ticket records as text files (ticket.txt).",
      "Admin-protected module to view and edit airline crew details securely.",
      "Implemented with a fully modular file structure separating headers (.h) and implementations (.cpp)."
    ],
    challenges: [
      "Designing the class hierarchy so admin-only operations (crew management) stayed strictly separated from passenger-facing booking logic via access control.",
      "Managing concurrent seat booking/cancellation state correctly within a single-threaded CLI flow to avoid double-booking the same seat."
    ],
    metrics: [],
    implementation: {
      approach: "Designed with a pure Object-Oriented architecture utilizing abstract base classes, inheritance for specific employee roles, overridden polymorphic methods, and strict encapsulation for passenger data privacy.",
      technologies: [
        { name: "C++", reason: "Chosen for its strong object-oriented features and robust command-line application capabilities." }
      ]
    },
    documentation: {
      setup: "g++ main.cpp src/*.cpp -Iinclude -o airline",
      usage: "Users navigate the CLI menu to book or cancel tickets, which auto-generates a text-based ticket record. Admins log into a protected menu to view and edit crew details separately from the booking flow.",
      api: "CLI:-\nBook Ticket\nCancel Ticket\nView Available Seats\nGenerate Ticket\nCrew Management (Admin)\nPassenger Records"
    }
  },
  {
    id: "josaa-seat-allocation",
    title: "JOSSA-Style Seat Allocation Portal",
    description: "A Flask-based web application that simulates the JOSAA counselling process by allocating seats based on student rank, preferences, and seat availability. It features secure OTP authentication and automated allocation reporting.",
    fullDescription: "This project recreates a simplified version of the JOSAA seat allocation workflow through an interactive web portal. Students register their counselling preferences, and administrators execute a seat allocation engine based on student ranks and seat availability. Originally a command-line application, it was redesigned into a secure Flask web app with REST APIs, Twilio-based OTP authentication, and automated report generation capabilities.",
    image: "/projects/jossa_1.png",
    images: [
      "/projects/jossa_1.png",
      "/projects/jossa_2.png"
    ],
    tags: ["Flask", "Python", "Twilio"],
    techStack: ["Flask", "Twilio", "Python", "REST APIs"],
    category: ["web"],
    featured: false,
    githubUrl: "https://github.com/0xAditya-Labs/BITS-JOSSA-College-Allocation-System",
    liveUrl: "https://bits-jossa-college-allocation-syste.vercel.app/",
    features: [
      "Admin dashboard to register students, store ranks, and execute the seat allocation engine.",
      "Student portal with secure rank-based login and Twilio SMS OTP verification.",
      "Seat allocation engine that validates availability and processes student preference orders.",
      "Automated export system to generate and download final placement reports (students_placement.txt)."
    ],
    challenges: [
      "Handling tie-breaks and edge cases in the allocation engine when multiple students shared the same rank or preference conflicts arose.",
      "Ensuring OTP delivery reliability through Twilio, including handling failed/delayed SMS gracefully without blocking the login flow."
    ],
    metrics: [],
    implementation: {
      approach: "Implemented a randomized sorting algorithm and preference-based allocation engine within a Flask-based REST API architecture.",
      technologies: [
        { name: "Flask", reason: "Used as the lightweight web framework for building the application backend and REST APIs." },
        { name: "Twilio", reason: "Integrated for secure OTP-based student authentication via SMS." }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/BITS-JOSSA-College-Allocation-System.git && pip install -r requirements.txt --break-system-packages",
      usage: "Students log in with their rank, verify via OTP, and submit ranked branch/institute preferences. Admins trigger the allocation engine and export a final placement report for all students.",
      api: "POST /api/login :- Authenticate student/admin\nPOST /api/send-otp :- Send OTP via Twilio\nPOST /api/verify-otp :- Verify OTP\nPOST /api/preferences :- Submit branch preferences\nPOST /api/allocate :- Execute seat allocation\nGET /api/report :- Download allocation report"
    }
  },
  {
    id: "my-articles-and-blogs",
    title: "My Articles and Blogs",
    description: "A technical writing repository dedicated to deep dives into software engineering concepts, explaining them in a simple and unambiguous way.",
    fullDescription: "This repository serves as a centralized hub for my technical articles and engineering notes. It focuses on exploring the depth and clarity of complex software engineering topics. The collection includes comprehensive, no-nonsense breakdowns of Low-Level Design (LLD) concepts, such as applying SOLID principles to write manageable and scalable code.",
    image: "/projects/blogs_1.png",
    images: [
      "/projects/blogs_1.png"
    ],
    tags: ["Technical Writing", "System Design", "LLD", "SOLID"],
    techStack: ["Markdown", "GitHub"],
    category: ["tools"],
    featured: false,
    githubUrl: "https://github.com/0xAditya-Labs/My-Articles-and-Blogs",
    liveUrl: "",
    features: [
      "Centralized index for navigating technical articles and engineering notes.",
      "Deep dives into Low-Level Design (LLD) and system architecture.",
      "No-nonsense, plain-English breakdowns of complex concepts like the SOLID principles.",
      "Structured repository layout for easy categorization and reading via GitHub's native Markdown rendering."
    ],
    challenges: [
      "Explaining dense system-design concepts in plain language without oversimplifying to the point of being technically inaccurate."
    ],
    metrics: [],
    implementation: {
      approach: "Maintained as an open-source GitHub repository utilizing a structured directory format and an organized README index to categorize technical writing.",
      technologies: [
        { name: "Markdown", reason: "Provides a clean, standardized, and version-controllable format for writing technical documentation natively supported by GitHub." }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/My-Articles-and-Blogs.git",
      usage: "Readers browse the README index and click through to individual articles for plain-English, example-driven explanations of LLD and system design topics.",
      api: "Markdown Repository\nREADME Index\nLLD Articles\nSystem Design Notes\nSOLID Principle Guides\nGitHub Markdown Rendering"
    }
  }
];