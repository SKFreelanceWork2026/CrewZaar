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
      <Header />

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

