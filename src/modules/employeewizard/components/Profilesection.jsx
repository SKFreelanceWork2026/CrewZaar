import { useState, useEffect, useRef } from "react";

const ROLES = [
  "Frontend Developer","Backend Developer","Full Stack Developer",
  "UI/UX Designer","DevOps Engineer","Data Scientist",
  "Product Manager","Mobile Developer",
];
const EXPERIENCE = ["0–1 years","1–3 years","3–5 years","5–10 years","10+ years"];
const NOTICE_PERIODS = ["Immediate","2 weeks","1 month","2 months","3 months"];
const WORK_MODES = ["Remote","On-site","Hybrid"];
const FIELDS = ["fullName","role","skills","experience","company","noticePeriod","workMode"];
const FIELD_LABELS = {
  fullName:"Full Name", role:"Primary Role", skills:"Skills",
  experience:"Years of Experience", company:"Previous Company",
  noticePeriod:"Notice Period", workMode:"Preferred Work Mode",
};

const VERIFICATION_STEPS = [
  { id:1, title:"Step 1: Skill Test", desc:"Complete skill-based assessment", icon:"📄" },
  { id:2, title:"Step 2: Task Submission", desc:"Upload practical assignment", icon:"⏱" },
  { id:3, title:"Step 3: Communication Test", desc:"Assess communication skills", icon:"💬" },
];

const EMPTY_FORM = { fullName:"",role:"",skills:"",experience:"",company:"",noticePeriod:"",workMode:"" };

export default function JobProfileDashboard() {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [savedProfile, setSavedProfile] = useState(null);
  const [viewMode, setViewMode] = useState("form"); // "form" | "profile"
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [dbStatus, setDbStatus] = useState("loading"); // "loading"|"connected"|"error"
  const dbRef = useRef(null);

useEffect(() => {
  const saved = localStorage.getItem("jobProfile");

  if (saved) {
    const profile = JSON.parse(saved);

    setForm(profile);
    setSavedProfile(profile);

    // Show profile screen instead of form
    setViewMode("profile");
  }
}, []);

  // Init SQLite
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js";
    script.onload = async () => {
      try {
        const SQL = await window.initSqlJs({
          locateFile: (f) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}`,
        });
        const db = new SQL.Database();
        db.run(`CREATE TABLE IF NOT EXISTS profile (
          id INTEGER PRIMARY KEY,
          fullName TEXT, role TEXT, skills TEXT,
          experience TEXT, company TEXT,
          noticePeriod TEXT, workMode TEXT,
          savedAt TEXT
        )`);
        dbRef.current = db;
        setDbStatus("connected");
        // Load existing profile
        const res = db.exec("SELECT * FROM profile WHERE id=1");
        if (res.length && res[0].values.length) {
          const cols = res[0].columns;
          const row = res[0].values[0];
          const d = {};
          cols.forEach((c, i) => { d[c] = row[i]; });
          const profile = {
            fullName: d.fullName || "", role: d.role || "",
            skills: d.skills || "", experience: d.experience || "",
            company: d.company || "", noticePeriod: d.noticePeriod || "",
            workMode: d.workMode || "",
          };
          setForm(profile);
          setSavedProfile(profile);
          setViewMode("profile");
          showToast("Profile loaded from SQLite ✓");
        }
      } catch (e) {
        setDbStatus("error");
      }
    };
    script.onerror = () => setDbStatus("error");
    document.head.appendChild(script);
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  };

  const calcProgress = (profile) => {
    if (!profile) return 45;
    const filled = FIELDS.filter((f) => profile[f] && profile[f].trim() !== "").length;
    return Math.round(45 + (filled / FIELDS.length) * 55);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
  localStorage.setItem("jobProfile", JSON.stringify(form));
}, [form]);

  const handleSave = () => {
    if (!form.fullName.trim()) { showToast("Please enter your full name"); return; }
    const db = dbRef.current;
    if (db) {
      const exists = db.exec("SELECT id FROM profile WHERE id=1");
      if (exists.length && exists[0].values.length) {
        db.run(
          "UPDATE profile SET fullName=?,role=?,skills=?,experience=?,company=?,noticePeriod=?,workMode=?,savedAt=? WHERE id=1",
          [form.fullName,form.role,form.skills,form.experience,form.company,form.noticePeriod,form.workMode,new Date().toISOString()]
        );
      } else {
        db.run(
          "INSERT INTO profile (id,fullName,role,skills,experience,company,noticePeriod,workMode,savedAt) VALUES (1,?,?,?,?,?,?,?,?)",
          [form.fullName,form.role,form.skills,form.experience,form.company,form.noticePeriod,form.workMode,new Date().toISOString()]
        );
      }
    }
localStorage.setItem("jobProfile", JSON.stringify(form));

setSavedProfile({ ...form });
setViewMode("profile");
showToast("Profile saved successfully ✓");
  };

  const handleEdit = () => {
    setViewMode("form");
  };

  const progress = Math.round(
  (FIELDS.filter(
    (f) => form[f] && form[f].trim() !== ""
  ).length / FIELDS.length) * 100
);

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
        .jpd-db-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#7a8a7a;margin-top:8px}
        .jpd-db-dot{width:7px;height:7px;border-radius:50%;background:#ccc;display:inline-block}
        .jpd-db-dot.live{background:#4CAF0A}
        .jpd-db-dot.err{background:#e24b4a}
        .jpd-wrap{max-width:1080px;margin:0 auto;padding:0 20px}

        /* Progress */
        .jpd-prog{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.3rem 1.6rem;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-prog-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
        .jpd-prog-top h2{font-size:15px;font-weight:600;color:#1a1f1a}
        .jpd-prog-top p{font-size:13px;color:#9aaa9a;margin-top:3px}
        .jpd-pct{font-size:26px;font-weight:600;color:#4CAF0A}
        .jpd-bar-bg{background:#e5ebe5;border-radius:999px;height:9px;overflow:hidden}
        .jpd-bar-fill{background:linear-gradient(90deg,#4CAF0A,#56c478);height:100%;border-radius:999px;transition:width .6s cubic-bezier(.4,0,.2,1)}

        /* Grid */
        .jpd-grid{display:grid;grid-template-columns:1fr 310px;gap:20px;align-items:start}

        /* Cards */
        .jpd-card{background:#fff;border:1px solid #e2e8e2;border-radius:14px;padding:1.6rem 1.8rem;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .jpd-card h2{font-size:18px;font-weight:600;color:#1a1f1a;margin-bottom:1.4rem;letter-spacing:-0.2px}

        /* Form */
        .jpd-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .jpd-field{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
        .jpd-field label{font-size:13px;font-weight:500;color:#5a6a5a}
        .jpd-field input,.jpd-field select{border:1.5px solid #dde5dd;border-radius:9px;padding:10px 13px;font-size:14px;font-family:'DM Sans',sans-serif;background:#fafcfa;color:#1a1f1a;outline:none;transition:border-color .15s,box-shadow .15s,background .15s;appearance:none;-webkit-appearance:none}
        .jpd-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aaa9a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;padding-right:36px}
        .jpd-field input:focus,.jpd-field select:focus{border-color:#4CAF0A;box-shadow:0 0 0 3px rgba(76,175,10,.12);background:#fff}
        .jpd-field input::placeholder{color:#b8c8b8}

        /* Buttons */
        .jpd-btn-green{background:#4CAF0A;color:#fff;border:none;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 8px rgba(76,175,10,.25);transition:background .15s,box-shadow .15s,transform .1s}
        .jpd-btn-green:hover{background:#3d9808;box-shadow:0 4px 12px rgba(76,175,10,.3)}
        .jpd-btn-green:active{transform:scale(.98)}
        .jpd-btn-outline{background:transparent;color:#1a1f1a;border:1.5px solid #dde5dd;border-radius:9px;padding:11px 26px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .15s,border-color .15s}
        .jpd-btn-outline:hover{background:#f4f7f4;border-color:#b0d4b8}
        .jpd-btn-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}

        /* Profile view */
        .jpd-pv-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f0f4f0}
        .jpd-pv-row:last-child{border-bottom:none}
        .jpd-pv-label{font-size:13px;color:#7a8a7a}
        .jpd-pv-val{font-size:14px;font-weight:500;color:#1a1f1a;text-align:right;max-width:65%}
        .jpd-pv-empty{color:#b8c8b8;font-weight:400}

        /* Right column */
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

        /* Toast */
        .jpd-toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(80px);background:#1a1f1a;color:#fff;padding:11px 22px;border-radius:999px;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s;opacity:0;pointer-events:none;z-index:9999;display:flex;align-items:center;gap:8px}
        .jpd-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
        .jpd-toast-dot{width:8px;height:8px;border-radius:50%;background:#56c478;flex-shrink:0}

        @media(max-width:720px){
          .jpd-grid{grid-template-columns:1fr}
          .jpd-row{grid-template-columns:1fr}
          .jpd-card{padding:1.2rem}
        }
      `}</style>

      <div className="jpd-root">
        <div className="jpd-topbar" />

        {/* Header */}
        <div className="jpd-hdr">
          <h1>Welcome back, John!</h1>
          <p>Complete your profile and get verified to start receiving job offers</p>
          <div className="jpd-db-badge">
            <span className={`jpd-db-dot${dbStatus==="connected"?" live":dbStatus==="error"?" err":""}`} />
            {dbStatus==="loading" && "Connecting to SQLite..."}
            {dbStatus==="connected" && "SQLite connected — data persists locally"}
            {dbStatus==="error" && "SQLite unavailable"}
          </div>
        </div>

        <div className="jpd-wrap">

          {/* Progress */}
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

          {/* Main Grid */}
          <div className="jpd-grid">

            {/* Left — Form or Profile View */}
            <div className="jpd-card">
              <h2>{viewMode === "form" ? (savedProfile ? "Edit Profile" : "Complete Your Profile") : "Your Profile"}</h2>

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
                    <button className="jpd-btn-green" onClick={handleSave}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <polyline points="17 21 17 13 7 13 7 21"/>
                        <polyline points="7 3 7 8 15 8"/>
                      </svg>
                      Save Profile
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
                    <button className="jpd-btn-green" onClick={handleEdit}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right column */}
            <div className="jpd-right">

              {/* Verification Process */}
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

              {/* Verification Status */}
              <div className="jpd-right-card">
                <div className="jpd-status-head">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
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

        {/* Toast */}
        <div className={`jpd-toast${toast.show ? " show" : ""}`}>
          <div className="jpd-toast-dot" />
          {toast.msg}
        </div>
      </div>
    </>
  );
}