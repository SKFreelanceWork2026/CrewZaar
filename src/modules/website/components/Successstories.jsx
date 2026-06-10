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
  <div
    style={{
      display: "flex",
      gap: "4px",
      marginTop: "18px",
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
    ))}
  </div>
);

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);

  const { quote, name, title, avatar, rating } = testimonials[current];

  return (
    <section
      style={{
        background: "#41AA00",
        padding: "80px 20px 70px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
<h2
  style={{
    color: "#fff",
    fontSize: "clamp(40px, 6vw, 64px)",
    fontWeight: 600,
    textTransform: "uppercase",
    margin: 0,
    letterSpacing: "-1px",
    lineHeight: 1,
    fontFamily: "Poppins, sans-serif",
  }}
>
  SUCCESS STORIES
</h2>
      <p
        style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "clamp(15px, 2.5vw, 17px)",
          marginTop: "18px",
          marginBottom: "70px",
          maxWidth: "680px",
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: "'Familjen Grotesk', Arimo, sans-serif",   // ← Familjen Grotesk for Sub Text
        }}
      >
        Real Hiring Success From Companies Using Crewzaar.
      </p>

      {/* CARD */}
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "28px",
          padding: "clamp(40px, 6vw, 52px) clamp(24px, 5vw, 48px)",
          backdropFilter: "blur(8px)",
          textAlign: "left",
        }}
      >
        {/* QUOTE ICON */}
        <div style={{ marginBottom: "34px" }}>
          <svg
            width="54"
            height="54"
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 24V14.4C0 6.432 4.768 1.376 14.304 0L15.68 2.784C11.2 3.712 8.832 6.272 8.288 10.464H14.4V24H0Zm17.6 0V14.4C17.6 6.432 22.368 1.376 31.904 0L33.28 2.784C28.8 3.712 26.432 6.272 25.888 10.464H32V24H17.6Z"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* QUOTE */}
        <p
          style={{
            color: "#fff",
            fontSize: "clamp(19px, 3.5vw, 22px)",
            lineHeight: "1.85",
            margin: 0,
            fontWeight: 400,
            fontFamily: "'Familjen Grotesk', Arimo, sans-serif",   // Sub text font
          }}
        >
          “{quote}”
        </p>

        {/* USER INFO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "42px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={avatar}
            alt={name}
            style={{
              width: "62px",
              height: "62px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.4)",
              flexShrink: 0,
            }}
          />

          <div>
            <h4
              style={{
                color: "#fff",
                margin: 0,
                fontSize: "clamp(17px, 2.8vw, 19px)",
                fontWeight: 700,
                fontFamily: "Poppins, sans-serif",   // Poppins for name
              }}
            >
              {name}
            </h4>

            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                margin: "6px 0 0 0",
                fontSize: "clamp(14px, 2.4vw, 15px)",
                fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
              }}
            >
              {title}
            </p>
          </div>
        </div>

        <StarRating count={rating} />
      </div>

      {/* DOTS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "40px",
        }}
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "34px" : "12px",
              height: "12px",
              borderRadius: "30px",
              border: "none",
              background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
              transition: "0.3s",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;