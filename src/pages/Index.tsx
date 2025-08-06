import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { ProductDemoSection } from "@/components/ProductDemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductDemoSection />
      <FeaturesSection />
      <UseCasesSection />
    </div>
  );
};

export default Index;
