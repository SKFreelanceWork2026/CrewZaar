// Login.jsx (updated)
import React, { useState, useEffect, useRef } from "react";
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
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

// ── Styled Components ────────────────────────────────────
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
  justifyContent: "space-between",
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
  flex: 1,
});

const LogoImage = styled("img")(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: 10,
  objectFit: "contain",
  [theme.breakpoints.down("sm")]: {
    width: 42,
    height: 42,
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
  "&:hover": {
    boxShadow: "none",
  },
  [theme.breakpoints.down("sm")]: {
    height: 48,
    fontSize: 15,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    background: "#fff",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF0A",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF0A",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    color: "#111",
    "&.Mui-focused": {
      color: "#4CAF0A",
    },
  },
}));

const OtpInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: "#f7f7f5",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF0A",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF0A",
      borderWidth: 2,
    },
  },
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
    padding: "16px 0",
  },
}));

const SuccessIconWrapper = styled(Box)({
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "#f0fae8",
  border: "2px solid #b6ddb8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px auto",
});

const TimerRingWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
});

const ResendButton = styled(Button)({
  fontSize: 13,
  color: "#4CAF0A",
  fontWeight: 700,
  textTransform: "none",
  padding: 0,
  minWidth: "auto",
  "&:hover": {
    background: "transparent",
    textDecoration: "underline",
  },
});

const AccountTypeBadge = styled(Box)({
  background: "#f0fae8",
  border: "1px solid #c8e6b0",
  borderRadius: 12,
  padding: "14px 18px",
  display: "flex",
  alignItems: "center",
  gap: 14,
  marginBottom: 24,
});

const AccountTypeIcon = styled(Box)({
  width: 44,
  height: 44,
  background: "#4CAF0A",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "#fff",
});

const BackButton = styled(Button)({
  color: "#4CAF0A",
  fontSize: 13,
  fontWeight: 600,
  textTransform: "none",
  padding: 0,
  minWidth: "auto",
  marginBottom: 16,
  "&:hover": {
    background: "transparent",
  },
});

// ── Import Logo ───────────────────────────────────────────
import logo from "../../assets/images/Changed Logo.png";

// ── Toast Notification using MUI Snackbar ─────────────────
function Toast({ message, visible, onClose }) {
  return (
    <Snackbar
      open={visible}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        position: "fixed",
        top: "20px !important",
        left: "50% !important",
        transform: "translateX(-50%) !important",
        width: "auto",
        maxWidth: "90%",
        minWidth: "300px",
        zIndex: 99999,
        "& .MuiSnackbarContent-root": {
          minWidth: "auto",
          width: "100%",
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        icon={<EmailIcon sx={{ fontSize: 20 }} />}
        sx={{
          width: "100%",
          backgroundColor: "#1a4d00",
          color: "#fff",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          "& .MuiAlert-icon": {
            color: "#fff",
            fontSize: 20,
          },
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            padding: "4px 0",
          },
          "& .MuiAlert-action": {
            padding: "4px 0",
            "& .MuiIconButton-root": {
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            },
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

// ── Countdown Timer Ring ──────────────────────────────────
function TimerRing({ seconds, total }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - seconds / total);
  const color = seconds <= 5 ? "#e24b4a" : "#4CAF0A";

  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#e8f5e0" strokeWidth="3" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          fontWeight: 700,
          fontSize: 11,
          color: color,
        }}
      >
        {seconds}
      </Typography>
    </Box>
  );
}

// ── OTP Step ──────────────────────────────────────────────
function StepOTP({ mobile, onVerify, onBack, onResend }) {
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
        if (s <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
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
    if (code.length < 4) {
      setOtpError("Please enter all 4 digits.");
      return;
    }
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
      <BackButton startIcon={<ArrowBackIcon />} onClick={onBack}>
        Change Account
      </BackButton>

      <Typography variant="h5" sx={{ fontWeight: 700, color: "#111", textAlign: "center", mb: 0.5 }}>
        Verify OTP
      </Typography>
      <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mb: 3, lineHeight: 1.5 }}>
        Enter the 4-digit code sent to{" "}
        <Typography component="span" sx={{ fontWeight: 700, color: "#111" }}>
          +{maskedMobile}
        </Typography>
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2.5 }}>
        {digits.map((d, i) => {
          const isFocused = document.activeElement === inputRefs.current[i];
          const error = Boolean(otpError);
          return (
            <OtpInput
              key={i}
              inputRef={(el) => (inputRefs.current[i] = el)}
              value={d}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              onPaste={handlePaste}
              inputProps={{
                inputMode: "numeric",
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "16px 0",
                },
              }}
              sx={{
                width: 64,
                [theme => theme.breakpoints.down("sm")]: {
                  width: 56,
                },
                "& .MuiOutlinedInput-root": {
                  background: d ? "#f0fae8" : "#f7f7f5",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? "#e24b4a" : isFocused ? "#4CAF0A" : d ? "#4CAF0A" : "#e0e0da",
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
              <Typography component="span" sx={{ fontWeight: 700, color: "#111" }}>
                {seconds}s
              </Typography>
            </Typography>
          </>
        ) : (
          <ResendButton onClick={handleResend}>Resend OTP</ResendButton>
        )}
      </TimerRingWrapper>

      <StyledButton
        fullWidth
        variant="contained"
        onClick={handleVerify}
        disabled={!allFilled}
        sx={{
          background: allFilled ? "#4CAF0A" : "#c8e6b0",
          color: "#fff",
          "&:hover": {
            background: allFilled ? "#3d9e00" : "#c8e6b0",
          },
          "&.Mui-disabled": {
            background: "#c8e6b0",
            color: "#fff",
          },
        }}
      >
        Verify & Sign In
      </StyledButton>
    </Box>
  );
}

// ── Success Step ──────────────────────────────────────────
function StepSuccess({ onNavigateToDashboard }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Navigate to dashboard after success animation
    const timer = setTimeout(() => {
      if (onNavigateToDashboard) {
        onNavigateToDashboard();
      }
    }, 2600);
    return () => clearTimeout(timer);
  }, [onNavigateToDashboard]);

  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <SuccessIconWrapper>
        <CheckCircleIcon sx={{ color: "#4CAF0A", fontSize: 40 }} />
      </SuccessIconWrapper>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#111", mb: 1 }}>
        You're in!
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 2.5 }}>
        Login successful. Redirecting to your dashboard…
      </Typography>
      <Box sx={{ height: 5, background: "#e8f5e0", borderRadius: 4, overflow: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            width: `${progress}%`,
            background: "#4CAF0A",
            borderRadius: 4,
            transition: "width 2.2s linear",
          }}
        />
      </Box>
    </Box>
  );
}

// ── Login Form ────────────────────────────────────────────
function LoginForm({ mobile, setMobile, mobileError, loginCode, setLoginCode, onSendOTP }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", color: "#111", mb: 0.5 }}>
        Welcome Back
      </Typography>
      <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mb: 2.5 }}>
        Enter your credentials to continue
      </Typography>

      <AccountTypeBadge>
        <AccountTypeIcon>
          <BusinessIcon />
        </AccountTypeIcon>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a4d00" }}>
            Employee Login
          </Typography>
          <Typography variant="caption" sx={{ color: "#4CAF0A" }}>
            Access opportunities
          </Typography>
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
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#555" }}>
                  +91
                </Typography>
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
                {showPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
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
              sx={{
                color: "#4CAF0A",
                "&.Mui-checked": {
                  color: "#4CAF0A",
                },
              }}
            />
          }
          label="Remember me"
          sx={{
            "& .MuiTypography-root": {
              fontSize: 13,
              color: "#555",
            },
          }}
        />
        <Button
          sx={{
            color: "#4CAF0A",
            fontWeight: 700,
            fontSize: 13,
            textTransform: "none",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          Forgot password?
        </Button>
      </Box>

      <StyledButton
        fullWidth
        variant="contained"
        onClick={onSendOTP}
        sx={{
          background: "#4CAF0A",
          "&:hover": {
            background: "#3d9e00",
          },
        }}
      >
        Sign In to Dashboard
      </StyledButton>
    </Box>
  );
}

// ── Main Modal ────────────────────────────────────────────
export default function LoginModal({ open = true, onClose = () => {}, onLoginSuccess = () => {} }) {
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [mobile, setMobile] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  if (open === false) return null;

  function showToast(msg) {
    setToast({ visible: true, message: msg });
  }

  const handleToastClose = () => {
    setToast({ visible: false, message: "" });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setMobile("");
      setLoginCode("");
      setMobileError(false);
    }, 250);
  };

  const handleSendOTP = () => {
    if (!mobile.trim() || mobile.trim().length < 8) {
      setMobileError(true);
      return;
    }
    setMobileError(false);
    setStep("otp");
    setTimeout(() => showToast(`OTP sent to +91 ${mobile.slice(0, 2)}****${mobile.slice(-4)}`), 300);
  };

  const handleResend = () => {
    showToast(`OTP resent to +91 ${mobile.slice(0, 2)}****${mobile.slice(-4)}`);
  };

  const handleNavigateToDashboard = () => {
    handleClose();
    if (onLoginSuccess) onLoginSuccess();
    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleVerify = () => {
    setStep("success");
  };

  return (
    <>
      <Toast 
        message={toast.message} 
        visible={toast.visible} 
        onClose={handleToastClose}
      />
      <ModalWrapper>
        <ModalCard elevation={0}>
          <ModalHeader>
            <LogoContainer>
              <LogoImage src={logo} alt="Crewzaar" />
            </LogoContainer>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: "#bbb",
                "&:hover": {
                  background: "#f5f5f5",
                  color: "#666",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>

          <ModalBody>
            {step === "success" && (
              <StepSuccess onNavigateToDashboard={handleNavigateToDashboard} />
            )}
            {step === "otp" && (
              <StepOTP
                mobile={mobile}
                onVerify={handleVerify}
                onBack={() => setStep("form")}
                onResend={handleResend}
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
              />
            )}
          </ModalBody>

          {step === "form" && (
            <ModalFooter>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Don't have an account?{" "}
                <Button
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
    </>
  );
}