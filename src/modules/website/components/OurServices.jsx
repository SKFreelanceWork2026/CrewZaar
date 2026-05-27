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

      {/* Heading */}
      <div style={styles.headingRow}>
        <h2 style={styles.heading}>
          OUR <span style={styles.green}>SERVICES</span>
        </h2>
      </div>

      <p style={styles.subheading}>
        End-to-end recruitment solutions designed to help companies hire verified, skilled, and job-ready talent.
      </p>

      {/* 2×2 Grid */}
      <div style={styles.grid}>
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
    padding: "70px 80px",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  headingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "14px",
  },
  heading: {
    fontSize: "2.2rem",
    fontWeight: "900",
    color: "#1a1a1a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  green: {
    color: "#3ab54a",
  },
  subheading: {
    fontSize: "11px",
    color: "#666",
    margin: "0 auto 40px",
    maxWidth: "540px",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    borderRadius: "16px",
    overflow: "hidden",
    minHeight: "230px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
  },
  cardImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.55)",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
  },
  cardBody: {
    position: "relative",
    zIndex: 2,
    padding: "24px 28px",
    textAlign: "left",
    width: "100%",
  },
  iconBadge: {
    width: "44px",
    height: "44px",
    backgroundColor: "#3ab54a",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  },
  cardTitle: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "1.05rem",
    margin: "0 0 8px 0",
  },
  cardDesc: {
    color: "rgba(255,255,255,0.82)",
    fontSize: "0.85rem",
    lineHeight: 1.55,
    margin: 0,
  },
};