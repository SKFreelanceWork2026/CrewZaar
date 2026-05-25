import React from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";

const TalentSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#41AA00",

        py: {
          xs: 7,
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

          right: "-120px",
          bottom: "-120px",

          width: "320px",
          height: "320px",

          borderRadius: "50%",

          background:
            "rgba(255,255,255,0.08)",

          filter: "blur(10px)",
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
            xs: 6,
            md: 8,
          }}
          alignItems="center"
        >
          {/* LEFT SIDE */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                maxWidth: "620px",
              }}
            >
              {/* TITLE */}
              <Typography
                sx={{
                  color: "#fff",

                  fontWeight: 800,

                  textTransform: "uppercase",

                  lineHeight: 1.15,

                  letterSpacing: "-1px",

                  fontSize: {
                    xs: "28px",
                    sm: "38px",
                    md: "48px",
                  },

                  mb: 2.5,
                }}
              >
                We Connect Verified
                <br />
                Talent With Top Companies
              </Typography>

              {/* DESCRIPTION */}
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.9)",

                  lineHeight: 1.9,

                  fontWeight: 400,

                  fontSize: {
                    xs: "14px",
                    md: "16px",
                  },

                  maxWidth: "560px",
                }}
              >
                Crewzaar transforms the hiring process by
                connecting skill-tested, interview-ready
                professionals with companies looking for
                reliable talent — faster, smarter, and
                more efficiently.
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",

                maxWidth: "540px",

                ml: {
                  xs: 0,
                  md: "auto",
                },
              }}
            >
              {/* FEATURES */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  gap: 2.5,

                  mb: 4,
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
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        color: "#fff",

                        fontSize: 26,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#fff",

                        fontWeight: 600,

                        fontSize: {
                          xs: "14px",
                          md: "16px",
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* GLASS CARD */}
              <Box
                sx={{
                  background:
                    "rgba(255,255,255,0.15)",

                  border:
                    "1px solid rgba(255,255,255,0.25)",

                  backdropFilter: "blur(14px)",

                  WebkitBackdropFilter:
                    "blur(14px)",

                  borderRadius: "22px",

                  px: {
                    xs: 3,
                    md: 4,
                  },

                  py: {
                    xs: 3,
                    md: 3.5,
                  },

                  display: "flex",
                  alignItems: "center",

                  gap: 3,

                  boxShadow:
                    "0 10px 40px rgba(0,0,0,0.12)",

                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    width: {
                      xs: 68,
                      md: 76,
                    },

                    height: {
                      xs: 68,
                      md: 76,
                    },

                    borderRadius: "50%",

                    background:
                      "rgba(255,255,255,0.96)",

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
                        xs: 36,
                        md: 42,
                      },
                    }}
                  />
                </Box>

                {/* CARD TEXT */}
                <Box>
                  <Typography
                    sx={{
                      color: "#fff",

                      fontWeight: 800,

                      lineHeight: 1,

                      fontSize: {
                        xs: "28px",
                        md: "40px",
                      },

                      mb: 0.5,
                    }}
                  >
                    2000+
                  </Typography>

                  <Typography
                    sx={{
                      color:
                        "rgba(255,255,255,0.92)",

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