import { useEffect, useState } from "react";

const useCases = [
  {
    title: "Warranty Claims",
    description: "From complaint to shipping label — fully automated.",
    industry: "Manufacturing"
  },
  {
    title: "Insurance Intake",
    description: "File claims. Chase docs. Keep callers happy.",
    industry: "Insurance"
  },
  {
    title: "Medical Pre-Auths",
    description: "Kill the fax. Automate approvals and appeals.",
    industry: "Healthcare"
  },
  {
    title: "Construction RFIs",
    description: "Capture field changes. Auto-follow-up. Zero delays.",
    industry: "Construction"
  },
  {
    title: "Property Maintenance",
    description: "Tenants call. Vendors show. You sleep.",
    industry: "Real Estate"
  },
  {
    title: "Invoice Disputes",
    description: "Find the issue. Fix it. Close the book.",
    industry: "Finance"
  },
  {
    title: "Customs Docs",
    description: "Chase missing forms. File clean. Clear faster.",
    industry: "Logistics"
  }
];

export const RotatingUseCases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % useCases.length);
        setIsVisible(true);
      }, 300); // Half of transition duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentUseCase = useCases[currentIndex];

  return (
    <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card backdrop-blur-sm">
      <div className="text-center space-y-4">
        <div 
          className={`transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            {currentUseCase.industry}
          </div>
          
          <h3 className="text-2xl font-bold font-heading text-foreground mb-3">
            {currentUseCase.title}
          </h3>
          
          <p className="text-lg text-muted-foreground italic font-body">
            "{currentUseCase.description}"
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 pt-4">
          {useCases.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};