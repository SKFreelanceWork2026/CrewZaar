import React, { useState } from "react";

const HowItWorksVideo = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section style={styles.section}>
      <div style={styles.videoWrapper}>
        {!playVideo ? (
          <>
            {/* Thumbnail Image */}
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
              alt="Meeting Video Thumbnail"
              style={styles.thumbnail}
            />

            {/* Dark Overlay */}
            <div style={styles.overlay} />

            {/* Play Button */}
            <button
              style={styles.playBtn}
              aria-label="Play video"
              onClick={() => setPlayVideo(true)}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Text */}
            <div style={styles.textBlock}>
              <h2 style={styles.title}>
                SEE HOW CREWZAAR WORKS
              </h2>

              <p style={styles.subtitle}>
                Understand how candidates get verified and how
                companies hire faster using Crewzaar.
              </p>
            </div>
          </>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&rel=0"
            title="Crewzaar Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={styles.iframe}
          />
        )}
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#f0f4ee",
    padding: "60px 80px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },

  videoWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "1050px",
    height: "560px",
    borderRadius: "22px",
    overflow: "hidden",
    backgroundColor: "#000",
    boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.25))",
    zIndex: 1,
  },

  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,

    width: "86px",
    height: "86px",

    borderRadius: "50%",
    backgroundColor: "#3ab54a",

    border: "none",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    boxShadow: "0 8px 30px rgba(58,181,74,0.55)",

    transition: "0.3s ease",
  },

  textBlock: {
    position: "absolute",
    bottom: "42px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,

    textAlign: "center",
    width: "100%",
    padding: "0 24px",
  },

  title: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "900",
    margin: "0 0 10px 0",
    letterSpacing: "0.6px",
  },

  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "1rem",
    margin: 0,
    lineHeight: 1.7,
  },

  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
};

export default HowItWorksVideo;