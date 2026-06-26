import React from "react";
import { useNavigate } from "react-router-dom";

// Brand style tokens - adjust these values as needed for your theme
const BRAND_COLOR = "#42a30e";
const BRAND_LIGHT = "#f0f9eb";

const plans = [
  {
    id: "employee",
    title: "Employee",
    subtitle: "Perfect for professionals seeking opportunities",
    price: "₹199",
    period: "/Year",
    featured: true,
    features: [
      "Complete profile verification & Verified badge",
      "Skill & communication tests",
      "Unlimited job opportunities",
      "Monthly Challenges & Skill Growth Programs",
      "Free Mock Interview",
      "Direct company outreach",
    ],
  },
  {
    id: "finder",
    title: "Finder (Company)",
    subtitle: "Find and hire verified talent instantly",
    price: "₹1999",
    period: "/month",
    featured: false,
    features: [
      "Unlimited employee search",
      "Advanced filters",
      "Direct hiring",
      "Skill verification access",
      "AI Fast Mach Search ",
      "Team management",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <circle cx="10" cy="10" r="10" fill={BRAND_COLOR} />
    <path
      d="M6 10.5L8.5 13L14 8"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PricingSection = () => {
  const navigate = useNavigate();
  
  console.log("Navigate:", navigate);

  const handleGetStarted = () => {
    console.log("Button Clicked");
    sessionStorage.removeItem("showProfile");
    
    // Try this first
    navigate("/employee-wizard");
    
    // If above doesn't work, uncomment this:
    // window.location.href = "/employee-wizard";
    
    // Or test with alert:
    // alert("Get Started clicked!");
  };

  return (
    <section style={styles.section}>
      {/* Embedded CSS for seamless responsiveness and pure hovering transitions */}
      <style>{`
        .pricing-container {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }
        
        .pricing-card {
          flex: 0 0 300px;
          max-width: 350px;
          background-color: #ffffff;
          border-radius: 20px;
          padding: 36px 28px;
          text-align: left;
          transition: all 0.3s ease;
          cursor: default;
          box-sizing: border-box;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          position: relative;
        }
        
        .pricing-card:hover {
          border: 2px solid #42a30e !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(66,163,14,0.24) !important;
        }
        
        .pricing-card .pricing-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          background: #f3f4f6;
          color: #1a1a1a;
          border: none;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          margin-bottom: 28px;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          position: relative;
          z-index: 99999;
          pointer-events: auto;
        }
        
        .pricing-card:hover .pricing-btn {
          background: #42a30e;
          color: #ffffff;
        }
        
        .pricing-card.active-card {
          border: 2px solid #42a30e !important;
          box-shadow: 0 20px 40px rgba(66,163,14,0.24) !important;
        }
        
        .pricing-card.active-card .pricing-btn {
          background: #42a30e;
          color: #ffffff;
        }
        
        @media (max-width: 767px) {
          .pricing-container {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .pricing-card {
            width: 100%;
            max-width: 100%;
            padding: 30px 24px;
          }
        }
      `}</style>

      {/* Heading */}
      <h2 style={styles.heading}>
        SIMPLE, <span style={{ color: BRAND_COLOR }}>TRANSPARENT PRICING</span>
      </h2>
      <p style={styles.subheading}>
        Choose the plan that fits your needs. No hidden fees.
      </p>

      {/* Responsive Cards Grid */}
      <div className="pricing-container">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card ${plan.featured ? "active-card" : ""}`}
          >
            <h3
              style={{
                ...styles.planTitle,
                color: "#1a1a1a",
              }}
            >
              {plan.title}
            </h3>

            <p style={styles.planSubtitle}>{plan.subtitle}</p>

            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  ...styles.priceText,
                  color: "#1a1a1a",
                }}
              >
                {plan.price}
              </span>
              <span style={styles.periodText}>{plan.period}</span>
            </div>

            <button
              type="button"
              className="pricing-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>

            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#666",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              What's Included:
            </p>

            {/* Features List */}
            <ul style={styles.featuresList}>
              {plan.features.map((feat, i) => (
                <li key={i} style={styles.featureItem}>
                  <CheckIcon />
                  <span style={styles.featureText}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer link section */}
      <p style={styles.footerText}>
        Need a custom plan?{" "}
        <a href="#contact" style={{ ...styles.footerLink, color: BRAND_COLOR }}>
          Contact us
        </a>
      </p>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#ffffff",
    padding: "clamp(50px, 7vw, 90px) clamp(20px, 4vw, 40px)",
    textAlign: "center",
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
    margin: "0 0 10px 0",
  },
  subheading: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    color: "#64748b",
    fontSize: "clamp(14px, 1.5vw, 15px)",
    margin: "0 auto 54px",
    maxWidth: "480px",
    lineHeight: 1.5,
  },
  planTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 6px 0",
  },
  planSubtitle: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    fontSize: "13px",
    color: "#64748b",
    margin: "0 0 24px 0",
    lineHeight: "1.5",
  },
  priceText: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    fontSize: "38px",
    fontWeight: "700",
    lineHeight: 1,
  },
  periodText: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    fontSize: "14px",
    color: "#64748b",
    marginLeft: "6px",
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: "12px 0 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  featureText: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    fontSize: "13.5px",
    color: "#334155",
    lineHeight: "1.4",
  },
  footerText: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    marginTop: "40px",
    fontSize: "14px",
    color: "#64748b",
  },
  footerLink: {
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};

export default PricingSection;