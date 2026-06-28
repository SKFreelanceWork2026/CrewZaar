import React, { useState, useEffect, useRef, useCallback } from "react";
import SummaryApi from "../../../common";
import taskCompleteBg from "../../../assets/images/Nojobsearchingicons/task-complete-bg.png";

const STORAGE_KEY = "communication_answers";
const TIMER_DURATION = 1 * 60;

const employeeId = sessionStorage.getItem("employee_id");
const letterToIndex = { A: 0, B: 1, C: 2, D: 3 };

export default function CommunicationAssessment({ onBack, onNext, timerExpired, onTimerRetake }) {
  const [questions, setQuestions] = useState([]);
  const [paragraph, setParagraph] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);

  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [localTimerExpired, setLocalTimerExpired] = useState(false);
  const timerRef = useRef(null);
  const answersRef = useRef({});
  const submittingRef = useRef(false);
  const submittedRef = useRef(false);

  // Define BEFORE useEffect so handleLeave can reference it
  const handleBeforeUnload = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
    return e.returnValue;
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        answersRef.current = parsed;
      } catch (_) {}
    }
  }, []);

  // Browser back button prevention
  useEffect(() => {
    if (submitted) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e) => {
      setShowLeaveAlert(true);
      setPendingNavigation(() => () => {
        window.history.back();
      });
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [submitted, handleBeforeUnload]);

  const handleLeave = () => {
    setShowLeaveAlert(false);
    setPendingNavigation(null);
    // Remove beforeunload listener first to prevent browser prompt
    window.removeEventListener("beforeunload", handleBeforeUnload);
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleStay = () => {
    setShowLeaveAlert(false);
    setPendingNavigation(null);
    window.history.pushState(null, "", window.location.href);
  };

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(SummaryApi.getCommunicationQuestions.url, {
        method: SummaryApi.getCommunicationQuestions.method,
      });
      if (!res.ok) throw new Error(`Failed to load questions: ${res.status}`);
      const json = await res.json();

      if (!json.success || !Array.isArray(json.data) || json.data.length === 0) {
        throw new Error("No questions returned from server.");
      }

      setParagraph(json.data[0].paragraph);
      setQuestions(json.data);
    } catch (err) {
      console.error(err);
      setFetchError(err.message || "Could not load questions. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const doSubmit = useCallback(async (currentAnswers, currentQuestions, isAutoSubmit = false) => {
    if (submittingRef.current || submittedRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    let correctCount = 0;
    currentQuestions.forEach((q, i) => {
      const correctIndex = letterToIndex[q.correct_answer?.toUpperCase()];
      if (currentAnswers[i] === correctIndex) correctCount++;
    });

    const payload = {
      employee_id: Number(employeeId),
      communication_score: correctCount,
      total_questions: currentQuestions.length,
    };

    try {
      const [apiRes, verificationRes] = await Promise.all([
        fetch(SummaryApi.submitCommunicationQuestions.url, {
          method: SummaryApi.submitCommunicationQuestions.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch(SummaryApi.verificationSubmission.url, {
          method: SummaryApi.verificationSubmission.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employee_id: Number(employeeId) }),
        }),
      ]);

      if (!apiRes.ok) throw new Error(`Submission failed: ${apiRes.status}`);
      if (!verificationRes.ok) throw new Error(`Verification failed: ${verificationRes.status}`);

      const verificationData = await verificationRes.json();
      if (verificationData?.verification_id) {
        sessionStorage.setItem("verification_id", String(verificationData.verification_id));
      }

      sessionStorage.removeItem(STORAGE_KEY);
      submittedRef.current = true;
      setSubmitted(true);
      if (timerRef.current) clearInterval(timerRef.current);
    } catch (err) {
      console.error(err);
      setSubmitError("Submission failed. Please try again.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading || questions.length === 0 || submitted) return;

    setTimeLeft(TIMER_DURATION);
    setLocalTimerExpired(false);
    setHasAutoSubmitted(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          
          const currentAnswers = answersRef.current;
          const answeredCount = Object.keys(currentAnswers).length;
          const hasAtLeastOne = answeredCount > 0;

          console.log("Timer expired - Answers:", currentAnswers, "Count:", answeredCount);

          if (hasAtLeastOne && !submittedRef.current && !hasAutoSubmitted) {
            console.log("Auto-submitting with answers");
            setHasAutoSubmitted(true);
            doSubmit(currentAnswers, questions, true);
          } else if (!hasAtLeastOne && !submittedRef.current) {
            console.log("No answers - showing retake");
            setLocalTimerExpired(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isLoading, questions, submitted, doSubmit, hasAutoSubmitted]);

  const handleSelect = (qIndex, optIndex) => {
    if (submitted || timerExpired || localTimerExpired) return;
    setAnswers((prev) => {
      const updated = { ...prev, [qIndex]: optIndex };
      answersRef.current = updated;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!allAnswered || isSubmitting || timerExpired || localTimerExpired) return;
    await doSubmit(answersRef.current, questions);
  };

  const handleRetake = () => {
    setAnswers({});
    answersRef.current = {};
    sessionStorage.removeItem(STORAGE_KEY);
    setLocalTimerExpired(false);
    setSubmitted(false);
    submittedRef.current = false;
    setIsSubmitting(false);
    submittingRef.current = false;
    setSubmitError(null);
    setHasAutoSubmitted(false);
    if (onTimerRetake) onTimerRetake();
    fetchQuestions();
  };

  // NEW: Handle Proceed with API call - Same as VerificationProcess
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
          pending_task: "verification_complete",
          wizard_step: 4,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update session storage
        sessionStorage.setItem("wizardStep", "4");
        sessionStorage.setItem("verification_screen", "verification_complete");
        
        // Dispatch events for listeners
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("wizardStepChange"));

        // Navigate to verification complete page or dashboard
        // Option 1: Use onNext if it navigates to the complete page
        if (onNext) {
          onNext();
        } else {
          // Option 2: Navigate directly to dashboard
          window.location.href = "/";
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

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = questions.length > 0 && totalAnswered === questions.length;
  const getOptions = (q) => [q.option_a, q.option_b, q.option_c, q.option_d];

  const isTimerExpired = timerExpired || localTimerExpired;

  const showRetakeScreen = isTimerExpired && !submitted && !hasAutoSubmitted && Object.keys(answersRef.current).length === 0;

  if (isLoading) {
    return (
      <div style={styles.page}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #e2e8f0", borderTop: "3px solid #4CAF0A", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>Loading assessment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && fetchError) {
    return (
      <div style={styles.page}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "48px 40px", textAlign: "center", maxWidth: 400 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <p style={{ color: "#b91c1c", marginBottom: 24 }}>{fetchError}</p>
            <button onClick={() => fetchQuestions()} style={{ background: "#4CAF0A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, cursor: "pointer" }}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Leave Alert Modal */}
      {showLeaveAlert && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalIcon}>⚠️</div>
            <h3 style={styles.modalTitle}>Leave Assessment?</h3>
            <p style={styles.modalDesc}>
              Warning: Cheating may help you get a score, but it will not get you success. 
              This assessment is designed to measure your real abilities. Any changes that 
              you made may not be saved.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancelBtn} onClick={handleStay}>
                Cancel
              </button>
              <button style={styles.modalLeaveBtn} onClick={handleLeave}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "16px 16px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h1 style={styles.title}>Communication Assessment</h1>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          {/* ONLY show retake screen when timer expired, NOT submitted, NOT auto-submitted, AND no answers */}
          {showRetakeScreen && (
            <div style={{ padding: "40px 28px", textAlign: "center", borderBottom: "1px solid #fecaca", background: "#fef2f2" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏰</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#dc2626", margin: "0 0 8px" }}>Time's Up!</h3>
              <p style={{ fontSize: 14, color: "#7f1d1d", margin: 0 }}>
                You didn't answer any questions. Click <strong>Retake Test</strong> below to try again.
              </p>
              <button
                onClick={handleRetake}
                style={{
                  marginTop: 16,
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Retake Test
              </button>
            </div>
          )}

          {/* Show completion screen when submitted OR auto-submitted */}
          {(submitted || hasAutoSubmitted) && (
            <div style={{
              backgroundImage: `url(${taskCompleteBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              padding: "230px 40px 40px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              position: "relative",
              borderRadius: 16,
            }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#0f172a",
                margin: "0 0 10px",
                letterSpacing: "-0.4px",
              }}>
                Assessment Completed! 🎉
              </h2>

              <p style={{
                fontSize: 14,
                color: "#64748b",
                margin: "0 0 22px",
                lineHeight: 1.65,
                maxWidth: 420,
              }}>
                Great job! Our team will review your communication assessment.<br />
                We'll be in touch soon.
              </p>

              {submitError && <div style={styles.errorBox}>{submitError}</div>}

              <button
                onClick={handleProceed}
                disabled={isUpdatingTask}
                style={{
                  background: isUpdatingTask ? "#94a3b8" : "#4CAF0A",
                  color: "#fff",
                  border: "none",
                  borderRadius: 50,
                  padding: "14px 0",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: isUpdatingTask ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginBottom: 14,
                  width: "35%",
                  opacity: isUpdatingTask ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isUpdatingTask) {
                    e.currentTarget.style.background = "#3d9e08";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUpdatingTask) {
                    e.currentTarget.style.background = "#4CAF0A";
                  }
                }}
              >
                {isUpdatingTask ? (
                  <>
                    <span style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #fff",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    Updating...
                  </>
                ) : (
                  <>
                    Proceed to Complete <span style={{ fontSize: 17 }}>→</span>
                  </>
                )}
              </button>

              <div style={{
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
              }}>
                <div style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "1.5px solid #4CAF0A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  flexShrink: 0,
                }}>
                  👍
                </div>
                You're one step closer to completion!
              </div>
            </div>
          )}

          {/* Show questions when timer is NOT expired and NOT submitted and NOT auto-submitted */}
          {!isTimerExpired && !submitted && !hasAutoSubmitted && (
            <>
              <div style={styles.cardHeader}>
                <div>
                  <h2 style={styles.cardTitle}>Communication Assessment</h2>
                  <p style={styles.cardSub}>Read the passage and answer the {questions.length} questions below</p>
                </div>
                <div style={styles.progressBox}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                    <span>Progress</span>
                    <span style={{ color: "#4CAF0A" }}>{totalAnswered}/{questions.length}</span>
                  </div>
                  <div style={{ height: 6, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: questions.length ? `${(totalAnswered / questions.length) * 100}%` : "0%", background: allAnswered ? "#4CAF0A" : "#94a3b8", borderRadius: 4, transition: "width 0.3s ease" }} />
                  </div>
                </div>
              </div>

              <div style={styles.body}>
                {paragraph && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={styles.scenarioLabel}>Read the following passage carefully:</p>
                    <div style={styles.scenarioBox}>
                      <p style={styles.scenarioText}>{paragraph}</p>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <p style={styles.scenarioLabel}>Answer the following {questions.length} questions:</p>
                  {questions.map((q, qIndex) => (
                    <div key={q.communication_id} style={styles.questionBlock}>
                      <p style={styles.questionText}>
                        <span style={styles.questionNum}>{qIndex + 1}.</span> {q.question}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {getOptions(q).map((opt, optIndex) => {
                          const isSelected = answers[qIndex] === optIndex;
                          return (
                            <div
                              key={optIndex}
                              onClick={() => handleSelect(qIndex, optIndex)}
                              style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "10px 14px", borderRadius: 8,
                                background: isSelected ? "#f0fdf4" : "#f8fafc",
                                border: `1.5px solid ${isSelected ? "#4CAF0A" : "#e2e8f0"}`,
                                cursor: isTimerExpired ? "not-allowed" : "pointer",
                                transition: "all 0.15s",
                                opacity: isTimerExpired ? 0.5 : 1,
                                userSelect: "none",
                              }}
                            >
                              <div style={{
                                width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                                border: isSelected ? "5px solid #4CAF0A" : "2px solid #cbd5e1",
                                background: "#fff", boxSizing: "border-box", transition: "border 0.15s",
                              }} />
                              <span style={{ fontSize: 13, color: isSelected ? "#166534" : "#374151" }}>{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.tip}>
                  <span style={{ fontWeight: 700 }}>Tip:</span> Read the passage carefully before answering.
                  All answers are based on the passage above. You must answer all {questions.length} questions to submit.
                </div>
              </div>

              <div style={styles.footer}>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", flex: 1 }}>
                  {isSubmitting
                    ? "⏳ Submitting results…"
                    : !allAnswered
                    ? `${questions.length - totalAnswered} question${questions.length - totalAnswered > 1 ? "s" : ""} remaining`
                    : "All questions answered ✓"}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting || isTimerExpired}
                  style={{
                    background: allAnswered && !isTimerExpired ? "#4CAF0A" : "#e2e8f0",
                    color: allAnswered && !isTimerExpired ? "#fff" : "#94a3b8",
                    border: "none", borderRadius: 10, padding: "12px 28px",
                    fontSize: 15, fontWeight: 600,
                    cursor: allAnswered && !isSubmitting && !isTimerExpired ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: 8,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (allAnswered && !isSubmitting && !isTimerExpired) e.currentTarget.style.background = "#3d9e08"; }}
                  onMouseLeave={(e) => { if (allAnswered && !isTimerExpired) e.currentTarget.style.background = "#4CAF0A"; }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                      Submitting...
                    </>
                  ) : "Submit →"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {background: "#f1f5f9", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" },
  title: { fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.5px" },
  card: { background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" },
  cardHeader: { padding: "24px 28px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" },
  cardTitle: { fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" },
  cardSub: { fontSize: 13, color: "#64748b", margin: 0 },
  progressBox: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "10px 16px", minWidth: 160 },
  body: { padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 },
  scenarioLabel: { fontSize: 14, fontWeight: 600, color: "#1e293b", margin: 0 },
  scenarioBox: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px" },
  scenarioText: { fontSize: 14, color: "#374151", margin: 0, lineHeight: 1.6 },
  questionBlock: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 },
  questionText: { fontSize: 14, color: "#1e293b", margin: 0, fontWeight: 500, lineHeight: 1.5 },
  questionNum: { color: "#4CAF0A", fontWeight: 700, marginRight: 4 },
  tip: { background: "#fefce8", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#92400e", lineHeight: 1.5 },
  errorBox: { background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#b91c1c", width: "100%" },
  footer: { padding: "20px 28px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  // Modal styles
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
};