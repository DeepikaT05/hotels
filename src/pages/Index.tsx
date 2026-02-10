import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import RoomsPreview from "@/components/RoomsPreview";
import RestaurantSection from "@/components/RestaurantSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <RoomsPreview />
      <RestaurantSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
