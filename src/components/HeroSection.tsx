import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { RotatingUseCases } from "./RotatingUseCases";
import { CanvasSphere } from "./CanvasSphere";

const JumpingArrow = () => {
  const scrollToNextSection = () => {
    // Scroll to UseCasesSection if present
    const useCasesSection = document.querySelector('[data-section="use-cases"]');
    if (useCasesSection) {
      useCasesSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Fallback: scroll down by one viewport height
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
      onClick={scrollToNextSection}
      aria-label="Scroll to next section"
    >
      <ChevronDown className="h-10 w-10 text-primary drop-shadow-lg" />
    </div>
  );
};

export const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
      {/* Animated Sphere Background */}
      <CanvasSphere radius={180} style={{ left: '40%', width: '900px', height: '900px' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-foreground space-y-8 animate-fade-in-up">
            
            <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-[1.3]">
              Automate Your
              <span className="block text-primary">
                <span className="italic">Human</span> Workflows
              </span>
               at Scale
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-[Spectral]">
              Procuro empowers enterprises with AI agents that handle search, email outreach, 
              phone calls, and bulk purchasing automatically. Scale your operations without scaling your team.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/90 border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                required
              />
              <Button type="submit" className="whitespace-nowrap">
                Get Early Access
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

          </div>
          {/* Right Column removed for better background visibility */}
        </div>
      </div>
      
      {/* Jumping Arrow */}
      <JumpingArrow />
    </div>
  );
};