import Navbar from "@/components/Navbar";
import CTASection from "./_components/cta-section";
import FeaturesSection from "./_components/features-section";
import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";
import HowItWorks from "./_components/how-it-works";
import ReplacesSection from "./_components/replaces-section";
// import Testimonials from "./_components/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <HeroSection />
      <ReplacesSection />
      <FeaturesSection />
      <HowItWorks />
      {/* <Testimonials /> */}
      <CTASection />
      
      <Footer />
    </div>
  )
}
