import { useState } from "react";

const testimonials = [
  {
    quote:
      "Crewzaar helped us hire 3 verified developers within days. The quality of candidates was outstanding and saved us weeks of screening.",
    name: "Alex Johnson",
    title: "Founder, TechStart Inc.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    quote:
      "We filled 5 senior roles in under two weeks. The skill verification process meant every candidate was genuinely qualified. Game changer for our team.",
    name: "Priya Mehta",
    title: "HR Director, ScaleUp Labs",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    quote:
      "The platform's direct hiring feature cut our time-to-hire by 60%. We've made Crewzaar our go-to for all technical recruitment.",
    name: "Marcus Chen",
    title: "CTO, BuildFast Co.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: "4px", marginTop: "12px" }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="#FFD700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
    ))}
  </div>
);

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (index) => setCurrent(index);

  const { quote, name, title, avatar, rating } = testimonials[current];

  return (
    <section
      style={{
        backgroundColor: "#3aaa35",
        padding: "72px 24px",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          color: "#ffffff",
          fontSize: "clamp(22px, 4vw, 32px)",
          fontWeight: "800",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Success Stories
      </h2>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", marginBottom: "40px" }}>
        Real Hiring Success From Companies Using Crewzaar.
      </p>

      {/* Card */}
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "16px",
          padding: "36px 32px 28px",
          textAlign: "left",
          transition: "all 0.3s ease",
        }}
      >
        {/* Quote icon */}
        <div style={{ marginBottom: "16px" }}>
          <svg width="32" height="24" viewBox="0 0 32 24" fill="rgba(255,255,255,0.5)">
            <path d="M0 24V14.4C0 6.432 4.768 1.376 14.304 0L15.68 2.784C11.2 3.712 8.832 6.272 8.288 10.464H14.4V24H0Zm17.6 0V14.4C17.6 6.432 22.368 1.376 31.904 0L33.28 2.784C28.8 3.712 26.432 6.272 25.888 10.464H32V24H17.6Z" />
          </svg>
        </div>

        {/* Quote text */}
        <p
          style={{
            color: "#ffffff",
            fontSize: "15px",
            lineHeight: "1.7",
            marginBottom: "24px",
            fontStyle: "italic",
          }}
        >
          "{quote}"
        </p>

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={avatar}
            alt={name}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          />
          <div>
            <p style={{ color: "#ffffff", fontWeight: "700", fontSize: "14px", margin: 0 }}>
              {name}
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", margin: 0 }}>
              {title}
            </p>
          </div>
        </div>

        <StarRating count={rating} />
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "24px" : "10px",
              height: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;