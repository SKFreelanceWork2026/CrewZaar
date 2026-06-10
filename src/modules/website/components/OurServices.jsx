import React from "react";
import img1 from "../../../assets/images/services1.jpeg";
import img2 from "../../../assets/images/services2.jpeg";
import img3 from "../../../assets/images/services3.jpeg";
import img4 from "../../../assets/images/services4.jpeg";

const services = [
  {
    id: 0,
    image: img1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="9" y1="7" x2="15" y2="7"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
        <line x1="9" y1="15" x2="13" y2="15"/>
      </svg>
    ),
    title: "Skill Assessment Platform",
    desc: "Evaluate candidates through role-based tests tailored for developers, designers, and more.",
  },
  {
    id: 1,
    image: img2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Employee Verification System",
    desc: "Multi-level verification including skill tests, communication checks, and interviews.",
  },
  {
    id: 2,
    image: img3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4"/>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <path d="M21 21v-2a4 4 0 0 0-3-3.85"/>
      </svg>
    ),
    title: "Smart Hiring Platform",
    desc: "Companies can browse, filter, and hire candidates directly based on performance.",
  },
  {
    id: 3,
    image: img4,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Interview & Evaluation System",
    desc: "Schedule and manage candidate interviews with structured evaluation workflows.",
  },
];

export default function OurServices() {
  return (
    <section style={styles.section}>
      {/* Dynamic Responsive Stylesheet injection for fluid break points */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
        }
        @media (max-width: 991px) {
          .services-grid {
            gap: 20px;
          }
        }
        @media (max-width: 767px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
        }
      `}</style>

      {/* Heading */}
      <div style={styles.headingRow}>
        <h2 style={styles.heading}>
          OUR <span style={styles.green}>SERVICES</span>
        </h2>
      </div>

      <p style={styles.subheading}>
        End-to-end recruitment solutions designed to help companies hire verified, skilled, and job-ready talent.
      </p>

      {/* Responsive Grid */}
      <div className="services-grid">
        {services.map((svc) => (
          <div key={svc.id} style={styles.card}>
            {/* Background image */}
            <img src={svc.image} alt={svc.title} style={styles.cardImg} />

            {/* Dark gradient overlay */}
            <div style={styles.cardOverlay} />

            {/* Text content */}
            <div style={styles.cardBody}>
              <div style={styles.iconBadge}>{svc.icon}</div>
              <h3 style={styles.cardTitle}>{svc.title}</h3>
              <p style={styles.cardDesc}>{svc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#ffffff",
    padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 80px)",
    textAlign: "center",
  },
  headingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
    fontWeight: "700", // Poppins Bold
    color: "#1a1a1a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  green: {
    color: "#41AA00", // Updated to your brand green
  },
  subheading: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif", // Set subtext font stack
    fontSize: "clamp(14px, 1.5vw, 16px)", // Upgraded size scale for readability from 11px
    color: "#555555",
    margin: "0 auto 48px",
    maxWidth: "580px",
    lineHeight: 1.6,
  },
  card: {
    borderRadius: "20px",
    overflow: "hidden",
    minHeight: "260px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  cardImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.15) 100%)",
  },
  cardBody: {
    position: "relative",
    zIndex: 2,
    padding: "clamp(20px, 4vw, 32px)",
    textAlign: "left",
    width: "100%",
  },
  iconBadge: {
    width: "46px",
    height: "46px",
    backgroundColor: "#41AA00", // Updated to your brand green
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    color: "#ffffff",
    fontWeight: "700", // Poppins Bold
    fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
    margin: "0 0 10px 0",
    letterSpacing: "0.2px",
  },
  cardDesc: {
    fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif", // Set subtext font stack
    color: "rgba(255,255,255,0.88)",
    fontSize: "clamp(13px, 1.5vw, 14.5px)",
    lineHeight: 1.55,
    margin: 0,
  },
};