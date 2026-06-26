import React, { useState, useEffect } from "react";
import thumbnailImage from "../../../assets/images/video.png";

const HowItWorksVideo = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section style={isMobile ? mobileStyles.section : styles.section}>
      <div style={styles.videoContainer}>
        <div style={styles.videoWrapper}>
          {!playVideo ? (
            <>
              {/* Thumbnail Image */}
              <img
                src={thumbnailImage}
                alt="Meeting Video Thumbnail"
                style={styles.thumbnail}
              />

              {/* Dark Overlay */}
              <div style={styles.overlay} />

              {/* Play Button */}
              <button
                style={isMobile ? mobileStyles.playBtn : styles.playBtn}
                aria-label="Play video"
                onClick={() => setPlayVideo(true)}
              >
                <svg
                  width={isMobile ? "20" : "30"}
                  height={isMobile ? "20" : "30"}
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              {/* Text Blocks */}
              <div style={isMobile ? mobileStyles.textBlock : styles.textBlock}>
                <h2 style={isMobile ? mobileStyles.title : styles.title}>
                  SEE HOW CREWZAAR WORKS
                </h2>

                <p style={isMobile ? mobileStyles.subtitle : styles.subtitle}>
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
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#f0f4ee",
    padding: "60px 40px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },

  // Limits the width on ultra-wide screens smoothly
  videoContainer: {
    width: "100%",
    maxWidth: "1050px",
    margin: "0 auto",
  },

  // Locks layout to standard 16:9 aspect ratio dynamically across sizes
  videoWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%", // 16:9 Aspect Ratio
    borderRadius: "22px",
    overflow: "hidden",
    backgroundColor: "#000",
    boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
  },

  thumbnail: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.25))",
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
    backgroundColor: "#41AA00",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 30px rgba(65, 170, 0, 0.55)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  },

  textBlock: {
    position: "absolute",
    bottom: "42px",
    left: "0",
    right: "0",
    zIndex: 2,
    textAlign: "center",
    padding: "0 40px",
    boxSizing: "border-box",
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
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
};

const mobileStyles = {
  section: {
    ...styles.section,
    padding: "32px 16px", // Tight bounds for clean mobile edge alignment
  },

  playBtn: {
    ...styles.playBtn,
    width: "56px",
    height: "56px",
    boxShadow: "0 6px 20px rgba(65, 170, 0, 0.6)",
  },

  textBlock: {
    ...styles.textBlock,
    bottom: "16px", // Keeps text nicely contained inside the view mask
    padding: "0 16px",
  },

  title: {
    ...styles.title,
    fontSize: "1.15rem", // Scale size cleanly for phone orientations
    margin: "0 0 4px 0",
    letterSpacing: "0.2px",
  },

  subtitle: {
    ...styles.subtitle,
    fontSize: "0.75rem", // Avoid stacking overlaps 
    lineHeight: 1.4,
  },
};

export default HowItWorksVideo;