import { LandingHeader } from "@/components/landing/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AIExplanation } from "@/components/landing/AIExplanation";
import { SecurityPrivacy } from "@/components/landing/SecurityPrivacy";
import { FAQSection } from "@/components/landing/FAQSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <DashboardPreview />
        <FeaturesSection />
        <HowItWorks />
        <AIExplanation />
        <SecurityPrivacy />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
