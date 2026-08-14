import AboutSection from "./AboutSection";
import CTASection from "./CTASection";
import DashboardPreview from "./DashboardPreview";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <HeroSection />

      <DashboardPreview />

      <AboutSection />

      <ServicesSection />

      <FeaturesSection />

      <TestimonialsSection />

      <CTASection />

      <Footer />
    </main>
  );
}
