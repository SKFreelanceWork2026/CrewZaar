import React, { useState, useEffect, useRef, useCallback } from "react";
import SummaryApi from "../../../common";
import taskCompleteBg from "../../../assets/images/Nojobsearchingicons/task-complete-bg.png";

const STORAGE_KEY = "assessment_answers";
const SUBMITTED_KEY = "assessment_submitted";
const AUTO_SUBMITTED_KEY = "assessment_auto_submitted";
const TIMER_DURATION = 1 * 60;

export default function VerificationProcess({ onBack, onNext, timerExpired, onTimerRetake }) {
  const [questions, setQuestions] = useState([]);
  const isLeavingRef = useRef(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(() => {
    return sessionStorage.getItem(SUBMITTED_KEY) === "true";
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(() => {
    return sessionStorage.getItem(AUTO_SUBMITTED_KEY) === "true";
  });
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);

  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [localTimerExpired, setLocalTimerExpired] = useState(false);
  const timerRef = useRef(null);
  const answersRef = useRef({});
  const submittingRef = useRef(false);
  const submittedRef = useRef(false);
  const hasAutoSubmittedRef = useRef(
    sessionStorage.getItem(AUTO_SUBMITTED_KEY) === "true"
  );

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

    const handlePopState = () => {
      if (isLeavingRef.current) {
        return;
      }

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
    isLeavingRef.current = true;

    setShowLeaveAlert(false);

    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("popstate", handlePopState);

    if (pendingNavigation) {
      setPendingNavigation(null);

      sessionStorage.clear();

      window.history.back();
    } else {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  const handleStay = () => {
    setShowLeaveAlert(false);
    setPendingNavigation(null);
    window.history.pushState(null, "", window.location.href);
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const role = sessionStorage.getItem("employee_role");

      if (!role) {
        setLoading(false);
        return;
      }

      const response = await fetch(SummaryApi.getEmployeeQuestionsByRole.url, {
        method: SummaryApi.getEmployeeQuestionsByRole.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const result = await response.json();

      if (response.ok && result?.data) {
        const formatted = result.data.map((item) => ({
          id: String(item.assessment_id),
          question: item.question,
          options: [item.option_a, item.option_b, item.option_c, item.option_d],
          correctAnswer: item.correct_answer,
          answerIndex: ["A", "B", "C", "D"].indexOf(item.correct_answer),
        }));
        setQuestions(formatted);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const doSubmit = useCallback(async (currentAnswers, currentQuestions, isAutoSubmit = false) => {
    if (submittingRef.current || submittedRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);

    const correctAnswers = currentQuestions.filter(
      (q) => currentAnswers[String(q.id)] === q.answerIndex,
    ).length;

    const employeeId = sessionStorage.getItem("employee_id");
    const role = sessionStorage.getItem("employee_role");
    const payload = {
      employee_id: Number(employeeId),
      role: role,
      correct_answers: correctAnswers,
    };

    try {
      const response = await fetch(SummaryApi.questionsSubmission.url, {
        method: SummaryApi.questionsSubmission.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.removeItem(STORAGE_KEY);
        submittedRef.current = true;
        setSubmitted(true);
        sessionStorage.setItem(SUBMITTED_KEY, "true");
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        alert(result?.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Network error. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (loading || questions.length === 0 || submitted) return;

    setTimeLeft(TIMER_DURATION);
    setLocalTimerExpired(false);
    setHasAutoSubmitted(false);
    hasAutoSubmittedRef.current = false;
    sessionStorage.removeItem(AUTO_SUBMITTED_KEY);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          
          const currentAnswers = answersRef.current;
          const answeredCount = Object.keys(currentAnswers).length;
          const hasAtLeastOne = answeredCount > 0;

          console.log("Timer expired - Answers:", currentAnswers, "Count:", answeredCount);

          if (hasAtLeastOne && !submittedRef.current && !hasAutoSubmittedRef.current) {
            console.log("Auto-submitting with answers");
            hasAutoSubmittedRef.current = true;
            setHasAutoSubmitted(true);
            sessionStorage.setItem(AUTO_SUBMITTED_KEY, "true");
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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, questions, submitted, doSubmit]);

  const handleSelect = (questionId, optionIndex) => {
    if (submitted || timerExpired || localTimerExpired) return;
    const key = String(questionId);
    setAnswers((prev) => {
      const updated = { ...prev, [key]: optionIndex };
      answersRef.current = updated;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!allAnswered || submitting || timerExpired || localTimerExpired) return;
    await doSubmit(answersRef.current, questions);
  };

  const handleRetake = () => {
    setAnswers({});
    answersRef.current = {};
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SUBMITTED_KEY);
    sessionStorage.removeItem(AUTO_SUBMITTED_KEY);
    setLocalTimerExpired(false);
    setSubmitted(false);
    submittedRef.current = false;
    setSubmitting(false);
    submittingRef.current = false;
    setHasAutoSubmitted(false);
    hasAutoSubmittedRef.current = false;
    if (onTimerRetake) onTimerRetake();
    fetchQuestions();
  };

  // NEW: Handle Proceed with API call
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
        // Update session storage
        sessionStorage.setItem("wizardStep", "3");
        sessionStorage.setItem("verification_screen", "communication");
        
        // Dispatch events for listeners
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("wizardStepChange"));

        // Navigate to dashboard
        window.location.href = "/";
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

  const allAnswered =
    questions.length > 0 &&
    questions.every((q) => answers[String(q.id)] !== undefined);

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length
    ? Math.round((answeredCount / questions.length) * 100)
    : 0;

  const isTimerExpired = timerExpired || localTimerExpired;

  const showRetakeScreen = isTimerExpired && !submitted && !hasAutoSubmittedRef.current
    && Object.keys(answersRef.current).length === 0;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 16px",
          background: "#f8fafc",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #4CAF0A",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
            Loading assessment...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!loading && questions.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "48px 40px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            maxWidth: 400,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h2 style={{ color: "#1e293b", marginBottom: 8, fontSize: 20 }}>
            No Questions Found
          </h2>
          <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 24px" }}>
            No assessment questions are available for your role.
          </p>
          <button
            onClick={onBack}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              color: "#475569",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        paddingTop: "16px",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>

      {/* Leave Alert Modal */}
      {showLeaveAlert && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.box}>
            <div style={modalStyles.icon}>⚠️</div>
            <h3 style={modalStyles.title}>Leave Assessment?</h3>
            <p style={modalStyles.desc}>
              Warning: Cheating may help you get a score, but it will not get you success. 
              This assessment is designed to measure your real abilities. Any changes that 
              you made may not be saved.
            </p>
            <div style={modalStyles.actions}>
              <button style={modalStyles.cancelBtn} onClick={handleStay}>
                Cancel
              </button>
              <button style={modalStyles.leaveBtn} onClick={handleLeave}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px 80px" }}>
        {/* Warning Banner */}
        {!submitted && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>
              ⚠️
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#92400e",
                lineHeight: 1.6,
              }}
            >
              <strong>Warning:</strong> Cheating may help you get a score, but
              it will not get you success. This assessment is designed to
              measure your real abilities. Any use of{" "}
              <strong>
                AI tools or external assistance is strictly prohibited.
              </strong>
            </p>
          </div>
        )}

        {/* Main Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* ONLY show retake screen when timer expired, NOT submitted, NOT auto-submitted, AND no answers */}
          {showRetakeScreen && (
            <div
              style={{
                padding: "40px 28px",
                textAlign: "center",
                borderBottom: "1px solid #fecaca",
                background: "#fef2f2",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏰</div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#dc2626",
                  margin: "0 0 8px",
                }}
              >
                Time's Up!
              </h3>
              <p style={{ fontSize: 14, color: "#7f1d1d", margin: 0 }}>
                You didn't answer any questions. Click{" "}
                <strong>Retake Test</strong> below to try again.
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
            <div
              style={{
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
              }}
            >
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "0 0 10px",
                  letterSpacing: "-0.4px",
                }}
              >
                Assessment Completed! 🎉
              </h2>

              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  margin: "0 0 22px",
                  lineHeight: 1.65,
                  maxWidth: 420,
                }}
              >
                Great job! Our team will review your skill test results.<br />
                We'll be in touch soon.
              </p>

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
                    Proceed to Continue <span style={{ fontSize: 17 }}>→</span>
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
          )}

          {/* Show questions when timer is NOT expired and NOT submitted and NOT auto-submitted */}
          {!isTimerExpired && !submitted && !hasAutoSubmitted && (
            <>
              <div
                style={{
                  padding: "24px 28px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "0 0 2px",
                    }}
                  >
                    Skill Test
                  </h2>
                  <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
                    Answer all questions based on your role
                  </p>
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "10px 16px",
                    minWidth: 160,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    <span>Progress</span>
                    <span style={{ color: "#4CAF0A" }}>
                      {answeredCount}/{questions.length}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#e2e8f0",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background: "#4CAF0A",
                        borderRadius: 4,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ padding: "8px 28px" }}>
                {questions.map((q, qIndex) => (
                  <div
                    key={q.id}
                    style={{
                      padding: "24px 0",
                      borderBottom:
                        qIndex < questions.length - 1
                          ? "1px solid #f1f5f9"
                          : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#1e293b",
                        margin: "0 0 14px",
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          background: "#f0fdf4",
                          color: "#4CAF0A",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          marginRight: 10,
                          flexShrink: 0,
                          verticalAlign: "middle",
                        }}
                      >
                        {qIndex + 1}
                      </span>
                      {q.question}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                        paddingLeft: 36,
                      }}
                    >
                      {q.options.map((opt, oi) => {
                        const selected = answers[String(q.id)] === oi;
                        const optionLabels = ["A", "B", "C", "D"];
                        return (
                          <button
                            key={oi}
                            onClick={() => handleSelect(q.id, oi)}
                            disabled={isTimerExpired}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "11px 14px",
                              background: selected ? "#f0fdf4" : "#fafafa",
                              border: `1.5px solid ${selected ? "#4CAF0A" : "#e2e8f0"}`,
                              borderRadius: 10,
                              cursor: isTimerExpired
                                ? "not-allowed"
                                : "pointer",
                              textAlign: "left",
                              fontSize: 14,
                              color: selected ? "#16a34a" : "#374151",
                              fontWeight: selected ? 600 : 400,
                              transition: "all 0.15s ease",
                              width: "100%",
                              opacity: isTimerExpired ? 0.5 : 1,
                            }}
                            onMouseEnter={(e) => {
                              if (!selected && !isTimerExpired)
                                e.currentTarget.style.borderColor = "#94a3b8";
                            }}
                            onMouseLeave={(e) => {
                              if (!selected && !isTimerExpired)
                                e.currentTarget.style.borderColor = "#e2e8f0";
                            }}
                          >
                            <span
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                border: `2px solid ${selected ? "#4CAF0A" : "#cbd5e1"}`,
                                background: selected
                                  ? "#4CAF0A"
                                  : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 10,
                                fontWeight: 700,
                                color: selected ? "#fff" : "#94a3b8",
                                flexShrink: 0,
                                transition: "all 0.15s ease",
                              }}
                            >
                              {selected ? "✓" : optionLabels[oi]}
                            </span>
                            <span style={{ lineHeight: 1.4 }}>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "20px 28px",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>
                  {submitting
                    ? "⏳ Submitting results…"
                    : questions.length - answeredCount > 0
                      ? `${questions.length - answeredCount} question${questions.length - answeredCount > 1 ? "s" : ""} remaining`
                      : "All questions answered ✓"}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered || submitting || isTimerExpired}
                  style={{
                    background:
                      allAnswered && !isTimerExpired
                        ? "#4CAF0A"
                        : "#e2e8f0",
                    color:
                      allAnswered && !isTimerExpired ? "#fff" : "#94a3b8",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor:
                      allAnswered && !submitting && !isTimerExpired
                        ? "pointer"
                        : "not-allowed",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: submitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (allAnswered && !submitting && !isTimerExpired)
                      e.currentTarget.style.background = "#3d9e08";
                  }}
                  onMouseLeave={(e) => {
                    if (allAnswered && !isTimerExpired)
                      e.currentTarget.style.background = "#4CAF0A";
                  }}
                >
                  {submitting ? (
                    <>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTop: "2px solid #fff",
                          borderRadius: "50%",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit & Continue →"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backdropFilter: "blur(4px)",
  },
  box: {
    background: "#fff",
    borderRadius: 16,
    padding: "32px 28px",
    maxWidth: 440,
    width: "90%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 8px",
  },
  desc: {
    fontSize: 14,
    color: "#64748b",
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
  },
  cancelBtn: {
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
  leaveBtn: {
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