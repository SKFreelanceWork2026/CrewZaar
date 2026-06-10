import React from "react";

import amazon from "../../../assets/images/companies/amazon.png";
import capgemini from "../../../assets/images/companies/capgemini.png";
import hcltech from "../../../assets/images/companies/hcltech.png";
import hp from "../../../assets/images/companies/hp.png";
import infosys from "../../../assets/images/companies/infosys.png";
import microsoft from "../../../assets/images/companies/microsoft.png";
import qualcomm from "../../../assets/images/companies/qualcomm.png";
import southerland from "../../../assets/images/companies/southerland.png";
import tcs from "../../../assets/images/companies/tcs.png";
import wipro from "../../../assets/images/companies/wipro.png";

const BRAND_COLOR = "#42a30e";

const TrustedCompanies = () => {
  const companies = [
    { name: "TCS", logo: tcs },
    { name: "Infosys", logo: infosys },
    { name: "HCLTech", logo: hcltech },
    { name: "Amazon", logo: amazon },
    { name: "HP", logo: hp },
    { name: "Wipro", logo: wipro },
    { name: "Capgemini", logo: capgemini },
    { name: "Sutherland", logo: southerland },
    { name: "Microsoft", logo: microsoft },
    { name: "Qualcomm", logo: qualcomm },
  ];

  return (
    <section
      style={{
        background: "#f0f2f5",
        padding: "30px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: "800",
            color: "#1a1a1a",
            margin: "0 0 12px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          TRUSTED BY{" "}
          <span style={{ color: BRAND_COLOR }}>GROWING COMPANIES</span>
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            fontWeight: "500",
            margin: "0 0 52px",
            fontFamily: "'Familjen Grotesk', 'Arimo', sans-serif",
          }}
        >
          Join Hundreds Of Companies Hiring Smarter
        </p>

        {/* 5 + 5 Grid — direct images, no card wrapper */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, auto)",
justifyContent: "center",
columnGap: "10px",
            alignItems: "center",
          }}
        >
          {companies.map((company, i) => (
            <img
              key={i}
              src={company.logo}
              alt={company.name}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.25s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            />
          ))}
        </div>

        {/* View More */}
        <button
          style={{
            marginTop: "48px",
            background: "transparent",
            border: "none",
            color: BRAND_COLOR,
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            fontFamily: "'Poppins', sans-serif",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View more
        </button>
      </div>
    </section>
  );
};

export default TrustedCompanies;