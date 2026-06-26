// Stepper.jsx
//
// Pure, presentational horizontal stepper. Renders circles + a gray base
// line + a green progress line that fills segment by segment as steps complete.
//
// Usage:
//   <Stepper steps={flowSteps} currentIndex={2} />
//
// - Steps before currentIndex  → completed (filled green, ✓)
// - Step at currentIndex       → active (filled green, number) — pass
//                                 isLastStepDone to also show ✓ on the
//                                 final step once that screen has submitted
// - Steps after currentIndex   → upcoming (outlined gray)

import React from "react";

const GREEN = "#4CAF0A";
const GRAY_BORDER = "#9ca3af";
const GRAY_LINE = "#d1d5db";
const GRAY_TEXT = "#94a3b8";
const TEXT_DARK = "#4b5563";

const CIRCLE_SIZE = 32;

export default function Stepper({ steps, currentIndex, isLastStepDone = false }) {
  const n = steps.length;

  // progressRatio: 0 at step 0, 1 when all steps are done
  const totalSegments = n - 1;
  const completedSegments = Math.min(currentIndex, totalSegments);
  const progressRatio = totalSegments > 0 ? completedSegments / totalSegments : 0;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        marginBottom: 28,
        width: "100%",
      }}
    >
      {/* ── Gray base line — always full width, always behind everything ── */}
      <div
        style={{
          position: "absolute",
          top: CIRCLE_SIZE / 2,
          left: `calc(100% / ${n} / 2)`,
          right: `calc(100% / ${n} / 2)`,
          height: 3,
          borderRadius: 4,
          background: GRAY_LINE,
          zIndex: 0,
        }}
      />

      {/* ── Green progress line — grows left→right as steps complete ── */}
      <div
        style={{
          position: "absolute",
          top: CIRCLE_SIZE / 2,
          left: `calc(100% / ${n} / 2)`,
          // total line width = (n-1)/n * 100%; multiply by ratio for progress
          width: `calc((100% - 100% / ${n}) * ${progressRatio})`,
          height: 3,
          borderRadius: 4,
          background: GREEN,
          zIndex: 0,
          transition: "width 0.4s ease",
        }}
      />

      {/* ── Circles + labels — rendered on top of both lines ── */}
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isCurrentAndDone = isCurrent && isLastStepDone;
        const isActive = isCompleted || isCurrent;

        return (
          <div
            key={step.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                transition: "background 0.3s ease, border 0.3s ease",
                background: isActive ? GREEN : "#fff",
                border: isActive ? "none" : `2px solid ${GRAY_BORDER}`,
                color: isActive ? "#fff" : TEXT_DARK,
              }}
            >
              {isCompleted || isCurrentAndDone ? "✓" : index + 1}
            </div>
            <span
              style={{
                fontSize: 11,
                marginTop: 5,
                whiteSpace: "nowrap",
                fontWeight: isCurrent ? 600 : 400,
                color: isActive ? GREEN : GRAY_TEXT,
                transition: "color 0.3s ease",
              }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}