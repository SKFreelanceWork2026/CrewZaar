import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo1.png";
import SummaryApi from "../../../common";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem 1.5rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  logoWrap: {
    marginBottom: "1.5rem",
  },
  logoImg: {
    height: "48px",
    width: "auto",
    objectFit: "contain",
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#1a1a1a",
    letterSpacing: "-1px",
    marginBottom: "0.4rem",
    textAlign: "center",
  },
  pageSubtitle: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "2rem",
    textAlign: "center",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.25rem",
    width: "100%",
    maxWidth: "740px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "2rem 1.75rem 1.75rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "0.5px solid #e0e0e0",
    cursor: "pointer",
  },
  iconWrap: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    background: "#4CAF0A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.1rem",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: 800,
    color: "#1a1a1a",
    marginBottom: "0.4rem",
  },
  cardDesc: {
    fontSize: "13.5px",
    color: "#666",
    marginBottom: "1.1rem",
    lineHeight: 1.5,
  },
  features: {
    listStyle: "none",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    width: "100%",
    padding: 0,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13.5px",
    color: "#333",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#4CAF0A",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#4CAF0A",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "auto",
  },
  backBtn: {
    marginTop: "1.5rem",
    fontSize: "14px",
    color: "#555",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const memberType = JSON.parse(localStorage.getItem("memberType"));

console.log(memberType);

const Card = ({
  icon,
  title,
  description,
  features,
  onClick,
  buttonDisabled = false,
}) => {
  return (
    <div style={styles.card}>
      <div style={styles.iconWrap}>{icon}</div>

      <div style={styles.cardTitle}>{title}</div>

      <p style={styles.cardDesc}>{description}</p>

      <ul style={styles.features}>
        {features.map((feature, index) => (
          <li key={index} style={styles.featureItem}>
            <span style={styles.dot}></span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        disabled={buttonDisabled}
        style={{
          ...styles.btn,
          opacity: buttonDisabled ? 0.6 : 1,
          cursor: buttonDisabled ? "not-allowed" : "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!buttonDisabled) {
            onClick();
          }
        }}
      >
        GET STARTED →
      </button>
    </div>
  );
};

const ChooseRole = ({ onSelectRole }) => {
  const navigate = useNavigate();

const fetchMemberTypes = async () => {
  try {
    const response = await fetch(SummaryApi.ChooseRole.url, {
      method: SummaryApi.ChooseRole.method,
    });

    const result = await response.json();

    if (result.success) {
      const employeeType = result.data.find(
        (item) => item.member_type_name === "Employee"
      );

      if (employeeType) {
        localStorage.setItem(
          "memberType",
          JSON.stringify({
            member_type_id: employeeType.member_type_id,
            member_type_name: employeeType.member_type_name,
          })
        );

        console.log(
          "Stored:",
          JSON.parse(localStorage.getItem("memberType"))
        );

        onSelectRole?.();
      }
    }
  } catch (error) {
    console.error("Failed to fetch member types:", error);
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.logoWrap}>
        <img
          src={Logo}
          alt="Crewzaar"
          style={styles.logoImg}
        />
      </div>

      <h1 style={styles.pageTitle}>
        CHOOSE YOUR ROLE
      </h1>

      <p style={styles.pageSubtitle}>
        Select how you want to participate in the V-Hub ecosystem
      </p>

      <div style={styles.cards}>
        <Card
          icon={<UsersIcon />}
          title="FINDER (COMPANY)"
          description="Find and hire verified employees for your business"
          features={[
            "Browse verified talent",
            "Filter by skills",
            "Direct hiring",
            "Team management",
          ]}
          onClick={() => navigate("/company-profile")}
          buttonDisabled={true}
        />

        <Card
          icon={<BriefcaseIcon />}
          title="EMPLOYEE"
          description="Get verified and let companies find you"
          features={[
            "Take skill tests",
            "Get verified badge",
            "Wait for opportunities",
            "Build reputation",
          ]}
          onClick={fetchMemberTypes}
        />
      </div>

      <button
        style={styles.backBtn}
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default ChooseRole;