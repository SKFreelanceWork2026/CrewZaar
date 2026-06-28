import React, { useState, useRef, useCallback, useEffect } from "react";
import SummaryApi from "../../../common";
import taskCompleteImg from "../../../assets/images/Nojobsearchingicons/task-complete.png";
import taskCompleteBg from "../../../assets/images/Nojobsearchingicons/task-complete-bg.png";
import companyLogo from "../../../assets/images/Changed Logo.png";

// ── PDF Generation Library ──
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ── PDF Generation Function ──
const generateTaskPDF = (task, employeeName, role) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const PRIMARY = '#4CAF0A';
  const PRIMARY_DARK = '#2d7a06';
  const GRAY_100 = '#f8f9fa';
  const GRAY_200 = '#e9ecef';
  const GRAY_700 = '#495057';
  const GRAY_900 = '#212529';
  const WHITE = '#ffffff';
  const RED = '#dc3545';
  const BLUE = '#0d6efd';
  
  const addWatermark = () => {
    doc.setFontSize(60);
    doc.setTextColor(200, 200, 200);
    doc.setFont('helvetica', 'bold');
    doc.text('CREWZAAR', pageWidth / 2, pageHeight / 2, { 
      angle: 45, 
      align: 'center',
      opacity: 0.1 
    });
  };

  const addHeader = () => {
    doc.setFillColor(PRIMARY);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    try {
      doc.addImage(companyLogo, 'PNG', 15, 8, 30, 30);
    } catch (e) {
      doc.setFontSize(22);
      doc.setTextColor(WHITE);
      doc.setFont('helvetica', 'bold');
      doc.text('CREWZAAR', 15, 28);
    }
    
    doc.setFontSize(16);
    doc.setTextColor(WHITE);
    doc.setFont('helvetica', 'bold');
    doc.text('Design Task Brief', pageWidth - 15, 20, { align: 'right' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Employee Assessment', pageWidth - 15, 30, { align: 'right' });
    
    doc.setDrawColor(WHITE);
    doc.setLineWidth(0.5);
    doc.line(15, 40, pageWidth - 15, 40);
  };

  const addFooter = () => {
    const footerY = pageHeight - 20;
    
    doc.setDrawColor(GRAY_200);
    doc.setLineWidth(0.5);
    doc.line(15, footerY - 8, pageWidth - 15, footerY - 8);
    
    doc.setFontSize(8);
    doc.setTextColor('#6c757d');
    doc.setFont('helvetica', 'normal');
    doc.text('© 2026 Crewzaar - All Rights Reserved', pageWidth / 2, footerY, { align: 'center' });
    doc.text('Confidential - For Internal Use Only', pageWidth / 2, footerY + 6, { align: 'center' });
  };

  const addContent = () => {
    let y = 55;
    const leftMargin = 20;
    const rightMargin = pageWidth - 20;
    const contentWidth = rightMargin - leftMargin;
    
    doc.setFontSize(20);
    doc.setTextColor(PRIMARY_DARK);
    doc.setFont('helvetica', 'bold');
    doc.text('Design Task Brief', pageWidth / 2, y, { align: 'center' });
    y += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(GRAY_700);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete the following design task as part of your assessment.', pageWidth / 2, y, { align: 'center' });
    y += 12;

    doc.setFillColor(GRAY_100);
    doc.roundedRect(leftMargin, y, contentWidth, 35, 3, 3, 'F');
    doc.setDrawColor(PRIMARY);
    doc.setLineWidth(0.5);
    doc.roundedRect(leftMargin, y, contentWidth, 35, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setTextColor(GRAY_700);
    doc.setFont('helvetica', 'bold');
    
    const infoItems = [
      { label: 'Employee:', value: employeeName || 'N/A' },
      { label: 'Role:', value: role || 'N/A' },
      { label: 'Task ID:', value: task?.task_id || 'N/A' },
      { label: 'Date:', value: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }
    ];
    
    infoItems.forEach((item, index) => {
      const x = leftMargin + 12 + (index % 2) * (contentWidth / 2);
      const yPos = y + 6 + Math.floor(index / 2) * 14;
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(GRAY_700);
      doc.text(item.label, x, yPos);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(GRAY_900);
      doc.text(item.value, x + 35, yPos);
    });
    
    y += 42;

    doc.setFontSize(14);
    doc.setTextColor(PRIMARY_DARK);
    doc.setFont('helvetica', 'bold');
    doc.text('📋 Task Details', leftMargin, y);
    y += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(GRAY_900);
    doc.setFont('helvetica', 'bold');
    doc.text('Title:', leftMargin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(task?.title || 'E-Commerce Landing Page Design', leftMargin + 25, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(GRAY_900);
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', leftMargin, y);
    doc.setFont('helvetica', 'normal');
    const description = task?.description || 'Design a modern and responsive landing page for an online fashion store.';
    const splitDesc = doc.splitTextToSize(description, contentWidth - 25);
    doc.text(splitDesc, leftMargin + 25, y);
    y += splitDesc.length * 6 + 6;

    doc.setFillColor('#f0fdf4');
    doc.roundedRect(leftMargin, y, contentWidth, 8, 3, 3, 'F');
    doc.setDrawColor(PRIMARY);
    doc.setLineWidth(0.5);
    doc.roundedRect(leftMargin, y, contentWidth, 8, 3, 3, 'S');
    
    doc.setFontSize(11);
    doc.setTextColor(PRIMARY_DARK);
    doc.setFont('helvetica', 'bold');
    doc.text('📌 Requirements & Deliverables', leftMargin + 8, y + 6);
    y += 16;

    const requirements = [
      { icon: '✓', text: 'Hero Section with engaging visuals and CTA' },
      { icon: '✓', text: 'Featured Products carousel/section' },
      { icon: '✓', text: 'Categories grid display' },
      { icon: '✓', text: 'Testimonials section' },
      { icon: '✓', text: 'Footer with contact info and links' },
    ];
    
    doc.setFontSize(10);
    doc.setTextColor(GRAY_700);
    doc.setFont('helvetica', 'normal');
    
    requirements.forEach((req, index) => {
      const yPos = y + index * 7;
      doc.text(req.icon, leftMargin + 8, yPos);
      doc.text(req.text, leftMargin + 15, yPos);
    });
    
    y += requirements.length * 7 + 12;

    doc.setFillColor('#eff6ff');
    doc.roundedRect(leftMargin, y, contentWidth, 8, 3, 3, 'F');
    doc.setDrawColor(BLUE);
    doc.setLineWidth(0.5);
    doc.roundedRect(leftMargin, y, contentWidth, 8, 3, 3, 'S');
    
    doc.setFontSize(11);
    doc.setTextColor(BLUE);
    doc.setFont('helvetica', 'bold');
    doc.text('📦 Deliverables', leftMargin + 8, y + 6);
    y += 16;

    const deliverables = [
      { icon: '📄', text: 'Figma File (with components and styles)' },
      { icon: '🔗', text: 'Prototype Link (shared view)' },
      { icon: '🖼', text: 'Exported Screens (PNG/PDF format)' },
    ];
    
    doc.setFontSize(10);
    doc.setTextColor(GRAY_700);
    doc.setFont('helvetica', 'normal');
    
    deliverables.forEach((del, index) => {
      const yPos = y + index * 7;
      doc.text(del.icon, leftMargin + 8, yPos);
      doc.text(del.text, leftMargin + 15, yPos);
    });
    
    y += deliverables.length * 7 + 12;

    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_DARK);
    doc.setFont('helvetica', 'bold');
    doc.text('📝 Guidelines', leftMargin, y);
    y += 8;

    const guidelines = [
      '• Follow UI/UX best practices and design principles',
      '• Use proper spacing, typography and color system',
      '• Design should be clean, modern and user-friendly',
      '• Mobile responsive design is preferred',
      '• Include component styles and variants',
      '• Submit before the deadline',
      '• Ensure original work - plagiarism will result in disqualification'
    ];
    
    doc.setFontSize(9);
    doc.setTextColor(GRAY_700);
    doc.setFont('helvetica', 'normal');
    
    guidelines.forEach((guide, index) => {
      const yPos = y + index * 6;
      doc.text(guide, leftMargin + 4, yPos);
    });
    
    y += guidelines.length * 6 + 12;

    const statsY = y;
    const statBoxWidth = (contentWidth - 20) / 4;
    
    const stats = [
      { label: 'Difficulty', value: 'Intermediate', color: '#f59e0b' },
      { label: 'Est. Time', value: '3 Hours', color: '#6366f1' },
      { label: 'Deadline', value: '24 Hours', color: RED },
      { label: 'Max Score', value: '100 Points', color: PRIMARY },
    ];
    
    stats.forEach((stat, index) => {
      const x = leftMargin + 10 + index * (statBoxWidth + 6);
      doc.setFillColor(GRAY_100);
      doc.roundedRect(x, statsY, statBoxWidth, 22, 2, 2, 'F');
      doc.setDrawColor(GRAY_200);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, statsY, statBoxWidth, 22, 2, 2, 'S');
      
      doc.setFontSize(7);
      doc.setTextColor(GRAY_700);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.label, x + statBoxWidth / 2, statsY + 6, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setTextColor(stat.color);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, x + statBoxWidth / 2, statsY + 16, { align: 'center' });
    });
    
    y += 32;

    doc.setFillColor('#fff3cd');
    doc.roundedRect(leftMargin, y, contentWidth, 20, 3, 3, 'F');
    doc.setDrawColor('#ffc107');
    doc.setLineWidth(0.5);
    doc.roundedRect(leftMargin, y, contentWidth, 20, 3, 3, 'S');
    
    doc.setFontSize(8);
    doc.setTextColor('#856404');
    doc.setFont('helvetica', 'italic');
    const note = '⚠️ Important: Use of AI-generated content or plagiarism will result in disqualification.';
    const splitNote = doc.splitTextToSize(note, contentWidth - 20);
    doc.text(splitNote, leftMargin + 10, y + 6);
    y += 28;
  };

  try {
    addHeader();
    addContent();
    addFooter();
    addWatermark();
  } catch (e) {
    console.error('Error generating PDF:', e);
    doc.setFontSize(16);
    doc.setTextColor(RED);
    doc.text('Error generating task details. Please try again.', 20, 50);
  }

  return doc;
};

export default function TaskUpload({ onBack, onNext }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState("");
  const [notes, setNotes] = useState("");
  const inputRef = useRef(null);

  // Confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);

  // API state
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ── PDF Download Handler ──
  const handleDownloadPDF = () => {
    try {
      const employeeName = sessionStorage.getItem("employee_name") || "Employee";
      const role = sessionStorage.getItem("employee_role") || "Designer";
      
      const doc = generateTaskPDF(selectedTask, employeeName, role);
      const fileName = `${selectedTask?.title?.replace(/\s+/g, '_') || 'Task'}_Brief.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('PDF download error:', err);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Browser back button prevention
  useEffect(() => {
    if (submitted) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      setShowLeaveAlert(true);
      // Store the navigation function properly
      setPendingNavigation(() => () => {
        window.history.back();
      });
      window.history.pushState(null, "", window.location.href);
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      return e.returnValue;
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [submitted]);

  // ✅ FIXED: handleLeave - properly executes the pending navigation
  const handleLeave = () => {
    setShowLeaveAlert(false);
    
    // Execute the pending navigation if it exists
    if (pendingNavigation) {
      // Call the stored function
      pendingNavigation();
      setPendingNavigation(null);
    } else {
      // Fallback: use onBack if available, otherwise go to dashboard
      if (onBack) {
        onBack();
      } else {
        window.location.href = "/employee-wizard";
      }
    }
  };

  // ✅ FIXED: handleStay - properly closes the modal
  const handleStay = () => {
    setShowLeaveAlert(false);
    setPendingNavigation(null);
    // Push a new state to prevent immediate back navigation
    window.history.pushState(null, "", window.location.href);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoadingTasks(true);
        setTaskError(null);
        const role = sessionStorage.getItem("employee_role") || "UI/UX Designer";
        const res = await fetch(SummaryApi.getTaskByRole.url, {
          method: SummaryApi.getTaskByRole.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setTasks(data.data);
          setSelectedTask(data.data[0]);
        } else {
          setTaskError(data.message || "No tasks found for your role.");
        }
      } catch (err) {
        setTaskError("Failed to load task. Please try again.");
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  // Step 1: clicking Submit Task opens confirmation modal
  const handleSubmitClick = () => {
    if (!file || !selectedTask) return;
    setShowConfirm(true);
  };

  // Step 2: confirmed → actual API call
  const handleConfirmedSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    setSubmitError(null);

    try {
      const employeeId = sessionStorage.getItem("employee_id") || "";
      const formData = new FormData();
      formData.append("task_id", selectedTask.task_id);
      formData.append("employee_id", employeeId);
      formData.append("figma_link", figmaUrl);
      formData.append("additional_notes", notes);
      formData.append("upload_file", file);

      const res = await fetch(SummaryApi.taskSubmission.url, {
        method: SummaryApi.taskSubmission.method,
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitting(false);
        setSubmitError(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitting(false);
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    }
  };

  // ── Handle Proceed with API call ──
  const handleProceed = async () => {
    const employeeId = sessionStorage.getItem("employee_id");

    if (!employeeId) {
      alert("Employee ID not found. Please try again.");
      return;
    }

    setIsUpdatingTask(true);

    try {
      const response = await fetch(SummaryApi.createorupdatependingtasks.url, {
        method: SummaryApi.createorupdatependingtasks.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: Number(employeeId),
          pending_task: "communication",
          wizard_step: 3,
        }),
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem("wizardStep", "3");
        sessionStorage.setItem("verification_screen", "communication");
        
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("wizardStepChange"));

        if (onNext) {
          onNext();
        } else {
          window.location.href = "/employee-wizard";
        }
      } else {
        alert(result.message || "Failed to update status. Please try again.");
      }
    } catch (err) {
      console.error("Error updating pending task:", err);
      alert("Unable to continue. Please check your connection.");
    } finally {
      setIsUpdatingTask(false);
    }
  };

  const taskTitle = selectedTask?.title || "E-Commerce Landing Page Design";
  const taskDescription =
    selectedTask?.description ||
    "Design a modern and responsive landing page for an online fashion store.";

  return (
    <div style={s.page}>
      {/* Leave Alert Modal */}
      {showLeaveAlert && (
        <div style={s.modalOverlay}>
          <div style={s.modalBox}>
            <div style={s.modalIcon}>⚠️</div>
            <h3 style={s.modalTitle}>Leave Task Upload?</h3>
            <p style={s.modalDesc}>
              Warning: Cheating may help you get a score, but it will not get you success. 
              This assessment is designed to measure your real abilities. Any changes that 
              you made may not be saved.
            </p>
            <div style={s.modalActions}>
              <button style={s.modalCancelBtn} onClick={handleStay}>
                Cancel
              </button>
              <button style={s.modalLeaveBtn} onClick={handleLeave}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirmation Modal ── */}
      {showConfirm && (
        <div style={s.modalOverlay}>
          <div style={s.modalBox}>
            <h3 style={s.modalTitle}>Submit Task?</h3>
            <p style={s.modalDesc}>
              Are you sure you want to submit your task? Once submitted, you
              won't be able to make changes.
            </p>

            <div style={s.modalFileSummary}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="#4CAF0A"
                  strokeWidth="1.8"
                />
                <path
                  d="M14 2v6h6"
                  stroke="#4CAF0A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span style={s.modalFileName}>{file?.name}</span>
              <span style={s.modalFileSize}>
                {formatBytes(file?.size || 0)}
              </span>
            </div>

            <div style={s.modalActions}>
              <button
                style={s.modalCancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button style={s.modalConfirmBtn} onClick={handleConfirmedSubmit}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: 6 }}
                >
                  <path
                    d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={s.container}>
        {/* Header with Logo and Download Button */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            {/* <img 
              src={companyLogo} 
              alt="Company Logo" 
              style={{ 
                height: 36, 
                width: 'auto',
                marginRight: 12,
                objectFit: 'contain'
              }} 
            /> */}
            {/* <h1 style={s.headerTitle}>Task Upload</h1> */}
          </div>
          {!submitted && selectedTask && !loadingTasks && (
            <button 
              onClick={handleDownloadPDF}
              style={s.downloadPdfBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3d8c08';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4CAF0A';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          )}
        </div>

        {/* Task selector */}
        {tasks.length > 1 && (
          <div style={s.taskSelectorWrap}>
            <label style={s.taskSelectorLabel}>Select Task:</label>
            <div style={s.taskSelectorRow}>
              {tasks.map((t) => (
                <button
                  key={t.task_id}
                  onClick={() => setSelectedTask(t)}
                  style={{
                    ...s.taskSelectorBtn,
                    background:
                      selectedTask?.task_id === t.task_id ? "#4CAF0A" : "#fff",
                    color:
                      selectedTask?.task_id === t.task_id ? "#fff" : "#374151",
                    borderColor:
                      selectedTask?.task_id === t.task_id
                        ? "#4CAF0A"
                        : "#d1d5db",
                  }}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Card */}
        <div style={s.card}>
          {/* ── Success screen after submission ── */}
          {submitted ? (
            <div style={{
              ...s.resultBox,
              backgroundImage: `url(${taskCompleteBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              padding: "270px 40px 40px",
              borderRadius: 16,
            }}>
              <h2 style={s.resultTitle}>Task Submitted Successfully! 🎉</h2>
              <p style={s.resultSub}>
                Your task has been submitted successfully. Our team will review your submission.
              </p>
              {submitError && (
                <div style={s.submitErrorBox}>
                  <span style={s.submitErrorText}>{submitError}</span>
                </div>
              )}
              <button
                onClick={handleProceed}
                disabled={isUpdatingTask}
                style={{
                  ...s.submitBtn,
                  opacity: isUpdatingTask ? 0.7 : 1,
                  cursor: isUpdatingTask ? "not-allowed" : "pointer",
                  marginBottom: 14,
                }}
              >
                {isUpdatingTask ? (
                  <>
                    <div style={s.btnSpinner} />
                    Updating...
                  </>
                ) : (
                  <>
                    Proceed to Next Step →
                  </>
                )}
              </button>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1.5px solid #86efac",
                  borderRadius: 50,
                  padding: "6px 16px 6px 6px",
                  fontSize: 13,
                  color: "#166534",
                  fontWeight: 500,
                  background: "transparent",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: "1.5px solid #4CAF0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  👍
                </div>
                You're one step closer to completion!
              </div>
            </div>
          ) : loadingTasks ? (
            <div style={s.loadingWrap}>
              <div style={s.spinner} />
              <p style={s.loadingText}>Loading your assigned task...</p>
            </div>
          ) : taskError ? (
            <div style={s.errorWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#ef4444"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="#ef4444"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <p style={s.errorText}>{taskError}</p>
            </div>
          ) : (
            <div style={s.splitLayout}>
              {/* LEFT */}
              <div style={s.leftPanel}>
                <div style={s.taskHeader}>
                  <div style={s.taskIconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="#3b82f6"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                        stroke="#3b82f6"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 style={s.taskTitle}>Assigned Design Task</h2>
                    <p style={s.taskSub}>
                      Please read the task details carefully and submit your
                      best work.
                    </p>
                  </div>
                </div>

                <div style={s.taskFields}>
                  <TaskField icon="tag" label="Task Title">
                    <p style={s.fieldValue}>{taskTitle}</p>
                  </TaskField>
                  <TaskField icon="list" label="Task Description">
                    <p style={{ ...s.fieldValue, marginBottom: 8 }}>
                      {taskDescription}
                    </p>
                    <ul style={s.bulletList}>
                      {[
                        "Hero Section",
                        "Featured Products",
                        "Categories",
                        "Testimonials",
                        "Footer",
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </TaskField>
                  <TaskField
                    icon="download"
                    label="Deliverables"
                    iconBg="#f0fdf4"
                    iconBorder="#bbf7d0"
                    iconColor="#16a34a"
                  >
                    <ul style={s.bulletList}>
                      {[
                        "Figma File",
                        "Prototype Link",
                        "Exported Screens (PNG/PDF)",
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </TaskField>
                </div>

                <div style={s.statsGrid}>
                  <StatCard
                    icon="📊"
                    iconColor="#f59e0b"
                    label="Difficulty"
                    value="Intermediate"
                  />
                  <StatCard
                    icon="⏱"
                    iconColor="#6366f1"
                    label="Estimated Time"
                    value="3 Hours"
                  />
                  <StatCard
                    icon="📅"
                    iconColor="#ef4444"
                    label="Submission Deadline"
                    value="24 Hours"
                  />
                  <StatCard
                    icon="⭐"
                    iconColor="#4CAF0A"
                    label="Max Score"
                    value="100 Points"
                  />
                </div>

                <div style={s.notice}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ flexShrink: 0, marginTop: 1 }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#3b82f6"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 8v4M12 16h.01"
                      stroke="#3b82f6"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p style={s.noticeText}>
                    Please ensure your work is original. Plagiarism or use of
                    AI-generated content may result in disqualification.
                  </p>
                </div>
              </div>

              <div style={s.divider} />

              {/* RIGHT */}
              <div style={s.rightPanel}>
                <h2 style={s.uploadTitle}>Upload Your Submission</h2>
                <p style={s.uploadSub}>
                  Upload your completed assignment or project work.
                </p>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => !file && inputRef.current?.click()}
                  style={{
                    ...s.dropZone,
                    borderColor: dragging ? "#4CAF0A" : "#d1d5db",
                    background: dragging ? "#f0fdf4" : "#fafafa",
                    cursor: file ? "default" : "pointer",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  {file ? (
                    <div style={s.filePreview}>
                      <div style={s.filePreviewIcon}>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            stroke="#4CAF0A"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                            stroke="#4CAF0A"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div style={s.filePreviewInfo}>
                        <span style={s.fileName}>{file.name}</span>
                        <span style={s.fileSize}>{formatBytes(file.size)}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        style={s.removeBtn}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 6 6 18M6 6l12 12"
                            stroke="#94a3b8"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={s.cloudIconWrap}>
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
                            stroke="#3b82f6"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 12v9M8 17l4-4 4 4"
                            stroke="#3b82f6"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p style={s.dropText}>Drag &amp; drop your files here</p>
                      <p style={s.dropHint}>or click to browse</p>
                      <p style={s.dropFormats}>
                        Supported files: Figma Link, PDF, ZIP, PNG, JPG (Max
                        10MB)
                      </p>
                    </>
                  )}
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>
                    Figma Prototype URL{" "}
                    <span style={s.optional}>(Optional)</span>
                  </label>
                  <div style={s.inputWrap}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={s.inputIcon}
                    >
                      <path
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        stroke="#9ca3af"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        stroke="#9ca3af"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      type="url"
                      placeholder="https://www.figma.com/proto/..."
                      value={figmaUrl}
                      onChange={(e) => setFigmaUrl(e.target.value)}
                      style={s.textInput}
                    />
                  </div>
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>
                    Additional Notes <span style={s.optional}>(Optional)</span>
                  </label>
                  <textarea
                    placeholder="Add any notes about your submission..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={s.textarea}
                  />
                </div>

                {submitError && (
                  <div style={s.submitErrorBox}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ flexShrink: 0 }}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#ef4444"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 8v4M12 16h.01"
                        stroke="#ef4444"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={s.submitErrorText}>{submitError}</span>
                  </div>
                )}

                <div style={s.guidelines}>
                  <p style={s.guidelinesTitle}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ marginRight: 6, verticalAlign: -2 }}
                    >
                      <path
                        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                        stroke="#4CAF0A"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Assignment Guidelines
                  </p>
                  {[
                    "Follow UI/UX best practices",
                    "Use proper spacing, typography and color system",
                    "Design should be clean, modern and user-friendly",
                    "Mobile responsive design is preferred",
                    "Include component styles and variants",
                    "Submit before the deadline",
                  ].map((item) => (
                    <div key={item} style={s.guidelineItem}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: 1 }}
                      >
                        <path
                          d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                          stroke="#4CAF0A"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M22 4 12 14.01l-3-3"
                          stroke="#4CAF0A"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span style={s.guidelineText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Nav — hidden once submitted */}
        {!submitted && <div style={s.footerNav}>
          <button style={s.prevBtn} onClick={onBack}>
            ← Previous
          </button>
          <button
            onClick={handleSubmitClick}
            disabled={!file || !selectedTask || submitting || loadingTasks}
            style={{
              ...s.submitBtn,
              opacity: file && selectedTask && !submitting && !loadingTasks ? 1 : 0.45,
              cursor:
                file && selectedTask && !submitting && !loadingTasks
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            {submitting ? (
              <>
                <div style={s.btnSpinner} />
                Submitting...
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: 6 }}
                >
                  <path
                    d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Submit Task
              </>
            )}
          </button>
        </div>}
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function TaskField({
  icon,
  label,
  children,
  iconBg = "#eff6ff",
  iconBorder = "#dbeafe",
  iconColor = "#3b82f6",
}) {
  const iconPaths = {
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  };
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg,
          border: `0.5px solid ${iconBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d={iconPaths[icon]}
            stroke={iconColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 11,
            color: "#94a3b8",
            margin: "0 0 4px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 10,
        border: "0.5px solid #e2e8f0",
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div>
        <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{label}</p>
        <p
          style={{ fontSize: 13, fontWeight: 500, color: "#0f172a", margin: 0 }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const s = {
  page: {
    background: "#f1f5f9",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  container: { maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  downloadPdfBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    background: "#4CAF0A",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  taskSelectorWrap: {
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  taskSelectorLabel: { fontSize: 13, fontWeight: 500, color: "#374151" },
  taskSelectorRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  taskSelectorBtn: {
    padding: "6px 16px",
    borderRadius: 8,
    border: "1.5px solid",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    padding: "32px 36px",
  },
  resultBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 10px",
    letterSpacing: "-0.4px",
  },
  resultSub: {
    fontSize: 14,
    color: "#64748b",
    margin: 0,
    maxWidth: 420,
    lineHeight: 1.65,
  },
  loadingWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    gap: 14,
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #4CAF0A",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { fontSize: 14, color: "#64748b", margin: 0 },
  errorWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "20px",
    background: "#fef2f2",
    borderRadius: 10,
    border: "0.5px solid #fecaca",
  },
  errorText: { fontSize: 14, color: "#dc2626", margin: 0 },
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: "0 28px",
  },
  leftPanel: { display: "flex", flexDirection: "column", gap: 18 },
  rightPanel: { display: "flex", flexDirection: "column", gap: 14 },
  divider: { background: "#e2e8f0", alignSelf: "stretch" },
  taskHeader: { display: "flex", alignItems: "center", gap: 14 },
  taskIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#0f172a",
    margin: "0 0 2px",
  },
  taskSub: { fontSize: 13, color: "#64748b", margin: 0 },
  taskFields: { display: "flex", flexDirection: "column", gap: 16 },
  fieldValue: { fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.6 },
  bulletList: {
    margin: 0,
    paddingLeft: 16,
    color: "#475569",
    fontSize: 13,
    lineHeight: 1.9,
  },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  notice: {
    background: "#eff6ff",
    borderRadius: 10,
    border: "0.5px solid #dbeafe",
    padding: "12px 14px",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  noticeText: { fontSize: 13, color: "#1d4ed8", margin: 0, lineHeight: 1.6 },
  uploadTitle: { fontSize: 17, fontWeight: 600, color: "#0f172a", margin: 0 },
  uploadSub: { fontSize: 13, color: "#64748b", margin: 0 },
  dropZone: {
    border: "2px dashed",
    borderRadius: 12,
    padding: "36px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 6,
    transition: "all 0.15s ease",
  },
  cloudIconWrap: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  dropText: { fontSize: 14, fontWeight: 500, color: "#374151", margin: 0 },
  dropHint: { fontSize: 13, color: "#94a3b8", margin: 0 },
  dropFormats: { fontSize: 12, color: "#cbd5e1", margin: "4px 0 0" },
  filePreview: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 18px",
    background: "#f0fdf4",
    borderRadius: 10,
    border: "1.5px solid #bbf7d0",
    width: "100%",
    boxSizing: "border-box",
  },
  filePreviewIcon: { flexShrink: 0 },
  filePreviewInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#166534",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileSize: { fontSize: 12, color: "#4CAF0A" },
  removeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 6 },
  fieldLabel: { fontSize: 13, fontWeight: 500, color: "#374151" },
  optional: { fontWeight: 400, color: "#94a3b8" },
  inputWrap: { position: "relative" },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
  },
  textInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "9px 12px 9px 34px",
    borderRadius: 8,
    border: "0.5px solid #d1d5db",
    fontSize: 13,
    color: "#374151",
    outline: "none",
    background: "#fff",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: 8,
    border: "0.5px solid #d1d5db",
    fontSize: 13,
    color: "#374151",
    resize: "vertical",
    minHeight: 88,
    outline: "none",
    background: "#fff",
    lineHeight: 1.5,
  },
  submitErrorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fef2f2",
    borderRadius: 8,
    border: "0.5px solid #fecaca",
    padding: "10px 12px",
  },
  submitErrorText: { fontSize: 13, color: "#dc2626" },
  guidelines: {
    background: "#f0fdf4",
    borderRadius: 10,
    border: "0.5px solid #bbf7d0",
    padding: "14px 16px",
  },
  guidelinesTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#166534",
    margin: "0 0 10px",
    display: "flex",
    alignItems: "center",
  },
  guidelineItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
  },
  guidelineText: { fontSize: 13, color: "#166534", lineHeight: 1.5 },
  footerNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
  },
  prevBtn: {
    padding: "10px 28px",
    borderRadius: 10,
    border: "1.5px solid #d1d5db",
    background: "#fff",
    color: "#374151",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 28px",
    borderRadius: 10,
    border: "none",
    background: "#4CAF0A",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.2s",
  },
  btnSpinner: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    marginRight: 8,
    animation: "spin 0.8s linear infinite",
  },

  // ── Modal styles ──
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backdropFilter: "blur(4px)",
  },
  modalBox: {
    background: "#fff",
    borderRadius: 16,
    padding: "32px 28px",
    maxWidth: 440,
    width: "90%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  modalIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 8px",
  },
  modalDesc: {
    fontSize: 14,
    color: "#64748b",
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  modalActions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
  },
  modalCancelBtn: {
    padding: "10px 32px",
    borderRadius: 8,
    border: "1.5px solid #d1d5db",
    background: "#fff",
    color: "#374151",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    flex: 1,
  },
  modalLeaveBtn: {
    padding: "10px 32px",
    borderRadius: 8,
    border: "none",
    background: "#dc2626",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    flex: 1,
  },
  modalConfirmBtn: {
    padding: "10px 32px",
    borderRadius: 8,
    border: "none",
    background: "#4CAF0A",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalFileSummary: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "8px 14px",
    width: "100%",
    boxSizing: "border-box",
    marginTop: 4,
  },
  modalFileName: {
    fontSize: 13,
    fontWeight: 500,
    color: "#166534",
    flex: 1,
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  modalFileSize: { fontSize: 12, color: "#4CAF0A", flexShrink: 0 },
};