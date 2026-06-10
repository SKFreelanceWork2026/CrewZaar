import React from "react";
import workspaceImg from "../../../assets/images/workspaceImg.jpeg";

const WhyCrewzaar = () => {
  const features = [
    {
      text: "Skill-Tested Talent Only",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="2" width="6" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      text: "Zero Hiring Risk",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      text: "Hire Faster, Smarter",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      text: "Future Availability Tracking",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap');
        @import url('https://fonts.cdnfonts.com/css/familjen-grotesk');

        .crewzaar-section {
          background-color: #F3F4F6;
          padding: 90px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .crewzaar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          width: 100%;
          max-width: 1220px;
        }

        .crewzaar-image-col {
          flex: 0 0 440px;           /* Reduced from 480px */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .crewzaar-image-wrap {
          width: 100%;
          height: 360px;              /* Reduced from 400px */
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
        }

        .crewzaar-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .crewzaar-text-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .crewzaar-heading {
          font-family: 'Poppins', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #1F1F1F;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin: 0 0 16px 0;
        }

        .crewzaar-heading .brand {
          color: #57B337;
        }

        .crewzaar-desc {
          font-family: 'Familjen Grotesk', 'Arimo', sans-serif;
          font-size: 16px;
          color: #6B7280;
          line-height: 1.75;
          margin: 0 0 32px 0;
          max-width: 580px;
        }

        .crewzaar-feature-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 520px;
        }

        .crewzaar-feature-item {
          display: flex;
          align-items: center;
          gap: 18px;
          background: #ffffff;
          border-radius: 18px;
          padding: 16px 22px;
          width: 100%;
          height: 76px;
          box-sizing: border-box;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
        }

        .crewzaar-feature-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(87, 179, 55, 0.15);
        }

        .crewzaar-icon-box {
          width: 46px;
          height: 46px;
          background-color: #57B337;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .crewzaar-feature-text {
          font-family: 'Familjen Grotesk', 'Arimo', sans-serif;
          font-weight: 600;
          color: #222222;
          font-size: 15px;
        }

        @media (max-width: 1024px) {
          .crewzaar-content {
            gap: 40px;
          }
          .crewzaar-image-col {
            flex: 0 0 360px;        /* Reduced from 380px */
          }
          .crewzaar-image-wrap {
            height: 320px;          /* Reduced from 340px */
          }
          .crewzaar-heading {
            font-size: 34px;
          }
        }

        @media (max-width: 768px) {
          .crewzaar-section {
            padding: 60px 20px;
          }

          .crewzaar-content {
            flex-direction: column;
            gap: 40px;
          }

          .crewzaar-image-col {
            width: 100%;
            flex: none;
            order: 2;
          }

          .crewzaar-image-wrap {
            height: 260px;          /* Reduced from 280px */
            border-radius: 20px;
          }

          .crewzaar-text-col {
            width: 100%;
            align-items: center;
            text-align: center;
          }

          .crewzaar-desc {
            font-size: 15px;
          }

          .crewzaar-feature-list {
            max-width: 100%;
          }

          .crewzaar-feature-item {
            height: 70px;
            padding: 12px 18px;
          }
          
          .crewzaar-feature-text {
            font-size: 14px;
          }
        }
      `}</style>

      <section className="crewzaar-section">
        <div className="crewzaar-content">
          {/* Image Column */}
          <div className="crewzaar-image-col">
            <div className="crewzaar-image-wrap">
              <img
                src={workspaceImg}
                alt="Crewzaar team workspace"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="crewzaar-text-col">
            <h2 className="crewzaar-heading">
              WHY <span className="brand">Crewzaar</span> ?
            </h2>

            <p className="crewzaar-desc">
              Crewzaar simplifies hiring by providing companies with pre-tested,
              interview-ready, and verified professionals. We eliminate
              guesswork and help businesses hire faster with confidence.
            </p>

            <div className="crewzaar-feature-list">
              {features.map((feature, index) => (
                <div className="crewzaar-feature-item" key={index}>
                  <div className="crewzaar-icon-box">{feature.icon}</div>
                  <span className="crewzaar-feature-text">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyCrewzaar;