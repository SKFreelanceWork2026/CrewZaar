import React from "react";
import img1 from "../../../assets/images/services1.jpeg";
import img2 from "../../../assets/images/services2.jpeg";
import img3 from "../../../assets/images/services3.jpeg";
import img4 from "../../../assets/images/services4.jpeg";
import monthlyChallengesImg from "../../../assets/images/monthlychallanges.png";
import skillDevelopmentImg from "../../../assets/images/skilldevelopment.png";

const services = [
  {
    id: 0,
    image: img1,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
    title: "Skill Assessment Platform",
    desc: "Evaluate candidates through role-based tests tailored for developers, designers, and more.",
  },

  {
    id: 1,
    image: img2,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Employee Verification System",
    desc: "Multi-level verification including skill tests, communication checks, and interviews.",
  },

  {
    id: 2,
    image: img3,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
      </svg>
    ),
    title: "Smart Hiring Platform",
    desc: "Companies can browse, filter, and hire candidates directly based on performance.",
  },

  {
    id: 3,
    image: img4,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Mock Interviews",
    desc: "Practice real interview scenarios with AI and Expert feedback to boost your confidence.",
  },

  {
    id: 4,
    image: monthlyChallengesImg,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
        <path d="M9 15h.01" />
        <path d="M15 15h.01" />
        <path d="M9 19h.01" />
        <path d="M15 19h.01" />
      </svg>
    ),
    title: "Monthly Challenges",
    desc: "Stay motivated with monthly challenges designed to sharpen your skills.",
  },

  {
    id: 5,
    image: skillDevelopmentImg,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-7" />
      </svg>
    ),
    title: "Skill Development & Performance Analysis",
    desc: "Access expert-led courses and resources to build and grow in-demand skills.",
  },
];

export default function OurServices() {
  return (
    <section style={styles.section}>
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .service-card {
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .service-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .service-card img {
          transition: transform 0.4s ease;
        }

        .service-card:hover img {
          transform: scale(1.06);
        }

        @media (max-width: 991px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 767px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <div style={styles.headingRow}>
        <h2 style={styles.heading}>
          OUR <span style={styles.green}>SERVICES</span>
        </h2>
      </div>

      <p style={styles.subheading}>
        End-to-end recruitment solutions designed to help companies hire
        verified, skilled, and job-ready talent.
      </p>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card" style={styles.card}>
            <img
              src={service.image}
              alt={service.title}
              style={styles.cardImg}
            />

            <div style={styles.cardOverlay} />

            <div style={styles.cardBody}>
              <div style={styles.titleRow}>
                <div style={styles.iconBadge}>{service.icon}</div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
              </div>
              <p style={styles.cardDesc}>{service.desc}</p>
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
    padding: "80px 40px",
    textAlign: "center",
  },

  headingRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px",
  },

  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "48px",
    fontWeight: "700",
    color: "#161616",
    margin: 0,
    lineHeight: 1.2,
  },

  green: {
    color: "#41AA00",
  },

  subheading: {
    fontFamily: "'Familjen Grotesk', sans-serif",
    fontSize: "16px",
    color: "#666",
    maxWidth: "700px",
    margin: "0 auto 50px",
    lineHeight: 1.6,
  },

  card: {
    position: "relative",
    minHeight: "200px",
    borderRadius: "18px",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
  },

  cardImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transform: "scale(1.04)",
  },

  cardOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.10) 100%)",
  },

  cardBody: {
    position: "relative",
    zIndex: 2,
    padding: "14px 16px",
    textAlign: "left",
    width: "100%",
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },

  iconBadge: {
    width: "32px",
    height: "32px",
    minWidth: "32px",
    backgroundColor: "#41AA00",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: 0,
  },

  cardDesc: {
    color: "rgba(255,255,255,0.88)",
    fontFamily: "'Familjen Grotesk', sans-serif",
    fontSize: "12px",
    lineHeight: "1.45",
    margin: 0,
  },
};