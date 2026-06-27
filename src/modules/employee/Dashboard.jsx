// Dashboard.jsx - Clean version without sidebar and header
import { useState, useEffect } from "react";
import {
  Target, Eye, Briefcase, Award, TrendingUp,
  CheckCircle, Calendar, MapPin, BarChart2, Clock,
  Rocket, Lightbulb, Cloud, Plus, ChevronRight,
  User, BadgeCheck, Star, Search, Settings,
  Bell, Flag, ChevronDown, Home, FileText,
  BookOpen, MessageSquare, ClipboardList,
  LayoutDashboard, LogOut, Menu, X
} from "lucide-react";

/* ─────────────────── SHARED ATOMS ─────────────────── */

const Avatar = ({ name, size = 96 }) => {
  const initials = name
    ? name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
    : "JD";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #4CAF0A, #2d7a06)",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      flexShrink: 0
    }}>
      <span style={{ color: "#fff", fontSize: size * 0.34, fontWeight: 700 }}>{initials}</span>
    </div>
  );
};

const Badge = ({ children, color = "#4CAF0A", bg = "#edffd6" }) => (
  <span style={{
    background: bg, color, fontSize: 11, fontWeight: 600,
    padding: "3px 10px", borderRadius: 20,
    display: "inline-flex", alignItems: "center", gap: 4
  }}>{children}</span>
);

const ProgressBar = ({ value, color = "#4CAF0A", height = 6 }) => (
  <div style={{ background: "#e5e7eb", borderRadius: 4, height, overflow: "hidden", marginTop: 4 }}>
    <div style={{ width: `${value}%`, background: color, height: "100%", borderRadius: 4, transition: "width 0.6s ease" }} />
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fff", borderRadius: 12, padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0", ...style
  }}>{children}</div>
);

const GreenButton = ({ children, outline = false, style = {}, onClick }) => (
  <button onClick={onClick} style={{
    background: outline ? "transparent" : "#4CAF0A",
    color: outline ? "#4CAF0A" : "#fff",
    border: outline ? "1.5px solid #4CAF0A" : "none",
    borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13,
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, ...style
  }}>{children}</button>
);

const RadioOption = ({ label, sub, selected, onClick }) => (
  <div onClick={onClick} style={{
    background: selected ? "#4CAF0A" : "transparent",
    color: selected ? "#fff" : "#374151",
    border: selected ? "none" : "1.5px solid #e5e7eb",
    borderRadius: 10, padding: "10px 14px", marginBottom: 8, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s"
  }}>
    <div style={{
      width: 17, height: 17, borderRadius: "50%",
      border: `2px solid ${selected ? "#fff" : "#9ca3af"}`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
    <div>
      <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, opacity: 0.85 }}>{sub}</div>}
    </div>
  </div>
);

const SkillBar = ({ name, value }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
      <span style={{ fontWeight: 500, color: "#374151" }}>{name}</span>
      <span style={{ color: "#6b7280", fontWeight: 600 }}>{value}%</span>
    </div>
    <ProgressBar value={value} height={7} />
  </div>
);

const StatCard = ({ icon: Icon, iconColor = "#4CAF0A", iconBg = "#f3ffe6", label, value, badge, delta }) => (
  <Card style={{ padding: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={iconColor} strokeWidth={2} />
      </div>
      {badge && <Badge color="#4CAF0A" bg="#edffd6">{badge}</Badge>}
      {delta && <span style={{ color: "#4CAF0A", fontSize: 12, fontWeight: 700 }}>{delta}</span>}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{label}</div>
  </Card>
);

const VerificationItem = ({ label, sub }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
    <CheckCircle size={18} color="#4CAF0A" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
    <div>
      <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{label}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div>
    </div>
  </div>
);

const ExperienceItem = ({ title, company, period, duration, bullets, tags, isLast = false }) => (
  <div style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : 24, marginBottom: isLast ? 0 : 4, borderBottom: isLast ? "none" : "1px solid #f3f4f6" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4CAF0A", flexShrink: 0, zIndex: 1 }} />
      {!isLast && <div style={{ flex: 1, width: 2, background: "#c8f59a", marginTop: 4, borderRadius: 2 }} />}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{title}</div>
        <span style={{ background: "#e8f0fe", color: "#4a6cf7", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 20 }}>{duration}</span>
      </div>
      <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 4 }}>{company}</div>
      <div style={{ color: "#9ca3af", fontSize: 12, display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
        <Calendar size={12} color="#9ca3af" strokeWidth={1.8} /> {period}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151" }}>
            <div style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: "#4CAF0A" }} />
            {b}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t, i) => (
          <span key={i} style={{ background: "#f3f4f6", color: "#374151", fontSize: 11, padding: "4px 12px", borderRadius: 20, border: "1px solid #e5e7eb" }}>{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const JobCard = ({ icon: Icon, iconBg = "#f3f4f6", iconColor = "#374151", title, company, mode, time }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
    <div style={{ width: 46, height: 46, background: iconBg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={22} color={iconColor} strokeWidth={1.8} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{title}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{company}</div>
      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
        <MapPin size={10} color="#9ca3af" /> {mode} · {time}
      </div>
    </div>
    <GreenButton style={{ fontSize: 12, padding: "7px 16px", whiteSpace: "nowrap" }}>View & Apply</GreenButton>
  </div>
);

/* ─────────────────── MAIN DASHBOARD ─────────────────── */

export default function Dashboard() {
  const [workMode, setWorkMode] = useState("wfh");
  const [availability, setAvailability] = useState("immediate");
  const [jobType, setJobType] = useState("permanent");
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem("employee");
      if (data) setEmployee(JSON.parse(data));
    } catch (e) {
      console.error("Error parsing employee data:", e);
    }
  }, []);

  const getRoleDisplay = () =>
    employee?.role
      ? employee.role.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())
      : "Full Stack Developer";

  if (!employee) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px", background: "#f4f6f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "3px solid #e5e7eb", borderTop: "3px solid #4CAF0A", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading dashboard...</p>
        </div>
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", background: "#f4f6f8", minHeight: "100vh", padding: "24px" }}>

      {/* Welcome bar */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px 28px", marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: "#111827" }}>Welcome back, {employee.full_name}</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
          <CheckCircle size={13} color="#4CAF0A" />
          Your profile is verified and visible to top companies
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard icon={Target} iconBg="#f3ffe6" iconColor="#4CAF0A" label="Profile Strength" value="92%" badge="Excellent" />
        <StatCard icon={Eye} iconBg="#eff6ff" iconColor="#3b82f6" label="Profile Views" value="247" delta="+12%" />
        <StatCard icon={Briefcase} iconBg="#fff7ed" iconColor="#ea580c" label="Hiring Requests" value="15" delta="+8%" />
        <StatCard icon={Award} iconBg="#fdf4ff" iconColor="#a855f7" label="Skill Score" value="89%" />
        <StatCard icon={TrendingUp} iconBg="#f0fdf4" iconColor="#22c55e" label="Visibility" value="A+" badge="High" />
      </div>

      {/* ── 3-COLUMN GRID ── */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 252px", gap: 20 }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Profile card */}
          <Card>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <Avatar name={employee.full_name} size={88} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#111827" }}>{employee.full_name}</div>
              <div style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 10px" }}>{getRoleDisplay()}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                <Badge color="#4CAF0A" bg="#edffd6"><CheckCircle size={11} /> Verified</Badge>
                <Badge color="#3b82f6" bg="#eff6ff">IT Department</Badge>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                  <span>Profile Completion</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>92%</span>
                </div>
                <ProgressBar value={92} height={7} />
              </div>
              <GreenButton style={{ width: "100%", justifyContent: "center", padding: 11, fontSize: 13 }}>
                <User size={14} /> View Public Profile
              </GreenButton>
            </div>
          </Card>

          {/* Verification */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Verification Status</div>
            <VerificationItem label="Skill Test" sub="Score: 89%" />
            <VerificationItem label="Task Evaluation" sub="Completed" />
            <VerificationItem label="Communication Test" sub="Score: 92%" />
            <VerificationItem label="Background Verification" sub="Verified on May 1, 2026" />
            <div style={{ background: "#f3ffe6", border: "1px solid #c8f59a", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#2d7a06", display: "flex", gap: 8, alignItems: "flex-start" }}>
              <BadgeCheck size={15} color="#4CAF0A" style={{ flexShrink: 0, marginTop: 1 }} />
              Congratulations! You are fully verified and visible to top companies.
            </div>
          </Card>

          {/* Profile Strength */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Profile Strength</div>
            {[
              { label: "Completeness", val: 95 },
              { label: "Skills & Tests", val: 90 },
              { label: "Experience", val: 92 },
              { label: "Projects", val: 88 },
              { label: "Verification", val: 100 },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: "#374151" }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{s.val}%</span>
                </div>
                <ProgressBar value={s.val} height={6} />
              </div>
            ))}
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#92400e", marginTop: 10, display: "flex", gap: 6, alignItems: "flex-start" }}>
              <MapPin size={13} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
              Keep your profile updated to rank higher in search results
            </div>
          </Card>
        </div>

        {/* MIDDLE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Experience */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Experience</div>
              <GreenButton outline style={{ fontSize: 12 }}><Plus size={13} /> Add Experience</GreenButton>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid #f3f4f6" }}>
              {[{ val: "5.9 years", label: "Total Experience" }, { val: "2", label: "Companies" }, { val: "12+", label: "Projects" }].map(({ val, label }, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px", border: "1px solid #f0f0f0" }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: "#111827" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
            <ExperienceItem
              title="Senior Full Stack Developer" company="Tech Solutions Inc."
              period="Jan 2022 – Present" duration="3.4 years"
              bullets={["Led development of microservices architecture serving 1M+ users", "Mentored team of 5 junior developers", "Reduced API response time by 40% through optimization"]}
              tags={["E-commerce", "CRM", "Analytics Dashboard"]}
            />
            <ExperienceItem
              title="Full Stack Developer" company="StartupHub"
              period="Jun 2019 – Dec 2021" duration="2.5 years"
              bullets={["Built real-time collaboration features using WebSocket", "Implemented CI/CD pipeline reducing deployment time by 60%"]}
              tags={["Collaboration Tool", "Project Management"]} isLast
            />
          </Card>

          {/* Skills */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Skills</div>
              <div style={{ display: "flex", gap: 8 }}>
                <GreenButton outline style={{ fontSize: 12 }}><Plus size={13} /> Add Skill</GreenButton>
                <GreenButton outline style={{ fontSize: 12 }}>View All <ChevronRight size={13} /></GreenButton>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
              {[{ name: "JavaScript", value: 90 }, { name: "React", value: 88 }, { name: "Node.js", value: 85 }, { name: "TypeScript", value: 87 }, { name: "PostgreSQL", value: 82 }, { name: "AWS", value: 80 }].map((s, i) => <SkillBar key={i} {...s} />)}
            </div>
          </Card>

          {/* Jobs */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Job Opportunities</div>
              <button style={{ color: "#4CAF0A", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                View All <ChevronRight size={14} />
              </button>
            </div>
            <JobCard icon={Rocket} iconBg="#fff7ed" iconColor="#ea580c" title="Lead Full Stack Developer" company="TechCorp" mode="Hybrid" time="Today" />
            <JobCard icon={Lightbulb} iconBg="#fefce8" iconColor="#ca8a04" title="Senior Backend Engineer" company="InnovateLabs" mode="WFH" time="Yesterday" />
            <JobCard icon={Cloud} iconBg="#eff6ff" iconColor="#3b82f6" title="Full Stack Architect" company="CloudSystems" mode="On-site" time="2 days ago" />
          </Card>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Availability */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Availability</div>
            {[{ key: "immediate", label: "Immediate Joiner", sub: "Available now" }, { key: "15days", label: "15 Days", sub: "Notice period" }, { key: "30days", label: "30 Days", sub: "Notice period" }].map(opt => (
              <RadioOption key={opt.key} label={opt.label} sub={opt.sub} selected={availability === opt.key} onClick={() => setAvailability(opt.key)} />
            ))}
          </Card>

          {/* Work Preferences */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Work Preferences</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, fontWeight: 500 }}>Job Type</div>
            {[{ key: "permanent", label: "Permanent" }, { key: "contract", label: "Contract" }].map(opt => (
              <RadioOption key={opt.key} label={opt.label} selected={jobType === opt.key} onClick={() => setJobType(opt.key)} />
            ))}
            <div style={{ fontSize: 12, color: "#6b7280", margin: "14px 0 8px", fontWeight: 500 }}>Work Mode</div>
            {[{ key: "wfh", label: "Work From Home" }, { key: "hybrid", label: "Hybrid" }, { key: "onsite", label: "On-site" }].map(opt => (
              <RadioOption key={opt.key} label={opt.label} selected={workMode === opt.key} onClick={() => setWorkMode(opt.key)} />
            ))}
          </Card>

          {/* Quick Stats */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Quick Stats</div>
            {[
              { icon: BarChart2, label: "Profile Rank", value: "Top 5%", color: "#8b5cf6" },
              { icon: Clock, label: "Avg. Response", value: "2 hours", color: "#3b82f6" },
              { icon: Target, label: "Match Rate", value: "94%", color: "#4CAF0A" },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 2 ? 14 : 0 }}>
                <span style={{ fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon size={15} color={color} /> {label}
                </span>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{value}</span>
              </div>
            ))}
          </Card>

          {/* Recent Activity */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Recent Activity</div>
            {[
              { icon: Eye, color: "#4CAF0A", bg: "#f3ffe6", text: "Profile viewed by TechCorp", time: "2 hours ago" },
              { icon: Search, color: "#3b82f6", bg: "#eff6ff", text: "New job match found", time: "5 hours ago" },
              { icon: Star, color: "#8b5cf6", bg: "#f5f3ff", text: "Skill score updated", time: "1 day ago" },
            ].map(({ icon: Icon, color, bg, text, time }, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 14 : 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{text}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{time}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Bottom Banner */}
      <div style={{ marginTop: 24, background: "linear-gradient(90deg,#4CAF0A,#3a9a09)", borderRadius: 12, padding: "18px 28px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: 0 }}>
          Your profile is your proof. The stronger the profile, the faster companies will hire you.
        </p>
      </div>

      <style>{`* { box-sizing: border-box; } body { margin: 0; }`}</style>
    </div>
  );
}