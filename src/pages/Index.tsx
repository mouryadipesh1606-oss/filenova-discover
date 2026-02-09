import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ToolsGrid } from "@/components/ToolsGrid";
import { PricingSection } from "@/components/PricingSection";
import { StatsSection } from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ToolsGrid />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
