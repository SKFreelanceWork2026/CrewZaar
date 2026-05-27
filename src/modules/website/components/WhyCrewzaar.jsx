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
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap');

        .crewzaar-section {
          background-color: #F3F8F1;
          padding: 80px 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 64px;
          font-family: 'Manrope', sans-serif;
          box-sizing: border-box;
        }

        .crewzaar-image-col {
          flex: 0 0 460px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .crewzaar-image-wrap {
          width: 460px;
          height: 360px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.13);
          position: relative;
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
          align-items: center;
          text-align: center;
        }

        .crewzaar-heading {
          font-size: 2.4rem;
          font-weight: 900;
          color: #111111;
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin: 0 0 16px 0;
        }

        .crewzaar-heading .brand {
          color: #41A30F;
        }

        .crewzaar-desc {
          font-size: 0.95rem;
          color: #5a6a52;
          line-height: 1.75;
          margin: 0 0 32px 0;
          max-width: 560px;
        }

        /* CENTER THE TWO COLUMNS PERFECTLY */
        .crewzaar-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 70px;
          width: 100%;
          max-width: 1250px;
        }

        .crewzaar-feature-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-top: 28px;
          align-items: center;
          width: 100%;
        }

        /* FEATURES START FROM CENTER */
        .crewzaar-feature-item {
          display: flex;
          align-items: center;
          gap: 18px;
          background: #ffffff;
          border-radius: 14px;
          padding: 18px 22px;
          width: 520px;
          height: 74px;
          box-sizing: border-box;

          margin-left: auto;
          margin-right: auto;

          box-shadow:
            0 2px 6px rgba(0,0,0,0.03),
            0 1px 2px rgba(0,0,0,0.02);

          transition: all 0.25s ease;
        }

        .crewzaar-feature-item:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 20px rgba(65,163,15,0.10),
            0 2px 4px rgba(0,0,0,0.05);
        }

        .crewzaar-icon-box {
          width: 46px;
          height: 46px;
          background-color: #41A30F;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .crewzaar-feature-text {
          font-weight: 700;
          color: #1a1a1a;
          font-size: 0.95rem;
          letter-spacing: -0.1px;
        }

        @media (max-width: 900px) {
          .crewzaar-section {
            padding: 48px 24px;
          }

          .crewzaar-content {
            flex-direction: column;
            gap: 40px;
          }

          .crewzaar-image-col {
            flex: unset;
            width: 100%;
          }

          .crewzaar-image-wrap {
            width: 100%;
            height: 280px;
          }

          .crewzaar-feature-item {
            width: 100%;
            height: auto;
          }

          .crewzaar-text-col {
            width: 100%;
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
                alt="Crewzaar team meeting"
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