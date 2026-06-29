import { useState } from "react";
import {
  TrendingUp, TrendingDown, BarChart2, Eye, Layers
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

const PRIMARY = "#4CAF0A";
const PRIMARY_LIGHT = "#e8f5e1";

const stats = [
  { label: "Total Applications", value: "47", trend: "+8", up: true },
  { label: "Success Rate", value: "23%", trend: "+5%", up: true },
  { label: "Interview Rate", value: "34%", trend: "-2%", up: false },
  { label: "Avg Response Time", value: "5 days", trend: "-1 day", up: true },
];

const columns = [
  {
    title: "Applied", bg: "#f2f2f2", titleColor: "#333", count: 2,
    jobs: [
      { role: "React Developer", company: "Tech Corp", date: "May 15, 2026" },
      { role: "Frontend Engineer", company: "Digital Agency", date: "May 14, 2026" },
    ]
  },
  {
    title: "Under Review", bg: "#e8eeff", titleColor: "#3b4fbf", count: 1,
    jobs: [
      { role: "Full Stack Developer", company: "StartupXYZ", date: "May 12, 2026" },
    ]
  },
  {
    title: "Shortlisted", bg: "#f3e8ff", titleColor: "#7c3aed", count: 2,
    jobs: [
      { role: "UI Developer", company: "Design Studio", date: "May 10, 2026" },
      { role: "Senior React Dev", company: "CloudTech", date: "May 8, 2026" },
    ]
  },
  {
    title: "Interview", bg: "#fff0d6", titleColor: "#c27c00", count: 1,
    jobs: [
      { role: "Software Engineer", company: "Google", date: "May 5, 2026" },
    ]
  },
  {
    title: "Selected", bg: "#e4f7e1", titleColor: "#2a7d0f", count: 1,
    jobs: [
      { role: "React Developer", company: "Microsoft", date: "May 1, 2026" },
    ]
  },
  {
    title: "Rejected", bg: "#fde8e8", titleColor: "#c0392b", count: 1,
    jobs: [
      { role: "iOS Developer", company: "Apple", date: "Apr 28, 2026" },
    ]
  },
];

const chartData = [
  { month: "Jan", applied: 8, selected: 2 },
  { month: "Feb", applied: 12, selected: 3 },
  { month: "Mar", applied: 6, selected: 1 },
  { month: "Apr", applied: 15, selected: 5 },
  { month: "May", applied: 10, selected: 4 },
  { month: "Jun", applied: 9, selected: 3 },
];

export default function AppliedJobs() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "'Inter','Segoe UI',sans-serif", padding: "28px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>

        {/* Header */}
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>Applied Jobs</h1>
        <p style={{ margin: "4px 0 24px", fontSize: 13, color: "#888" }}>Track your application progress</p>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#aaa", fontWeight: 500 }}>{s.label}</p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a" }}>{s.value}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
                  {s.up
                    ? <TrendingUp size={13} color={PRIMARY} strokeWidth={2} />
                    : <TrendingDown size={13} color="#ef4444" strokeWidth={2} />
                  }
                  <span style={{ fontSize: 12, fontWeight: 600, color: s.up ? PRIMARY : "#ef4444" }}>{s.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kanban Board */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 5px rgba(0,0,0,0.07)", marginBottom: 20, overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,180px)", gap: 12, minWidth: 1120 }}>
            {columns.map((col, ci) => (
              <div key={ci}>
                {/* Column Header */}
                <div style={{ background: col.bg, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: col.titleColor }}>{col.title}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: col.titleColor, opacity: 0.75 }}>{col.count} application{col.count !== 1 ? "s" : ""}</p>
                </div>
                {/* Job Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.jobs.map((job, ji) => (
                    <div key={ji} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10, padding: "12px 12px 10px" }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{job.role}</p>
                      <p style={{ margin: "2px 0 6px", fontSize: 12, color: "#888" }}>{job.company}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#bbb" }}>{job.date}</span>
                        <button style={{ background: "none", border: "none", fontSize: 12, color: PRIMARY, fontWeight: 600, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 3 }}>
                          <Eye size={11} color={PRIMARY} strokeWidth={2} />
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Analytics */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <BarChart2 size={17} color={PRIMARY} strokeWidth={2} />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Application Analytics</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#aaa" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#aaa" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 12 }}
                cursor={{ fill: "#f9f9f9" }}
              />
              <Bar dataKey="applied" name="Applied" fill={PRIMARY_LIGHT} stroke={PRIMARY} strokeWidth={1} radius={[4,4,0,0]} />
              <Bar dataKey="selected" name="Selected" fill={PRIMARY} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 12 }}>
            {[{ color: PRIMARY_LIGHT, stroke: PRIMARY, label: "Applied" }, { color: PRIMARY, label: "Selected" }].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color, border: l.stroke ? `1.5px solid ${l.stroke}` : "none" }} />
                <span style={{ fontSize: 12, color: "#888" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}