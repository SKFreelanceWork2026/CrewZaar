import React, { useEffect, useState } from "react";

// Import Icons
import container from "../../../assets/images/Nojobsearchingicons/Container.png";
import container1 from "../../../assets/images/Nojobsearchingicons/Container-1.png";
import container2 from "../../../assets/images/Nojobsearchingicons/Container-2.png";
import container3 from "../../../assets/images/Nojobsearchingicons/Container-3.png";

const Counter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

const OpportunitiesSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scoreCards = [
    {
      icon: container3,
      title: "Skill Test Score",
      desc: "Real-time performance evaluation",
      score: 95,
    },
    {
      icon: container2,
      title: "Communication Test",
      desc: "Verbal & written ability assessment",
      score: 88,
    },
    {
      icon: container1,
      title: "Verified Badge",
      desc: "Fully verified candidate badge",
      score: 100,
    },
    {
      icon: container,
      title: "Performance Score",
      desc: "Overall ranking based on tests & interview",
      score: 92,
    },
  ];

  const stats = [
    { value: 8000, suffix: "+", label: "Candidates Registered" },
    { value: 500, suffix: "+", label: "Companies Hiring" },
    { value: 2000, suffix: "+", label: "Successful Matches" },
    { value: 95, suffix: "%", label: "Hiring Success Rate" },
  ];

  return (
    <section style={styles.wrapper}>
      {/* Green Section */}
      <div style={styles.greenSection}>
        <h2 style={styles.heading}>
          NO JOB SEARCHING – ONLY OPPORTUNITIES
        </h2>

        <p style={styles.subheading}>
          Candidates are matched with companies based on skills,
          test performance, and availability
          <br />
          — not random applications.
        </p>

        <div
          style={{
            ...styles.cardGrid,
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(2, minmax(0, 1fr))",
          }}
        >
          {scoreCards.map((card, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.iconBox}>
                  <img
                    src={card.icon}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div>
                  <div style={styles.cardTitle}>{card.title}</div>
                  <div style={styles.cardDesc}>{card.desc}</div>
                </div>
              </div>

              <div style={styles.scoreRow}>
                <span style={styles.scoreLabel}>Score</span>
                <span style={styles.scoreValue}>
                  <Counter end={card.score} suffix="%" />
                </span>
              </div>

              <div style={styles.progressBg}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${card.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statValue}>
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    overflow: "hidden",
  },

  greenSection: {
    backgroundColor: "#42a30e",
    padding: "clamp(60px, 8vw, 90px) clamp(20px, 5vw, 80px)",
    textAlign: "center",
  },

  heading: {
    color: "#fff",
    fontSize: "clamp(2.1rem, 5vw, 3.2rem)",
    fontWeight: 600,
    margin: "0 0 14px 0",
    letterSpacing: "0.5px",
    lineHeight: 1.2,
    fontFamily: "Poppins, sans-serif",
  },

  subheading: {
    color: "rgba(255,255,255,0.92)",
    fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
    margin: "0 0 45px 0",
    lineHeight: 1.7,
    maxWidth: "780px",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
  },

  cardGrid: {
    display: "grid",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

card: {
  borderRadius: "20px",
  padding: "30px",
  textAlign: "left",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))",

  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",

  border: "1px solid rgba(255,255,255,0.25)",

  boxShadow:
    "0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.15)",

  transition: "all 0.3s ease",
  minHeight: "180px",
},

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "22px",
  },

  iconBox: {
    width: "64px",
    height: "64px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: "8px",
  },

  cardTitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "1.05rem",
    marginBottom: "4px",
    fontFamily: "Poppins, sans-serif",
  },

  cardDesc: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "0.85rem",
    lineHeight: 1.5,
    fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
  },

  scoreRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  scoreLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "0.85rem",
    fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
  },

  scoreValue: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "1rem",
  },

  progressBg: {
    height: "8px",
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "20px",
    transition: "width 2s ease",
  },

  statsSection: {
    backgroundColor: "#f7f8f4",
    padding: "clamp(50px, 7vw, 75px) clamp(20px, 5vw, 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "100px",
  },

  statItem: {
    minWidth: "160px",
    textAlign: "center",
  },

  statValue: {
    fontSize: "clamp(2.6rem, 6vw, 3.6rem)",
    fontWeight: 700,
    color: "#42a30e",
    lineHeight: 1,
    marginBottom: "8px",
  },

  statLabel: {
    fontSize: "0.98rem",
    color: "#555",
    fontWeight: 500,
    fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
  },
};

export default OpportunitiesSection;