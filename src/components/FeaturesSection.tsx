import { Search, Mail, Phone, ShoppingCart, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export const FeaturesSection = () => {

  const rotatingWords = ["Business", "Life", "Calendar"];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFade(true);
      }, 250); // fade out duration
    }, 2200); // total duration per word

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
            <span className="inline-block">Automate your </span>{" "}
            <span
              className={`inline-block transition-all duration-300 ease-in-out ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                minWidth: "200px", // Reserve space for the longest word
                textAlign: "left",
                color: "gray"
              }}
              aria-live="polite"
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </h2>
        </div>

{/*
        <div className="text-center bg-gradient-card border border-border rounded-3xl p-12">
          <h3 className="text-3xl font-bold font-heading mb-4 text-foreground">
            Work like you're a 100-man team.
          </h3>
          <Button size="lg" onClick={() => window.location.href = 'mailto:kshrey10@wharton.upenn.edu'}>
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
*/} 
      </div>
    </div>   
  );
};
