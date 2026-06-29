import React, { useState, useEffect, useRef } from "react";
import ChooseRole from "../components/ChooseRole";
import ProfileSection from "../components/ProfileSection";
import VerificationProcess from "../components/Verificationprocess";
import TaskUpload from "../components/Taskupload";
import CommunicationAssessment from "../components/Communicationassessment";
import DocumentsAndInterview from "../components/DocumentsAndInterview";
import VerificationComplete from "../components/VerificationComplete";
import Stepper from "../components/Stepper";
import SummaryApi from "../../../common/index";
import Logo from "../../../assets/images/Changed Logo.png";

const STORAGE_KEY = "wizardStep";
const TASK_UPLOAD_ROLES = ["UI/UX Designer", "Graphic Designer", "Video Editor"];

const WIZARD_STEPS = [
  { label: "Verification" },
  { label: "Communication" },
  { label: "Documents" },
  { label: "Complete" },
];

const getStepperIndex = (step) => Math.max(0, step - 2);

const TIMER_DURATION = 2 * 60;

const savePendingTask = async (wizardStep, verificationScreen, status = "pending") => {
  try {
    const employee_id = sessionStorage.getItem("employee_id");
    if (!employee_id) {
      console.warn("No employee_id found");
      return;
    }
    const payload = {
      employee_id: employee_id,
      wizard_step: wizardStep,
      verification_screen: verificationScreen || "",
      status: status,
    };
    console.log("📤 Saving pending task:", payload);
    const response = await fetch(SummaryApi.createorupdatependingtasks.url, {
      method: SummaryApi.createorupdatependingtasks.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn("⚠️ Pending task API error:", response.status, errorText);
      return;
    }
    const result = await response.json();
    console.log("✅ Pending task saved:", result);
    return result;
  } catch (err) {
    console.error("❌ Error saving pending task:", err);
  }
};

const EmployeeWizard = () => {
  const [step, setStep] = useState(() => {
    const saved = parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10);
    return saved;
  });
  const [role, setRole] = useState(() => {
    return sessionStorage.getItem("employee_role") || "";
  });

  // --- Function to broadcast step completion ---
  const broadcastStepCompletion = (stepNumber) => {
    try {
      const channel = new BroadcastChannel("wizard_channel");
      channel.postMessage({ 
        type: "STEP_COMPLETED", 
        step: stepNumber 
      });
      channel.close();
      console.log(`📢 Broadcast: STEP_COMPLETED for step ${stepNumber}`);
    } catch (err) {
      console.error("❌ Broadcast error:", err);
    }
  };

  // --- Function to broadcast wizard completion ---
  const broadcastWizardDone = () => {
    try {
      const channel = new BroadcastChannel("wizard_channel");
      channel.postMessage({ type: "WIZARD_DONE" });
      channel.close();
      console.log("📢 Broadcast: WIZARD_DONE");
    } catch (err) {
      console.error("❌ Broadcast error:", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stepParam   = params.get("step");
    const roleParam   = params.get("role");
    const empIdParam  = params.get("employee_id");
    const screenParam = params.get("verification_screen");

    if (!stepParam) return;

    if (empIdParam)  sessionStorage.setItem("employee_id", empIdParam);
    if (roleParam) {
      sessionStorage.setItem("employee_role", roleParam);
      sessionStorage.setItem("role", roleParam);
    }
    if (screenParam) sessionStorage.setItem("verification_screen", screenParam);
    if (stepParam) {
      sessionStorage.setItem("wizardStep", stepParam);
      setStep(parseInt(stepParam, 10));
      setRole(roleParam || "");
    }
  }, []);

  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerRef = useRef(null);

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

  const goToStep = async (nextStep) => {
    let verificationScreen = null;
    switch (nextStep) {
      case 2: verificationScreen = isTaskUploadRole ? "task" : "verification"; break;
      case 3: verificationScreen = "communication"; break;
      case 4: verificationScreen = "documents"; break;
      case 5: verificationScreen = "complete"; break;
      default: verificationScreen = "";
    }
    if (nextStep >= 1 && nextStep <= 5) {
      const screen = nextStep === 1 ? "" : verificationScreen;
      await savePendingTask(nextStep, screen);
    }
    sessionStorage.setItem(STORAGE_KEY, String(nextStep));
    setStep(nextStep);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("wizardStepChange"));
  };

  const handleRoleSelect = async () => {
    await goToStep(1);
    // Broadcast step 1 completion (profile step started)
    broadcastStepCompletion(1);
  };

  const handleProfileDone = async () => {
    await goToStep(2);
    // Broadcast step 2 completion (verification started)
    broadcastStepCompletion(2);
  };

  const handleVerificationDone = async () => {
    await goToStep(3);
    // Broadcast step 3 completion (communication started)
    broadcastStepCompletion(3);
  };

  const handleTaskUploadDone = async () => {
    await goToStep(3);
    // Broadcast step 3 completion (communication started)
    broadcastStepCompletion(3);
  };

  const handleCommunicationDone = async () => {
    await goToStep(4);
    // Broadcast step 4 completion (documents started)
    broadcastStepCompletion(4);
  };

  const handleDocumentsInterviewDone = async () => {
    await goToStep(5);
    // Broadcast step 5 completion (wizard complete)
    broadcastStepCompletion(5);
  };

  const handleBack = () => {
    if (step > 0) goToStep(step - 1);
    else {
      sessionStorage.removeItem(STORAGE_KEY);
      setStep(0);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("wizardStepChange"));
    }
  };

  const handleFinish = async () => {
    try {
      await savePendingTask(5, "complete", "completed");
      sessionStorage.removeItem("verification_screen");
      sessionStorage.removeItem(STORAGE_KEY);
      setStep(0);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("wizardStepChange"));
      
      // Broadcast wizard completion
      broadcastWizardDone();
      
      console.log("✅ Wizard completed successfully");
    } catch (err) {
      console.error("❌ Error completing wizard:", err);
    }
  };

  const showStepper = step >= 2;

  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;
  const timerDisplay = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;
  const timerWarning = timeLeft <= 5 * 60 && timeLeft > 0;
  const timerCritical = timeLeft <= 60 && timeLeft > 0;

  const timerColor  = timerCritical ? "#dc2626" : timerWarning ? "#d97706" : "#16a34a";
  const timerBg     = timerCritical ? "#fef2f2" : timerWarning ? "#fffbeb" : "#f0fdf4";
  const timerBorder = timerCritical ? "#fecaca" : timerWarning ? "#fde68a" : "#bbf7d0";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* ─── FIXED Stepper with Logo + Timer ─── */}
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
            gap: 16,
          }}>

            {/* ── Logo — left edge, vertically centered with stepper circles ── */}
            <div style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              marginBottom: 28,       // matches Stepper's own marginBottom so it sits on the same baseline
            }}>
              <img
                src={Logo}
                alt="Crewzaar"
                style={{
                  height: 36,
                  width: "auto",
                  maxWidth: 130,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            {/* ── Stepper — fills remaining space ── */}
            <div style={{ flex: 1 }}>
              <Stepper
                steps={WIZARD_STEPS}
                currentIndex={getStepperIndex(step)}
                isLastStepDone={step === 5}
              />
            </div>

            {/* ── Timer ── */}
            {(step === 2 || step === 3) && !isTaskUploadRole && (
              <div style={{
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
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={timerColor} strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {timerExpired ? "⏰ Time's Up!" : timerDisplay}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ─── Spacer ─── */}
      {showStepper && <div style={{ height: 100 }} />}

      {/* ─── Screen content ─── */}
      {step === 0 && <ChooseRole onSelectRole={handleRoleSelect} />}
      {step === 1 && <ProfileSection onBack={handleBack} onNext={handleProfileDone} />}
      {step === 2 && role && isTaskUploadRole && (
        <TaskUpload onBack={handleBack} onNext={handleTaskUploadDone} />
      )}
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