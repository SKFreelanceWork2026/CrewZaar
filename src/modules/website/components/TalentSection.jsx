import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";

// Font stack configurations per design constraints
const headingFont = "'Poppins', sans-serif";
const subTextFont = "'Familjen Grotesk', 'Arimo', sans-serif";

const TalentSection = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const end = 2000;
          const duration = 2000;
          const incrementTime = 10;
          const step = end / (duration / incrementTime);

          const timer = setInterval(() => {
            start += step;

            if (start >= end) {
              start = end;
              clearInterval(timer);
            }

            setCount(Math.floor(start));
          }, incrementTime);
        }
      },
      {
        threshold: 0.2, // Lowered slightly for smoother mobile intersection triggers
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundColor: "#41AA00",
        py: {
          xs: 6, // Reduced slightly on small screens to fit mobile viewports better
          sm: 8,
          md: 10,
        },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND CIRCLE */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-160px", sm: "-120px" },
          bottom: { xs: "-160px", sm: "-120px" },
          width: { xs: "280px", sm: "320px" },
          height: { xs: "280px", sm: "320px" },
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <Grid
          container
          spacing={{
            xs: 4, // Tighter spacing for mobile to avoid giant blank gaps
            sm: 5,
            md: 8,
          }}
          alignItems="center"
        >
          {/* LEFT SIDE — Content Intro */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                maxWidth: "620px",
                textAlign: { xs: "center", md: "left" }, // Center aligned on mobile for visual balance
              }}
            >
              {/* MAIN HEADING — Uses Poppins-Bold */}
              <Typography
                component="h2"
                sx={{
                  fontFamily: headingFont,
                  color: "#fff",
                  fontWeight: 700, // Explicitly Poppins - Bold
                  textTransform: "uppercase",
                  lineHeight: { xs: 1.2, sm: 1.15 },
                  letterSpacing: "-1px",
                  fontSize: {
                    xs: "24px",
                    sm: "34px",
                    md: "44px", // Gently tuned sizes to avoid orphan words on medium displays
                  },
                  mb: 2.5,
                }}
              >
                We Connect Verified
                <br />
                Talent With Top Companies
              </Typography>

              {/* DESCRIPTION TEXT — Uses Familjen Grotesk */}
              <Typography
                sx={{
                  fontFamily: subTextFont,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  fontSize: {
                    xs: "14px",
                    md: "16px",
                  },
                  maxWidth: "560px",
                  mx: { xs: "auto", md: 0 },
                }}
              >
                Crewzaar transforms the hiring process by connecting skill-tested, 
                interview-ready professionals with companies looking for reliable 
                talent — faster, smarter, and more efficiently.
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT SIDE — Features & Stats Card */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                maxWidth: "540px",
                ml: {
                  xs: "auto",
                  md: "auto",
                },
                mr: {
                  xs: "auto",
                  md: 0,
                },
              }}
            >
              {/* FEATURES LIST — Uses Familjen Grotesk */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mb: 4,
                  alignItems: { xs: "flex-start", sm: "center", md: "flex-start" },
                  width: { xs: "fit-content", sm: "100%", md: "100%" },
                  mx: "auto",
                }}
              >
                {[
                  "Verified & Skill-Tested Employees",
                  "Structured Hiring Process",
                  "Real-Time Talent Availability",
                  "Smart Filtering & Matching",
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: { sm: "80%", md: "100%" }, // Centers text blocks beautifully on tablets
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        color: "#fff",
                        fontSize: { xs: 22, md: 26 },
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        fontFamily: subTextFont,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: {
                          xs: "14px",
                          md: "16px",
                        },
                        textAlign: "left",
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* GLASS CARD STATS DISPLAY */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: "22px",
                  px: {
                    xs: 2.5,
                    sm: 4,
                    md: 4,
                  },
                  py: {
                    xs: 2.5,
                    sm: 3,
                    md: 3.5,
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, sm: 3 },
                  boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* ICON CONTAINER */}
                <Box
                  sx={{
                    width: {
                      xs: 60,
                      sm: 70,
                      md: 76,
                    },
                    height: {
                      xs: 60,
                      sm: 70,
                      md: 76,
                    },
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.96)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Groups2RoundedIcon
                    sx={{
                      color: "#41AA00",
                      fontSize: {
                        xs: 30,
                        sm: 36,
                        md: 42,
                      },
                    }}
                  />
                </Box>

                {/* COUNTER TEXT BLOCK — Numbers use Poppins-Bold, Labelling uses Familjen Grotesk */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: headingFont,
                      color: "#fff",
                      fontWeight: 700, // Poppins - Bold
                      lineHeight: 1,
                      fontSize: {
                        xs: "28px",
                        sm: "36px",
                        md: "40px",
                      },
                      mb: 0.5,
                    }}
                  >
                    {count}+
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: subTextFont,
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "13px",
                        md: "16px",
                      },
                    }}
                  >
                    Verified Employees
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TalentSection;