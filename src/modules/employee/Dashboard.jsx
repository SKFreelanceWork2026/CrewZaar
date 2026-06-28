// modules/employee/Dashboard.jsx
// Renders ONLY the page content — Header + Sidebar live in components/Layout.jsx
import { useState, useEffect } from "react";
import {
  Target, Eye, Briefcase, Award, TrendingUp,
  CheckCircle, Calendar, MapPin, BarChart2, Clock,
  Rocket, Lightbulb, Cloud, Plus, ChevronRight,
  User, BadgeCheck, Star, Clock as ClockIcon,
} from "lucide-react";
import SummaryApi from "../../common/index";
import Stepper from "../employeewizard/components/Stepper";
import {
  getFlowSteps,
  getCurrentFlowIndex,
} from "../employeewizard/components/stepperConfig";

const GREEN = "#4CAF0A";

/* ─────────────────── SHARED ATOMS ─────────────────── */

const Avatar = ({ name, imgSrc, size = 88 }) => {
  const [imgError, setImgError] = useState(false);
  const initials = name
    ? name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "JD";

  if (imgSrc && !imgError) {
    return (
      <img
        src={imgSrc}
        alt={name}
        onError={() => setImgError(true)}
        style={{
          width: size, height: size, borderRadius: "50%", objectFit: "cover",
          border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${GREEN}, #2d7a06)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      flexShrink: 0,
    }}>
      <span style={{ color: "#fff", fontSize: size * 0.34, fontWeight: 700 }}>{initials}</span>
    </div>
  );
};

const Badge = ({ children, color = GREEN, bg = "#edffd6" }) => (
  <span style={{
    background: bg, color, fontSize: 11, fontWeight: 600,
    padding: "3px 10px", borderRadius: 20,
    display: "inline-flex", alignItems: "center", gap: 4,
  }}>{children}</span>
);

const ProgressBar = ({ value, color = GREEN, height = 6 }) => (
  <div style={{ background: "#e5e7eb", borderRadius: 4, height, overflow: "hidden", marginTop: 4 }}>
    <div style={{ width: `${Math.min(value, 100)}%`, background: color, height: "100%", borderRadius: 4, transition: "width 0.6s ease" }} />
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fff", borderRadius: 12, padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0", ...style,
  }}>{children}</div>
);

const GreenButton = ({ children, outline = false, style = {}, onClick }) => (
  <button onClick={onClick} style={{
    background: outline ? "transparent" : GREEN,
    color: outline ? GREEN : "#fff",
    border: outline ? `1.5px solid ${GREEN}` : "none",
    borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13,
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, ...style,
  }}>{children}</button>
);

const RadioOption = ({ label, sub, selected, onClick }) => (
  <div onClick={onClick} style={{
    background: selected ? GREEN : "transparent",
    color: selected ? "#fff" : "#374151",
    border: selected ? "none" : "1.5px solid #e5e7eb",
    borderRadius: 10, padding: "10px 14px", marginBottom: 8, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
  }}>
    <div style={{
      width: 17, height: 17, borderRadius: "50%",
      border: `2px solid ${selected ? "#fff" : "#9ca3af"}`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
    <div>
      <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, opacity: 0.85 }}>{sub}</div>}
    </div>
  </div>
);

const SkillBar = ({ name, value }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
      <span style={{ fontWeight: 500, color: "#374151" }}>{name}</span>
      <span style={{ color: "#6b7280", fontWeight: 600 }}>{value}%</span>
    </div>
    <ProgressBar value={value} height={7} />
  </div>
);

const StatCard = ({ icon: Icon, iconColor = GREEN, iconBg = "#f3ffe6", label, value, badge, delta }) => (
  <Card style={{ padding: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={iconColor} strokeWidth={2} />
      </div>
      {badge && <Badge color={GREEN} bg="#edffd6">{badge}</Badge>}
      {delta && <span style={{ color: GREEN, fontSize: 12, fontWeight: 700 }}>{delta}</span>}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{label}</div>
  </Card>
);

const VerificationItem = ({ label, sub, done = true }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
    <CheckCircle size={18} color={done ? GREEN : "#d1d5db"} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
    <div>
      <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{label}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div>
    </div>
  </div>
);

const ExperienceItem = ({ title, company, period, duration, bullets, tags, isLast = false }) => (
  <div style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : 24, marginBottom: isLast ? 0 : 4, borderBottom: isLast ? "none" : "1px solid #f3f4f6" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: GREEN, flexShrink: 0, zIndex: 1 }} />
      {!isLast && <div style={{ flex: 1, width: 2, background: "#c8f59a", marginTop: 4, borderRadius: 2 }} />}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{title}</div>
        <span style={{ background: "#e8f0fe", color: "#4a6cf7", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 20 }}>{duration}</span>
      </div>
      <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 4 }}>{company}</div>
      <div style={{ color: "#9ca3af", fontSize: 12, display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
        <Calendar size={12} color="#9ca3af" strokeWidth={1.8} /> {period}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151" }}>
            <div style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: GREEN }} />
            {b}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t, i) => (
          <span key={i} style={{ background: "#f3f4f6", color: "#374151", fontSize: 11, padding: "4px 12px", borderRadius: 20, border: "1px solid #e5e7eb" }}>{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const JobCard = ({ icon: Icon, iconBg = "#f3f4f6", iconColor = "#374151", title, company, mode, time }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
    <div style={{ width: 46, height: 46, background: iconBg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={22} color={iconColor} strokeWidth={1.8} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{title}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{company}</div>
      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
        <MapPin size={10} color="#9ca3af" /> {mode} · {time}
      </div>
    </div>
    <GreenButton style={{ fontSize: 12, padding: "7px 16px", whiteSpace: "nowrap" }}>View & Apply</GreenButton>
  </div>
);

/* ─────────────────── MAIN DASHBOARD ─────────────────── */

export default function Dashboard() {
  const [workMode, setWorkMode] = useState("wfh");
  const [availability, setAvailability] = useState("immediate");
  const [jobType, setJobType] = useState("permanent");
  const [employee, setEmployee] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Wizard Resume Modal State
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [flowSteps, setFlowSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStepLabel, setCurrentStepLabel] = useState("");
  const [pendingTaskData, setPendingTaskData] = useState(null);
  const [isModalReady, setIsModalReady] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);
  const [wizardWindowRef, setWizardWindowRef] = useState(null);
  
  // Employee verification status from API
  const [isVerified, setIsVerified] = useState(false);
  const [isDocVerified, setIsDocVerified] = useState(false);

  // ─── Fetch Employee Profile Data ──────────────────────────────────
  const fetchEmployeeProfile = async (employeeId) => {
    if (!employeeId) return null;

    try {
      const response = await fetch(SummaryApi.getEmployee.url, {
        method: SummaryApi.getEmployee.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: employeeId }),
      });

      if (!response.ok) return null;

      const result = await response.json();

      if (result.success && result.data) {
        const empData = result.data;
        
        // Update verification status - is_verified: 0 or 1
        const verified = empData.is_verified === 1;
        setIsVerified(verified);
        
        // Store verification status in sessionStorage
        sessionStorage.setItem("profile_verified", verified ? "1" : "0");
        
        // If verified, close the modal
        if (verified) {
          setShowResumeModal(false);
          setIsModalReady(false);
          setModalDismissed(true);
          sessionStorage.removeItem("modal_type");
          sessionStorage.removeItem("wizard_continue_clicked");
        }
        
        return empData;
      }
      return null;
    } catch (error) {
      console.error("❌ Error fetching employee profile:", error);
      return null;
    }
  };

  // ─── Fetch Pending Tasks from API ──────────────────────────────────
  const fetchPendingTasks = async (employeeId, emp) => {
    if (!employeeId) return;

    try {
      const response = await fetch(SummaryApi.getPendingTasks.url, {
        method: SummaryApi.getPendingTasks.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: employeeId }),
      });

      if (!response.ok) return;

      const result = await response.json();

      if (result.success && result.data) {
        setPendingTaskData(result.data);

        const pendingTask = result.data;
        const wizardStep = pendingTask.wizard_step;

        // Check if wizard continue was clicked (survives page reload)
        const wizardContinueClicked = sessionStorage.getItem("wizard_continue_clicked") === "true";
        
        // Get verification status from state or session
        const isEmployeeVerified = isVerified || sessionStorage.getItem("profile_verified") === "1";
        
        // IMPORTANT: If verified, ALWAYS hide the modal
        if (isEmployeeVerified) {
          setShowResumeModal(false);
          setIsModalReady(false);
          setModalDismissed(true);
          sessionStorage.removeItem("modal_type");
          sessionStorage.removeItem("wizard_continue_clicked");
          return;
        }

        // LOGIC: Show modal if:
        // 1. Wizard is incomplete (step 1-4) OR
        // 2. Wizard is complete (step 5) AND verification is pending (is_verified = 0)
        const isWizardIncomplete = wizardStep >= 1 && wizardStep < 5;
        const isWizardComplete = wizardStep === 5;
        const isVerificationPending = !isEmployeeVerified;
        
        let shouldShowModal = false;
        let modalType = "resume";
        
        if (wizardStep >= 1 && wizardStep <= 5) {
          if (isWizardIncomplete && isVerificationPending && !modalDismissed) {
            shouldShowModal = true;
            modalType = "resume";
          } else if (isWizardComplete && isVerificationPending && !modalDismissed) {
            shouldShowModal = true;
            modalType = "waiting";
          }
        }

        if (shouldShowModal) {
          const role = emp?.role || sessionStorage.getItem("role") || sessionStorage.getItem("employee_role") || "";
          const steps = getFlowSteps(role);

          setFlowSteps(steps);
          setCurrentIndex(getCurrentFlowIndex(steps, wizardStep));

          const current = steps.find((s) => s.wizardStep === wizardStep);
          setCurrentStepLabel(current?.label || `Step ${wizardStep}`);

          sessionStorage.setItem("modal_type", modalType);
          
          setIsModalReady(true);
          setShowResumeModal(true);
        } else {
          // If no reason to show modal, hide it
          setShowResumeModal(false);
          setIsModalReady(false);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching pending tasks:", error);
    }
  };

  // ─── Fetch Employee Data ──────────────────────────────────────────
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const data = sessionStorage.getItem("employee");

        if (data) {
          const emp = JSON.parse(data);
          setEmployee(emp);

          if (emp.profile_image) {
            setProfileImg(`${SummaryApi.getprofileimage.url}${emp.profile_image}`);
          }

          if (emp.preferred_work_mode) {
            const mode = emp.preferred_work_mode.toLowerCase();
            if (mode.includes("hybrid")) setWorkMode("hybrid");
            else if (mode.includes("remote") || mode.includes("home")) setWorkMode("wfh");
            else if (mode.includes("site")) setWorkMode("onsite");
          }

          if (emp.notice_period) {
            const np = emp.notice_period.toLowerCase();
            if (np.includes("15")) setAvailability("15days");
            else if (np.includes("30") || np.includes("1 month")) setAvailability("30days");
            else setAvailability("immediate");
          }

          const employeeId = emp.employee_id || sessionStorage.getItem("employee_id");

          if (employeeId) {
            // First fetch the full employee profile to get verification status
            const profileData = await fetchEmployeeProfile(employeeId);
            
            // Then fetch pending tasks - pass the updated employee data with is_verified
            const empWithVerification = {
              ...emp,
              is_verified: profileData?.is_verified ?? emp.is_verified ?? 0
            };
            
            await fetchPendingTasks(employeeId, empWithVerification);
          }
        }
      } catch (e) {
        console.error("Error loading employee data:", e);
      } finally {
        setLoading(false);
      }
    };

    loadEmployeeData();
  }, []);

  // ─── Poll for verification status every 30 seconds ──────────────────
  useEffect(() => {
    let pollInterval = null;

    // Only poll if modal is showing and not verified
    if (showResumeModal && !isVerified) {
      pollInterval = setInterval(() => {
        const employeeId = sessionStorage.getItem("employee_id");
        if (employeeId) {
          fetchEmployeeProfile(employeeId);
        }
      }, 30000); // Check every 30 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [showResumeModal, isVerified]);

  // ─── Listen for BroadcastChannel messages from wizard ────────────────
  useEffect(() => {
    // Create BroadcastChannel to listen for wizard messages
    const channel = new BroadcastChannel("wizard_channel");
    
    channel.onmessage = (event) => {
      // Check if the message is a step completion or wizard done
      if (event.data?.type === "STEP_COMPLETED" || event.data?.type === "WIZARD_DONE") {
        console.log("📡 Dashboard received broadcast:", event.data);
        
        const employeeId = sessionStorage.getItem("employee_id");
        if (employeeId) {
          // Refetch employee profile and pending tasks
          fetchEmployeeProfile(employeeId);
          
          // Also refetch pending tasks with current employee data
          const emp = sessionStorage.getItem("employee");
          if (emp) {
            const employeeData = JSON.parse(emp);
            fetchPendingTasks(employeeId, employeeData);
          }
        }
      }
    };

    // Cleanup: close the channel when component unmounts
    return () => {
      channel.close();
      console.log("📡 BroadcastChannel closed");
    };
  }, []); // Empty dependency array - runs once on mount

  // ─── Listen for wizard completion events ──────────────────────────
  useEffect(() => {
    const handleWizardComplete = () => {
      // Refetch employee data to check verification status
      const employeeId = sessionStorage.getItem("employee_id");
      if (employeeId) {
        fetchEmployeeProfile(employeeId);
      }
    };

    const handleWizardStepChange = () => {
      // Check if wizard is complete (step 5)
      const step = parseInt(sessionStorage.getItem("wizardStep") || "0", 10);
      if (step === 5) {
        // Refetch employee data to check verification status
        const employeeId = sessionStorage.getItem("employee_id");
        if (employeeId) {
          fetchEmployeeProfile(employeeId);
        }
      }
    };

    // Listen for messages from the wizard window
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'WIZARD_CLOSED') {
        setWizardWindowRef(null);
        setTimeout(() => {
          sessionStorage.removeItem("wizard_continue_clicked");
        }, 300000);
      }
    };

    window.addEventListener("wizardComplete", handleWizardComplete);
    window.addEventListener("wizardStepChange", handleWizardStepChange);
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("wizardComplete", handleWizardComplete);
      window.removeEventListener("wizardStepChange", handleWizardStepChange);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const getRoleDisplay = () =>
    employee?.role
      ? employee.role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Employee";

  const getSkillsArray = () => {
    if (!employee?.skills) return [];
    if (typeof employee.skills === "string") {
      return employee.skills.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  // Handle Continue Wizard — opens wizard in new tab but keeps modal open
  const handleContinueWizard = () => {
    const step       = pendingTaskData?.wizard_step || 1;
    const screen     = pendingTaskData?.verification_screen || "";
    const role       = employee?.role || sessionStorage.getItem("role") || sessionStorage.getItem("employee_role") || "";
    const employeeId = employee?.employee_id || sessionStorage.getItem("employee_id") || "";

    const params = new URLSearchParams({
      step,
      role,
      employee_id: employeeId,
      verification_screen: screen,
    });

    // Set flag in sessionStorage to prevent modal from showing again after reload
    sessionStorage.setItem("wizard_continue_clicked", "true");
    
    // Open wizard in new tab
    const wizardUrl = `/employee-wizard?${params.toString()}`;
    const newWindow = window.open(wizardUrl, "_blank");
    
    if (newWindow) {
      setWizardWindowRef(newWindow);
      newWindow.focus();
      
      // DO NOT close the modal - keep it open
      // Only reload the page to check for verification status
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
      return;
    } else {
      // If popup was blocked
      if (window.confirm("Please allow popups for this site, or click OK to open in the same tab.")) {
        window.location.href = wizardUrl;
      }
    }

    // Set up listener for wizard completion (fallback polling)
    const checkWizardComplete = setInterval(() => {
      if (wizardWindowRef && wizardWindowRef.closed) {
        setWizardWindowRef(null);
        clearInterval(checkWizardComplete);
        return;
      }
      
      const step = parseInt(sessionStorage.getItem("wizardStep") || "0", 10);
      if (step === 5) {
        sessionStorage.removeItem("wizard_continue_clicked");
        setWizardWindowRef(null);
        clearInterval(checkWizardComplete);
        
        // Refetch to check if verification is complete
        const employeeId = sessionStorage.getItem("employee_id");
        if (employeeId) {
          fetchEmployeeProfile(employeeId);
        }
      }
    }, 2000);

    setTimeout(() => clearInterval(checkWizardComplete), 600000);
  };

  // ─── LOADING STATE ────────────────────────────────────────────────
  if (loading || !employee) {
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "#f8fafc",
        zIndex: 9999,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, border: "3px solid #e5e7eb", borderTop: `3px solid ${GREEN}`,
            borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px",
          }} />
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const skills = getSkillsArray();
  const verified = isVerified || sessionStorage.getItem("profile_verified") === "1";
  const docVerified = sessionStorage.getItem("document_verified") === "1";

  // Determine modal type from sessionStorage
  const modalType = sessionStorage.getItem("modal_type") || "resume";

  // ─── IF MODAL IS ACTIVE - Show only the modal ──────────────────
  if (showResumeModal && isModalReady) {
    // Check if this is the "waiting for verification" modal
    const isWaitingModal = modalType === "waiting" || (pendingTaskData?.wizard_step === 5 && !verified);
    
    return (
      <>
        {/* Full screen overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 9998,
          }}
        />

        {/* Modal - COMPACT STYLES APPLIED */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 720,
            background: "#fff",
            borderRadius: 24,
            padding: "24px 28px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
            zIndex: 9999,
            maxHeight: "85vh",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >

          {isWaitingModal ? (
            // ─── WAITING FOR VERIFICATION MODAL (COMPACT) ──────────
            <>
              {/* Header - Compact */}
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}>
                  <ClockIcon size={24} color="#fff" />
                </div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: 6,
                    letterSpacing: "-0.4px",
                    fontFamily: "'Inter','SF Pro Display','Segoe UI',sans-serif",
                  }}
                >
                  Verification in Progress
                </h2>
                <p style={{ 
                  color: "#6b7280", 
                  fontSize: 13, 
                  lineHeight: 1.5,
                  maxWidth: 460, 
                  margin: "0 auto",
                  fontFamily: "'Inter','SF Pro Text','Segoe UI',sans-serif",
                }}>
                  You've completed all steps! Our team is reviewing your verification.
                </p>
              </div>

              {/* Timer/Status Card - Compact */}
              <div
                style={{
                  padding: 18,
                  background: "#fefce8",
                  borderRadius: 16,
                  border: "2px solid #fde68a",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#f59e0b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 18, color: "#fff" }}>⏳</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "#92400e" }}>
                      Under Review
                    </div>
                    <div style={{ fontSize: 12, color: "#78350f", marginTop: 2 }}>
                      Estimated completion: <strong>24 hours</strong>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  width: "100%",
                  height: 6,
                  background: "#fde68a",
                  borderRadius: 4,
                  overflow: "hidden",
                  marginTop: 8,
                }}>
                  <div style={{
                    width: "60%",
                    height: "100%",
                    background: "linear-gradient(90deg, #f59e0b, #d97706)",
                    borderRadius: 4,
                    animation: "progressPulse 2s ease-in-out infinite",
                  }} />
                </div>
                
                <p style={{ 
                  marginTop: 10, 
                  fontSize: 12, 
                  lineHeight: 1.6,
                  color: "#78350f" 
                }}>
                  Our team is carefully reviewing your verification. You'll receive an email notification once complete.
                </p>
              </div>

              {/* Steps completed - show all green */}
              <div style={{ marginTop: 4, marginBottom: 16 }}>
                <Stepper 
                  steps={flowSteps.length > 0 ? flowSteps : [
                    { label: "Verification" },
                    { label: "Communication" },
                    { label: "Documents" },
                    { label: "Complete" },
                  ]} 
                  currentIndex={3} 
                  isLastStepDone={true}
                />
              </div>

              {/* Info Box - Compact with clean bullet list */}
              <div
                style={{
                  padding: 14,
                  background: "#f8fafc",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#e0f2fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14 }}>ℹ️</span>
                </div>
                <div>
                  <div style={{ 
                    fontWeight: 600, 
                    fontSize: 13, 
                    color: "#1e293b" 
                  }}>
                    What happens next?
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 12,
                      color: "#64748b",
                      lineHeight: 1.5,
                    }}
                  >
                    <div>✓ Our team will verify your profile and documents</div>
                    <div>✓ You'll receive an email notification once verified</div>
                    <div>✓ Your profile will be visible to companies after verification</div>
                    <div>✓ The modal will automatically close when verification is complete</div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 18,
                }}
              >
                {/* No buttons - just waiting */}
              </div>
            </>
          ) : (
            // ─── RESUME WIZARD MODAL (COMPACT) ──────────────────────
            <>
              {/* Header - Compact */}
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${GREEN}, #2d7a06)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}>
                  <span style={{ fontSize: 24, color: "#fff" }}>📝</span>
                </div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: 6,
                    letterSpacing: "-0.4px",
                    fontFamily: "'Inter','SF Pro Display','Segoe UI',sans-serif",
                  }}
                >
                  Resume Your Application
                </h2>
                <p style={{ 
                  color: "#6b7280", 
                  fontSize: 13, 
                  lineHeight: 1.5,
                  maxWidth: 460, 
                  margin: "0 auto",
                  fontFamily: "'Inter','SF Pro Text','Segoe UI',sans-serif",
                }}>
                  You have an incomplete Employee Wizard. Continue exactly where you left off.
                </p>
              </div>

              {/* Stepper - Compact */}
              <div style={{ marginBottom: 16 }}>
                {flowSteps.length > 0 ? (
                  <Stepper steps={flowSteps} currentIndex={currentIndex} />
                ) : (
                  <div style={{ textAlign: "center", padding: 16, color: "#6b7280", fontSize: 13 }}>
                    Loading wizard steps...
                  </div>
                )}
              </div>

              {/* Current Step Info - Compact */}
              <div
                style={{
                  marginTop: 18,
                  padding: 18,
                  background: "#f8fafc",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${GREEN}, #2d7a06)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 16, color: "#fff" }}>📍</span>
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: 600, 
                      color: "#374151", 
                      fontSize: 12 
                    }}>
                      Current Step
                    </div>
                    <div style={{ 
                      color: GREEN, 
                      fontSize: 17, 
                      fontWeight: 700 
                    }}>
                      {currentStepLabel || "Loading..."}
                    </div>
                  </div>
                </div>
                <p style={{ 
                  marginTop: 10, 
                  color: "#6b7280", 
                  fontSize: 12, 
                  lineHeight: 1.6, 
                  paddingLeft: 48 
                }}>
                  Click <strong>Continue</strong> to resume your onboarding. The Employee Wizard will open in a new tab from your saved step.
                </p>
              </div>

              {/* Buttons - Only Continue button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 18,
                }}
              >
                <button
                  onClick={handleContinueWizard}
                  style={{
                    background: GREEN,
                    color: "#fff",
                    border: "none",
                    padding: "12px 40px",
                    borderRadius: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 15,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 4px 16px rgba(76, 175, 10, 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#3d9e00";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(76, 175, 10, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = GREEN;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(76, 175, 10, 0.35)";
                  }}
                >
                  Continue to Wizard →
                </button>
              </div>

              {/* Info text at bottom */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: 12,
                  color: "#9ca3af",
                }}
              >
                You must complete your wizard to access the dashboard
              </div>
            </>
          )}
        </div>

        <style>{`
          @keyframes progressPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </>
    );
  }

  // ─── DASHBOARD RENDER (only when no modal) ──────────────────────────
  return (
    <div style={{ 
      fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", 
      width: "100%",
    }}>
      {/* ── STATS ROW ── */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
        gap: 16, 
        marginBottom: 24 
      }}>
        <StatCard icon={Target} iconBg="#f3ffe6" iconColor={GREEN} label="Profile Strength" value="92%" badge="Excellent" />
        <StatCard icon={Eye} iconBg="#eff6ff" iconColor="#3b82f6" label="Profile Views" value="247" delta="+12%" />
        <StatCard icon={Briefcase} iconBg="#fff7ed" iconColor="#ea580c" label="Hiring Requests" value="15" delta="+8%" />
        <StatCard icon={Award} iconBg="#fdf4ff" iconColor="#a855f7" label="Skill Score" value="89%" />
        <StatCard icon={TrendingUp} iconBg="#f0fdf4" iconColor="#22c55e" label="Visibility" value={verified ? "A+" : "Pending"} badge={verified ? "High" : "Verification"} />
      </div>

      {/* ── 3-COLUMN GRID ── */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 2fr 1fr", 
        gap: 20,
        width: "100%"
      }}>
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Profile card */}
          <Card>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <Avatar name={employee.full_name} imgSrc={profileImg} size={88} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#111827" }}>{employee.full_name}</div>
              <div style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 10px" }}>{getRoleDisplay()}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {verified && <Badge color={GREEN} bg="#edffd6"><CheckCircle size={11} /> Verified</Badge>}
                {!verified && <Badge color="#f59e0b" bg="#fefce8"><ClockIcon size={11} /> Pending Verification</Badge>}
                {employee.member_type_id && <Badge color="#3b82f6" bg="#eff6ff">IT Department</Badge>}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                  <span>Profile Completion</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>92%</span>
                </div>
                <ProgressBar value={92} height={7} />
              </div>
              <GreenButton style={{ width: "100%", justifyContent: "center", padding: 11, fontSize: 13 }}>
                <User size={14} /> View Public Profile
              </GreenButton>
            </div>
          </Card>

          {/* Verification */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Verification Status</div>
            <VerificationItem label="Skill Test" sub="Score: 89%" done={verified} />
            <VerificationItem label="Task Evaluation" sub="Completed" done={verified} />
            <VerificationItem label="Communication Test" sub="Score: 92%" done={verified} />
            <VerificationItem label="Background Verification" sub={docVerified ? "Verified" : "Pending"} done={docVerified} />
            {verified ? (
              <div style={{ background: "#f3ffe6", border: "1px solid #c8f59a", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#2d7a06", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <BadgeCheck size={15} color={GREEN} style={{ flexShrink: 0, marginTop: 1 }} />
                Congratulations! You are fully verified and visible to top companies.
              </div>
            ) : (
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#92400e", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <ClockIcon size={15} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                Complete verification to get visible to top companies. Usually takes <strong>24 hours</strong>.
              </div>
            )}
          </Card>

          {/* Profile Strength */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Profile Strength</div>
            {[
              { label: "Completeness", val: 95 },
              { label: "Skills & Tests", val: 90 },
              { label: "Experience", val: 92 },
              { label: "Projects", val: 88 },
              { label: "Verification", val: verified ? 100 : 40 },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: "#374151" }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{s.val}%</span>
                </div>
                <ProgressBar value={s.val} height={6} />
              </div>
            ))}
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#92400e", marginTop: 10, display: "flex", gap: 6, alignItems: "flex-start" }}>
              <MapPin size={13} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
              Keep your profile updated to rank higher in search results
            </div>
          </Card>
        </div>

        {/* MIDDLE COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Experience */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Experience</div>
              <GreenButton outline style={{ fontSize: 12 }}><Plus size={13} /> Add Experience</GreenButton>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid #f3f4f6" }}>
              {[{ val: "5.9 years", label: "Total Experience" }, { val: "2", label: "Companies" }, { val: "12+", label: "Projects" }].map(({ val, label }, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px", border: "1px solid #f0f0f0" }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: "#111827" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
            <ExperienceItem
              title="Senior Full Stack Developer" company="Tech Solutions Inc."
              period="Jan 2022 – Present" duration="3.4 years"
              bullets={["Led development of microservices architecture serving 1M+ users", "Mentored team of 5 junior developers", "Reduced API response time by 40% through optimization"]}
              tags={["E-commerce", "CRM", "Analytics Dashboard"]}
            />
            <ExperienceItem
              title="Full Stack Developer" company="StartupHub"
              period="Jun 2019 – Dec 2021" duration="2.5 years"
              bullets={["Built real-time collaboration features using WebSocket", "Implemented CI/CD pipeline reducing deployment time by 60%"]}
              tags={["Collaboration Tool", "Project Management"]} isLast
            />
          </Card>

          {/* Skills */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Skills</div>
              <div style={{ display: "flex", gap: 8 }}>
                <GreenButton outline style={{ fontSize: 12 }}><Plus size={13} /> Add Skill</GreenButton>
                <GreenButton outline style={{ fontSize: 12 }}>View All <ChevronRight size={13} /></GreenButton>
              </div>
            </div>
            {skills.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
                {skills.slice(0, 6).map((skill, i) => (
                  <SkillBar key={i} name={skill} value={[90, 88, 85, 87, 82, 80][i] ?? 80} />
                ))}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
                {[
                  { name: "JavaScript", value: 90 }, { name: "React", value: 88 },
                  { name: "Node.js", value: 85 }, { name: "TypeScript", value: 87 },
                  { name: "PostgreSQL", value: 82 }, { name: "AWS", value: 80 },
                ].map((s, i) => <SkillBar key={i} {...s} />)}
              </div>
            )}
          </Card>

          {/* Job Opportunities */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Job Opportunities</div>
              <button style={{ color: GREEN, fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                View All <ChevronRight size={14} />
              </button>
            </div>
            <JobCard icon={Rocket} iconBg="#fff7ed" iconColor="#ea580c" title="Lead Full Stack Developer" company="TechCorp" mode="Hybrid" time="Today" />
            <JobCard icon={Lightbulb} iconBg="#fefce8" iconColor="#ca8a04" title="Senior Backend Engineer" company="InnovateLabs" mode="WFH" time="Yesterday" />
            <JobCard icon={Cloud} iconBg="#eff6ff" iconColor="#3b82f6" title="Full Stack Architect" company="CloudSystems" mode="On-site" time="2 days ago" />
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Availability */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Availability</div>
            {[{ key: "immediate", label: "Immediate Joiner", sub: "Available now" }, { key: "15days", label: "15 Days", sub: "Notice period" }, { key: "30days", label: "30 Days", sub: "Notice period" }].map((opt) => (
              <RadioOption key={opt.key} label={opt.label} sub={opt.sub} selected={availability === opt.key} onClick={() => setAvailability(opt.key)} />
            ))}
          </Card>

          {/* Work Preferences */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Work Preferences</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, fontWeight: 500 }}>Job Type</div>
            {[{ key: "permanent", label: "Permanent" }, { key: "contract", label: "Contract" }].map((opt) => (
              <RadioOption key={opt.key} label={opt.label} selected={jobType === opt.key} onClick={() => setJobType(opt.key)} />
            ))}
            <div style={{ fontSize: 12, color: "#6b7280", margin: "14px 0 8px", fontWeight: 500 }}>Work Mode</div>
            {[{ key: "wfh", label: "Work From Home" }, { key: "hybrid", label: "Hybrid" }, { key: "onsite", label: "On-site" }].map((opt) => (
              <RadioOption key={opt.key} label={opt.label} selected={workMode === opt.key} onClick={() => setWorkMode(opt.key)} />
            ))}
          </Card>

          {/* Quick Stats */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Quick Stats</div>
            {[
              { icon: BarChart2, label: "Profile Rank", value: verified ? "Top 5%" : "Pending", color: verified ? "#8b5cf6" : "#f59e0b" },
              { icon: Clock, label: "Avg. Response", value: "2 hours", color: "#3b82f6" },
              { icon: Target, label: "Match Rate", value: verified ? "94%" : "N/A", color: verified ? GREEN : "#f59e0b" },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 2 ? 14 : 0 }}>
                <span style={{ fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon size={15} color={color} /> {label}
                </span>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{value}</span>
              </div>
            ))}
          </Card>

          {/* Recent Activity */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Recent Activity</div>
            {[
              { icon: Eye, color: GREEN, bg: "#f3ffe6", text: "Profile viewed by TechCorp", time: "2 hours ago" },
              { icon: Star, color: "#3b82f6", bg: "#eff6ff", text: "New job match found", time: "5 hours ago" },
              { icon: Star, color: "#8b5cf6", bg: "#f5f3ff", text: "Skill score updated", time: "1 day ago" },
            ].map(({ icon: Icon, color, bg, text, time }, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 14 : 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{text}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{time}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Bottom Banner */}
      <div style={{ marginTop: 24, background: `linear-gradient(90deg, ${GREEN}, #3a9a09)`, borderRadius: 12, padding: "18px 28px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: 0 }}>
          Your profile is your proof. The stronger the profile, the faster companies will hire you.
        </p>
      </div>
    </div>
  );
}