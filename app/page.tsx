import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import ServicesSection from "./components/landing/ServicesSection";
import TestimonialsSection from "./components/landing/TestimonialsSection";
import AboutSection from "./components/landing/AboutSection";
import FooterSection from "./components/landing/FooterSection";
import ParticleBackground from "./components/ui/ParticleBackground";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0f1e] overflow-hidden font-sans selection:bg-sky-400/30 selection:text-white">
      
      {/* Animated Orb System */}
      <ParticleBackground />

      <div className="relative z-10 text-white">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <FooterSection />
      </div>

    </main>
  );
}
