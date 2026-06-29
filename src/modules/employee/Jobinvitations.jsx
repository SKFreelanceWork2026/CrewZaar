import { useState } from "react";
import {
  DollarSign, MapPin, Briefcase, Clock, Check, Eye, X, Heart,
  Sparkles, BarChart2, SlidersHorizontal, ArrowUpDown, Users, Zap
} from "lucide-react";

const PRIMARY = "#4CAF0A";
const PRIMARY_LIGHT = "#e8f5e1";
const PRIMARY_MID = "#c5e8a0";

const FILTERS = ["Remote", "Hybrid", "Full Time", "Fresher", "Experienced"];

const jobs = [
  {
    initial: "G", company: "Google", role: "Senior Frontend Developer",
    match: 95, salary: "$120k - $160k", location: "San Francisco, CA",
    type: "Full Time", workMode: "Hybrid", exp: "5+ years",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    initial: "M", company: "Microsoft", role: "React Developer",
    match: 92, salary: "$110k - $150k", location: "Remote",
    type: "Full Time", workMode: "Remote", exp: "3+ years",
    skills: ["React", "JavaScript", "Azure"],
  },
  {
    initial: "A", company: "Amazon", role: "Full Stack Engineer",
    match: 88, salary: "$130k - $170k", location: "Seattle, WA",
    type: "Full Time", workMode: "Hybrid", exp: "4+ years",
    skills: ["React", "AWS", "Python"],
  },
  {
    initial: "F", company: "Meta", role: "UI Engineer",
    match: 90, salary: "$125k - $185k", location: "Menlo Park, CA",
    type: "Full Time", workMode: "Hybrid", exp: "5+ years",
    skills: ["React", "GraphQL", "JavaScript"],
  },
  {
    initial: "N", company: "Netflix", role: "Frontend Engineer",
    match: 87, salary: "$140k - $180k", location: "Los Angeles, CA",
    type: "Full Time", workMode: "Hybrid", exp: "6+ years",
    skills: ["React", "TypeScript", "Testing"],
  },
  {
    initial: "A2", company: "Apple", role: "Software Engineer",
    match: 85, salary: "$135k - $175k", location: "Cupertino, CA",
    type: "Full Time", workMode: "On-site", exp: "4+ years",
    skills: ["React", "Swift", "iOS"],
  },
];

const aiRecs = [
  { role: "Frontend Lead", company: "Stripe", match: 94 },
  { role: "React Developer", company: "Airbnb", match: 91 },
  { role: "Senior Engineer", company: "Uber", match: 89 },
];

const workModeColor = (mode) => {
  if (mode === "Remote") return { color: PRIMARY, bg: PRIMARY_LIGHT };
  if (mode === "Hybrid") return { color: "#3b82f6", bg: "#eff6ff" };
  return { color: "#888", bg: "#f0f0f0" };
};

function JobCard({ job }) {
  const [accepted, setAccepted] = useState(false);
  const [liked, setLiked] = useState(false);
  const wm = workModeColor(job.workMode);

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 5px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{job.initial.replace("2","")}</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{job.role}</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "#888" }}>{job.company}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: PRIMARY_LIGHT, borderRadius: 20, padding: "4px 10px" }}>
          <Sparkles size={12} color={PRIMARY} fill={PRIMARY} />
          <span style={{ fontSize: 12, fontWeight: 700, color: PRIMARY }}>{job.match}% Match</span>
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#555", fontSize: 13 }}>
          <DollarSign size={13} color="#aaa" strokeWidth={2} />
          {job.salary}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#555", fontSize: 13 }}>
          <MapPin size={13} color="#aaa" strokeWidth={2} />
          {job.location}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#555", fontSize: 13 }}>
          <Briefcase size={13} color="#aaa" strokeWidth={2} />
          {job.type}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          <span style={{ background: wm.bg, color: wm.color, fontWeight: 600, fontSize: 11, padding: "2px 9px", borderRadius: 20 }}>{job.workMode}</span>
          <span style={{ color: "#888" }}>{job.exp}</span>
        </div>
      </div>

      {/* Skills */}
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#aaa", fontWeight: 500 }}>Required Skills:</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {job.skills.map((s, i) => (
            <span key={i} style={{ background: "#f4f6f8", color: "#444", fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 6, border: "1px solid #eee" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => setAccepted(a => !a)}
          style={{ flex: 1, background: accepted ? "#d4edda" : PRIMARY, border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, color: accepted ? PRIMARY : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s" }}
        >
          <Check size={14} color={accepted ? PRIMARY : "#fff"} strokeWidth={2.5} />
          {accepted ? "Accepted" : "Accept"}
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, color: "#666", cursor: "pointer", padding: "10px 12px", borderRadius: 8 }}>
          <Eye size={14} color="#888" strokeWidth={2} />
          View Details
        </button>
        <button onClick={() => {}} style={{ background: "none", border: "1px solid #eee", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <X size={14} color="#aaa" strokeWidth={2} />
        </button>
        <button onClick={() => setLiked(l => !l)} style={{ background: "none", border: "1px solid #eee", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Heart size={14} color={liked ? "#ef4444" : "#aaa"} fill={liked ? "#ef4444" : "none"} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default function JobInvitations() {
  const [activeFilter, setActiveFilter] = useState("Hybrid");
  const [toggle, setToggle] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "'Inter','Segoe UI',sans-serif", padding: "28px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>Job Invitations</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#888" }}>Companies interested in your profile</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ icon: SlidersHorizontal, label: "Filter" }, { icon: ArrowUpDown, label: "Sort by Match" }].map(({ icon: Icon, label }, i) => (
              <button key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#444", cursor: "pointer", fontWeight: 500 }}>
                <Icon size={14} color="#888" strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              background: activeFilter === f ? PRIMARY : "#fff",
              color: activeFilter === f ? "#fff" : "#555",
              border: activeFilter === f ? "none" : "1px solid #e0e0e0",
              borderRadius: 20, padding: "6px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s"
            }}>{f}</button>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 20, alignItems: "start" }}>

          {/* Job Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {jobs.map((job, i) => <JobCard key={i} job={job} />)}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Invitation Stats */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Invitation Stats</h3>
              {[
                { label: "Total Invitations", value: "24", color: "#1a1a1a" },
                { label: "This Week", value: "6", color: PRIMARY },
                { label: "Accepted", value: "8", color: PRIMARY },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid #f5f5f5" : "none" }}>
                  <span style={{ fontSize: 13, color: "#888" }}>{s.label}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* AI Recommended */}
            <div style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #6abf07 100%)`, borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(76,175,10,0.25)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                <Sparkles size={15} color="#fff" fill="#fff" />
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" }}>AI Recommended</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {aiRecs.map((r, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.22)", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.role}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{r.company}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#555", background: "rgba(255,255,255,0.85)", borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>{r.match}% match</span>
                  </div>
                ))}
              </div>
              <button style={{ width: "100%", background: "#fff", border: "none", borderRadius: 8, padding: "11px", fontSize: 13, fontWeight: 600, color: PRIMARY, cursor: "pointer", marginTop: 12 }}>
                View All
              </button>
            </div>

            {/* Profile Visibility */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Profile Visibility</h3>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: "#888" }}>Your profile is visible to all recruiters</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#555" }}>Open to opportunities</span>
                <div onClick={() => setToggle(t => !t)} style={{ width: 44, height: 24, borderRadius: 999, cursor: "pointer", background: toggle ? PRIMARY : "#ccc", position: "relative", transition: "background 0.25s" }}>
                  <div style={{ position: "absolute", top: 3, left: toggle ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.25s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}