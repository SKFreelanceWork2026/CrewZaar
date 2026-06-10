import { useState, useEffect } from "react";
import SummaryApi from "../../../common"; // adjust path if needed

const ROLES = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "UI/UX Designer", "DevOps Engineer", "Data Scientist",
  "Product Manager", "Mobile Developer",
];
const EXPERIENCE     = ["0–1 years", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
const NOTICE_PERIODS = ["Immediate", "2 weeks", "1 month", "2 months", "3 months"];
const WORK_MODES     = ["Remote", "On-site", "Hybrid"];
const FIELDS         = ["fullName", "role", "skills", "experience", "company", "noticePeriod", "workMode"];
const FIELD_LABELS   = {
  fullName: "Full Name", role: "Primary Role", skills: "Skills",
  experience: "Years of Experience", company: "Previous Company",
  noticePeriod: "Notice Period", workMode: "Preferred Work Mode",
};
const VERIFICATION_STEPS = [
  { id: 1, title: "Step 1: Skill Test",        desc: "Complete skill-based assessment", icon: "📄" },
  { id: 2, title: "Step 2: Task Submission",    desc: "Upload practical assignment",     icon: "⏱"  },
  { id: 3, title: "Step 3: Communication Test", desc: "Assess communication skills",     icon: "💬" },
];
const EMPTY_FORM = {
  fullName: "", role: "", skills: "", experience: "",
  company: "", noticePeriod: "", workMode: "",
};

export default function JobProfileDashboard() {
  // ── Member info read from wherever it was stored ──────────────────────────
  const [memberTypeId,   setMemberTypeId]   = useState(null);
  const [memberTypeName, setMemberTypeName] = useState("");

  const [profileImage,  setProfileImage]  = useState(null);
  const [form,          setForm]          = useState({ ...EMPTY_FORM });
  const [savedProfile,  setSavedProfile]  = useState(null);
  const [viewMode,      setViewMode]      = useState("form"); // "form" | "profile"
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [toast,         setToast]         = useState({ show: false, msg: "" });
  const [isSaving,      setIsSaving]      = useState(false);
  const [isLoading,     setIsLoading]     = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ── Step 1: Read member_type_id from wherever it was stored ───────────────
  // Tries 3 common patterns in order. Remove the ones you don't use.
  useEffect(() => {
    // PATTERN A — localStorage key "memberType" (most common web pattern)
    try {
      const raw = localStorage.getItem("memberType");
      if (raw) {
        const parsed = JSON.parse(raw); // { member_type_id: 2, member_type_name: "Employee" }
        setMemberTypeId(parsed.member_type_id);
        setMemberTypeName(parsed.member_type_name);
        console.log("✅ [memberType] loaded from localStorage:", parsed);
        return;
      }
    } catch (e) {
      console.warn("memberType localStorage parse failed:", e.message);
    }

    // PATTERN B — stored directly as "member_type_id" key
    try {
      const id   = localStorage.getItem("member_type_id");
      const name = localStorage.getItem("member_type_name");
      if (id) {
        setMemberTypeId(Number(id));
        setMemberTypeName(name || "");
        console.log("✅ [memberType] loaded from flat localStorage keys:", { id, name });
        return;
      }
    } catch (e) {
      console.warn("flat localStorage parse failed:", e.message);
    }

    // PATTERN C — stored inside a "user" object
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.member_type_id) {
          setMemberTypeId(parsed.member_type_id);
          setMemberTypeName(parsed.member_type_name || "");
          console.log("✅ [memberType] loaded from user object:", parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("user localStorage parse failed:", e.message);
    }

    console.warn("⚠️ member_type_id not found in localStorage — check where you store it");
  }, []);

  // ── Step 2: Fetch existing profile from real DB ───────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.group("📥 [FetchProfile] Loading profile from API");
        const response = await fetch(SummaryApi.EmployeeCreate.url, {
          method:      "POST",
        });
        console.log("Status:", response.status);
        if (response.ok) {
          const result = await response.json();
          console.log("Profile data:", result);
          if (result?.data) {
            const d = result.data;
            const profile = {
              fullName:     d.full_name           || "",
              role:         d.role                || "",
              skills:       d.skills              || "",
              experience:   d.experience          || "",
              company:      d.company             || "",
              noticePeriod: d.notice_period       || "",
              workMode:     d.preferred_work_mode || "",
            };
            setForm(profile);
            setSavedProfile(profile);
            setViewMode("profile");
          }
        }
        console.groupEnd();
      } catch (err) {
        console.warn("No existing profile or fetch failed:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  };

  const progress = Math.round(
    (FIELDS.filter((f) => form[f] && form[f].trim() !== "").length / FIELDS.length) * 100
  );

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  // ── Save / Create profile → real DB only ──────────────────────────────────
  const handleSave = async () => {
    if (!form.fullName.trim()) { showToast("Please enter your full name"); return; }

    // Guard: member_type_id must be available before saving
    if (!memberTypeId) {
      showToast("Session error: member type not found. Please log in again.");
      console.error("❌ member_type_id is null — cannot save profile");
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("member_type_id",       memberTypeId);          // ✅ from localStorage
      formData.append("full_name",            form.fullName);
      formData.append("role",                 form.role);
      formData.append("skills",               form.skills);
      formData.append("experience",           form.experience);
      formData.append("company",              form.company);
      formData.append("notice_period",        form.noticePeriod);
      formData.append("preferred_work_mode",  form.workMode);
      if (profileImage) formData.append("profile_image", profileImage);

      // ── DEBUG: log exactly what is being sent ──
      console.group("📤 [EmployeeCreate] Sending request");
      console.log("🌐 URL          :", SummaryApi.EmployeeCreate.url);
      console.log("📡 Method       :", SummaryApi.EmployeeCreate.method);
      console.log("🪪 member_type_id:", memberTypeId, `(${memberTypeName})`);
      console.log("📦 Full payload :");
      for (const [key, val] of formData.entries()) {
        if (val instanceof File)
          console.log(`   ${key}: File → name="${val.name}" size=${val.size}b type=${val.type}`);
        else
          console.log(`   ${key}:`, val || "(empty)");
      }
      console.groupEnd();

      console.time("⏱ API response time");
      const response = await fetch(SummaryApi.EmployeeCreate.url, {
        method:      SummaryApi.EmployeeCreate.method,
        body:        formData,
      });
      console.timeEnd("⏱ API response time");

      console.group("📥 [EmployeeCreate] Response");
      console.log("✅ Status :", response.status, response.statusText);
      console.log("📬 OK?    :", response.ok);
      const result = await response.json();
      console.log("📋 Body   :", result);
      console.groupEnd();

      if (!response.ok) {
        console.error("❌ Server error:", result.message);
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      console.log("🎉 Profile saved to real DB!", result);
      setSavedProfile({ ...form });
      setViewMode("profile");
      showToast("Profile created successfully ✓");

    } catch (error) {
      console.error("❌ [EmployeeCreate] FAILED:", error.message);
      showToast(error.message || "Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete profile from real DB ───────────────────────────────────────────
  const handleDeleteProfile = async () => {
    try {
      console.group("🗑️ [DeleteProfile] Sending request");
      const response = await fetch(SummaryApi.EmployeeCreate.url, {
        method:      "DELETE",
      });
      console.log("Status:", response.status);
      const result = await response.json();
      console.log("Server Response:", text);
      console.log("Body:", result);
      console.groupEnd();

      if (!response.ok) throw new Error(result.message || "Delete failed");

      setForm({ ...EMPTY_FORM });
      setSavedProfile(null);
      setViewMode("form");
      setVerificationStarted(false);
      setProfileImage(null);
      setShowDeleteConfirm(false);
      showToast("Profile deleted successfully");
    } catch (error) {
      console.error("❌ [DeleteProfile] FAILED:", error.message);
      showToast(error.message || "Failed to delete profile.");
      setShowDeleteConfirm(false);
    }
  };

  // ── Loading screen ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "'DM Sans', sans-serif",
        background: "#f2f5f1", flexDirection: "column", gap: 14,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="#4CAF0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "spin 0.8s linear infinite" }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
        <p style={{ color: "#7a8a7a", fontSize: 14 }}>Loading your profile...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .jpd-root{font-family:'DM Sans',-apple-system,sans-serif;background:#f2f5f1;min-height:100vh;padding-bottom:56px}
        .jpd-topbar{height:4px;background:linear-gradient(90deg,#4CAF0A,#56c478);width:100%}
        .jpd-hdr{text-align:center;padding:32px 20px 18px}
        .jpd-hdr h1{font-size:24px;font-weight:600;color:#1a1f1a;letter-spacing:-0.3px}
        .jpd-hdr p{font-size:14px;color:#7a8a7a;margin-top:5px}
        .jpd-member-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#7a8a7a;margin-top:8px;background:#eafaf0;border:1px solid #b0d4b8;padding:3px 12px;border-radius:999px}
        .jpd-member-badge span{color:#1e7a39;font-weight:600}
        .jpd-wrap{max-width:1080px;margin:0 auto;padding:0 20px}
        .jpd-prog{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.3rem 1.6rem;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-prog-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
        .jpd-prog-top h2{font-size:15px;font-weight:600;color:#1a1f1a}
        .jpd-prog-top p{font-size:13px;color:#9aaa9a;margin-top:3px}
        .jpd-pct{font-size:26px;font-weight:600;color:#4CAF0A}
        .jpd-bar-bg{background:#e5ebe5;border-radius:999px;height:9px;overflow:hidden}
        .jpd-bar-fill{background:linear-gradient(90deg,#4CAF0A,#56c478);height:100%;border-radius:999px;transition:width .6s cubic-bezier(.4,0,.2,1)}
        .jpd-grid{display:grid;grid-template-columns:1fr 310px;gap:20px;align-items:start}
        .jpd-card{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.6rem 1.8rem;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-card h2{font-size:18px;font-weight:600;color:#1a1f1a;margin-bottom:1.4rem;letter-spacing:-0.2px}
        .jpd-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .jpd-field{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
        .jpd-field label{font-size:13px;font-weight:500;color:#5a6a5a}
        .jpd-field input,.jpd-field select{border:1.5px solid #dde5dd;border-radius:9px;padding:10px 13px;font-size:14px;font-family:'DM Sans',sans-serif;background:#fafcfa;color:#1a1f1a;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none;-webkit-appearance:none}
        .jpd-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aaa9a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;padding-right:36px}
        .jpd-field input:focus,.jpd-field select:focus{border-color:#4CAF0A;box-shadow:0 0 0 3px rgba(76,175,10,.12);background:#fff}
        .jpd-field input::placeholder{color:#b8c8b8}
        .jpd-field input[type="file"]{padding:7px 13px;cursor:pointer}
        .jpd-btn-green{background:#4CAF0A;color:#fff;border:none;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 8px rgba(76,175,10,.25);transition:background .15s,transform .1s}
        .jpd-btn-green:hover{background:#3d9808}
        .jpd-btn-green:active{transform:scale(.98)}
        .jpd-btn-outline{background:transparent;color:#1a1f1a;border:1.5px solid #dde5dd;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,border-color .15s}
        .jpd-btn-outline:hover{background:#f4f7f4;border-color:#b0d4b8}
        .jpd-btn-delete{background:transparent;color:#e24b4a;border:1.5px solid #f5c6c6;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,border-color .15s}
        .jpd-btn-delete:hover{background:#fff5f5;border-color:#e24b4a}
        .jpd-btn-delete-confirm{background:#e24b4a;color:#fff;border:none;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,transform .1s}
        .jpd-btn-delete-confirm:hover{background:#c73a39}
        .jpd-btn-delete-confirm:active{transform:scale(.98)}
        .jpd-btn-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
        .jpd-delete-banner{background:#fff5f5;border:1.5px solid #f5c6c6;border-radius:10px;padding:14px 16px;margin-top:16px;display:flex;flex-direction:column;gap:10px}
        .jpd-delete-banner p{font-size:13px;color:#c73a39;font-weight:500}
        .jpd-delete-banner-btns{display:flex;gap:10px}
        .jpd-pv-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f0f4f0}
        .jpd-pv-row:last-child{border-bottom:none}
        .jpd-pv-label{font-size:13px;color:#7a8a7a}
        .jpd-pv-val{font-size:14px;font-weight:500;color:#1a1f1a;text-align:right;max-width:65%}
        .jpd-pv-empty{color:#b8c8b8;font-weight:400}
        .jpd-right{display:flex;flex-direction:column;gap:18px}
        .jpd-right-card{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.25rem 1.4rem;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-right-card h2{font-size:15px;font-weight:600;color:#1a1f1a;margin-bottom:1.1rem}
        .jpd-step{display:flex;align-items:flex-start;gap:11px;margin-bottom:14px}
        .jpd-step-icon{width:38px;height:38px;border-radius:50%;background:#f4f7f4;border:1px solid #e2e8e2;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:17px}
        .jpd-step-body{flex:1;padding-top:1px}
        .jpd-step-head{display:flex;justify-content:space-between;align-items:center;gap:6px}
        .jpd-step-title{font-size:13.5px;font-weight:500;color:#1a1f1a}
        .jpd-badge{font-size:11px;background:#f2f4f2;color:#9aaa9a;padding:2px 10px;border-radius:999px;border:1px solid #dde5dd;white-space:nowrap}
        .jpd-badge.inprog{background:#fffbea;color:#9a7510;border-color:#e8d470}
        .jpd-step-desc{font-size:12px;color:#9aaa9a;margin-top:2px}
        .jpd-start-btn{width:100%;background:#4CAF0A;color:#fff;border:none;border-radius:9px;padding:12px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:4px;box-shadow:0 2px 8px rgba(76,175,10,.25);transition:background .15s,transform .1s}
        .jpd-start-btn:hover{background:#3d9808}
        .jpd-start-btn:active{transform:scale(.98)}
        .jpd-start-btn.started{background:#1e7a39}
        .jpd-status-head{display:flex;align-items:center;gap:9px;margin-bottom:10px}
        .jpd-status-head h3{font-size:15px;font-weight:600;color:#1a1f1a}
        .jpd-pill{display:inline-flex;align-items:center;font-size:12px;font-weight:500;padding:4px 14px;border-radius:999px;margin-bottom:10px}
        .jpd-pill.pending{background:#fffbea;color:#9a7510;border:1px solid #e8d470}
        .jpd-pill.inprog{background:#eafaf0;color:#1e7a39;border:1px solid #b0d4b8}
        .jpd-status-desc{font-size:13px;color:#7a8a7a;line-height:1.6}
        .jpd-warn-banner{background:#fffbea;border:1.5px solid #e8d470;border-radius:10px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#9a7510;font-weight:500}
        .jpd-toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(80px);background:#1a1f1a;color:#fff;padding:11px 22px;border-radius:999px;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s;opacity:0;pointer-events:none;z-index:9999;display:flex;align-items:center;gap:8px}
        .jpd-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
        .jpd-toast-dot{width:8px;height:8px;border-radius:50%;background:#56c478;flex-shrink:0}
        @keyframes jpd-spin { to { transform:rotate(360deg); } }
        @media(max-width:720px){
          .jpd-grid{grid-template-columns:1fr}
          .jpd-row{grid-template-columns:1fr}
          .jpd-card{padding:1.2rem}
        }
      `}</style>

      <div className="jpd-root">
        <div className="jpd-topbar" />

        <div className="jpd-hdr">
          <h1>Welcome back!</h1>
          <p>Complete your profile and get verified to start receiving job offers</p>
          {/* Shows the member type badge so you can confirm it loaded */}
          {memberTypeId ? (
            <div className="jpd-member-badge">
              Member Type: <span>{memberTypeName || memberTypeId}</span>
            </div>
          ) : (
            <div className="jpd-member-badge" style={{ background: "#fff5f5", borderColor: "#f5c6c6" }}>
              <span style={{ color: "#e24b4a" }}>⚠ member_type_id not loaded</span>
            </div>
          )}
        </div>

        <div className="jpd-wrap">

          {/* Progress bar */}
          <div className="jpd-prog">
            <div className="jpd-prog-top">
              <div>
                <h2>Profile Completion</h2>
                <p>Fill and save all fields to reach 100%</p>
              </div>
              <span className="jpd-pct">{progress}%</span>
            </div>
            <div className="jpd-bar-bg">
              <div className="jpd-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="jpd-grid">

            {/* ── Left: Form or Profile view ── */}
            <div className="jpd-card">
              <h2>{viewMode === "form" ? (savedProfile ? "Edit Profile" : "Create Your Profile") : "Your Profile"}</h2>

              {/* Warn if member_type_id is missing */}
              {viewMode === "form" && !memberTypeId && (
                <div className="jpd-warn-banner">
                  ⚠️ Session data missing — make sure you are logged in and member_type_id is stored correctly.
                </div>
              )}

              {viewMode === "form" ? (
                <>
                  <div className="jpd-row">
                    <div className="jpd-field">
                      <label>Full Name</label>
                      <input type="text" placeholder="John Doe" value={form.fullName}
                        onChange={e => handleChange("fullName", e.target.value)} />
                    </div>
                    <div className="jpd-field">
                      <label>Primary Role</label>
                      <select value={form.role} onChange={e => handleChange("role", e.target.value)}>
                        <option value="">Select your role</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="jpd-field">
                    <label>Skills (comma separated)</label>
                    <input type="text" placeholder="React, TypeScript, Node.js" value={form.skills}
                      onChange={e => handleChange("skills", e.target.value)} />
                  </div>

                  <div className="jpd-field">
                    <label>Profile Image</label>
                    <input type="file" accept="image/*"
                      onChange={e => setProfileImage(e.target.files[0])} />
                  </div>

                  <div className="jpd-row">
                    <div className="jpd-field">
                      <label>Years of Experience</label>
                      <select value={form.experience} onChange={e => handleChange("experience", e.target.value)}>
                        <option value="">Select experience</option>
                        {EXPERIENCE.map(x => <option key={x} value={x}>{x}</option>)}
                      </select>
                    </div>
                    <div className="jpd-field">
                      <label>Previous Company</label>
                      <input type="text" placeholder="Tech Corp Inc." value={form.company}
                        onChange={e => handleChange("company", e.target.value)} />
                    </div>
                  </div>

                  <div className="jpd-row">
                    <div className="jpd-field">
                      <label>Notice Period</label>
                      <select value={form.noticePeriod} onChange={e => handleChange("noticePeriod", e.target.value)}>
                        <option value="">Select notice period</option>
                        {NOTICE_PERIODS.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="jpd-field">
                      <label>Preferred Work Mode</label>
                      <select value={form.workMode} onChange={e => handleChange("workMode", e.target.value)}>
                        <option value="">Select work mode</option>
                        {WORK_MODES.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="jpd-btn-row">
                    <button className="jpd-btn-green" onClick={handleSave} disabled={isSaving}
                      style={{ opacity: isSaving ? 0.75 : 1, cursor: isSaving ? "not-allowed" : "pointer" }}>
                      {isSaving ? (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ animation: "jpd-spin 0.8s linear infinite" }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                          </svg>
                          Save Profile
                        </>
                      )}
                    </button>
                    {savedProfile && (
                      <button className="jpd-btn-outline" onClick={() => setViewMode("profile")}>
                        Cancel
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {FIELDS.map(f => (
                    <div className="jpd-pv-row" key={f}>
                      <span className="jpd-pv-label">{FIELD_LABELS[f]}</span>
                      <span className={`jpd-pv-val${!savedProfile?.[f] ? " jpd-pv-empty" : ""}`}>
                        {savedProfile?.[f] || "—"}
                      </span>
                    </div>
                  ))}

                  <div className="jpd-btn-row" style={{ marginTop: "18px" }}>
                    <button className="jpd-btn-green" onClick={() => setViewMode("form")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit Profile
                    </button>
                    <button className="jpd-btn-delete" onClick={() => setShowDeleteConfirm(true)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                      Delete Profile
                    </button>
                  </div>

                  {showDeleteConfirm && (
                    <div className="jpd-delete-banner">
                      <p>⚠️ Are you sure? This will permanently delete your profile.</p>
                      <div className="jpd-delete-banner-btns">
                        <button className="jpd-btn-delete-confirm" onClick={handleDeleteProfile}>
                          Yes, Delete
                        </button>
                        <button className="jpd-btn-outline" onClick={() => setShowDeleteConfirm(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Right column ── */}
            <div className="jpd-right">
              <div className="jpd-right-card">
                <h2>Verification Process</h2>
                {VERIFICATION_STEPS.map(step => (
                  <div className="jpd-step" key={step.id}>
                    <div className="jpd-step-icon">{step.icon}</div>
                    <div className="jpd-step-body">
                      <div className="jpd-step-head">
                        <span className="jpd-step-title">{step.title}</span>
                        <span className={`jpd-badge${verificationStarted ? " inprog" : ""}`}>
                          {verificationStarted ? "In Progress" : "Pending"}
                        </span>
                      </div>
                      <p className="jpd-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
                <button
                  className={`jpd-start-btn${verificationStarted ? " started" : ""}`}
                  onClick={() => setVerificationStarted(true)}
                >
                  {verificationStarted ? "Verification In Progress..." : "Start Verification"}
                </button>
              </div>

              <div className="jpd-right-card">
                <div className="jpd-status-head">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a017"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <h3>Verification Status</h3>
                </div>
                <div className={`jpd-pill${verificationStarted ? " inprog" : " pending"}`}>
                  {verificationStarted ? "In Progress" : "Pending Verification"}
                </div>
                <p className="jpd-status-desc">
                  {verificationStarted
                    ? "Your verification is underway. We'll notify you once each step is reviewed."
                    : "Complete the verification process to unlock your profile and start receiving job opportunities."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`jpd-toast${toast.show ? " show" : ""}`}>
          <div className="jpd-toast-dot" />
          {toast.msg}
        </div>
      </div>
    </>
  );
}