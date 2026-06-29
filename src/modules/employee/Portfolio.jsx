import { useState } from "react";
import { Eye, Heart, Plus, ExternalLink, Code2 } from "lucide-react";

const BRAND = "#4CAF0A";
const BRAND_DARK = "#2e7a00";
const BRAND_LIGHT = "#e8f5e1";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce application with React and Node.js",
    tags: ["React", "Node.js", "MongoDB"],
    views: 1234,
    likes: 45,
    color: "#5B9BD5",
    featured: true,
    featuredDesc:
      "A comprehensive e-commerce solution with advanced features including payment integration, inventory management, and real-time analytics.",
  },
  {
    id: 2,
    title: "Task Management App",
    desc: "Collaborative task management tool with real-time updates",
    tags: ["React", "Firebase", "Tailwind"],
    views: 892,
    likes: 32,
    color: "#B07FD4",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    desc: "Real-time weather dashboard with beautiful visualizations",
    tags: ["React", "API", "Charts"],
    views: 654,
    likes: 28,
    color: "#E8924A",
  },
  {
    id: 4,
    title: "Portfolio Website",
    desc: "Modern portfolio website with animations",
    tags: ["React", "Motion", "CSS"],
    views: 1567,
    likes: 67,
    color: "#4CAF0A",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    desc: "Analytics dashboard for social media metrics",
    tags: ["React", "D3.js", "API"],
    views: 432,
    likes: 19,
    color: "#E85C9A",
  },
  {
    id: 6,
    title: "Chat Application",
    desc: "Real-time chat app with WebSocket",
    tags: ["React", "WebSocket", "Express"],
    views: 789,
    likes: 41,
    color: "#7B7FD4",
  },
];

const styles = {
  page: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a18",
    padding: "0",
    margin: "0",
  },
  app: {
    maxWidth: "1060px",
    margin: "0 auto",
    padding: "28px 24px",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "28px",
  },
  h1: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a18",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "#888",
    marginTop: "3px",
  },
  btnAdd: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: BRAND,
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "#fff",
    border: "1px solid #e8e8e5",
    borderRadius: "12px",
    padding: "20px 22px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a18",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  projectCard: {
    backgroundColor: "#fff",
    border: "1px solid #e8e8e5",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  projectThumb: {
    height: "120px",
    width: "100%",
    display: "block",
  },
  projectBody: {
    padding: "14px 16px",
  },
  projectTitle: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "4px",
    color: "#1a1a18",
  },
  projectDesc: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  tagsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    marginBottom: "10px",
  },
  tag: {
    fontSize: "11px",
    padding: "3px 9px",
    borderRadius: "20px",
    backgroundColor: BRAND_LIGHT,
    color: BRAND_DARK,
    fontWeight: "500",
    border: `1px solid #c6e6a0`,
  },
  projectMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: "#888",
  },
  featured: {
    background: `linear-gradient(135deg, #3d9206 0%, ${BRAND} 100%)`,
    borderRadius: "14px",
    padding: "28px 30px",
  },
  featuredEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#c3f08a",
    fontWeight: "600",
    marginBottom: "10px",
  },
  featuredDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#c3f08a",
  },
  featuredTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "8px",
  },
  featuredDesc: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.85)",
    lineHeight: "1.65",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  featuredBtns: {
    display: "flex",
    gap: "10px",
  },
  btnViewProject: {
    padding: "10px 22px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: BRAND_DARK,
    border: "2px solid #ffffff",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  btnViewCode: {
    padding: "10px 22px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#fff",
    border: "2px solid rgba(255,255,255,0.75)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

function StatCard({ label, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.projectCard,
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.07)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{ ...styles.projectThumb, backgroundColor: project.color }}
      />
      <div style={styles.projectBody}>
        <div style={styles.projectTitle}>{project.title}</div>
        <div style={styles.projectDesc}>{project.desc}</div>
        <div style={styles.tagsRow}>
          {project.tags.map((tag) => (
            <span key={tag} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div style={styles.projectMeta}>
          <div style={styles.metaItem}>
            <Eye size={13} />
            {project.views.toLocaleString()}
          </div>
          <div style={styles.metaItem}>
            <Heart size={13} />
            {project.likes}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <div style={styles.featured}>
      <div style={styles.featuredEyebrow}>
        <div style={styles.featuredDot} />
        Featured Project
      </div>
      <div style={styles.featuredTitle}>{project.title}</div>
      <div style={styles.featuredDesc}>{project.featuredDesc}</div>
      <div style={styles.featuredBtns}>
        <button style={styles.btnViewProject}>
          <ExternalLink size={14} />
          View Project
        </button>
        <button style={styles.btnViewCode}>
          <Code2 size={14} />
          View Code
        </button>
      </div>
    </div>
  );
}

const totalViews = projects.reduce((s, p) => s + p.views, 0);
const totalLikes = projects.reduce((s, p) => s + p.likes, 0);
const featured = projects.find((p) => p.featured);

export default function Portfolio() {
  return (
    <div style={styles.page}>
      <div style={styles.app}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.h1}>My Portfolio</h1>
            <p style={styles.subtitle}>Showcase your best work</p>
          </div>
          <button style={styles.btnAdd}>
            <Plus size={15} />
            Add Project
          </button>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <StatCard label="Total Projects" value={projects.length} />
          <StatCard label="Total Views" value={totalViews.toLocaleString()} />
          <StatCard label="Total Likes" value={totalLikes} />
        </div>

        {/* Projects Grid */}
        <div style={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Featured */}
        {featured && <FeaturedProject project={featured} />}
      </div>
    </div>
  );
}