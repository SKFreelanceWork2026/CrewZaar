import React from "react";

const TrustedCompanies = () => {
  const companies = [
    {
      logo: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ color: "#f04e23", fontWeight: "700" }}>tcs</span>
            <span style={{ color: "#6a1b9a", fontWeight: "700" }}>|</span>
            <span style={{ color: "#00a3e0", fontWeight: "700" }}>NQT</span>
          </div>

          <span style={styles.smallText}>
            NATIONAL QUALIFIER TEST
          </span>
        </>
      ),
    },

    {
      logo: (
        <span
          style={{
            color: "#007cc3",
            fontSize: "2rem",
            fontWeight: "400",
          }}
        >
          Infosys
        </span>
      ),
    },

    {
      logo: (
        <span
          style={{
            color: "#0057c2",
            fontSize: "1.9rem",
            fontWeight: "700",
          }}
        >
          HCLTech
        </span>
      ),
    },

    {
      logo: (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#111",
              fontSize: "2.3rem",
              fontWeight: "700",
              lineHeight: "1",
            }}
          >
            amazon
          </div>

          <div
            style={{
              color: "#ff9900",
              fontSize: "1.4rem",
              marginTop: "-4px",
            }}
          >
            ⤿
          </div>
        </div>
      ),
    },

    {
      logo: (
        <div style={styles.hpCircle}>
          <span style={styles.hpText}>hp</span>
        </div>
      ),
    },

    {
      logo: (
        <div style={{ textAlign: "center" }}>
          <div style={styles.wiproDots}></div>

          <div
            style={{
              color: "#45216b",
              fontSize: "1.5rem",
              fontWeight: "700",
              marginTop: "6px",
            }}
          >
            wipro
          </div>
        </div>
      ),
    },

    {
      logo: (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              color: "#0070ad",
              fontSize: "1.8rem",
              fontWeight: "500",
            }}
          >
            Capgemini
          </span>

          <span
            style={{
              color: "#0070ad",
              fontSize: "1.2rem",
            }}
          >
            💧
          </span>
        </div>
      ),
    },

    {
      logo: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={styles.sutherlandIcon}></div>

          <span
            style={{
              color: "#2c2c5c",
              fontSize: "1.2rem",
              letterSpacing: "1px",
            }}
          >
            SUTHERLAND
          </span>
        </div>
      ),
    },

    {
      logo: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={styles.microsoftGrid}>
            <span style={{ background: "#f25022" }}></span>
            <span style={{ background: "#7fba00" }}></span>
            <span style={{ background: "#00a4ef" }}></span>
            <span style={{ background: "#ffb900" }}></span>
          </div>

          <div
            style={{
              color: "#666",
              fontSize: "1.1rem",
              lineHeight: "1.1",
              textAlign: "left",
              fontWeight: "500",
            }}
          >
            Microsoft
            <br />
            Security
          </div>
        </div>
      ),
    },

    {
      logo: (
        <span
          style={{
            color: "#0057b8",
            fontSize: "1.7rem",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          QUALCOMM
        </span>
      ),
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          TRUSTED BY{" "}
          <span style={styles.green}>
            GROWING COMPANIES
          </span>
        </h2>

        <p style={styles.subheading}>
          Join Hundreds Of Companies Hiring Smarter
        </p>

        <div style={styles.grid}>
          {companies.map((company, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";

                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(0,0,0,0.12), 0 30px 60px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";

                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.06), 0 20px 40px rgba(0,0,0,0.04)";
              }}
            >
              {company.logo}
            </div>
          ))}
        </div>

        <button style={styles.viewMore}>
          View more
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: {
    background: "#f6f6f4",
    padding: "70px 20px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1220px",
    textAlign: "center",
  },

  heading: {
    fontSize: "3rem",
    fontWeight: "900",
    color: "#111",
    marginBottom: "14px",
    lineHeight: "1.1",
    letterSpacing: "-1px",
  },

  green: {
    color: "#43b02a",
  },

  subheading: {
    fontSize: "1rem",
    color: "#707070",
    marginBottom: "50px",
    fontWeight: "500",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "24px",
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "all 0.35s ease",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.06), 0 20px 40px rgba(0,0,0,0.04)",

    border: "1px solid rgba(255,255,255,0.9)",
  },

  viewMore: {
    marginTop: "38px",
    border: "none",
    background: "transparent",
    color: "#43b02a",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
  },

  smallText: {
    fontSize: "0.5rem",
    color: "#777",
    letterSpacing: "1px",
    marginTop: "5px",
  },

  hpCircle: {
    width: "82px",
    height: "82px",
    borderRadius: "50%",
    background: "#0096d6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  hpText: {
    color: "#fff",
    fontSize: "2.1rem",
    fontWeight: "700",
    fontStyle: "italic",
  },

  wiproDots: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, #9c27b0 10%, transparent 11%), radial-gradient(circle, #ff9800 10%, transparent 11%), radial-gradient(circle, #00bcd4 10%, transparent 11%)",
    backgroundSize: "14px 14px",
  },

  sutherlandIcon: {
    width: "18px",
    height: "18px",
    borderRadius: "3px",
    background:
      "linear-gradient(135deg, #ff0055 0%, #ff0055 50%, #2c2c5c 50%, #2c2c5c 100%)",
    transform: "rotate(45deg)",
  },

  microsoftGrid: {
    width: "28px",
    height: "28px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2px",
  },
};

export default TrustedCompanies;