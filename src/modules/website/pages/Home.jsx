import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import TalentSection from "../components/TalentSection";
import SuccessStories from "../components/SuccessStories";
import PricingSection from "../components/PricingSection";
import CTASection from "../components/CTASection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

// New sections
import TrustedCompanies from "../components/TrustedCompanies";
import HowItWorksVideo from "../components/HowItWorksVideo";
import OpportunitiesSection from "../components/OpportunitiesSection";
import OurServices from "../components/OurServices";
import WhyCrewzaar from "../components/WhyCrewzaar";
import HowCrewzaarWorks from "../components/HowCrewzaarWorks";

const Home = () => {
  
  // ===== FORCE CLEAR entire session storage when Home route loads =====
  useEffect(() => {
    console.log('🏠 Home route loaded - FORCE CLEARING entire session storage');
    
    try {
      // Completely clear all session storage
      sessionStorage.clear();
      console.log('✅ Entire session storage cleared successfully');
    } catch (error) {
      console.error('❌ Failed to clear session storage:', error);
    }
    
    // Also handle back/forward navigation
    const handlePopState = () => {
      console.log('🔄 Popstate detected - clearing session storage again');
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error('❌ Failed to clear session storage on popstate:', error);
      }
    };
    
    // Handle page show from cache
    const handlePageShow = (event) => {
      if (event.persisted) {
        console.log('📄 Page restored from cache - clearing session storage');
        try {
          sessionStorage.clear();
        } catch (error) {
          console.error('❌ Failed to clear session storage on pageshow:', error);
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []); // Empty dependency array - runs once when component mounts

  return (
    <>

      <section id="home">
        <HeroSection />
      </section>

      <section id="platform">
        <TalentSection />
      </section>

      <section id="how-it-works">
        <HowCrewzaarWorks />
      </section>

      <section id="why-crewzaar">
        <WhyCrewzaar />
      </section>

      <section id="services">
        <OurServices />
      </section>

      <section id="opportunities">
        <OpportunitiesSection />
      </section>

      <section id="video">
        <HowItWorksVideo />
      </section>

      <section id="companies">
        <TrustedCompanies />
      </section>

      <section id="success">
        <SuccessStories />
      </section>

      <section id="pricing">
        <PricingSection />
      </section>

      <section id="contact">
        <CTASection />
      </section>

      <BlogSection />
      <Footer />
    </>
  );
};

export default Home;