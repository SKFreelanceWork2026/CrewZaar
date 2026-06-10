const posts = [
  {
    id: 1,
    date: "April 8, 2026",
    title: "How to Hire Skilled Developers Faster",
    excerpt:
      "Learn the essential strategies that top founders use to build and scale remote-first companies.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    id: 2,
    date: "April 5, 2026",
    title: "Why Skill-Based Hiring is the Future",
    excerpt:
      "Discover how the remote work landscape is evolving and what it means for your business.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
  },
  {
    id: 3,
    date: "April 1, 2026",
    title: "How to Prepare for Technical Interviews",
    excerpt:
      "The revolutionary approach to hiring that saves time and finds better candidates.",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&q=80",
  },
];

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="#888" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="3" width="14" height="12" rx="2" stroke="#888" strokeWidth="1.4" fill="none" />
    <path d="M5 1v4M11 1v4M1 7h14" stroke="#888" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8h14M9 2l6 6-6 6" stroke="#3aaa35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BlogSection = () => {
  return (
    <section
      style={{
        backgroundColor: "#f9f9f9",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(22px, 4vw, 34px)",
          fontWeight: "900",
          color: "#1a1a1a",
          letterSpacing: "-0.3px",
          marginBottom: "8px",
        }}
      >
        HIRING{" "}
        <span style={{ color: "#3aaa35" }}>INSIGHTS & CAREER TIPS</span>
      </h2>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "48px" }}>
        Expert tips on recruitment, skill development, and career growth.
      </p>

      {/* Cards grid */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              flex: "1 1 280px",
              maxWidth: "300px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              textAlign: "left",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
            }}
          >
            {/* Image */}
            <div style={{ height: "170px", overflow: "hidden" }}>
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "20px" }}>
              {/* Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                <CalendarIcon />
                <span style={{ fontSize: "11px", color: "#888" }}>{post.date}</span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  lineHeight: "1.4",
                  margin: "0 0 10px",
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  lineHeight: "1.6",
                  margin: "0 0 16px",
                }}
              >
                {post.excerpt}
              </p>

              {/* Read More */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#3aaa35",
                  fontWeight: "700",
                  fontSize: "12px",
                  textDecoration: "none",
                  letterSpacing: "0.3px",
                }}
              >
                Read More
                <ArrowIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;