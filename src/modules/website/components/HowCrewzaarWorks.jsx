import React from "react";

const HowCrewzaarWorks = () => {
  const findersSteps = [
    {
      title: "Visit Platform",
      desc: "Explore the talent marketplace",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: "Filter Employees",
      desc: "Find candidates by skills",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      ),
    },
    {
      title: "Hire Instantly",
      desc: "Schedule and onboard quickly",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  const employeeSteps = [
    {
      title: "Take Skill Test",
      desc: "Demonstrate your expertise",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
      ),
    },
    {
      title: "Get Verified",
      desc: "Earn your verified badge",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <circle cx="12" cy="8" r="5" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" />
        </svg>
      ),
    },
    {
      title: "Wait for Hiring",
      desc: "Companies come to you",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  const StepRow = ({ steps }) => (
    <div className="steps-row">
      <div className="connector-line connector-line-1" />
      <div className="connector-line connector-line-2" />

      {steps.map((step, i) => (
        <div key={i} className="step-group">
          <div className="icon-box">{step.icon}</div>
          <div className="step-title">{step.title}</div>
          <div className="step-desc">{step.desc}</div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="how-crewzaar-works">
      <h2 className="heading">
        How <span className="green">Crewzaar</span> Works
      </h2>
      <p className="subheading">
        Simple workflows tailored for each role on the platform
      </p>

      <div className="card">
        <h3 className="role-title">For Finders</h3>
        <StepRow steps={findersSteps} />
      </div>

      <div className="card card-last">
        <h3 className="role-title">For Employees</h3>
        <StepRow steps={employeeSteps} />
      </div>

      <style>{`
        .how-crewzaar-works {
          background-color: #F3F4F6;
          padding: 60px 24px;
          text-align: center;
        }

        .how-crewzaar-works .heading {
          font-size: 44px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          color: #1F1F1F;
          margin: 0 0 8px 0;
        }

        .how-crewzaar-works .green {
          color: #57B337;
        }

        .how-crewzaar-works .subheading {
          font-size: 16px;
          font-family: 'Familjen Grotesk','Arimo',sans-serif;
          color: #6B7280;
          margin: 0 0 48px 0;
        }

        .how-crewzaar-works .card {
          background: #ffffff;
          border-radius: 28px;
          padding: 42px clamp(20px, 4vw, 60px) 50px;
          max-width: 1160px;
          width: 100%;
          margin: 0 auto 32px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }

        .how-crewzaar-works .card-last {
          margin-bottom: 0;
        }

        .how-crewzaar-works .role-title {
          font-size: 22px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          color: #222222;
          margin: 0 0 40px 0;
        }

        .how-crewzaar-works .steps-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          position: relative;
          flex-wrap: wrap;
          gap: 24px;
        }

        /* Desktop styles - lines visible only on large screens */
        @media (min-width: 1025px) {
          .how-crewzaar-works .connector-line {
            position: absolute;
            top: 37px;
            height: 2px;
            background-color: #57B337;
            z-index: 1;
          }

          .how-crewzaar-works .connector-line-1 {
            left: calc(16.66% + 60px);
            width: calc(33.33% - 120px);
          }

          .how-crewzaar-works .connector-line-2 {
            left: calc(50% + 60px);
            width: calc(33.33% - 120px);
          }
        }

        /* Tablet and mobile styles - lines hidden */
        @media (max-width: 1024px) {
          .how-crewzaar-works .connector-line {
            display: none;
          }
          
          .how-crewzaar-works .steps-row {
            justify-content: center;
          }
        }

        .how-crewzaar-works .step-group {
          flex: 1 1 250px;
          min-width: 220px;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .how-crewzaar-works .icon-box {
          width: 74px;
          height: 74px;
          border-radius: 18px;
          background: #57B337;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(87,179,55,0.2);
        }

        .how-crewzaar-works .step-title {
          font-size: 16px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          color: #222222;
          margin-bottom: 8px;
          margin-top: 18px;
        }

        .how-crewzaar-works .step-desc {
          font-size: 14px;
          color: #707070;
          font-family: 'Familjen Grotesk','Arimo',sans-serif;
          line-height: 22px;
          max-width: 180px;
          margin: 0 auto;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .how-crewzaar-works {
            padding: 40px 16px;
          }
          
          .how-crewzaar-works .heading {
            font-size: 32px;
          }
          
          .how-crewzaar-works .subheading {
            margin: 0 0 32px 0;
            font-size: 14px;
          }
          
          .how-crewzaar-works .card {
            padding: 32px 20px 40px 20px;
            margin-bottom: 24px;
          }
          
          .how-crewzaar-works .steps-row {
            flex-direction: column;
            align-items: center;
            gap: 36px;
          }
          
          .how-crewzaar-works .step-group {
            max-width: 100%;
          }
        }



@media (max-width: 768px) {
  .how-crewzaar-works {
    padding: 40px 16px;
  }

  .how-crewzaar-works .heading {
    font-size: 32px;
  }

  .how-crewzaar-works .subheading {
    margin: 0 0 32px;
    font-size: 14px;
  }

  .how-crewzaar-works .card {
    padding: 24px 12px 32px;
    overflow-x: auto;
  }

  .how-crewzaar-works .steps-row {
    display: flex;
    flex-direction: row;      /* keep row */
    flex-wrap: nowrap;        /* don't wrap */
    justify-content: space-between;
    gap: 20px;
    min-width: 700px;         /* keeps desktop layout */
  }

  .how-crewzaar-works .step-group {
    min-width: 200px;
    max-width: 200px;
    flex: 0 0 200px;
  }

  /* Show horizontal lines on mobile too */
  .how-crewzaar-works .connector-line {
    display: block;
    position: absolute;
    top: 37px;
    height: 2px;
    background: #57B337;
    z-index: 1;
  }

  .how-crewzaar-works .connector-line-1 {
    left: calc(16.66% + 60px);
    width: calc(33.33% - 120px);
  }

  .how-crewzaar-works .connector-line-2 {
    left: calc(50% + 60px);
    width: calc(33.33% - 120px);
  }
}



        
      `}</style>
    </section>
  );
};

export default HowCrewzaarWorks;