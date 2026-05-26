import { useState } from "react";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim()) {
      alert(`Thanks! We'll reach out to ${email} shortly.`);
      setEmail("");
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#3aaa35",
        padding: "90px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        /* Subtle dot texture matching the image */
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          color: "#ffffff",
          fontSize: "clamp(26px, 5vw, 48px)",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "14px",
          lineHeight: 1.15,
        }}
      >
        Start Hiring Top Talent Today
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "15px",
          marginBottom: "40px",
          fontStyle: "italic",
        }}
      >
        Join companies already hiring faster with Crewzaar.
      </p>

      {/* Email input + CTA — separate elements with gap */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        {/* Transparent input with white border */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            flex: "1 1 300px",
            maxWidth: "380px",
            padding: "15px 20px",
            border: "1.5px solid rgba(255,255,255,0.75)",
            borderRadius: "6px",
            outline: "none",
            fontSize: "14px",
            color: "#ffffff",
            backgroundColor: "transparent",
            fontFamily: "inherit",
            letterSpacing: "0.2px",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.75)")}
        />

        {/* White button, separate */}
        <button
          onClick={handleSubmit}
          style={{
            padding: "15px 28px",
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            whiteSpace: "nowrap",
            transition: "background-color 0.2s ease, color 0.2s ease",
            fontFamily: "inherit",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
          }}
        >
          Get Started
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8h14M9 2l6 6-6 6"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CTASection;