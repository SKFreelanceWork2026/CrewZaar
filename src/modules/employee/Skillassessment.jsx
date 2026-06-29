import { useState } from "react";
import {
  Trophy, Target, TrendingUp, Award, Clock, Star,
  Play, ChevronRight, Calendar, Sparkles, Users
} from "lucide-react";

const PRIMARY = "#4CAF0A";
const PRIMARY_LIGHT = "#e8f5e1";
const PRIMARY_MID = "#c5e8a0";

const stats = [
  { label: "Tests Completed", value: "24", icon: Trophy, iconColor: PRIMARY },
  { label: "Average Score", value: "87%", icon: Target, iconColor: "#3b82f6" },
  { label: "Skill Rank", value: "#342", icon: TrendingUp, iconColor: "#f59e0b" },
  { label: "Global Percentile", value: "Top 15%", icon: Award, iconColor: "#ef4444" },
];

const tests = [
  { title: "ReactJS Advanced", level: "Advanced", levelColor: "#ef4444", time: "45 min", questions: 30, score: 92, progress: 100, state: "done" },
  { title: "UI/UX Design Principles", level: "Intermediate", levelColor: "#f59e0b", time: "30 min", questions: 25, score: 88, progress: 100, state: "done" },
  { title: "TypeScript Fundamentals", level: "Intermediate", levelColor: "#f59e0b", time: "40 min", questions: 28, progress: 60, state: "continue" },
  { title: "Communication Skills", level: "Beginner", levelColor: PRIMARY, time: "25 min", questions: 20, state: "start" },
  { title: "Aptitude Test", level: "Advanced", levelColor: "#ef4444", time: "60 min", questions: 40, state: "start" },
  { title: "English Fluency", level: "Beginner", levelColor: PRIMARY, time: "20 min", questions: 15, state: "start" },
];

const leaderboard = [
  { name: "Sarah Johnson", score: 98, rank: 1 },
  { name: "Michael Chen", score: 96, rank: 2 },
  { name: "Emily Davis", score: 94, rank: 3 },
  { name: "You", score: 87, isYou: true, initials: "JD" },
];

const upcoming = [
  { name: "JavaScript ES6+", date: "May 20, 2026" },
  { name: "System Design", date: "May 25, 2026" },
  { name: "Data Structures", date: "May 28, 2026" },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", flex: 1, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p style={{ margin: 0, fontSize: 12, color: "#888", fontWeight: 500 }}>{stat.label}</p>
        <p style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 800, color: "#1a1a1a" }}>{stat.value}</p>
      </div>
      <div style={{ background: stat.iconColor + "18", borderRadius: 10, padding: 10 }}>
        <Icon size={22} color={stat.iconColor} strokeWidth={1.8} />
      </div>
    </div>
  );
}

function ProgressBar({ value, color = PRIMARY }) {
  return (
    <div style={{ background: "#eee", borderRadius: 999, height: 6, overflow: "hidden" }}>
      <div style={{ background: color, height: 6, width: `${value}%`, borderRadius: 999, transition: "width 0.4s" }} />
    </div>
  );
}

function TestCard({ test }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{test.title}</h3>
        <span style={{ fontSize: 11, fontWeight: 700, color: test.levelColor, background: test.levelColor + "18", borderRadius: 20, padding: "3px 10px" }}>{test.level}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#888", fontSize: 13 }}>
          <Clock size={13} strokeWidth={2} />
          {test.time}
        </div>
        <span style={{ fontSize: 13, color: "#888" }}>{test.questions} questions</span>
      </div>

      {test.score && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#1a1a1a", fontWeight: 600 }}>
          <Star size={14} fill={PRIMARY} color={PRIMARY} />
          Score: {test.score}%
        </div>
      )}

      {test.progress !== undefined && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#888" }}>Progress</span>
            <span style={{ fontSize: 12, color: "#888" }}>{test.progress}%</span>
          </div>
          <ProgressBar value={test.progress} />
        </div>
      )}

      {test.state === "done" && (
        <button style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "9px", fontSize: 13, color: "#555", cursor: "pointer", fontWeight: 500 }}>
          View Results
        </button>
      )}
      {test.state === "continue" && (
        <button style={{ background: "#fff4ef", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, color: "#e8521a", cursor: "pointer", fontWeight: 600 }}>
          Continue Test
        </button>
      )}
      {test.state === "start" && (
        <button style={{ background: PRIMARY, border: "none", borderRadius: 8, padding: "10px", fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Play size={13} fill="#fff" color="#fff" />
          Start Test
        </button>
      )}
    </div>
  );
}

function RankIcon({ rank }) {
  const colors = { 1: "#f59e0b", 2: "#9ca3af", 3: "#cd7c2f" };
  return (
    <div style={{ background: (colors[rank] || "#eee") + "22", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Trophy size={16} color={colors[rank] || "#aaa"} strokeWidth={1.8} />
    </div>
  );
}

export default function SkillAssessment() {
  const [activeTest, setActiveTest] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: "28px 24px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1a1a1a" }}>Skill Assessment</h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#888" }}>Test your skills and track your progress</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          {stats.map((s, i) => <StatCard key={i} stat={s} />)}
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>

          {/* Left: Available Tests */}
          <div>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>Available Tests</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {tests.map((t, i) => <TestCard key={i} test={t} />)}
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Leaderboard */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Trophy size={17} color={PRIMARY} strokeWidth={2} />
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Leaderboard</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {leaderboard.map((p, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", borderRadius: 10,
                    background: p.isYou ? PRIMARY_LIGHT : "transparent",
                    border: p.isYou ? `1px solid ${PRIMARY_MID}` : "1px solid transparent"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {p.isYou ? (
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{p.initials}</span>
                        </div>
                      ) : (
                        <RankIcon rank={p.rank} />
                      )}
                      <span style={{ fontSize: 14, fontWeight: p.isYou ? 700 : 500, color: "#1a1a1a" }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: p.isYou ? PRIMARY : "#1a1a1a" }}>{p.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tests */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Calendar size={17} color={PRIMARY} strokeWidth={2} />
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Upcoming Tests</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {upcoming.map((t, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < upcoming.length - 1 ? "1px solid #f0f0f0" : "none"
                  }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{t.name}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "#aaa" }}>{t.date}</p>
                    </div>
                    <ChevronRight size={15} color="#ccc" />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #6abf07 100%)`, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Sparkles size={17} color="#fff" strokeWidth={2} />
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" }}>AI Recommendations</h3>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                Based on your profile, we recommend taking the System Design test
              </p>
              <button style={{
                width: "100%", background: "#fff", border: "none", borderRadius: 8,
                padding: "10px", fontSize: 13, fontWeight: 600, color: PRIMARY, cursor: "pointer"
              }}>
                View Recommendations
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}