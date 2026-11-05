import { Button } from "@/components/ui/button";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();

  return (
    <section id="contact" ref={contactRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${contactVisible ? 'scroll-animate' : ''}`}>
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Get in Touch
              </p>
              <h2 className="text-5xl font-bold mb-6">Let's work together</h2>
              <p className="text-lg text-muted-foreground test">
                If you have an interesting challenge, a project in mind, or just want to start a conversation, feel free to reach out. I am always open to learning, collaborating, and building things that matter.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                  <Mail className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">aditya.chauhan.nitj.ac@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                  <MapPin className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">NIT Jalandhar, Punjab</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Open for international roles and relocation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - CTA Card */}
          <div className={`glass-card rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 ${contactVisible ? 'scroll-animate scroll-animate-delay-2' : ''}`}>
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mx-auto shadow-md">
              <Mail className="w-8 h-8 text-background" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-foreground">Let's Connect</h3>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
                Actively exploring <strong className="text-foreground font-semibold">2027 Full-Time Engineering Roles</strong>, high-impact internships, and intense hackathons.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a href="mailto:aditya.chauhan.nitj.ac@gmail.com" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-full gap-2 px-6 py-5 text-sm font-medium bg-foreground text-background hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:ring-2 hover:ring-foreground/20 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-200 group">
                  <span>Email Directly</span>
                  <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                </Button>
              </a>
              <a
                href="https://linkedin.com/in/aditya-chauhan-nitj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-full gap-2 px-6 py-5 text-sm font-medium border border-border/80 bg-background text-foreground hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] dark:hover:bg-[#0A66C2] dark:hover:text-white dark:hover:border-[#0A66C2] hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200 group"
                >
                  <span>LinkedIn Message</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://tally.so/r/LZyoBJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground"
              >
                <span>Or fill quick form (Tally)</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
