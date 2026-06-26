import React from "react";
// import Stepper from "./Stepper";
// import { getFlowSteps, getCurrentFlowIndex } from "./stepperConfig";
import { useNavigate } from "react-router-dom";

const CheckCircleIcon = ({ size = 36, strokeWidth = 1.6 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" stroke="#4CAF0A" strokeWidth={strokeWidth} />
    <path
      d="M7 12.5l3.5 3.5 6.5-7"
      stroke="#4CAF0A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SmallCheckIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0, marginTop: 1 }}
  >
    <circle cx="12" cy="12" r="11" stroke="#4CAF0A" strokeWidth="1.5" />
    <path
      d="M7.5 12.5l3 3 6-6.5"
      stroke="#4CAF0A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const whatNextItems = [
  "Your profile is currently under verification review",
  "Our team will verify your details and update you within 24 hours",
  "After approval, you can start receiving job opportunities from companies",
];

export default function VerificationComplete({ onBack, onFinish }) {
  const navigate = useNavigate();
  // const role = sessionStorage.getItem("employee_role") || "";
  // const flowSteps = getFlowSteps(role);
  // // wizardStep 5 = Complete — show all steps completed (index past last)
  // const currentIndex = flowSteps.length; // all steps done

  const styles = {
    body: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "#f0f2f0",
      padding: "32px 16px 80px",
    },
    wrapper: {
      width: "100%",
      maxWidth: 780,
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: 600,
      color: "#1a1a1a",
      margin: 0,
    },
    stepLabel: {
      fontSize: 13,
      color: "#555",
    },
    card: {
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: 10,
      padding: "56px 48px 48px",
      textAlign: "center",
      marginBottom: 28,
    },
    iconWrap: {
      width: 72,
      height: 72,
      borderRadius: "50%",
      background: "#e8f5e9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 700,
      color: "#1a1a1a",
      marginBottom: 10,
    },
    cardSubtitle: {
      fontSize: 14,
      color: "#555",
      marginBottom: 32,
    },
    nextBox: {
      background: "#f8f8f8",
      border: "1px solid #e8e8e8",
      borderRadius: 8,
      padding: "24px 28px",
      textAlign: "left",
      maxWidth: 420,
      margin: "0 auto",
    },
    nextBoxTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a1a",
      marginBottom: 16,
    },
    nextList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 14,
    },
    nextItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      fontSize: 13,
      color: "#444",
      lineHeight: 1.45,
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btnOutline: {
      padding: "11px 24px",
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      background: "#fff",
      border: "1px solid #bbb",
      color: "#333",
    },
    btnPrimary: {
      padding: "11px 24px",
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      background: "#4CAF0A",
      border: "1px solid #4CAF0A",
      color: "#fff",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          {/* <span style={styles.stepLabel}>
            Step {flowSteps.length} of {flowSteps.length}
          </span> */}
        </div>

        {/* Stepper — shared component, same as all other screens */}
        {/* <Stepper
          steps={flowSteps}
          currentIndex={currentIndex}
          isLastStepDone={true}
        /> */}

        {/* Card */}
        <div style={styles.card}>
          <div style={styles.iconWrap}>
            <CheckCircleIcon />
          </div>

          <h2 style={styles.cardTitle}>Submitted Successfully!</h2>
          <p style={styles.cardSubtitle}>
            Your verification status is currently <strong>Pending</strong>. Our
            team will review your submission and get back to you within{" "}
            <strong>24 hours</strong>.
          </p>

          {/* What's Next */}
          <div style={styles.nextBox}>
            <h3 style={styles.nextBoxTitle}>What's Next?</h3>
            <ul style={styles.nextList}>
              {whatNextItems.map((item, i) => (
                <li key={i} style={styles.nextItem}>
                  <SmallCheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {/* <button style={styles.btnOutline} onClick={onBack}>
            Previous
          </button> */}
          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/")} // replace window.location.href
          >
            Go to Verified Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
