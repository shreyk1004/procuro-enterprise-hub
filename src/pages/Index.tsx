import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <UseCasesSection />
      <FeaturesSection />
    </div>
  );
};

export default Index;
