// Login.jsx — with Wizard Resume Modal after successful login
import React, { useState, useEffect, useRef } from "react";
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Paper,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/index";
import logo from "../../assets/images/Changed Logo.png";

// ─────────────────────────────────────────────────────────
//  WIZARD STEPPER (inline — no import needed)
// ─────────────────────────────────────────────────────────
const GREEN = "#4CAF0A";
const GRAY_BORDER = "#9ca3af";
const GRAY_LINE = "#d1d5db";
const GRAY_TEXT = "#94a3b8";
const TEXT_DARK = "#4b5563";
const CIRCLE_SIZE = 28;

function MiniStepper({ steps, currentIndex }) {
  const n = steps.length;
  const totalSegments = n - 1;
  const completedSegments = Math.min(currentIndex, totalSegments);
  const progressRatio = totalSegments > 0 ? completedSegments / totalSegments : 0;

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-start", width: "100%", marginBottom: 8 }}>
      {/* Gray base line */}
      <div style={{
        position: "absolute", top: CIRCLE_SIZE / 2,
        left: `calc(100% / ${n} / 2)`, right: `calc(100% / ${n} / 2)`,
        height: 3, borderRadius: 4, background: GRAY_LINE, zIndex: 0,
      }} />
      {/* Green progress line */}
      <div style={{
        position: "absolute", top: CIRCLE_SIZE / 2,
        left: `calc(100% / ${n} / 2)`,
        width: `calc((100% - 100% / ${n}) * ${progressRatio})`,
        height: 3, borderRadius: 4, background: GREEN, zIndex: 0,
        transition: "width 0.4s ease",
      }} />
      {/* Circles + labels */}
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isActive = isCompleted || isCurrent;
        return (
          <div key={step.label} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", position: "relative", zIndex: 1,
          }}>
            <div style={{
              width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
              background: isActive ? GREEN : "#fff",
              border: isActive ? "none" : `2px solid ${GRAY_BORDER}`,
              color: isActive ? "#fff" : TEXT_DARK,
            }}>
              {isCompleted ? "✓" : index + 1}
            </div>
            <span style={{
              fontSize: 10, marginTop: 4, whiteSpace: "nowrap",
              fontWeight: isCurrent ? 700 : 400,
              color: isActive ? GREEN : GRAY_TEXT,
            }}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  WIZARD STEP CONFIG (inline)
// ─────────────────────────────────────────────────────────
const TASK_UPLOAD_ROLES = ["UI/UX Designer", "Graphic Designer"];

const VERIFICATION_FLOW_STEPS = [
  { label: "Skill Test", wizardStep: 2 },
  { label: "Communication", wizardStep: 3 },
  { label: "Documents & Interview", wizardStep: 4 },
  { label: "Complete", wizardStep: 5 },
];

const TASK_FLOW_STEPS = [
  { label: "Task Submission", wizardStep: 2 },
  { label: "Communication", wizardStep: 3 },
  { label: "Documents & Interview", wizardStep: 4 },
  { label: "Complete", wizardStep: 5 },
];

function getWizardInfo() {
  try {
    const savedStep = parseInt(sessionStorage.getItem("wizardStep") || "0", 10);
    const role = sessionStorage.getItem("employee_role") || "";
    const flag = sessionStorage.getItem("verification_screen");

    // Only show modal if wizard was in progress (step 1 or higher)
    if (savedStep < 1) return null;

    let steps;
    if (flag === "taskupload" || flag === "task" || flag === "communication") {
      steps = TASK_FLOW_STEPS;
    } else if (flag === "verification") {
      steps = VERIFICATION_FLOW_STEPS;
    } else {
      steps = TASK_UPLOAD_ROLES.includes(role) ? TASK_FLOW_STEPS : VERIFICATION_FLOW_STEPS;
    }

    // Map wizard global step to stepper index
    // steps only cover steps 2-5, so step 1 (ProfileSection) shows index 0
    let currentIndex = 0;
    if (savedStep >= 2) {
      const idx = steps.findIndex((s) => s.wizardStep === savedStep);
      currentIndex = idx === -1 ? 0 : idx;
    }

    // Step label map
    const stepNames = {
      0: "Choose Role",
      1: "Profile Setup",
      2: role && TASK_UPLOAD_ROLES.includes(role) ? "Task Submission" : "Skill Test",
      3: "Communication",
      4: "Documents & Interview",
      5: "Complete",
    };

    return { savedStep, role, steps, currentIndex, stepName: stepNames[savedStep] || "Verification" };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────
//  WIZARD RESUME MODAL
// ─────────────────────────────────────────────────────────
function WizardResumeModal({ wizardInfo, onDismiss }) {
  const handleProceed = () => {
    const employeeId = sessionStorage.getItem("employee_id");
    const employeeRole = sessionStorage.getItem("employee_role") 
      || sessionStorage.getItem("role") || "";
    const step = wizardInfo?.savedStep || 1;
    const screen = sessionStorage.getItem("verification_screen") || "";

    const params = new URLSearchParams({
      step,
      role: employeeRole,
      employee_id: employeeId || "",
      verification_screen: screen,
    });

    window.open(`/employee-wizard?${params.toString()}`, "_blank");
    onDismiss();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      {/* Blurred backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        background: "rgba(0,0,0,0.45)",
      }} />

      {/* Modal Card */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "#fff", borderRadius: 20,
        width: "100%", maxWidth: 480,
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        overflow: "hidden",
      }}>
        {/* Green header */}
        <div style={{
          background: "linear-gradient(135deg, #4CAF0A, #3a9a09)",
          padding: "24px 28px 20px",
          textAlign: "center",
        }}>
          {/* Warning icon */}
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            You have an incomplete application
          </div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
            Your wizard progress has been saved
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px" }}>

          {/* Current step info */}
          <div style={{
            background: "#f8fdf5", border: "1px solid #c8f59a",
            borderRadius: 12, padding: "14px 18px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "#4CAF0A", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Currently on</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
                {wizardInfo.stepName}
              </div>
              {wizardInfo.role && (
                <div style={{ fontSize: 11, color: "#4CAF0A", fontWeight: 600, marginTop: 2 }}>
                  Role: {wizardInfo.role}
                </div>
              )}
            </div>
          </div>

          {/* Stepper — only show for steps 2–5 */}
          {wizardInfo.savedStep >= 2 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Your Progress
              </div>
              <MiniStepper steps={wizardInfo.steps} currentIndex={wizardInfo.currentIndex} />
            </div>
          )}

          {/* Info note */}
          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a",
            borderRadius: 10, padding: "12px 14px", marginBottom: 24,
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
              Clicking <strong>"Proceed to Continue"</strong> will open the wizard in a new tab exactly where you left off.
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onDismiss}
              style={{
                flex: 1, padding: "13px 0", borderRadius: 10,
                border: "1.5px solid #e5e7eb", background: "#fff",
                color: "#374151", fontSize: 14, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#d1d5db"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
            >
              Skip for Now
            </button>
            <button
              onClick={handleProceed}
              style={{
                flex: 2, padding: "13px 0", borderRadius: 10,
                border: "none", background: "#4CAF0A",
                color: "#fff", fontSize: 14, fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#3d9e00"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#4CAF0A"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <OpenInNewIcon style={{ fontSize: 17 }} />
              Proceed to Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  STYLED COMPONENTS
// ─────────────────────────────────────────────────────────
const ModalWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f2f4f0",
  padding: theme.spacing(2),
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}));

const ModalCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  borderRadius: 24,
  overflow: "hidden",
  boxShadow: "0 8px 48px rgba(0,0,0,0.13)",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    borderRadius: 16,
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 24px 16px 24px",
  borderBottom: "1px solid #f0f0ea",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 20px 12px 20px",
  },
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const LogoImage = styled("img")(({ theme }) => ({
  width: 130,
  height: "auto",
  objectFit: "contain",

  [theme.breakpoints.down("sm")]: {
    width: 100,
    height: "auto",
  },
}));

const ModalBody = styled(Box)(({ theme }) => ({
  padding: "24px 28px 28px 28px",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 20px 24px 20px",
  },
}));

const ModalFooter = styled(Box)(({ theme }) => ({
  borderTop: "1px solid #f0f0ea",
  padding: "16px 24px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "14px 20px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: 52,
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  textTransform: "none",
  letterSpacing: 0.2,
  fontFamily: "inherit",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
  [theme.breakpoints.down("sm")]: {
    height: 48,
    fontSize: 15,
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    background: "#fff",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4CAF0A" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4CAF0A", borderWidth: 2 },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    color: "#111",
    "&.Mui-focused": { color: "#4CAF0A" },
  },
}));

const OtpInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: "#f7f7f5",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4CAF0A" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4CAF0A", borderWidth: 2 },
  },
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
    padding: "16px 0",
  },
}));

const SuccessIconWrapper = styled(Box)({
  width: 80, height: 80, borderRadius: "50%",
  background: "#f0fae8", border: "2px solid #b6ddb8",
  display: "flex", alignItems: "center", justifyContent: "center",
  margin: "0 auto 16px auto",
});

const TimerRingWrapper = styled(Box)({
  display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
});

const ResendButton = styled(Button)({
  fontSize: 13, color: "#4CAF0A", fontWeight: 700,
  textTransform: "none", padding: 0, minWidth: "auto",
  "&:hover": { background: "transparent", textDecoration: "underline" },
});

const AccountTypeBadge = styled(Box)({
  background: "#f0fae8", border: "1px solid #c8e6b0",
  borderRadius: 12, padding: "14px 18px",
  display: "flex", alignItems: "center", gap: 14, marginBottom: 24,
});

const AccountTypeIcon = styled(Box)({
  width: 44, height: 44, background: "#4CAF0A", borderRadius: 10,
  display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0, color: "#fff",
});

const BackButton = styled(Button)({
  color: "#4CAF0A", fontSize: 13, fontWeight: 600,
  textTransform: "none", padding: 0, minWidth: "auto", marginBottom: 16,
  "&:hover": { background: "transparent" },
});

// ─────────────────────────────────────────────────────────
//  TOAST - with "x" close button, NO auto-hide
// ─────────────────────────────────────────────────────────
function Toast({ message, visible, onClose, severity = "error" }) {
  return (
    <Snackbar
      open={visible}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={null} // Never auto close
      onClose={(event, reason) => {
        // Prevent closing when clicking outside
        if (reason === "clickaway") return;
      }}
      sx={{
        position: "fixed",
        top: "20px !important",
        left: "50% !important",
        transform: "translateX(-50%) !important",
        zIndex: 99999,
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose} // Only closes when X is clicked
        variant="filled"
        sx={{
          minWidth: 350,
          fontWeight: 600,
          "& .MuiAlert-action .MuiIconButton-root": {
            color: "#fff",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
// ─────────────────────────────────────────────────────────
//  TIMER RING
// ─────────────────────────────────────────────────────────
function TimerRing({ seconds, total }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - seconds / total);
  const color = seconds <= 5 ? "#e24b4a" : "#4CAF0A";
  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#e8f5e0" strokeWidth="3" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <Typography variant="body2" sx={{ position: "absolute", fontWeight: 700, fontSize: 11, color }}>
        {seconds}
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────
//  OTP STEP
// ─────────────────────────────────────────────────────────
function StepOTP({ mobile, onVerify, onBack, onResend, isLoading }) {
  const OTP_TOTAL = 30;
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(OTP_TOTAL);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  function startTimer() {
    clearInterval(timerRef.current);
    setSeconds(OTP_TOTAL);
    setCanResend(false);
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0; }
        return s - 1;
      });
    }, 1000);
  }

  function handleInput(i, val) {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setOtpError("");
    if (v && i < 3) inputRefs.current[i + 1]?.focus();
  }

  function handleKey(i, e) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === "Enter") handleVerify();
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setDigits(pasted.split(""));
      inputRefs.current[3]?.focus();
    }
    e.preventDefault();
  }

  function handleVerify() {
    const code = digits.join("");
    if (code.length < 4) { setOtpError("Please enter all 4 digits."); return; }
    onVerify(code);
  }

  function handleResend() {
    setDigits(["", "", "", ""]);
    setOtpError("");
    startTimer();
    onResend();
    inputRefs.current[0]?.focus();
  }

  const maskedMobile = mobile.length > 6 ? mobile.slice(0, 2) + "****" + mobile.slice(-4) : mobile;
  const allFilled = digits.every(Boolean);

  return (
    <Box>
      <BackButton startIcon={<ArrowBackIcon />} onClick={onBack}>Change Account</BackButton>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#111", textAlign: "center", mb: 0.5 }}>
        Verify OTP
      </Typography>
      <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mb: 3, lineHeight: 1.5 }}>
        Enter the 4-digit code sent to{" "}
        <Typography component="span" sx={{ fontWeight: 700, color: "#111" }}>+{maskedMobile}</Typography>
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2.5 }}>
        {digits.map((d, i) => {
          const error = Boolean(otpError);
          return (
            <OtpInput
              key={i}
              inputRef={(el) => (inputRefs.current[i] = el)}
              value={d}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              onPaste={handlePaste}
              inputProps={{ inputMode: "numeric", maxLength: 1 }}
              sx={{
                width: 64,
                "& .MuiOutlinedInput-root": {
                  background: d ? "#f0fae8" : "#f7f7f5",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? "#e24b4a" : d ? "#4CAF0A" : "#e0e0da",
                    borderWidth: 2,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? "#e24b4a" : "#4CAF0A",
                    borderWidth: 2,
                  },
                },
              }}
            />
          );
        })}
      </Box>

      {otpError && (
        <Typography variant="caption" sx={{ color: "#e24b4a", display: "block", textAlign: "center", mb: 1.5 }}>
          {otpError}
        </Typography>
      )}

      <TimerRingWrapper sx={{ mb: 3 }}>
        {!canResend ? (
          <>
            <TimerRing seconds={seconds} total={OTP_TOTAL} />
            <Typography variant="body2" sx={{ color: "#888" }}>
              Resend OTP in{" "}
              <Typography component="span" sx={{ fontWeight: 700, color: "#111" }}>{seconds}s</Typography>
            </Typography>
          </>
        ) : (
          <ResendButton onClick={handleResend}>Resend OTP</ResendButton>
        )}
      </TimerRingWrapper>

      <StyledButton
        fullWidth variant="contained"
        onClick={handleVerify}
        disabled={!allFilled || isLoading}
        sx={{
          background: allFilled && !isLoading ? "#4CAF0A" : "#c8e6b0",
          color: "#fff",
          "&:hover": { background: allFilled && !isLoading ? "#3d9e00" : "#c8e6b0" },
          "&.Mui-disabled": { background: "#c8e6b0", color: "#fff" },
        }}
      >
        {isLoading ? "Verifying..." : "Verify & Sign In"}
      </StyledButton>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────
//  SUCCESS STEP
// ─────────────────────────────────────────────────────────
function StepSuccess({ onNavigateToDashboard }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onNavigateToDashboard) onNavigateToDashboard();
    }, 2600);
    return () => clearTimeout(timer);
  }, [onNavigateToDashboard]);

  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <SuccessIconWrapper>
        <CheckCircleIcon sx={{ color: "#4CAF0A", fontSize: 40 }} />
      </SuccessIconWrapper>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#111", mb: 1 }}>You're in!</Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 2.5 }}>
        Login successful. Redirecting to your dashboard…
      </Typography>
      <Box sx={{ height: 5, background: "#e8f5e0", borderRadius: 4, overflow: "hidden" }}>
        <Box sx={{
          height: "100%", width: `${progress}%`, background: "#4CAF0A",
          borderRadius: 4, transition: "width 2.2s linear",
        }} />
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────
//  LOGIN FORM
// ─────────────────────────────────────────────────────────
function LoginForm({ mobile, setMobile, mobileError, loginCode, setLoginCode, onSendOTP, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", color: "#111", mb: 0.5 }}>
        Welcome Back
      </Typography>
      <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mb: 2.5 }}>
        Enter your credentials to continue
      </Typography>

      <AccountTypeBadge>
        <AccountTypeIcon><BusinessIcon /></AccountTypeIcon>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a4d00" }}>Employee Login</Typography>
          <Typography variant="caption" sx={{ color: "#4CAF0A" }}>Access opportunities</Typography>
        </Box>
      </AccountTypeBadge>

      <StyledTextField
        fullWidth
        label="Mobile Number"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
        onKeyDown={(e) => e.key === "Enter" && onSendOTP()}
        error={mobileError}
        helperText={mobileError ? "Please enter a valid mobile number." : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PhoneIcon sx={{ color: "#4CAF0A", fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#555" }}>+91</Typography>
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <StyledTextField
        fullWidth
        label="Login Code"
        placeholder="Enter login code"
        type={showPassword ? "text" : "password"}
        value={loginCode}
        onChange={(e) => setLoginCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSendOTP()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#4CAF0A", fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                {showPassword
                  ? <VisibilityOffIcon sx={{ fontSize: 20 }} />
                  : <VisibilityIcon sx={{ fontSize: 20 }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 0.5 }}
      />
      <Typography variant="caption" sx={{ color: "#aaa", display: "block", mb: 2.5 }}>
        Leave blank if you haven't set one
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ color: "#4CAF0A", "&.Mui-checked": { color: "#4CAF0A" } }}
            />
          }
          label="Remember me"
          sx={{ "& .MuiTypography-root": { fontSize: 13, color: "#555" } }}
        />
        <Button sx={{
          color: "#4CAF0A", fontWeight: 700, fontSize: 13,
          textTransform: "none", "&:hover": { background: "transparent" },
        }}>
          Forgot password?
        </Button>
      </Box>

      <StyledButton
        fullWidth variant="contained"
        onClick={onSendOTP}
        disabled={isLoading}
        sx={{
          background: "#4CAF0A",
          "&:hover": { background: "#3d9e00" },
          "&.Mui-disabled": { background: "#c8e6b0" },
        }}
      >
        {isLoading ? "Sending OTP..." : "Sign In to Dashboard"}
      </StyledButton>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────
//  MAIN LOGIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function LoginModal({ open = true, onClose = () => {}, onLoginSuccess = () => {} }) {
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [mobile, setMobile] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", severity: "success" });
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);

  // ── Wizard resume modal state ──
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [wizardInfo, setWizardInfo] = useState(null);

  if (open === false) return null;

  function showToast(msg, severity = "error") {
    setToast({ visible: true, message: msg, severity });
  }

  const handleToastClose = () => {
    setToast({ visible: false, message: "", severity: "success" });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setMobile("");
      setLoginCode("");
      setMobileError(false);
      setEmployeeData(null);
    }, 250);
  };

  // ── Navigate to dashboard — check for wizard progress first ──
  const handleNavigateToDashboard = () => {
    if (onLoginSuccess) onLoginSuccess();

    // Check if there is a saved wizard step
    const info = getWizardInfo();
    if (info) {
      setWizardInfo(info);
      setShowWizardModal(true);
      // Navigate to dashboard in background (behind the modal)
      navigate("/employee-panel/dashboard", { replace: true });
    } else {
      navigate("/employee-panel/dashboard", { replace: true });
    }
  };

  const handleWizardModalDismiss = () => {
    setShowWizardModal(false);
  };

  // ── Send OTP ──
  const handleSendOTP = async () => {
    if (!mobile.trim() || mobile.trim().length < 10) {
      setMobileError(true);
      showToast("Please enter a valid 10-digit mobile number", "error");
      return;
    }
    setMobileError(false);
    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.EmployeeLogin.url, {
        method: SummaryApi.EmployeeLogin.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile, password: loginCode || "" }),
      });
      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("login_phone", mobile);
        sessionStorage.setItem("login_member_id", data.data.member_id);
        setEmployeeData(data.data);
        
        // ── SHOW OTP IN TOAST (NO AUTO-HIDE) ──
        let otpMessage = `✅ OTP sent to +91 ${mobile.slice(0, 2)}****${mobile.slice(-4)}`;
        if (data.data.otp) {
          otpMessage = `🔑 Your OTP: ${data.data.otp} — sent to +91 ${mobile.slice(0, 2)}****${mobile.slice(-4)}`;
          console.log("📱 OTP for testing:", data.data.otp);
        }
        showToast(otpMessage, "success");
        
        setStep("otp");
      } else {
        showToast(data.message || "Mobile number not found. Please check and try again.", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Server Error. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Verify OTP ──
// ── Verify OTP ──
const handleVerifyOTP = async (otpCode) => {
  setIsLoading(true);
  try {
    const phone = sessionStorage.getItem("login_phone");
    if (!phone) {
      showToast("Session expired. Please try again.", "error");
      setStep("form");
      return;
    }

    const response = await fetch(SummaryApi.VerifyOTP.url, {
      method: SummaryApi.VerifyOTP.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp: otpCode }),
    });
    const data = await response.json();

    if (data.success) {
      const employee = data.data;
      sessionStorage.setItem("member_id", employee.member_id || "");
      sessionStorage.setItem("member_type_id", employee.member_type_id || "");
      sessionStorage.setItem("employee_id", employee.employee_id || "");
      sessionStorage.setItem("full_name", employee.full_name || "");
      sessionStorage.setItem("role", employee.role || "");
      sessionStorage.setItem("email", employee.email || "");
      sessionStorage.setItem("phone", employee.phone || "");
      sessionStorage.setItem("username", employee.username || "");
      sessionStorage.setItem("skills", employee.skills || "");
      sessionStorage.setItem("notice_period", employee.notice_period || "");
      sessionStorage.setItem("preferred_work_mode", employee.preferred_work_mode || "");
      sessionStorage.setItem("profile_image", employee.profile_image || "");
      sessionStorage.setItem("document_verified", employee.document_verified || 0);
      sessionStorage.setItem("profile_verified", employee.profile_verified || 0);
      sessionStorage.setItem("employee", JSON.stringify(employee));
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.removeItem("login_phone");
      sessionStorage.removeItem("login_member_id");

      // Close the OTP toast only after successful verification
      handleToastClose();

      setStep("success");

      // Optional: show welcome message after OTP toast is closed
      setTimeout(() => {
        showToast(`🎉 Welcome ${employee.full_name || "Employee"}!`, "success");
      }, 200);
    } else {
      showToast(data.message || "Invalid OTP. Please try again.", "error");
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    showToast("Server Error. Please try again.", "error");
  } finally {
    setIsLoading(false);
  }
};

  // ── Resend OTP ──
  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const phone = sessionStorage.getItem("login_phone");
      if (!phone) {
        showToast("Session expired. Please try again.", "error");
        setStep("form");
        return;
      }

      const response = await fetch(SummaryApi.ResendOTP.url, {
        method: SummaryApi.ResendOTP.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();

      if (data.success) {
        let otpMessage = `✅ OTP resent to +91 ${phone.slice(0, 2)}****${phone.slice(-4)}`;
        if (data.data?.otp) {
          otpMessage = `🔑 New OTP: ${data.data.otp} — resent to +91 ${phone.slice(0, 2)}****${phone.slice(-4)}`;
          console.log("📱 New OTP:", data.data.otp);
        }
        showToast(otpMessage, "success");
      } else {
        showToast(data.message || "Failed to resend OTP. Please try again.", "error");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      showToast("Server Error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toast message={toast.message} visible={toast.visible} onClose={handleToastClose} severity={toast.severity} />

      {/* Wizard Resume Modal — appears on top of dashboard after login */}
      {showWizardModal && wizardInfo && (
        <WizardResumeModal wizardInfo={wizardInfo} onDismiss={handleWizardModalDismiss} />
      )}

      {/* Login card — hidden once wizard modal is showing */}
      {!showWizardModal && (
        <ModalWrapper>
          <ModalCard elevation={0}>
            <ModalHeader>
              <LogoContainer>
                <LogoImage src={logo} alt="Crewzaar" />
              </LogoContainer>
            </ModalHeader>

            <ModalBody>
              {step === "success" && <StepSuccess onNavigateToDashboard={handleNavigateToDashboard} />}
              {step === "otp" && (
                <StepOTP
                  mobile={mobile}
                  onVerify={handleVerifyOTP}
                  onBack={() => setStep("form")}
                  onResend={handleResendOTP}
                  isLoading={isLoading}
                />
              )}
              {step === "form" && (
                <LoginForm
                  mobile={mobile}
                  setMobile={setMobile}
                  mobileError={mobileError}
                  loginCode={loginCode}
                  setLoginCode={setLoginCode}
                  onSendOTP={handleSendOTP}
                  isLoading={isLoading}
                />
              )}
            </ModalBody>

            {step === "form" && (
              <ModalFooter>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Don't have an account?{" "}
                  <Button
                    onClick={() => navigate("/")}
                    sx={{
                      color: "#4CAF0A",
                      fontWeight: 700,
                      fontSize: 13,
                      textTransform: "none",
                      padding: 0,
                      minWidth: "auto",
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                  >
                    Create Free Account
                  </Button>
                </Typography>
              </ModalFooter>
            )}
          </ModalCard>
        </ModalWrapper>
      )}
    </>
  );
}