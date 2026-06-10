import React from "react";

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
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
          box-sizing: border-box;
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
            className="pricing-card"
            style={{
              /* Updated Border & Shadow styling dynamically using variables */
              border: plan.featured
                ? `2px solid ${BRAND_COLOR}`
                : "1px solid #e5e7eb",
              boxShadow: plan.featured
                ? "0 4px 12px rgba(0,0,0,0.08)"
                : "0 4px 12px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = plan.featured
                ? "0 20px 40px rgba(66, 163, 14, 0.24)"
                : "0 12px 28px rgba(66, 163, 14, 0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = plan.featured
                ? "0 15px 35px rgba(66,163,14,0.18)"
                : "0 8px 20px rgba(66,163,14,0.08)";
            }}
          >
            {/* Updated Plan Title Color */}
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
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: plan.featured ? BRAND_COLOR : "#f3f4f6",
                color: plan.featured ? "#ffffff" : "#1a1a1a",
                border: "none",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: "28px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = plan.featured
                  ? "#337d0b"
                  : "#e5e7eb";
                e.currentTarget.style.color = plan.featured
                  ? "#ffffff"
                  : "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = plan.featured
                  ? BRAND_COLOR
                  : "#f3f4f6";
                e.currentTarget.style.color = plan.featured
                  ? "#ffffff"
                  : "#1a1a1a";
              }}
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
  featuresHeader: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: "16px",
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
