import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { RotatingUseCases } from "./RotatingUseCases";

export const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-foreground space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium font-body">AI-Powered Automation</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Automate Your
              <span className="block text-primary">
                Business Operations
              </span>
              at Scale
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-body">
              Procuro empowers enterprises with AI agents that handle search, email outreach, 
              phone calls, and bulk purchasing automatically. Scale your operations without scaling your team.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Input
                type="email"
                placeholder="Enter your work email"
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

            <div className="flex items-center gap-6 text-sm text-muted-foreground font-body">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                Free during beta
              </div>
              <div>No credit card required</div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card animate-glow-pulse">
              <img
                src={heroImage}
                alt="AI Dashboard showing automated business processes"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-gradient-card rounded-lg p-4 shadow-glow backdrop-blur-sm border border-border">
              <div className="text-foreground font-semibold font-heading">Search Automation</div>
              <div className="text-muted-foreground text-sm font-body">1,247 leads found</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gradient-card rounded-lg p-4 shadow-glow backdrop-blur-sm border border-border">
              <div className="text-foreground font-semibold font-heading">Email Campaign</div>
              <div className="text-muted-foreground text-sm font-body">98.2% delivery rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};