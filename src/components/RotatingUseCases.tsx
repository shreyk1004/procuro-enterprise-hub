import { useEffect, useState } from "react";

const useCases = [
  {
    title: "Find AI Researchers",
    description: "Instantly discover top AI researchers at Stanford and beyond.",
    industry: "Academia"
  },
  {
    title: "Connect with Alumni at Google",
    description: "See which alumni from your school are working at Google and reach out.",
    industry: "Networking"
  },
  {
    title: "Book a Mentor for Product Management",
    description: "Get matched with mentors who have PM experience relevant to your background.",
    industry: "Mentorship"
  },
  {
    title: "Find Study Groups for Data Structures",
    description: "Join or create study groups with classmates who share your interests.",
    industry: "Education"
  },
  {
    title: "Locate Climate Change Experts",
    description: "Identify connections who have published on climate change topics.",
    industry: "Research"
  },
  {
    title: "Discover Local Language Tutors",
    description: "Find Mandarin tutors in your city for personalized learning.",
    industry: "Learning"
  },
  {
    title: "Connect with Hiking Enthusiasts",
    description: "Meet classmates and colleagues who love hiking as much as you do.",
    industry: "Community"
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