import { useState } from "react";

const PRIMARY = "#4CAF0A";
const PRIMARY_LIGHT = "#e8f5e1";
const TABS = ["Personal Info", "Education", "Experience", "Certifications", "Social Links", "Portfolio"];

export default function DeveloperProfile() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [visible, setVisible] = useState(true);
  const [bio, setBio] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>

        {/* ── Header Card ── */}
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.09)" }}>

          {/* GREEN top band — no content except background */}
          <div style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, #6abf07 100%)`,
            height: 100,
          }} />

          {/* WHITE bottom section — avatar overlaps upward */}
          <div style={{ position: "relative", padding: "0 24px 18px 24px" }}>

            {/* Avatar — pulled up to straddle the green/white line */}
            <div style={{ position: "absolute", top: -54, left: 24 }}>
              <div style={{
                width: 100, height: 100, borderRadius: 14, border: "4px solid #fff",
                overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", background: "#c8f0a0"
              }}>
                {/* Realistic placeholder face */}
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="#d4b896"/>
                  {/* shirt */}
                  <path d="M20 100 Q30 72 50 68 Q70 72 80 100Z" fill="#f0f0f0"/>
                  {/* neck */}
                  <rect x="42" y="58" width="16" height="14" rx="4" fill="#c8956a"/>
                  {/* head */}
                  <ellipse cx="50" cy="44" rx="22" ry="26" fill="#d4956a"/>
                  {/* hair */}
                  <ellipse cx="50" cy="22" rx="22" ry="12" fill="#2d1a0e"/>
                  <rect x="28" y="20" width="44" height="14" rx="6" fill="#2d1a0e"/>
                  {/* eyes */}
                  <ellipse cx="41" cy="44" rx="4" ry="4.5" fill="#fff"/>
                  <ellipse cx="59" cy="44" rx="4" ry="4.5" fill="#fff"/>
                  <circle cx="42" cy="44" r="2.5" fill="#3d2010"/>
                  <circle cx="60" cy="44" r="2.5" fill="#3d2010"/>
                  {/* eyebrows */}
                  <path d="M36 38 Q41 35 46 38" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M54 38 Q59 35 64 38" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  {/* nose */}
                  <path d="M50 48 Q47 54 49 56 Q51 57 53 56 Q55 54 50 48Z" fill="#b87850"/>
                  {/* mouth */}
                  <path d="M43 62 Q50 67 57 62" stroke="#8b4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              {/* Camera icon badge */}
              <div style={{
                position: "absolute", bottom: 4, right: -6,
                background: PRIMARY, borderRadius: "50%", width: 26, height: 26,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)", cursor: "pointer"
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </div>

            {/* Name/title row — left side indented past avatar, right side has Edit Profile */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingTop: 10, paddingLeft: 124 }}>
              <div>
                <h2 style={{ margin: 0, color: "#1a1a1a", fontSize: 20, fontWeight: 700 }}>John Doe</h2>
                <p style={{ margin: "3px 0 0", color: "#666", fontSize: 14 }}>Senior React Developer</p>
                <p style={{ margin: "2px 0 0", color: "#999", fontSize: 13 }}>5 years experience</p>
              </div>

              {/* Edit Profile — white section, right side */}
              <button style={{
                background: PRIMARY, color: "#fff", border: "none", borderRadius: 8,
                padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 1px 4px rgba(0,0,0,0.12)", marginTop: 4
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0 0" }} />

            {/* Contact info row */}
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap", paddingTop: 14 }}>
              {[
                { icon: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2l-8 5-8-5h16z", label: "john.doe@email.com" },
                { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z", label: "+1 (555) 123-4567" },
                { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z", label: "San Francisco, CA" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#555", fontSize: 13 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <path d={item.icon}/>
                  </svg>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

          {/* Left: Tabs + Form */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: "none", padding: "7px 16px", cursor: "pointer",
                    fontSize: 13.5, fontWeight: activeTab === tab ? 600 : 400,
                    color: activeTab === tab ? PRIMARY : "#666",
                    background: activeTab === tab ? PRIMARY_LIGHT : "transparent",
                    borderRadius: 20, transition: "all 0.18s"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Personal Info" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {["First Name", "Last Name"].map((lbl, i) => (
                    <div key={i}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>{lbl}</label>
                      <input
                        defaultValue={i === 0 ? "John" : "Doe"}
                        style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, color: "#333", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = PRIMARY}
                        onBlur={e => e.target.style.borderColor = "#ddd"}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, color: "#333", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                    onFocus={e => e.target.style.borderColor = PRIMARY}
                    onBlur={e => e.target.style.borderColor = "#ddd"}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>Resume</label>
                  <div
                    style={{ border: "2px dashed #ddd", borderRadius: 10, padding: "32px 20px", textAlign: "center", cursor: "pointer", background: "#fafafa", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = PRIMARY}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#ddd"}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" style={{ marginBottom: 8 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <p style={{ margin: "0 0 4px", fontSize: 14, color: "#555", fontWeight: 500 }}>Click to upload or drag and drop</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>PDF, DOC up to 10MB</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "Personal Info" && (
              <div style={{ padding: "40px 0", textAlign: "center", color: "#aaa" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" style={{ marginBottom: 12 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style={{ margin: 0, fontSize: 14 }}>No {activeTab.toLowerCase()} added yet.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Profile Strength */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#222" }}>Profile Strength</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#666" }}>Completion</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>85%</span>
              </div>
              <div style={{ background: "#eee", borderRadius: 999, height: 8, marginBottom: 16 }}>
                <div style={{ background: PRIMARY, borderRadius: 999, height: 8, width: "85%" }}/>
              </div>
              {[
                { label: "Profile photo added", done: true },
                { label: "Resume uploaded", done: true },
                { label: "Add certifications", done: false },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: item.done ? "none" : "2px solid #ccc",
                    background: item.done ? PRIMARY : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span style={{ fontSize: 13, color: item.done ? "#333" : "#999" }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Skill Match */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#222", textAlign: "left" }}>Skill Match</h3>
              <div style={{ fontSize: 42, fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>92%</div>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#888" }}>Average match with job openings</p>
            </div>

            {/* Profile Visibility */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#222" }}>Profile Visibility</h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#555" }}>Visible to recruiters</span>
                <div
                  onClick={() => setVisible(v => !v)}
                  style={{ width: 44, height: 24, borderRadius: 999, cursor: "pointer", background: visible ? PRIMARY : "#ccc", position: "relative", transition: "background 0.25s" }}
                >
                  <div style={{
                    position: "absolute", top: 3, left: visible ? 23 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    transition: "left 0.25s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}