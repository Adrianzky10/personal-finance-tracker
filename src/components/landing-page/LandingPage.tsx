import CTASection from "./CTASection";
import DashboardPreview from "./DashboardPreview";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <HeroSection />

      <DashboardPreview />

      <FeaturesSection />

      <CTASection />

      <Footer />
    </main>
  );
}
