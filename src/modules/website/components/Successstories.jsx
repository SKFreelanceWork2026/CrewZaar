import { useState, useEffect } from "react";
import successstoriescardbg from "../../../assets/images/successstoriescardbg.jpeg";
import personsuccessstories from "../../../assets/images/personsuccessstories.jpeg";

const cardBg = successstoriescardbg;

const testimonials = [
  {
    quote:
      "Crewzaar transforms the hiring process by connecting skill-tested, interview-ready professionals with companies looking for reliable talent — faster, smarter, and more efficiently.",
    name: "Alex Rivera",
    title: "Fullstack Developer",
    avatar: personsuccessstories,
    rating: 5,
  },
  {
    quote:
      "Crewzaar transforms the hiring process by connecting skill-tested, interview-ready professionals with companies looking for reliable talent — faster, smarter, and more efficiently.",
    name: "Johnson",
    title: "Fullstack Developer",
    avatar: personsuccessstories,
    rating: 5,
  },
  {
    quote:
      "Crewzaar transforms the hiring process by connecting skill-tested, interview-ready professionals with companies looking for reliable talent — faster, smarter, and more efficiently.",
    name: "Marcus Chen",
    title: "Fullstack Developer",
    avatar: personsuccessstories,
    rating: 5,
  },
];

const StarRating = ({ count, size = 14 }) => (
  <div style={{ display: "flex", gap: "4px", marginTop: "14px" }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
    ))}
  </div>
);

const Card = ({ testimonial, variant }) => {
  const isCenter = variant === "center";

  const photoSize = isCenter ? 210 : 130;
  const pullUp = photoSize / 2;

  return (
    <div
      className={variant === "side" ? "side-card" : "center-card"}
      style={{
        width: "100%",
        maxWidth: isCenter ? "440px" : "280px",
        minHeight: isCenter ? "400px" : "320px",
        backgroundImage: `url(${cardBg})`,
        backgroundColor: "#39ad04",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        borderRadius: "28px",
        position: "relative",
        marginTop: `${pullUp + 15}px`, 
        flexShrink: 0,
        opacity: isCenter ? 1 : 0.85,
        transform: isCenter ? "scale(1)" : "scale(0.95)",
        boxShadow: isCenter ? "0 20px 40px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s ease-in-out",
      }}
    >
      <div
        style={{
          width: `${photoSize}px`,
          height: `${photoSize}px`,
          borderRadius: "50%",
          position: "absolute",
          top: `-${pullUp}px`,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ffffff", 
          padding: isCenter ? "8px" : "0px", 
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", 
        }}
      >
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: isCenter ? "120px 36px 36px" : "85px 22px 24px",
          color: "#ffffff",
          textAlign: "left",
        }}
      >
        <svg
          width={isCenter ? "30" : "18"}
          height={isCenter ? "22" : "14"}
          viewBox="0 0 34 26"
          fill="none"
          style={{ opacity: 0.5, marginBottom: "4px" }}
        >
          <path
            d="M0 26V14.5C0 6.5 5.5 0.8 13.5 0L14.5 4.5C9.5 5.3 7 8 6.7 11.5H13.5V26H0ZM19.5 26V14.5C19.5 6.5 25 0.8 33 0L34 4.5C29 5.3 26.5 8 26.2 11.5H33V26H19.5Z"
            fill="white"
          />
        </svg>

        <p
          style={{
            fontSize: isCenter ? "15px" : "12px",
            lineHeight: isCenter ? "1.6" : "1.5",
            marginTop: "8px",
            marginBottom: 0,
            opacity: 0.95,
            fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
          }}
        >
          {testimonial.quote}
        </p>

        <h3
          style={{
            marginTop: isCenter ? "28px" : "20px",
            marginBottom: "1px",
            fontSize: isCenter ? "26px" : "18px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            letterSpacing: "-0.5px",
          }}
        >
          {testimonial.name}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: isCenter ? "14px" : "11px",
            opacity: 0.8,
            fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
          }}
        >
          {testimonial.title}
        </p>

        <StarRating count={testimonial.rating} size={isCenter ? 16 : 11} />
      </div>
    </div>
  );
};

const SuccessStories = () => {
  const [current, setCurrent] = useState(1);

  // Auto moving slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3500); // Transitions to the next slide every 3.5 seconds

    return () => clearInterval(timer);
  }, []);

  const leftIndex = (current + testimonials.length - 1) % testimonials.length;
  const rightIndex = (current + 1) % testimonials.length;

  return (
    <section
      style={{
        background: "#ffffff", 
        padding: "80px 16px 80px",
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "'Familjen Grotesk', Arimo, sans-serif",
      }}
    >
      {/* Responsive Native CSS Variables injection: 
        Hides the side flanking cards completely on mobile so that 
        exactly 1 focused card fills the center screen viewport seamlessly.
      */}
      <style>{`
        .testimonial-flex-container {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 32px;
          flex-flow: row nowrap;
          transition: all 0.4s ease;
        }
        @media (max-width: 767px) {
          .side-card {
            display: none !important; /* Forces only one single active card on mobile views */
          }
          .center-card {
            max-width: 100% !important;
            width: 100% !important;
          }
          .testimonial-flex-container {
            padding: 0 12px;
          }
        }
      `}</style>

      {/* Styled Heading Section */}
      <h2
        style={{
          fontSize: "clamp(32px, 5.5vw, 56px)",
          fontWeight: 800,
          textTransform: "uppercase",
          margin: 0,
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
          fontFamily: "'Poppins', 'Arial Black', sans-serif",
          display: "inline-block",
        }}
      >
        <span style={{ color: "#39ad04" }}>SUCCESS STORIES</span>
      </h2>

      <p
        style={{
          color: "#5b7083", 
          fontSize: "clamp(15px, 2.2vw, 19px)",
          marginTop: "18px",
          marginBottom: "60px",
          fontWeight: "400",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        Real hiring success from companies using Crewzaar.
      </p>

      {/* Responsive Cards Section Container */}
      <div 
        className="testimonial-flex-container"
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "20px",
        }}
      >
        <Card testimonial={testimonials[leftIndex]} variant="side" />
        <Card testimonial={testimonials[current]} variant="center" />
        <Card testimonial={testimonials[rightIndex]} variant="side" />
      </div>

      {/* Navigation Indicators */}
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
              background: i === current ? "#39ad04" : "rgba(57, 173, 4, 0.25)",
              transition: "0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;