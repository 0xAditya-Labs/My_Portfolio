import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQ = () => {
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const faqs = [
  {
    question: "What do you do and what are you currently working on?",
    answer:
      "I'm a final-year CS Engineering student at NIT Jalandhar. I recently wrapped up an SDE Internship at Accenture where I built GenAI and RAG-based document intelligence systems. Right now, I'm focused on building scalable projects for real users, competing in CP, and exploring my next role. Outside of that, I'm building high-performance systems — most recently a thread-safe LRU cache handling 15,000+ QPS.",
  },
  {
    question: "What kind of projects excite you the most?",
    answer:
      "Anything where correctness and performance are both non-negotiable — concurrent systems, caching architecture, real-time pipelines. I like problems where the \"easy\" solution breaks under real load, and the interesting work is in making it not break.",
  },
  {
    question: "What tools and technologies do you feel most comfortable with?",
    answer:
      "C++ and Python for systems and algorithmic work, the MERN/FastAPI stack for full-stack builds, and a growing focus on RAG pipelines, vector retrieval, and LLM-backed applications. I care more about the underlying concepts — concurrency, system design, DBMS, OS, network — than any single framework and able to play with any new technology quick",
  },
  {
    question: "How do you usually approach a new problem or project?",
    answer:
      "I like to start by clearly understanding the problem and deciding what success should look like — including where it's likely to break under real load, not just whether it works in the happy path. I look at the actual requirements and choose the technology that genuinely fits them, then follow a proper SDLC rather than jumping straight into code. From there, I break things down into smaller parts, build step by step, and keep measuring whether I'm actually improving performance or usability, not just adding features. Solving 1,500+ DSA problems has helped me think more systematically, allowing me to approach architectural problems from multiple creative perspectives before committing to a design. Ultimately, I always try to balance that clean, algorithmic logic with practical, production-ready execution.",
  },
  {
    question: "When are you expected to graduate?",
    answer:
      "I will graduate in July 2027 with a B.Tech in Computer Science and Engineering from NIT Jalandhar.",
  },
];


  return (
    <section id="faq" ref={faqRef} className="pt-16 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-16 ${faqVisible ? 'scroll-animate' : ''}`}>
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Questions & Answers
          </p>
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`bg-transparent rounded-2xl px-6 border-none transition-all group ${
                faqVisible ? `scroll-animate scroll-animate-delay-${Math.min(index % 3 + 1, 3)}` : ''
              }`}
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 relative border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 group-hover:border-black dark:group-hover:border-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
