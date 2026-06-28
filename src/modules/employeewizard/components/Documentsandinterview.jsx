import React, { useState } from "react";
import {
  Upload, Send, Calendar, Info, Languages, Loader2, CheckCircle2, XCircle, Lock,
} from "lucide-react";
import SummaryApi from "../../../common";

const UPLOAD_URL = SummaryApi?.documentVerification?.url;
const UPLOAD_METHOD = SummaryApi?.documentVerification?.method || "POST";
const UPDATE_URL = SummaryApi?.documentVerificationUpdate?.url;
const UPDATE_METHOD = SummaryApi?.documentVerificationUpdate?.method || "POST";
const SLOT_URL = SummaryApi?.slotCreate?.url;
const SLOT_METHOD = SummaryApi?.slotCreate?.method || "POST";

// ── Document SVG Icons (ALL GREY - #6B7280) ──
const IconWrapper = ({ children, bgColor }) => (
  <div
    style={{
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: bgColor || "#F8FAFC",
      border: "1px solid #E5E7EB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

// ALL icons use #6B7280 for stroke - NO colored strokes
const ResumeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M8 3H16L20 7V21H4V3H8Z" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3V7H20" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="11" r="2" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M8.5 17C9.3 15.5 10.5 14.8 12 14.8C13.5 14.8 14.7 15.5 15.5 17" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const AadharIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.8"/>
    <circle cx="9" cy="10" r="2" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M6.5 15C7.3 13.8 8.2 13.2 9 13.2C9.8 13.2 10.7 13.8 11.5 15" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M14 9H18" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M14 13H18" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const PanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M7 10H11" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M7 14H15" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CertificateIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M9 12V20L12 18L15 20V12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DegreeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 4L21 9L12 14L3 9Z" stroke="#6B7280" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M7 11V15C7 16.5 9.5 18 12 18C14.5 18 17 16.5 17 15V11" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const OtherEduIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M7 3H16L20 7V21H7V3Z" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M16 3V7H20" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M10 12H17" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M10 16H15" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="6" cy="17" r="3" stroke="#6B7280" strokeWidth="1.8"/>
  </svg>
);

const ExperienceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="7" width="16" height="12" rx="2" stroke="#6B7280" strokeWidth="1.8"/>
    <path d="M9 7V5H15V7" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── Documents list with background colors only ──
const DOCUMENTS = [
  { 
    key: "resume", 
    label: "Resume / CV", 
    required: true, 
    hint: ["Max size: 1 MB"], 
    icon: ResumeIcon, 
    bg: "#eef2ff"
  },
  { 
    key: "aadhar", 
    label: "Aadhar Card", 
    required: true, 
    hint: ["Max size: 1 MB"], 
    icon: AadharIcon, 
    bg: "#eff6ff"
  },
  { 
    key: "pan", 
    label: "PAN Card", 
    required: true, 
    hint: ["Max size: 1 MB"], 
    icon: PanIcon, 
    bg: "#f0fdf4"
  },
  { 
    key: "tenth", 
    label: "10th Certificate", 
    required: true, 
    hint: ["Max size: 1 MB"], 
    icon: CertificateIcon, 
    bg: "#faf5ff"
  },
  { 
    key: "twelfth", 
    label: "12th Certificate", 
    required: true, 
    hint: ["Max size: 1 MB"], 
    icon: CertificateIcon, 
    bg: "#fdf2f8"
  },
  { 
    key: "degree", 
    label: "Degree Certificate", 
    required: true, 
    hint: ["Max size: 1 MB"], 
    icon: DegreeIcon, 
    bg: "#fff7ed"
  },
  { 
    key: "otherEdu", 
    label: "Other Educational Certificates", 
    required: false, 
    hint: ["If any", "Max size: 1 MB"], 
    icon: OtherEduIcon, 
    bg: "#eff6ff"
  },
  { 
    key: "experience", 
    label: "Experience Certificate", 
    required: false, 
    hint: ["If applicable", "Max size: 1 MB"], 
    icon: ExperienceIcon, 
    bg: "#f0fdf4"
  },
];

// ── 24-hour format time slots ──
const MORNING_SLOTS = ["10:30", "11:00", "11:30", "12:00", "12:30"];
const AFTERNOON_SLOTS = [
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
];

const LANGUAGES = [
  "English", "Hindi", "Telugu", "Tamil", "Kannada",
  "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi",
];

const colors = {
  bg: "#f9fafb",
  white: "#ffffff",
  border: "#e5e7eb",
  textDark: "#111827",
  textBody: "#374151",
  textMuted: "#6b7280",
  textFaint: "#9ca3af",
  green: "#4CAF0A",
  greenDark: "#3d8c08",
  greenLight: "#eef8e6",
  greenLighter: "#e7f5dc",
  greenSoft: "#a8d98a",
  amberBg: "#fffbeb",
  amberText: "#92400e",
  grayBg: "#f9fafb",
  red: "#ef4444",
  redLight: "#fef2f2",
  overlay: "rgba(0,0,0,0.45)",
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: colors.bg,
    padding: "32px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxSizing: "border-box",
  },
  container: { maxWidth: "1152px", margin: "0 auto" },
  headerRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" },
  title: { fontSize: "24px", fontWeight: 700, color: colors.textDark, margin: 0 },
  stepBadge: {
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "13px",
    fontWeight: 600,
  },
  card: { borderRadius: "16px", backgroundColor: colors.white, padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" },
  grid: { display: "grid", gridTemplateColumns: "1fr", gap: "40px" },
  sectionTitle: { fontSize: "18px", fontWeight: 700, color: colors.textDark, margin: 0 },
  sectionDesc: { marginTop: "4px", fontSize: "14px", color: colors.textMuted, lineHeight: 1.5 },
  docList: { marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  docRow: { display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" },
  docInfo: { minWidth: "160px", flexShrink: 0 },
  docLabel: { fontSize: "14px", fontWeight: 600, color: "#1f2937", margin: 0 },
  docHint: { fontSize: "12px", color: colors.textFaint, margin: 0 },
  fileLabel: { display: "flex", flex: "1 1 200px", cursor: "pointer", alignItems: "center", justifyContent: "flex-start", gap: "8px", borderRadius: "8px", border: `1px solid ${colors.border}`, padding: "10px 16px", fontSize: "14px", color: colors.textMuted, backgroundColor: colors.white, transition: "border-color 0.15s, background-color 0.15s", minWidth: 0 },
  fileLabelText: { fontWeight: 500, color: colors.textBody, whiteSpace: "nowrap", flexShrink: 0 },
  fileLabelName: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: colors.textFaint, minWidth: 0 },
  fileError: { width: "100%", marginTop: "4px", fontSize: "12px", color: colors.red },
  tip: { marginTop: "24px", borderRadius: "8px", backgroundColor: colors.amberBg, padding: "12px 16px", fontSize: "14px", color: colors.amberText },
  errorBanner: { marginTop: "16px", borderRadius: "8px", backgroundColor: colors.redLight, border: `1px solid #fecaca`, padding: "12px 16px", fontSize: "14px", color: colors.red },
  successBanner: { marginTop: "16px", borderRadius: "8px", backgroundColor: colors.greenLight, border: `1px solid ${colors.greenSoft}`, padding: "12px 16px", fontSize: "14px", color: colors.greenDark },
  fieldBlock: { marginTop: "24px" },
  fieldLabel: { marginBottom: "8px", display: "block", fontSize: "14px", fontWeight: 600, color: colors.textBody },
  inputWrap: { position: "relative" },
  inputIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: colors.green, pointerEvents: "none" },
  input: { width: "100%", boxSizing: "border-box", borderRadius: "8px", border: `1px solid ${colors.border}`, padding: "10px 12px 10px 36px", fontSize: "14px", fontWeight: 500, color: colors.textBody, outline: "none", backgroundColor: colors.white },
  select: { width: "100%", boxSizing: "border-box", appearance: "none", borderRadius: "8px", border: `1px solid ${colors.border}`, padding: "10px 12px 10px 36px", fontSize: "14px", fontWeight: 500, color: colors.textBody, outline: "none", backgroundColor: colors.white },
  dateQuickRow: { display: "flex", gap: "8px", marginTop: "8px" },
  dateQuickBtn: (selected) => ({
    flex: 1,
    borderRadius: "8px",
    border: `1px solid ${selected ? colors.green : colors.border}`,
    backgroundColor: selected ? colors.green : colors.white,
    color: selected ? colors.white : "#4b5563",
    padding: "8px 10px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  slotGroupLabel: { marginBottom: "8px", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: colors.textFaint },
  slotGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" },
  slotButton: (selected, disabled) => ({
    borderRadius: "8px",
    border: `1px solid ${selected ? colors.green : colors.border}`,
    backgroundColor: selected ? colors.green : colors.white,
    color: selected ? colors.white : "#4b5563",
    padding: "10px 8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.15s",
  }),
  lockedBanner: {
    marginTop: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    backgroundColor: colors.greenLight,
    border: `1px solid ${colors.greenSoft}`,
    padding: "10px 14px",
    fontSize: "13px",
    color: colors.greenDark,
  },
  lunchNote: { marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", borderRadius: "8px", backgroundColor: colors.grayBg, padding: "10px 16px", fontSize: "14px", color: colors.textMuted },
  afternoonLabel: { margin: "16px 0 8px", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: colors.textFaint },
  timezoneNote: { marginTop: "24px", display: "flex", alignItems: "flex-start", gap: "8px", borderRadius: "8px", backgroundColor: colors.greenLighter, padding: "12px 16px", fontSize: "14px", color: "#065f46" },
  actions: { marginTop: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" },
  backButton: { borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: colors.white, padding: "10px 24px", fontSize: "14px", fontWeight: 600, color: "#4b5563", cursor: "pointer" },
  submitButton: (enabled) => ({ display: "flex", alignItems: "center", gap: "8px", borderRadius: "8px", border: "none", padding: "10px 32px", fontSize: "14px", fontWeight: 600, color: colors.white, backgroundColor: enabled ? colors.green : colors.greenSoft, cursor: enabled ? "pointer" : "not-allowed", transition: "background-color 0.15s" }),
  spin: { animation: "spin 1s linear infinite" },
  statusBadge: (status) => ({
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: 500,
    flexShrink: 0,
    color:
      status === "done" ? colors.greenDark :
      status === "error" ? colors.red :
      status === "uploading" ? colors.textMuted :
      "transparent",
  }),

  // ── Confirmation Modal ──
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: colors.overlay,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: "16px",
    padding: "28px",
    width: "360px",
    maxWidth: "calc(100vw - 32px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  modalTitle: { fontSize: "17px", fontWeight: 700, color: colors.textDark, margin: "0 0 8px" },
  modalBody: { fontSize: "14px", color: colors.textMuted, lineHeight: 1.6, margin: "0 0 16px" },
  modalDetailRow: {
    backgroundColor: colors.grayBg,
    borderRadius: "8px",
    padding: "10px 14px",
    marginBottom: "8px",
    fontSize: "13px",
  },
  modalDetailLabel: { color: colors.textMuted, display: "block", marginBottom: "2px", fontSize: "12px" },
  modalDetailValue: { color: colors.textDark, fontWeight: 600 },
  modalActions: { display: "flex", gap: "10px", marginTop: "20px" },
  modalCancelBtn: { flex: 1, padding: "10px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: colors.white, fontSize: "14px", fontWeight: 500, color: "#4b5563", cursor: "pointer" },
  modalConfirmBtn: { flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: colors.green, color: colors.white, fontSize: "14px", fontWeight: 600, cursor: "pointer" },
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  React.useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isDesktop;
};

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const getEmployeeId = () => {
  try {
    return sessionStorage.getItem("employee_id") || "";
  } catch {
    return "";
  }
};

// ── Date helpers ──
const toDateStr = (d) => d.toISOString().split("T")[0];
const getTodayStr = () => toDateStr(new Date());
const getTomorrowStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toDateStr(d);
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
};

const DocumentsAndInterview = ({ onBack, onNext }) => {
  const employeeId = getEmployeeId();
  const todayStr = getTodayStr();
  const tomorrowStr = getTomorrowStr();

  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotLocked, setSlotLocked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const isDesktop = useIsDesktop();

  const uploadDocument = async (docKey, file, useUpdateEndpoint = false) => {
    const formData = new FormData();
    formData.append("employee_id", employeeId);
    formData.append("document_name", docKey);
    formData.append("document_file", file);

    const url    = useUpdateEndpoint ? UPDATE_URL    : UPLOAD_URL;
    const method = useUpdateEndpoint ? UPDATE_METHOD : UPLOAD_METHOD;

    if (!url) {
      throw new Error(
        `API endpoint not found. Check that SummaryApi is imported correctly and contains "documentVerification${useUpdateEndpoint ? "Update" : ""}".`
      );
    }

    const response = await fetch(url, { method, body: formData });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`Failed to upload "${docKey}" (${response.status}). ${errorText}`);
    }

    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("application/json") ? response.json() : response.text();
  };

  const submitInterviewSlot = async () => {
    const numericId = Number(employeeId);
    const member_id = Number.isNaN(numericId) ? employeeId : numericId;

    const payload = {
      member_id,
      interview_date: selectedDate,
      time_slot: selectedSlot,
      language: selectedLanguage,
    };

    const response = await fetch(SLOT_URL, {
      method: SLOT_METHOD,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.text();
    return result;
  };

  // ── NEW: Update pending task API call ──
  const updatePendingTask = async () => {
    const empId = sessionStorage.getItem("employee_id");

    if (!empId) {
      console.warn("No employee_id found");
      return false;
    }

    try {
      const response = await fetch(SummaryApi.createorupdatependingtasks.url, {
        method: SummaryApi.createorupdatependingtasks.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: Number(empId),
          pending_task: "complete",
          wizard_step: 5,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update session storage
        sessionStorage.setItem("wizardStep", "5");
        sessionStorage.setItem("verification_screen", "complete");
        
        // Dispatch events for listeners
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("wizardStepChange"));
        
        return true;
      } else {
        console.error("Failed to update pending task:", result.message);
        return false;
      }
    } catch (err) {
      console.error("Error updating pending task:", err);
      return false;
    }
  };

  const handleFileChange = async (key, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isReUpload = uploadStatus[key] === "done";

    if (file.size > MAX_FILE_SIZE) {
      setFileErrors((prev) => ({ ...prev, [key]: "File exceeds 1 MB limit." }));
      setFiles((prev) => { const next = { ...prev }; delete next[key]; return next; });
      setUploadStatus((prev) => ({ ...prev, [key]: "error" }));
      e.target.value = "";
      return;
    }

    setFileErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
    setFiles((prev) => ({ ...prev, [key]: file }));

    if (!employeeId) {
      setFileErrors((prev) => ({ ...prev, [key]: "Employee ID missing. Please log in again." }));
      setUploadStatus((prev) => ({ ...prev, [key]: "error" }));
      return;
    }

    setUploadStatus((prev) => ({ ...prev, [key]: "uploading" }));
    try {
      await uploadDocument(key, file, isReUpload);
      setUploadStatus((prev) => ({ ...prev, [key]: "done" }));
    } catch (err) {
      setUploadStatus((prev) => ({ ...prev, [key]: "error" }));
      setFileErrors((prev) => ({
        ...prev,
        [key]: err?.message || "Upload failed. Please try again.",
      }));
    }
  };

  const allRequiredUploaded = DOCUMENTS.filter((d) => d.required).every(
    (d) => files[d.key] && uploadStatus[d.key] === "done"
  );

  const anyUploading = Object.values(uploadStatus).some((s) => s === "uploading");

  // ── UPDATED: handleSubmit with pending task update ──
  const handleSubmit = async () => {
    if (isSubmitting || anyUploading) return;

    if (!employeeId) {
      setSubmitError("Employee ID not found. Please log in again.");
      return;
    }

    const failedDocs = DOCUMENTS.filter(
      (d) => d.required && uploadStatus[d.key] !== "done"
    );
    if (failedDocs.length > 0) {
      setSubmitError(
        `Upload failed for: ${failedDocs.map((d) => d.label).join(", ")}. Please re-upload them.`
      );
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Step 1: Submit interview slot
      await submitInterviewSlot();
      
      // Step 2: Update pending task to complete
      const taskUpdated = await updatePendingTask();
      
      if (taskUpdated) {
        setSubmitSuccess(true);
        // Call onNext to proceed to verification complete
        onNext?.({ files, selectedDate, selectedSlot, selectedLanguage });
      } else {
        // Even if task update fails, interview was scheduled
        // Show success but log error
        setSubmitSuccess(true);
        console.warn("Interview scheduled but pending task update failed");
        onNext?.({ files, selectedDate, selectedSlot, selectedLanguage });
      }
    } catch (err) {
      setSubmitError(err?.message || "Something went wrong while scheduling your interview. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClick = () => {
    if (!canSubmit) return;
    setSubmitError("");
    setShowConfirmModal(true);
  };

  const handleModalConfirm = () => {
    setShowConfirmModal(false);
    setSlotLocked(true);
    handleSubmit();
  };

  const handleSlotSelect = (slot) => {
    if (slotLocked) return;
    setSelectedSlot(slot);
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (val === todayStr || val === tomorrowStr) {
      setSelectedDate(val);
    }
  };

  const renderStatusBadge = (key) => {
    const status = uploadStatus[key];
    if (!status || status === "idle") return null;
    if (status === "uploading") return (
      <span style={styles.statusBadge("uploading")}>
        <Loader2 size={13} style={styles.spin} /> Uploading…
      </span>
    );
    if (status === "done") return (
      <span style={styles.statusBadge("done")}>
        <CheckCircle2 size={13} /> Uploaded
      </span>
    );
    if (status === "error") return (
      <span style={styles.statusBadge("error")}>
        <XCircle size={13} /> Failed
      </span>
    );
    return null;
  };

  const renderSlotGrid = (slots) => (
    <div style={styles.slotGrid}>
      {slots.map((slot) => {
        const isSelected = slot === selectedSlot;
        const isDisabled = slotLocked && !isSelected;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => handleSlotSelect(slot)}
            disabled={isDisabled}
            style={styles.slotButton(isSelected, isDisabled)}
            onMouseEnter={(e) => {
              if (!isDisabled && !isSelected) {
                e.currentTarget.style.borderColor = colors.greenSoft;
                e.currentTarget.style.backgroundColor = colors.greenLight;
              }
            }}
            onMouseLeave={(e) => {
              if (!isDisabled && !isSelected) {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.backgroundColor = colors.white;
              }
            }}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );

  const canSubmit =
    allRequiredUploaded &&
    !!selectedDate &&
    !!selectedSlot &&
    !!selectedLanguage &&
    !isSubmitting &&
    !anyUploading;

  return (
    <div style={styles.page}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={styles.container}>

        {/* ── Main Card ── */}
        <div style={styles.card}>
          <div style={{ ...styles.grid, gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr" }}>

            {/* ── Left: Upload Documents ── */}
            <div>
              <h2 style={styles.sectionTitle}>Upload Documents</h2>
              <p style={styles.sectionDesc}>
                Please upload clear and valid documents. Supported formats: JPG, PNG, PDF & JPEG
                (DOC/DOCX accepted for Resume). Max size: 1 MB per file.
              </p>

              <div style={styles.docList}>
                {DOCUMENTS.map((doc) => {
                  const DocIcon = doc.icon;
                  return (
                    <div key={doc.key}>
                      <div style={styles.docRow}>
                        <IconWrapper bgColor={doc.bg}>
                          <DocIcon />
                        </IconWrapper>
                        <div style={styles.docInfo}>
                          <p style={styles.docLabel}>
                            {doc.label}
                            {doc.required && <span style={{ color: colors.red }}> *</span>}
                          </p>
                          {doc.hint.map((line) => (
                            <p key={line} style={styles.docHint}>{line}</p>
                          ))}
                        </div>
                        <label
                          style={{
                            ...styles.fileLabel,
                            borderColor: uploadStatus[doc.key] === "done" ? colors.green : uploadStatus[doc.key] === "error" ? colors.red : colors.border,
                            backgroundColor: uploadStatus[doc.key] === "done" ? colors.greenLight : uploadStatus[doc.key] === "error" ? colors.redLight : colors.white,
                          }}
                          onMouseEnter={(e) => {
                            if (!uploadStatus[doc.key] || uploadStatus[doc.key] === "idle") {
                              e.currentTarget.style.borderColor = colors.green;
                              e.currentTarget.style.backgroundColor = colors.greenLight;
                            }
                          }}
                          onMouseLeave={(e) => {
                            const st = uploadStatus[doc.key];
                            e.currentTarget.style.borderColor = st === "done" ? colors.green : st === "error" ? colors.red : colors.border;
                            e.currentTarget.style.backgroundColor = st === "done" ? colors.greenLight : st === "error" ? colors.redLight : colors.white;
                          }}
                        >
                          <Upload size={16} color={colors.textFaint} style={{ flexShrink: 0 }} />
                          <span style={styles.fileLabelText}>Choose File</span>
                          <span style={styles.fileLabelName}>{files[doc.key]?.name || "No file chosen"}</span>
                          <input
                            type="file"
                            accept={doc.key === "resume" ? ".pdf,.doc,.docx" : ".jpg,.jpeg,.png,.pdf"}
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(doc.key, e)}
                            disabled={uploadStatus[doc.key] === "uploading"}
                          />
                        </label>
                        {renderStatusBadge(doc.key)}
                      </div>
                      {fileErrors[doc.key] && (
                        <div style={{ paddingLeft: "56px" }}>
                          <span style={styles.fileError}>{fileErrors[doc.key]}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={styles.tip}>
                <span style={{ fontWeight: 600 }}>Tip:</span> Each document uploads automatically as soon as you select it.
              </div>

              {submitError && <div style={styles.errorBanner}>{submitError}</div>}
              {submitSuccess && <div style={styles.successBanner}>Your interview has been scheduled successfully!</div>}
            </div>

            {/* ── Right: Schedule Interview ── */}
            <div>
              <h2 style={styles.sectionTitle}>Schedule Interview</h2>
              <p style={styles.sectionDesc}>Select a convenient time slot and language for your interview.</p>

              {/* Date */}
              <div style={styles.fieldBlock}>
                <label style={styles.fieldLabel}>Select Date</label>
                <div style={styles.inputWrap}>
                  <Calendar size={16} style={styles.inputIcon} />
                  <input
                    type="date"
                    value={selectedDate}
                    min={todayStr}
                    max={tomorrowStr}
                    onChange={handleDateChange}
                    onKeyDown={(e) => e.preventDefault()}
                    style={styles.input}
                    disabled={slotLocked}
                    onFocus={(e) => { e.target.style.borderColor = colors.green; e.target.style.boxShadow = `0 0 0 2px ${colors.greenLight}`; }}
                    onBlur={(e) => { e.target.style.borderColor = colors.border; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* Language */}
              <div style={styles.fieldBlock}>
                <label style={styles.fieldLabel}>Interview Language</label>
                <div style={styles.inputWrap}>
                  <Languages size={16} style={styles.inputIcon} />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    style={styles.select}
                    onFocus={(e) => { e.target.style.borderColor = colors.green; e.target.style.boxShadow = `0 0 0 2px ${colors.greenLight}`; }}
                    onBlur={(e) => { e.target.style.borderColor = colors.border; e.target.style.boxShadow = "none"; }}
                  >
                    {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div style={styles.fieldBlock}>
                {!slotLocked && (
                  <p style={{ fontSize: "13px", color: colors.textMuted, marginBottom: "10px" }}>
                    Select a slot — once chosen it cannot be changed.
                  </p>
                )}

                <p style={styles.slotGroupLabel}>Morning &middot; 10:30 – 13:00</p>
                {renderSlotGrid(MORNING_SLOTS)}

                <div style={styles.lunchNote}>
                  <Info size={16} color={colors.textFaint} />
                  <span>Lunch Break &middot; 13:00 – 14:00 (not available for booking)</span>
                </div>

                <p style={styles.afternoonLabel}>Afternoon / Evening &middot; 14:00 – 20:00</p>
                {renderSlotGrid(AFTERNOON_SLOTS)}

                {slotLocked && (
                  <div style={styles.lockedBanner}>
                    <Lock size={14} color={colors.greenDark} style={{ flexShrink: 0 }} />
                    <span>
                      <strong>{selectedSlot}</strong> selected — this slot cannot be changed.
                    </span>
                  </div>
                )}
              </div>

              <div style={styles.timezoneNote}>
                <Info size={16} color={colors.greenDark} style={{ marginTop: "2px", flexShrink: 0 }} />
                <span>All times are shown in 24-hour format, your local time zone.</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Actions ── */}
        <div style={styles.actions}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={styles.backButton}
              disabled={isSubmitting || anyUploading}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.grayBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.white)}
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={!canSubmit}
            style={styles.submitButton(canSubmit)}
            onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.backgroundColor = colors.greenDark; }}
            onMouseLeave={(e) => { if (canSubmit) e.currentTarget.style.backgroundColor = colors.green; }}
          >
            {anyUploading ? (
              <><Loader2 size={16} style={styles.spin} />Uploading…</>
            ) : isSubmitting ? (
              <><Loader2 size={16} style={styles.spin} />Submitting…</>
            ) : (
              <><Send size={16} />Submit</>
            )}
          </button>
        </div>

      </div>

      {/* ── Confirmation Modal ── */}
      {showConfirmModal && (
        <div style={styles.modalOverlay} onClick={() => setShowConfirmModal(false)}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Confirm your submission?</h3>
            <p style={styles.modalBody}>
              Once submitted, your interview slot <strong>cannot be changed</strong>. Please review your details below before confirming.
            </p>

            {[
              { label: "Interview Date", value: formatDisplayDate(selectedDate) },
              { label: "Time Slot", value: selectedSlot },
              { label: "Language", value: selectedLanguage },
            ].map(({ label, value }) => (
              <div key={label} style={styles.modalDetailRow}>
                <span style={styles.modalDetailLabel}>{label}</span>
                <span style={styles.modalDetailValue}>{value}</span>
              </div>
            ))}

            <div style={styles.modalActions}>
              <button
                type="button"
                style={styles.modalCancelBtn}
                onClick={() => setShowConfirmModal(false)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.grayBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.white)}
              >
                Go back
              </button>
              <button
                type="button"
                style={styles.modalConfirmBtn}
                onClick={handleModalConfirm}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.greenDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.green)}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} style={styles.spin} />
                    Submitting...
                  </>
                ) : (
                  "Yes, submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsAndInterview;