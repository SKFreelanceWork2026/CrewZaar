// stepperConfig.js
//
// Single source of truth for the wizard's step labels.
// EmployeeWizard's `step` state (0-5) maps to a position in one of two
// flows depending on the employee's role. Each screen just asks
// "what's my flow, and where am I in it?" instead of hardcoding it.

// Roles that go through TaskUpload instead of VerificationProcess (Skill Test)
export const TASK_UPLOAD_ROLES = ["UI/UX Designer", "Graphic Designer"];

// wizardStep values:
// 0 = ChooseRole, 1 = ProfileSection, 2 = VerificationProcess/TaskUpload,
// 3 = CommunicationAssessment, 4 = DocumentsAndInterview, 5 = Complete

export const VERIFICATION_FLOW_STEPS = [
  { label: "Skill Test", wizardStep: 2 },
  { label: "Communication", wizardStep: 3 },
  { label: "Documents & Interview", wizardStep: 4 },
  { label: "Complete", wizardStep: 5 },
];

export const TASK_FLOW_STEPS = [
  { label: "Task Submission", wizardStep: 2 },
  { label: "Communication", wizardStep: 3 },
  { label: "Documents & Interview", wizardStep: 4 },
  { label: "Complete", wizardStep: 5 },
];

/**
 * Returns the correct step list for the current role.
 * Falls back to the "verification_screen" flag (set by EmployeeWizard)
 * if role lookup isn't available, so screens deep in the flow still
 * show the right list even if role changes mid-session.
 */
export function getFlowSteps(role) {
  const flag = (() => {
    try { return sessionStorage.getItem("verification_screen"); } catch { return null; }
  })();

  // BEFORE: flag === "task"  ← never matched "taskupload"
  // AFTER:
  if (flag === "taskupload" || flag === "task" || flag === "communication") {
    return TASK_FLOW_STEPS;
  }
  if (flag === "verification") {
    return VERIFICATION_FLOW_STEPS;
  }

  return TASK_UPLOAD_ROLES.includes(role)
    ? TASK_FLOW_STEPS
    : VERIFICATION_FLOW_STEPS;
}

/**
 * Maps the wizard's global `step` (0-5) to an index within the
 * resolved flow's steps array. Used by each screen to tell <Stepper />
 * which circle is "current".
 */
export function getCurrentFlowIndex(steps, wizardStep) {
  const idx = steps.findIndex((s) => s.wizardStep === wizardStep);
  return idx === -1 ? 0 : idx;
}