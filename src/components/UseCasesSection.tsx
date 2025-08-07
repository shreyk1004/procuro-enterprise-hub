import { RotatingUseCases } from "@/components/RotatingUseCases";
import { Button } from "@/components/ui/button";

export const UseCasesSection = () => {
  return (
    <div className="py-20 bg-muted/30" data-section="use-cases">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2
            className="text-3xl lg:text-4xl text-foreground mb-6"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
          >
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            See how Procuro's AI agents solve complex enterprise workflows across industries.
          </p>

          <div className="max-w-2xl mx-auto">
            <RotatingUseCases />
          </div>

          <div className="mt-12 text-center">
            
            <div className="space-y-4">
              <p className="text-lg text-foreground font-medium">
                See how Procuro works for you
              </p>
              <a href="https://www.theprocura.com" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  Try Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};