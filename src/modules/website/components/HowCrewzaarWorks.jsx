const HowCrewzaarWorks = () => {
  const findersSteps = [
    {
      title: "Visit Platform",
      desc: "Explore the talent marketplace",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: "Filter Employees",
      desc: "Find candidates by skills",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      ),
    },
    {
      title: "Hire Instantly",
      desc: "Schedule and onboard quickly",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  const employeeSteps = [
    {
      title: "Take Skill Test",
      desc: "Demonstrate your expertise",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
      ),
    },
    {
      title: "Get Verified",
      desc: "Earn your verified badge",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M9 12l-4 8h14l-4-8" />
          <line x1="12" y1="12" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      title: "Wait for Hiring",
      desc: "Companies come to you",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  const StepRow = ({ steps }) => (
    <div style={styles.stepsRow}>
      {steps.map((step, i) => (
        <div key={i} style={styles.stepGroup}>
          <div style={styles.stepIconAndLine}>
            <div style={styles.iconBox}>{step.icon}</div>
            {i < steps.length - 1 && <div style={styles.line} />}
          </div>
          <div style={styles.stepTitle}>{step.title}</div>
          <div style={styles.stepDesc}>{step.desc}</div>
        </div>
      ))}
    </div>
  );

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>
        How <span style={styles.green}>Crewzaar</span> Works
      </h2>

      <p style={styles.subheading}>
        Simple workflows tailored for each role on the platform
      </p>

      <div style={styles.card}>
        <h3 style={styles.roleTitle}>For Finders</h3>
        <StepRow steps={findersSteps} />
      </div>

      <div style={{ ...styles.card, marginBottom: 0 }}>
        <h3 style={styles.roleTitle}>For Employees</h3>
        <StepRow steps={employeeSteps} />
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#F9FAFB",
    padding: "64px 30px",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },

  heading: {
    fontSize: "2.4rem",
    fontWeight: "800",
    color: "#1a1a1a",
    margin: "0 0 12px 0",
  },

  green: {
    color: "#51A333",
  },

  subheading: {
    fontSize: "0.95rem",
    color: "#888",
    margin: "0 0 48px 0",
  },

card: {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "50px 80px",
  marginBottom: "30px",
  width: "100%",
  maxWidth: "1380px",
  margin: "0 auto 30px auto",
  boxSizing: "border-box",
  boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
},

  roleTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 42px 0",
  },

  stepsRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "20px",
  },

  stepGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1",
    position: "relative",
  },

  stepIconAndLine: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    position: "relative",
    marginBottom: "16px",
  },

  iconBox: {
    width: "78px",
    height: "78px",
    backgroundColor: "#51A333",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    zIndex: 1,
    position: "relative",
    boxShadow: "0 4px 16px rgba(58,181,74,0.25)",
  },

  line: {
    position: "absolute",
    left: "calc(50% + 39px)",
    right: "calc(-50% + 39px)",
    height: "3px",
    backgroundColor: "#51A333",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 0,
  },

  stepTitle: {
    fontWeight: "700",
    fontSize: "1.05rem",
    color: "#1a1a1a",
    marginBottom: "6px",
  },

  stepDesc: {
    fontSize: "0.9rem",
    color: "#888",
    lineHeight: 1.5,
  },
};

export default HowCrewzaarWorks;