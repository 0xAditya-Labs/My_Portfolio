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
    id: "swiftcache",
    title: "SwiftCache",
    description: "Thread-safe TCP-based LRU cache supporting deterministic O(1) operations, sustained 15,000+ QPS.",
    fullDescription: "Constructed a thread-safe TCP-based LRU cache supporting deterministic O(1) operations using a custom hash-map, linked-list, and TTL eviction. Sustained 15,000+ QPS with <3ms p99 latency through benchmark-driven optimization of concurrent read/write workloads. Designed a modular caching architecture with self-serve configuration, reducing feature integration effort by 3x.",
    image: "/projects/swiftcache_1.png",
    images: ["/projects/swiftcache_1.png"],
    tags: ["C++", "Concurrency", "System Design"],
    techStack: ["C++", "TCP/HTTP", "Concurrency", "Multithreading"],
    category: "tools",
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/SwiftCache",
    features: [
      "Thread-safe LRU caching with TTL eviction",
      "Deterministic O(1) operations via custom hash-map and linked-list",
      "TCP/HTTP network layer for client-server communication",
      "Self-serve configuration for dynamic cache sizing and policies"
    ],
    challenges: [
      "Achieving thread safety without heavy lock contention in concurrent environments",
      "Optimizing memory layout for <3ms p99 latency under load",
      "Designing a modular architecture that could be easily extended"
    ],
    metrics: [
      {
        value: "15,000+",
        label: "Sustained QPS",
        description: "Queries per second handled without degradation"
      },
      {
        value: "<3ms",
        label: "p99 Latency",
        description: "Consistent low latency for concurrent read/write workloads"
      },
      {
        value: "3x",
        label: "Faster Integration",
        description: "Reduction in effort required to add new features via modular architecture"
      }
    ],
    implementation: {
      approach: "Utilized benchmark-driven optimization. Started with a standard mutex-locked map, identified bottlenecks, and shifted to a fine-grained locking mechanism alongside a custom hash-map/doubly-linked list implementation to guarantee O(1) time complexity.",
      technologies: [
        {
          name: "C++",
          reason: "Provides the low-level memory control and multi-threading primitives needed for high-performance systems."
        },
        {
          name: "TCP Sockets",
          reason: "Enables fast, reliable network I/O for the caching server."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/SwiftCache.git\ncd SwiftCache\nmake\n./server"
    }
  },
  {
    id: "chatmind",
    title: "ChatMind",
    description: "Real-Time Messaging Platform with RAG Q&A, <50ms latency using WebSockets.",
    fullDescription: "Accelerated end-to-end messaging latency by 20% to <50ms using WebSockets for real-time bidirectional communication. Architected a hybrid RAG pipeline using BM25, vector retrieval, and RRF for contextual question answering. Boosted context relevance scores (MRR@5) by 35% by deploying cross-encoder reranking.",
    image: "/projects/chatmind_1.png",
    images: ["/projects/chatmind_1.png", "/projects/chatmind_2.png", "/projects/chatmind_3.png"],
    tags: ["React", "WebSockets", "RAG", "FastAPI"],
    techStack: ["MERN", "FastAPI", "WebSockets", "RAG", "BM25", "SocketIO", "Cloudinary"],
    category: ["web", "ai-ml"],
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/ChatMind",
    liveUrl: "https://chatmind-4wtp.onrender.com/",
    features: [
      "Real-time bidirectional messaging powered by WebSockets",
      "Hybrid RAG pipeline combining BM25 and semantic vector retrieval",
      "Contextual Q&A enhanced with Reciprocal Rank Fusion (RRF)",
      "Cross-encoder reranking to maximize answer relevance",
      "Media sharing via Cloudinary integration"
    ],
    challenges: [
      "Minimizing network overhead to achieve sub-50ms messaging latency",
      "Balancing retrieval speed and accuracy in the hybrid RAG architecture",
      "Managing connection state and real-time events at scale with SocketIO"
    ],
    metrics: [
      {
        value: "<50ms",
        label: "Latency",
        description: "20% reduction in end-to-end messaging latency"
      },
      {
        value: "35%",
        label: "MRR@5 Boost",
        description: "Improvement in context relevance via cross-encoder reranking"
      }
    ],
    implementation: {
      approach: "Built a distributed architecture using a MERN stack for standard operations and a FastAPI microservice for heavy AI workloads. SocketIO was implemented to bypass HTTP overhead for chat, while the LangChain-powered RAG pipeline was fine-tuned for high MRR.",
      technologies: [
        {
          name: "WebSockets & SocketIO",
          reason: "Crucial for maintaining persistent, bidirectional communication with near-zero overhead."
        },
        {
          name: "FastAPI",
          reason: "Serves the ML models and RAG pipeline asynchronously to prevent blocking the main web server."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/My-Chat-App.git\ncd My-Chat-App\nnpm install\nnpm start"
    }
  },
  {
    id: "retainops",
    title: "RetainOps",
    description: "AI-Powered Customer Retention Platform identifying 63.8% of revenue-at-risk.",
    fullDescription: "Developed a full-stack customer retention platform integrating React and FastAPI with production-ready ML inference. Identified 63.8% of revenue-at-risk while targeting the top 20% of customers using a custom Master Model Score across 5 tuned classifiers. Improved prediction reliability by engineering 9 features from 7,100+ records while mitigating a 3:1 class imbalance using SMOTE and SHAP explainability.",
    image: "/projects/isp_1.png",
    images: ["/projects/isp_1.png", "/projects/isp_2.png", "/projects/isp_3.png"],
    tags: ["React", "FastAPI", "Machine Learning"],
    techStack: ["React", "FastAPI", "Scikit-learn", "SHAP", "SMOTE"],
    category: "ai-ml",
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/ISP-Customer-retention-Recommender",
    liveUrl: "https://isp-customer-retention-recommender-chi.vercel.app",
    features: [
      "Predictive customer churn detection",
      "Custom Master Model Score aggregating 5 tuned classifiers",
      "SHAP-powered explainability for transparent predictions",
      "Interactive React dashboard for revenue-at-risk analysis"
    ],
    challenges: [
      "Mitigating severe 3:1 class imbalance in customer data",
      "Engineering robust predictive features from 7,100+ raw records",
      "Making black-box ML models interpretable for business stakeholders"
    ],
    metrics: [
      {
        value: "63.8%",
        label: "Revenue-at-Risk ID",
        description: "Successfully identified at-risk revenue by targeting top 20% of customers"
      },
      {
        value: "9",
        label: "Features Engineered",
        description: "Extracted from 7,100+ raw data records"
      },
      {
        value: "5",
        label: "Classifiers Tuned",
        description: "Ensemble model architecture for high reliability"
      }
    ],
    implementation: {
      approach: "Conducted extensive EDA and feature engineering. Utilized SMOTE to balance the training dataset. Built an ensemble of 5 classifiers, deployed as a RESTful API via FastAPI. Integrated SHAP to provide granular explainability on the React frontend.",
      technologies: [
        {
          name: "SMOTE & SHAP",
          reason: "SMOTE resolves dataset imbalance, while SHAP builds trust by explaining individual predictions."
        },
        {
          name: "React + FastAPI",
          reason: "Seamlessly decouples the UI from the heavy computational ML backend."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/ISP-Customer-retention-Recommender.git\npip install -r requirements.txt\nuvicorn main:app --reload"
    }
  },
  {
    id: "airline-reservation",
    title: "Airline Reservation System",
    description: "C++ object-oriented airline reservation simulator modeling ticket workflows.",
    fullDescription: "Built a C++ object-oriented airline reservation simulator to model ticket booking, cancellation, and passenger/flight management workflows. Designed modular class hierarchies for core entities (flights, passengers, reservations), improving maintainability and extensibility for additional business rules. Implemented structured input/output handling and state-driven booking logic to emulate real-world reservation operations.",
    image: "/projects/airline_1.png",
    images: ["/projects/airline_1.png"],
    tags: ["C++", "OOP", "System Design"],
    techStack: ["C++", "OOP", "STL", "DSA"],
    category: "tools",
    featured: false,
    githubUrl: "https://github.com/0xAditya-Labs/Airline-Reservation-System-C-OOP-",
    features: [
      "Ticket booking and cancellation workflows",
      "Comprehensive passenger and flight management",
      "Modular class hierarchies for core entities",
      "State-driven booking logic and structured I/O"
    ],
    challenges: [
      "Designing an extensible object-oriented architecture in C++",
      "Managing complex state transitions during the booking and cancellation process",
      "Ensuring robust memory management without leaks"
    ],
    metrics: [],
    implementation: {
      approach: "Focused on core OOP principles (Encapsulation, Inheritance, Polymorphism). Created distinct classes for Flights, Passengers, and Reservations. Used the C++ Standard Template Library (STL) for efficient data storage and retrieval.",
      technologies: [
        {
          name: "C++ OOP",
          reason: "Allows strict modeling of real-world entities through class hierarchies."
        },
        {
          name: "STL",
          reason: "Provides robust and efficient data structures (vectors, maps) for managing reservation data."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/Airline-Reservation-System-C-OOP-.git\ng++ main.cpp -o airline_system\n./airline_system"
    }
  },
  {
    id: "bits-jossa-allocation",
    title: "College Seat-Allocation Simulator",
    description: "Simulator replicating BITS/JOSSA-style counseling logic for admissions.",
    fullDescription: "Developed a college seat-allocation simulator replicating BITS/JOSSA-style counseling logic for preference-based admissions. Implemented rank-driven iterative allocation with branch/category constraints to model realistic seat distribution outcomes. Structured the system for scenario testing and policy experimentation, enabling clearer analysis of allocation behavior under varied inputs.",
    image: "/projects/jossa_1.png",
    images: ["/projects/jossa_1.png"],
    tags: ["Algorithms", "Simulation", "JavaScript"],
    techStack: ["JavaScript", "Algorithms", "Simulation", "Data Structures"],
    category: "tools",
    featured: false,
    githubUrl: "https://github.com/0xAditya-Labs/BITS-JOSSA-College-Allocation-System",
    features: [
      "Rank-driven iterative seat allocation algorithm",
      "Branch and category constraint modeling",
      "Scenario testing for policy experimentation",
      "Realistic replication of BITS/JOSSA counseling logic"
    ],
    challenges: [
      "Accurately simulating multi-round iterative allocation with cascading upgrades",
      "Handling edge cases like tie-breakers and category-specific reservations",
      "Optimizing algorithm performance for large student datasets"
    ],
    metrics: [],
    implementation: {
      approach: "Implemented a multi-pass algorithmic structure in JavaScript. The system sorts candidates by rank, processes preferences iteratively, and handles upgrades in subsequent rounds, accurately mimicking real-world counseling systems.",
      technologies: [
        {
          name: "JavaScript",
          reason: "Chosen for its ubiquity and ease of rapidly prototyping complex algorithmic logic."
        },
        {
          name: "Advanced Data Structures",
          reason: "Required for efficiently tracking seat availability, waitlists, and student preferences."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/BITS-JOSSA-College-Allocation-System.git\nnode allocate.js"
    }
  },
  {
    id: "tech-articles",
    title: "Technical Articles & Blogs",
    description: "Repository focused on breaking down complex software engineering concepts.",
    fullDescription: "Curated a technical writing repository focused on breaking down complex software engineering and computer science concepts into layered, beginner-to-advanced explanations. Produced structured long-form articles emphasizing clarity, practical examples, and concept-first pedagogy. Built a reusable knowledge base that supports interview prep, peer learning, and rapid topic revision.",
    image: "/projects/blogs_1.png",
    images: ["/projects/blogs_1.png"],
    tags: ["Technical Writing", "Documentation", "Open Source"],
    techStack: ["Markdown", "Technical Writing", "GitHub", "Documentation"],
    category: "tools",
    featured: false,
    githubUrl: "https://github.com/0xAditya-Labs/My-Articles-and-Blogs",
    features: [
      "Layered, beginner-to-advanced technical explanations",
      "Concept-first pedagogy with practical examples",
      "Reusable knowledge base for interview prep and peer learning",
      "Comprehensive markdown formatting for readability"
    ],
    challenges: [
      "Distilling highly complex systems concepts into accessible language",
      "Maintaining a consistent educational structure across varied topics"
    ],
    metrics: [],
    implementation: {
      approach: "Adopted a documentation-as-code philosophy. Each topic is researched, drafted in Markdown, and structured hierarchically (from high-level intuition down to code-level implementation).",
      technologies: [
        {
          name: "Markdown & GitHub",
          reason: "The standard for developer documentation, enabling version control and community contributions."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/My-Articles-and-Blogs.git\n# Open in any Markdown reader or IDE"
    }
  },
  {
    id: "portfolio",
    title: "adityac.codes",
    description: "A modern, product-style developer website with an AI Command Palette.",
    fullDescription: "This portfolio is a modern, product-style developer website for Aditya Chauhan, built with React, TypeScript, and Vite. It highlights projects, experience, and coding activity while focusing on a premium user experience and fast performance.\n\nKey highlights:\n- AI Command Palette (Ctrl+K): natural-language navigation/search powered by Gemini\n- Live Coding Dashboard: visual coding stats and activity snapshots\n- Premium UI: glassmorphism-inspired design, smooth animations, responsive layout\n- Theme support: light/dark mode with system awareness\n- Performance-first build: image preloading, scroll-reveal effects, lightweight architecture",
    image: "/projects/portfolio_1.png",
    images: ["/projects/portfolio_1.png", "/projects/portfolio_2.png"],
    tags: ["React", "Tailwind", "GenAI", "Frontend"],
    techStack: ["React", "Vite", "Tailwind CSS", "shadcn/ui", "Vercel Functions", "Web Scraping"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/My_Portfolio",
    liveUrl: "https://adityac.codes",
    features: [
      "AI Command Palette (Ctrl+K) powered by Gemini",
      "Live Coding Dashboard visualizing coding activity",
      "Premium glassmorphism UI with framer-motion animations",
      "Dark/Light theme toggle with system preference detection",
      "Performance optimized with Vite and image preloading"
    ],
    challenges: [
      "Integrating Gemini AI into a seamless Command Palette experience",
      "Ensuring buttery-smooth animations without sacrificing rendering performance",
      "Scraping and aggregating live coding stats reliably"
    ],
    metrics: [],
    implementation: {
      approach: "Built as a Single Page Application (SPA) using React and Vite for blistering fast HMR and build times. Styled completely with Tailwind CSS for utility-first design, integrating shadcn/ui components for accessibility. The Gemini AI integration is handled via serverless Vercel functions to protect API keys.",
      technologies: [
        {
          name: "React + Vite",
          reason: "Industry standard for building highly interactive, performant web applications."
        },
        {
          name: "Tailwind CSS",
          reason: "Enables rapid, constraint-based styling directly within the TSX components."
        },
        {
          name: "Gemini API",
          reason: "Powers the semantic search capabilities of the command palette."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/My_Portfolio.git\ncd My_Portfolio\nnpm install\nnpm run dev"
    }
  },
  {
    id: "contextiq",
    title: "ContextIQ",
    description: "LangChain-powered RAG assistant with full-stack observability.",
    fullDescription: "Built a LangChain-powered RAG assistant for IT support over a synthetic enterprise knowledge base. Added full-stack observability with Langfuse for LLM quality/cost tracing and OpenTelemetry for backend latency instrumentation. Improved troubleshooting quality by combining retrieval-grounded responses with end-to-end telemetry for debugging, evaluation, and optimization.",
    image: "/projects/contextiq_1.png",
    images: ["/projects/contextiq_1.png", "/projects/contextiq_2.png"],
    tags: ["LangChain", "RAG", "LLMOps", "FastAPI"],
    techStack: ["Python", "LangChain", "RAG", "Langfuse", "OpenTelemetry", "FastAPI"],
    category: "ai-ml",
    featured: true,
    githubUrl: "https://github.com/0xAditya-Labs/ContextIQ",
    features: [
      "LangChain-powered Retrieval-Augmented Generation (RAG)",
      "LLM quality and cost tracing via Langfuse",
      "Backend latency instrumentation with OpenTelemetry",
      "Synthetic enterprise knowledge base integration",
      "High-performance FastAPI serving infrastructure"
    ],
    challenges: [
      "Implementing comprehensive observability without adding significant latency",
      "Tuning the chunking and retrieval strategies for the enterprise knowledge base",
      "Analyzing trace data to effectively optimize LLM prompts and costs"
    ],
    metrics: [
      {
        value: "Full-Stack",
        label: "Observability",
        description: "End-to-end tracing across the LLM and backend layers"
      }
    ],
    implementation: {
      approach: "Developed the RAG pipeline using LangChain, carefully configuring the embedding model and vector store. Wrapped the execution logic in Langfuse decorators to capture LLM traces. Deployed the application using FastAPI, instrumented with OpenTelemetry to monitor HTTP requests and internal function latencies.",
      technologies: [
        {
          name: "LangChain & RAG",
          reason: "The go-to framework for orchestrating LLM interactions and vector retrieval."
        },
        {
          name: "Langfuse & OpenTelemetry",
          reason: "Essential for modern LLMOps: debugging, evaluating, and optimizing AI applications in production."
        }
      ]
    },
    documentation: {
      setup: "git clone https://github.com/0xAditya-Labs/ContextIQ.git\npip install -r requirements.txt\nuvicorn main:app --reload"
    }
  }
];