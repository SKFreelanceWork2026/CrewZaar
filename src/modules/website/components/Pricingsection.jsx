const plans = [
  {
    id: "employee",
    title: "Employee",
    subtitle: "Perfect for professionals seeking opportunities",
    price: "₹399",
    period: "/Year",
    featured: true,
    features: [
      "Complete profile verification",
      "Skill & communication tests",
      "Verified badge",
      "Unlimited job opportunities",
      "Performance tracking",
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
      "Bulk hiring tools",
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
    <circle cx="10" cy="10" r="10" fill="#3aaa35" />
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
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: "900",
          color: "#1a1a1a",
          letterSpacing: "-0.5px",
          marginBottom: "8px",
        }}
      >
        SIMPLE,{" "}
        <span style={{ color: "#3aaa35" }}>TRANSPARENT PRICING</span>
      </h2>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "48px" }}>
        Choose the plan that fits your needs. No hidden fees.
      </p>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          maxWidth: "780px",
          margin: "0 auto",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              flex: "1 1 300px",
              maxWidth: "340px",
              border: plan.featured ? "2px solid #3aaa35" : "1px solid #e5e5e5",
              borderRadius: "16px",
              padding: "32px 28px",
              textAlign: "left",
              backgroundColor: "#ffffff",
              boxShadow: plan.featured
                ? "0 8px 32px rgba(58,170,53,0.12)"
                : "0 2px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = plan.featured
                ? "0 16px 48px rgba(58,170,53,0.2)"
                : "0 8px 24px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = plan.featured
                ? "0 8px 32px rgba(58,170,53,0.12)"
                : "0 2px 12px rgba(0,0,0,0.05)";
            }}
          >
            {/* Plan name */}
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 6px" }}>
              {plan.title}
            </h3>
            <p style={{ fontSize: "12px", color: "#888", margin: "0 0 20px", lineHeight: "1.5" }}>
              {plan.subtitle}
            </p>

            {/* Price */}
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", color: "#1a1a1a" }}>
                {plan.price}
              </span>
              <span style={{ fontSize: "13px", color: "#888", marginLeft: "4px" }}>
                {plan.period}
              </span>
            </div>

            {/* CTA */}
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: plan.featured ? "none" : "2px solid #3aaa35",
                backgroundColor: plan.featured ? "#3aaa35" : "transparent",
                color: plan.featured ? "#ffffff" : "#3aaa35",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: "24px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = plan.featured ? "#2d8a29" : "#3aaa35";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = plan.featured ? "#3aaa35" : "transparent";
                e.currentTarget.style.color = plan.featured ? "#ffffff" : "#3aaa35";
              }}
            >
              Get Started
            </button>

            {/* Features */}
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#1a1a1a", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "14px" }}>
              What's Included:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {plan.features.map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckIcon />
                  <span style={{ fontSize: "13px", color: "#444", lineHeight: "1.4" }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Custom plan */}
      <p style={{ marginTop: "32px", fontSize: "13px", color: "#888" }}>
        Need a custom plan?{" "}
        <a href="#contact" style={{ color: "#3aaa35", fontWeight: "600", textDecoration: "none" }}>
          Contact us
        </a>
      </p>
    </section>
  );
};

export default PricingSection;