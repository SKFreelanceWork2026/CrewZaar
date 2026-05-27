import React, { useEffect, useState } from "react";

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
  const scoreCards = [
    {
      icon: "🏅",
      title: "Skill Test Score",
      desc: "Real-time performance evaluation",
      score: 95,
    },
    {
      icon: "💬",
      title: "Communication Test",
      desc: "Verbal & written ability assessment",
      score: 88,
    },
    {
      icon: "✅",
      title: "Verified Badge",
      desc: "Fully verified candidate badge",
      score: 100,
    },
    {
      icon: "📈",
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
      {/* Green section */}
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

        <div style={styles.cardGrid}>
          {scoreCards.map((card, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.iconBox}>{card.icon}</div>

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

      {/* Stats section */}
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
    backgroundColor: "#3ab54a",
    padding: "70px 80px 80px",
    textAlign: "center",
  },

  heading: {
    color: "#fff",
    fontSize: "2.2rem",
    fontWeight: "900",
    margin: "0 0 14px 0",
    letterSpacing: "0.5px",
    lineHeight: 1.2,
  },

  subheading: {
    color: "rgba(255,255,255,0.92)",
    fontSize: "1rem",
    margin: "0 0 45px 0",
    lineHeight: 1.7,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
    maxWidth: "980px",
    margin: "0 auto",
  },

  /* FULL BG REMOVED */
  card: {
    borderRadius: "18px",
    padding: "26px 30px",
    textAlign: "left",

    background: "transparent",

    backdropFilter: "none",

    border: "1px solid rgba(255,255,255,0.22)",

    transition: "0.3s ease",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  iconBox: {
    width: "48px",
    height: "48px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    flexShrink: 0,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: "1rem",
    marginBottom: "4px",
  },

  cardDesc: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "0.82rem",
    lineHeight: 1.5,
  },

  scoreRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  scoreLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "0.82rem",
  },

  scoreValue: {
    color: "#fff",
    fontWeight: "800",
    fontSize: "0.95rem",
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
    padding: "65px 80px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    flexWrap: "wrap",
    gap: "30px",
  },

  statItem: {
    minWidth: "180px",
  },

  statValue: {
    fontSize: "3.4rem",
    fontWeight: "900",
    color: "#3ab54a",
    lineHeight: 1,
    marginBottom: "10px",
  },

  statLabel: {
    fontSize: "0.95rem",
    color: "#555",
    fontWeight: "500",
  },
};

export default OpportunitiesSection;