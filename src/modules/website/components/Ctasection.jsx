import { useState } from "react";

const BRAND_COLOR = "#42a30e";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim()) {
      alert(`Thanks! We'll reach out to ${email} shortly.`);
      setEmail("");
    }
  };

  return (
    <section style={styles.section}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .cta-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .cta-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-input {
          flex: 1;
          min-width: 0;
        }

        .cta-button {
          flex-shrink: 0;
        }

        /* Placeholder text color - white */
        .cta-input::placeholder {
          color: #ffffff;
          opacity: 0.85;
        }

        .cta-input::-webkit-input-placeholder {
          color: #ffffff;
          opacity: 0.85;
        }

        .cta-input::-moz-placeholder {
          color: #ffffff;
          opacity: 0.85;
        }

        .cta-input:-ms-input-placeholder {
          color: #ffffff;
          opacity: 0.85;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .cta-container {
            max-width: 100%;
            gap: 10px;
          }

          .cta-input {
            padding: 13px 16px !important;
            font-size: 14px !important;
          }

          .cta-button {
            padding: 13px 20px !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .cta-container {
            gap: 8px;
          }

          .cta-input {
            padding: 12px 14px !important;
            font-size: 13px !important;
          }

          .cta-button {
            padding: 12px 18px !important;
            font-size: 12.5px !important;
          }

          .cta-button svg {
            width: 13px;
            height: 13px;
          }
        }

        @media (max-width: 360px) {
          .cta-container {
            gap: 6px;
          }
        }
      `}</style>

      <div className="cta-wrapper">
        <h2 style={styles.heading}>
          Start Hiring Top Talent Today
        </h2>

        <p style={styles.subheading}>
          Join companies already hiring faster with Crewzaar.
        </p>

        <div className="cta-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="cta-input"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={styles.input}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.75)")}
          />

          <button
            onClick={handleSubmit}
            className="cta-button"
            style={styles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f2f2f2";
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
              style={{ flexShrink: 0 }}
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
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: BRAND_COLOR,
    padding: "clamp(60px, 8vw, 100px) clamp(16px, 5vw, 40px)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  },

  heading: {
    fontFamily: "'Poppins', sans-serif",
    color: "#ffffff",
    fontSize: "clamp(28px, 5.5vw, 48px)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    lineHeight: 1.15,
    margin: "0 0 14px 0",
  },

  subheading: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    color: "rgba(255,255,255,0.92)",
    fontSize: "clamp(14px, 1.6vw, 18px)",
    maxWidth: "650px",
    margin: "0 auto clamp(32px, 4vw, 48px)",
    lineHeight: 1.6,
  },

  input: {
    flex: 1,
    width: "100%",
    maxWidth: "460px",
    minHeight: "52px",
    padding: "14px 18px",
    border: "1.5px solid rgba(255,255,255,0.75)",
    borderRadius: "9px",
    outline: "none",
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: "15px",
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
    transition: "all 0.25s ease",
  },

  button: {
    minHeight: "52px",
    padding: "14px 24px",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    border: "none",
    borderRadius: "9px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13.5px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    whiteSpace: "nowrap",
    transition: "all 0.25s ease",
    flexShrink: 0,
  },
};

export default CTASection;