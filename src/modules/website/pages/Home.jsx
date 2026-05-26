import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TalentSection from "../components/TalentSection";
import SuccessStories from "../components/SuccessStories";
import PricingSection from "../components/PricingSection";
import CTASection from "../components/CTASection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <HeroSection />

      {/* TALENT SECTION */}
      <TalentSection />

      {/* SUCCESS STORIES */}
      {/* <SuccessStories /> */}

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