import Header from "../components/Header";
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
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <HeroSection />

      {/* TALENT SECTION */}
      <TalentSection />


      {/* HOW CREWZAAR WORKS */}
      <HowCrewzaarWorks />



      {/* WHY CREWZAAR */}
      <WhyCrewzaar />


      {/* OUR SERVICES */}
      <OurServices />

      {/* NO JOB SEARCHING – ONLY OPPORTUNITIES + STATS */}
      <OpportunitiesSection />

      {/* SEE HOW CREWZAAR WORKS - VIDEO SECTION */}
      <HowItWorksVideo />


      {/* TRUSTED BY GROWING COMPANIES */}
      <TrustedCompanies />


      {/* SUCCESS STORIES */}
      <SuccessStories />

      {/* PRICING SECTION */}
      <PricingSection />

      {/* CTA SECTION */}
      <CTASection />

      {/* BLOG SECTION */}
      <BlogSection />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;