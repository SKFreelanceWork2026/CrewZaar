import React, { useState, useEffect, useRef } from "react";
import ChooseRole from "../components/ChooseRole";
import ProfileSection from "../components/ProfileSection";
import VerificationProcess from "../components/Verificationprocess";
import TaskUpload from "../components/Taskupload";
import CommunicationAssessment from "../components/Communicationassessment";
import DocumentsAndInterview from "../components/DocumentsAndInterview";
import VerificationComplete from "../components/VerificationComplete";
import Stepper from "../components/Stepper";

const STORAGE_KEY = "wizardStep";
const TASK_UPLOAD_ROLES = ["UI/UX Designer", "Graphic Designer"];

// Stepper only covers steps 2–5
const WIZARD_STEPS = [
  { label: "Verification" },
  { label: "Communication" },
  { label: "Documents" },
  { label: "Complete" },
];

// Maps wizard step index (2–5) to stepper index (0–3)
const getStepperIndex = (step) => Math.max(0, step - 2);

// ─── Timer state management ──────────────────────────────────────────
const TIMER_DURATION = 1 * 60; // 2 minutes

const EmployeeWizard = () => {
  const [step, setStep] = useState(() => {
    const saved = parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10);
    return saved;
  });
  const [role, setRole] = useState(() => {
    return sessionStorage.getItem("employee_role") || "";
  });

  // ─── Timer State ──────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerRef = useRef(null);

  // ─── Timer Functions ──────────────────────────────────────────────
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIMER_DURATION);
    setTimerExpired(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIMER_DURATION);
    setTimerExpired(false);
  };

  // Start timer when entering step 2 or 3
  useEffect(() => {
    if (step === 2 || step === 3) {
      startTimer();
    } else {
      resetTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  // ─── Listen for storage changes ──────────────────────────────────
  useEffect(() => {
    const handleStorageChange = () => {
      const newStep = parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10);
      const newRole = sessionStorage.getItem("employee_role") || "";
      setStep(newStep);
      setRole(newRole);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("wizardStepChange", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wizardStepChange", handleStorageChange);
    };
  }, []);

  const isTaskUploadRole = TASK_UPLOAD_ROLES.includes(role);

  const goToStep = (nextStep) => {
    sessionStorage.setItem(STORAGE_KEY, String(nextStep));
    setStep(nextStep);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("wizardStepChange"));
  };

  const handleRoleSelect = () => goToStep(1);
  const handleProfileDone = () => goToStep(2);
  
  const handleVerificationDone = () => {
    sessionStorage.setItem("verification_screen", "verification");
    sessionStorage.setItem(STORAGE_KEY, "3");
    setStep(3);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("wizardStepChange"));
  };
  
  const handleTaskUploadDone = () => {
    sessionStorage.setItem("verification_screen", "task");
    goToStep(3);
  };
  
  const handleCommunicationDone = () => goToStep(4);
  const handleDocumentsInterviewDone = () => goToStep(5);
  
  const handleBack = () => {
    if (step > 0) goToStep(step - 1);
    else {
      sessionStorage.removeItem(STORAGE_KEY);
      setStep(0);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("wizardStepChange"));
    }
  };
  
  const handleFinish = () => {
    sessionStorage.removeItem("verification_screen");
    goToStep(1);
  };

  const showStepper = step >= 2;

  // ─── Timer Display ──────────────────────────────────────────────────
  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;
  const timerDisplay = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;
  const timerWarning = timeLeft <= 5 * 60 && timeLeft > 0;
  const timerCritical = timeLeft <= 60 && timeLeft > 0;

  const timerColor = timerCritical ? "#dc2626" : timerWarning ? "#d97706" : "#16a34a";
  const timerBg = timerCritical ? "#fef2f2" : timerWarning ? "#fffbeb" : "#f0fdf4";
  const timerBorder = timerCritical ? "#fecaca" : timerWarning ? "#fde68a" : "#bbf7d0";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* ─── FIXED Stepper with Timer ─── */}
      {showStepper && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 0 0",
        }}>
          <div style={{ 
            maxWidth: 1000, 
            margin: "0 auto", 
            padding: "0 24px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}>
            {/* Stepper - takes most of the space */}
            <div style={{ flex: 1 }}>
              <Stepper
                steps={WIZARD_STEPS}
                currentIndex={getStepperIndex(step)}
                isLastStepDone={step === 5}
              />
            </div>

            {/* Timer - at the end of the row */}
            {(step === 2 || step === 3) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: timerBg,
                  color: timerColor,
                  border: `1px solid ${timerBorder}`,
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  animation: timerCritical ? "pulse 0.8s ease-in-out infinite" : "none",
                  minWidth: 100,
                  justifyContent: "center",
                  flexShrink: 0,
                  marginBottom: 28,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={timerColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {timerExpired ? "⏰ Time's Up!" : timerDisplay}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Spacer so content doesn't hide behind fixed stepper ─── */}
      {showStepper && <div style={{ height: 100 }} />}

      {/* ─── Screen content ─── */}
      {step === 0 && <ChooseRole onSelectRole={handleRoleSelect} />}
      {step === 1 && <ProfileSection onBack={handleBack} onNext={handleProfileDone} />}
      {step === 2 && role && isTaskUploadRole && <TaskUpload onBack={handleBack} onNext={handleTaskUploadDone} />}
      {step === 2 && role && !isTaskUploadRole && (
        <VerificationProcess 
          onBack={handleBack} 
          onNext={handleVerificationDone}
          timerExpired={timerExpired}
          onTimerRetake={startTimer}
        />
      )}
      {step === 2 && !role && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #e2e8f0", borderTop: "3px solid #4CAF0A", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "#64748b", fontSize: 15 }}>Loading...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      )}
      {step === 3 && (
        <CommunicationAssessment 
          onBack={handleBack} 
          onNext={handleCommunicationDone}
          timerExpired={timerExpired}
          onTimerRetake={startTimer}
        />
      )}
      {step === 4 && <DocumentsAndInterview onBack={handleBack} onNext={handleDocumentsInterviewDone} />}
      {step === 5 && <VerificationComplete onBack={handleBack} onFinish={handleFinish} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default EmployeeWizard;