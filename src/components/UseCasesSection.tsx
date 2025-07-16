import { RotatingUseCases } from "@/components/RotatingUseCases";

export const UseCasesSection = () => {
  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Real Problems.
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Real Solutions.
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            See how Procuro's AI agents solve complex enterprise workflows across industries.
          </p>

          <div className="max-w-2xl mx-auto">
            <RotatingUseCases />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-primary">7 industries.</span> Countless workflows. One platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};