import React, { useState } from "react";

import contactHeaderBg from "../../../assets/images/contactheader.png";
import Footer from "../components/Footer";
const ContactUs = () => {
  // State to track which field is currently focused (for dynamic green borders)
  const [focusedField, setFocusedField] = useState("");

  // Form states for basic validation tracking
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  // Helper function to get dynamic borders based on focus state
  const getInputBorderStyle = (fieldName) => {
    return focusedField === fieldName 
      ? "1px solid #58A93B"  // Vibrant green border when typing/focused
      : "1px solid #E2E8F0"; // Default subtle gray border
  };

  const styles = {
    container: {
      backgroundColor: "#ffffff",
      fontFamily: "'Inter', sans-serif",
    },
    hero: {
      backgroundImage: `url(${contactHeaderBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      paddingTop: "80px",
      paddingBottom: "80px",
      textAlign: "center",
    },
    heroTitle: {
      color: "#ffffff",
      fontSize: "48px",
      fontWeight: "700",
      margin: "0 0 12px 0",
    },
    heroSub: {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "500",
      margin: 0,
    },
    heroHighlight: {
      color: "#CDFF5B",
      fontWeight: "600",
    },
    main: {
      paddingTop: "90px",
      paddingBottom: "90px",
      backgroundColor: "#ffffff",
    },
    contentWrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    flexRow: {
      display: "flex",
      gap: "48px",
      alignItems: "stretch",
    },
    leftColumn: {
      flex: "1 1 60%",
    },
    rightColumn: {
      flex: "1 1 40%",
    },
    labelWrap: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px",
    },
    greenLine: {
      width: "20px",
      height: "3px",
      backgroundColor: "#4DAA22",
      borderRadius: "2px",
    },
    labelText: {
      color: "#4DAA22",
      letterSpacing: "2px",
      fontWeight: "700",
      fontSize: "13px",
    },
    heading: {
      fontSize: "44px",
      fontWeight: "800",
      margin: "0 0 40px 0",
      color: "#161c2d",
      lineHeight: "1.1",
    },
    headingSpan: {
      color: "#4DAA22",
      fontStyle: "italic",
      fontFamily: "Georgia, serif",
      fontWeight: "400",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formLabel: {
      display: "block",
      fontSize: "14px",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#22252a",
    },
    formInput: {
      width: "100%",
      padding: "14px 14px 14px 48px",
      fontSize: "14px",
      color: "#161c2d",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif",
      transition: "border 0.25s ease, box-shadow 0.25s ease",
    },
    textarea: {
      width: "100%",
      padding: "14px 14px 14px 48px",
      fontSize: "14px",
      color: "#161c2d",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif",
      resize: "vertical",
      minHeight: "150px",
      transition: "border 0.25s ease, box-shadow 0.25s ease",
    },
    inputWrapper: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#58A93B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    textareaIcon: {
      position: "absolute",
      left: "16px",
      top: "16px",
      color: "#58A93B",
    },
    formRow: {
      display: "flex",
      gap: "20px",
    },
    formCol: {
      flex: "1",
    },
    btn: {
      position: "relative",
      backgroundColor: "#58A93B",
      borderRadius: "50px",
      height: "54px",
      width: "195px",
      border: "none",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "15px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
    },
    btnIcon: {
      position: "absolute",
      left: "6px",
      top: "6px",
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      color: "#58A93B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    btnText: {
      marginLeft: "38px",
      zIndex: 1,
      display: "inline-block",
    },
    card: {
      backgroundColor: "#58A93B",
      borderRadius: "30px 120px 30px 30px",
      color: "#ffffff",
      padding: "32px",
      minHeight: "620px",
    },
    infoRow: {
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      marginBottom: "8px",
    },
    iconCircle: {
      width: "68px",
      height: "68px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "transform 0.3s ease",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "700",
      margin: "0 0 6px 0",
    },
    sectionBody: {
      opacity: "0.9",
      fontSize: "14px",
      lineHeight: "1.6",
      margin: 0,
    },
    dashed: {
      borderTop: "1px dashed rgba(255, 255, 255, 0.3)",
      marginTop: "20px",
      marginBottom: "20px",
    },
    socialTitle: {
      fontSize: "18px",
      fontWeight: "700",
      margin: "0 0 16px 0",
    },
    socialWrap: {
      display: "flex",
      gap: "12px",
    },
    socialBtn: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      border: "none",
      color: "#58A93B",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s",
    },
    topBar: {
      backgroundColor: "#f8f9fa",
      padding: "8px 0",
      borderBottom: "1px solid #e9ecef",
    },
    topBarContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    topBarLeft: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    topBarRight: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    topBarLink: {
      color: "#333",
      textDecoration: "none",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontWeight: "500",
      transition: "color 0.25s ease",
    },
    topBarSocial: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },
    topBarSocialBtn: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      backgroundColor: "#58A93B",
      border: "none",
      color: "#ffffff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      padding: 0,
      flexShrink: 0,
    },
  };

  const responsiveStyles = `
    @media (max-width: 992px) {
      .flex-row { flex-direction: column !important; }
      .left-column, .right-column { flex: 1 1 100% !important; }
      .form-row { flex-direction: column !important; }
      .card-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 20px !important;
      }
      .top-bar-content { flex-direction: column !important; gap: 8px !important; }
    }
    @media (max-width: 768px) {
      .hero-title { font-size: 32px !important; }
      .heading { font-size: 28px !important; }
      .card-grid { grid-template-columns: 1fr !important; }
      .hero-section, .main-section { padding-top: 40px !important; padding-bottom: 40px !important; }
      .card {
        padding: 24px 16px !important;
        border-radius: 20px 80px 20px 20px !important;
        min-height: auto !important;
      }
      .top-bar-left { flex-direction: column !important; gap: 4px !important; }
    }
    .social-btn:hover { transform: scale(1.1); }
    .top-bar-social-btn:hover { transform: translateY(-2px); }

    /* --- TOP BAR HOVER STYLES --- */
    .top-bar-link-item:hover {
      color: #58A93B !important;
    }

    /* --- GREEN INFO CARD HOVER STYLES --- */
    .info-block-wrapper {
      cursor: pointer;
    }
    .info-block-wrapper:hover .card-icon-circle {
      transform: scale(1.08);
    }
    .info-block-wrapper:hover .card-text-body {
      color: #CDFF5B !important; /* Highlights with matching clean chartreuse/green on the dark green card */
      opacity: 1 !important;
    }
    .info-block-wrapper a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    /* --- TOGGLE BUTTON CODE --- */
    .switch-slide-btn {
      transition: transform 0.2s ease !important;
    }
    .switch-slide-btn .btn-label-text {
      transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .switch-slide-btn:hover .btn-label-text {
      transform: translateX(-34px);
    }
    .switch-slide-btn .circle-toggle {
      transition: left 0.38s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .switch-slide-btn:hover .circle-toggle {
      left: 147px !important; 
    }
    .switch-slide-btn:active {
      transform: scale(0.97);
    }
  `;

  // Icons
  const PersonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const TagIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );

  const EditIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5l-12 12L3 21l5.5-1.5 12-12L16.5 3.5z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const YouTubeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z" />
      <polygon points="10,8 16,12 10,16" fill="white" />
    </svg>
  );

  const PhoneIconSmall = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const EmailIconSmall = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#58A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const TopBarFacebookIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const TopBarTwitterIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );

  const TopBarLinkedInIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const TopBarInstagramIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const TopBarYouTubeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z" />
      <polygon points="10,8 16,12 10,16" fill="#58A93B" />
    </svg>
  );

  return (
    <div style={styles.container}>

      <style>{responsiveStyles}</style>

      {/* Top Bar - Turns green smoothly on item hover */}
      <div style={styles.topBar}>
        <div style={styles.topBarContent} className="top-bar-content">
          <div style={styles.topBarLeft} className="top-bar-left">
            <a href="tel:+14065550120" style={styles.topBarLink} className="top-bar-link-item">
              <PhoneIconSmall />
              (406) 555-0120
            </a>
            <a href="mailto:hello@crewzaar.com" style={styles.topBarLink} className="top-bar-link-item">
              <EmailIconSmall />
              hello@crewzaar.com
            </a>
          </div>
          <div style={styles.topBarRight}>
            <div style={styles.topBarSocial}>
              <button style={styles.topBarSocialBtn} className="top-bar-social-btn" aria-label="Facebook">
                <TopBarFacebookIcon />
              </button>
              <button style={styles.topBarSocialBtn} className="top-bar-social-btn" aria-label="Twitter">
                <TopBarTwitterIcon />
              </button>
              <button style={styles.topBarSocialBtn} className="top-bar-social-btn" aria-label="LinkedIn">
                <TopBarLinkedInIcon />
              </button>
              <button style={styles.topBarSocialBtn} className="top-bar-social-btn" aria-label="Instagram">
                <TopBarInstagramIcon />
              </button>
              <button style={styles.topBarSocialBtn} className="top-bar-social-btn" aria-label="YouTube">
                <TopBarYouTubeIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={styles.hero} className="hero-section">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={styles.heroTitle} className="hero-title">Contact Us</h1>
          <p style={styles.heroSub}>
            Home &nbsp;/&nbsp; <span style={styles.heroHighlight}>Contact Us</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main} className="main-section">
        <div style={styles.contentWrapper}>
          <div style={styles.flexRow} className="flex-row">
            
            {/* Left Column - Form */}
            <div style={styles.leftColumn} className="left-column">
              <div style={styles.labelWrap}>
                <div style={styles.greenLine} />
                <span style={styles.labelText}>CONTACT US</span>
              </div>

              <h2 style={styles.heading} className="heading">
                Get Your <span style={styles.headingSpan}>Free Quote Today!</span>
              </h2>

              {/* Form implementation with interactive borders */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={styles.formRow} className="form-row">
                  <div style={styles.formCol}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Your Name *</label>
                      <div style={styles.inputWrapper}>
                        <span style={styles.inputIcon}>
                          <PersonIcon />
                        </span>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange(e, "name")}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField("")}
                          style={{
                            ...styles.formInput,
                            border: getInputBorderStyle("name"),
                          }}
                          placeholder="Ex. John Doe"
                        />
                      </div>
                    </div>
                  </div>
                  <div style={styles.formCol}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email *</label>
                      <div style={styles.inputWrapper}>
                        <span style={styles.inputIcon}>
                          <EmailIcon />
                        </span>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange(e, "email")}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField("")}
                          style={{
                            ...styles.formInput,
                            border: getInputBorderStyle("email"),
                          }}
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Subject *</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>
                      <TagIcon />
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange(e, "subject")}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField("")}
                      style={{
                        ...styles.formInput,
                        border: getInputBorderStyle("subject"),
                      }}
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Your Message *</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.textareaIcon}>
                      <EditIcon />
                    </span>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange(e, "message")}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField("")}
                      style={{
                        ...styles.textarea,
                        border: getInputBorderStyle("message"),
                      }}
                      placeholder="Enter here..."
                    />
                  </div>
                </div>

                <div style={{ marginTop: "8px" }}>
                  <button type="submit" style={styles.btn} className="switch-slide-btn">
                    <span style={styles.btnIcon} className="circle-toggle">
                      <ArrowIcon />
                    </span>
                    <span style={styles.btnText} className="btn-label-text">
                      Send Message
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Green Card with hover interaction states */}
            <div style={styles.rightColumn} className="right-column">
              <div style={styles.card} className="card">
                <div className="card-grid">
                  {/* Address */}
                  <div className="info-block-wrapper">
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle} className="card-icon-circle">
                        <LocationIcon />
                      </div>
                      <div>
                        <h4 style={styles.sectionTitle}>Address</h4>
                        <p style={styles.sectionBody} className="card-text-body">
                          4517 Washington Ave.<br />
                          Manchester, Kentucky 39495
                        </p>
                      </div>
                    </div>
                    <div style={styles.dashed} />
                  </div>

                  {/* Contact */}
                  <div className="info-block-wrapper">
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle} className="card-icon-circle">
                        <PhoneIcon />
                      </div>
                      <div>
                        <h4 style={styles.sectionTitle}>Contact</h4>
                        <p style={styles.sectionBody} className="card-text-body">
                          Phone : <a href="tel:+0123456789">+0123-456-789</a><br />
                          Email : <a href="mailto:hello@crewzaar.com">hello@crewzaar.com</a>
                        </p>
                      </div>
                    </div>
                    <div style={styles.dashed} />
                  </div>

                  {/* Open Time */}
                  <div className="info-block-wrapper">
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle} className="card-icon-circle">
                        <ClockIcon />
                      </div>
                      <div>
                        <h4 style={styles.sectionTitle}>Open Time</h4>
                        <p style={styles.sectionBody} className="card-text-body">
                          Monday - Friday : 10:00 - 20:00<br />
                          Saturday - Sunday : 11:00 - 18:00
                        </p>
                      </div>
                    </div>
                    <div style={styles.dashed} />
                  </div>

                  {/* Stay Connected */}
                  <div>
                    <h4 style={styles.socialTitle}>Stay Connected</h4>
                    <div style={styles.socialWrap}>
                      <button style={styles.socialBtn} className="social-btn" aria-label="Facebook">
                        <FacebookIcon />
                      </button>
                      <button style={styles.socialBtn} className="social-btn" aria-label="Twitter">
                        <TwitterIcon />
                      </button>
                      <button style={styles.socialBtn} className="social-btn" aria-label="LinkedIn">
                        <LinkedInIcon />
                      </button>
                      <button style={styles.socialBtn} className="social-btn" aria-label="Instagram">
                        <InstagramIcon />
                      </button>
                      <button style={styles.socialBtn} className="social-btn" aria-label="YouTube">
                        <YouTubeIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;