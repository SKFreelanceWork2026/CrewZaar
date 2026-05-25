import React from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",

        height: {
          xs: "92vh",
          md: "100vh",
        },

        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')",

          backgroundSize: "cover",
          backgroundPosition: "center",

          transform: "scale(1.02)",
        }}
      />

      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85))",
        }}
      />

      {/* VERTICAL LINE EFFECT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.06) 1px,
              transparent 1px
            )
          `,

          backgroundSize: "120px 100%",

          pointerEvents: "none",
        }}
      />

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 5,

          height: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",
        }}
      >
        <Box>
          {/* HEADING */}
          <Typography
            sx={{
              color: "#fff",

              fontWeight: 800,

              textTransform: "uppercase",

              lineHeight: 1.1,

              letterSpacing: "-1.5px",

              fontSize: {
                xs: "28px",
                sm: "42px",
                md: "58px",
                lg: "68px",
              },

              mb: {
                xs: 2,
                md: 3,
              },
            }}
          >
            Hire Verified Talent Instantly
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",

              maxWidth: "850px",

              mx: "auto",

              lineHeight: 1.7,

              fontWeight: 300,

              fontSize: {
                xs: "15px",
                sm: "17px",
                md: "20px",
              },

              px: {
                xs: 2,
                md: 0,
              },

              mb: {
                xs: 4,
                md: 5,
              },
            }}
          >
            Connect verified employees with companies.
            No job searching, only opportunities.
            The future of work starts here.
          </Typography>

          {/* BUTTONS */}
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={{
              xs: 1.8,
              sm: 2,
              md: 2.5,
            }}
            justifyContent="center"
            alignItems="center"
            mb={{
              xs: 4,
              md: 5,
            }}
          >
            {/* BUTTON */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF0A",

                color: "#fff",

                px: {
                  xs: 3.5,
                  md: 4,
                },

                py: {
                  xs: 1.1,
                  md: 1.3,
                },

                minWidth: {
                  xs: "220px",
                  sm: "210px",
                  md: "220px",
                },

                borderRadius: "10px",

                fontSize: {
                  xs: "13px",
                  md: "15px",
                },

                fontWeight: 700,

                textTransform: "uppercase",

                boxShadow: "none",

                transition: "0.3s",

                "&:hover": {
                  backgroundColor: "#43a008",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Hire Employees
            </Button>

            {/* OUTLINE BUTTON */}
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.7)",

                color: "#fff",

                px: {
                  xs: 3.5,
                  md: 4,
                },

                py: {
                  xs: 1.1,
                  md: 1.3,
                },

                minWidth: {
                  xs: "220px",
                  sm: "210px",
                  md: "220px",
                },

                borderRadius: "10px",

                fontSize: {
                  xs: "13px",
                  md: "15px",
                },

                fontWeight: 700,

                textTransform: "uppercase",

                backdropFilter: "blur(4px)",

                transition: "0.3s",

                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Join as Employee
            </Button>
          </Stack>

          {/* WATCH DEMO */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              gap: {
                xs: 1.5,
                md: 2,
              },
            }}
          >
            {/* PLAY BUTTON */}
            <Box
              sx={{
                width: {
                  xs: 54,
                  md: 64,
                },

                height: {
                  xs: 54,
                  md: 64,
                },

                borderRadius: "50%",

                backgroundColor: "#7AC943",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                cursor: "pointer",

                transition: "0.3s",

                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <PlayArrowRoundedIcon
                sx={{
                  color: "#fff",

                  fontSize: {
                    xs: 32,
                    md: 38,
                  },
                }}
              />
            </Box>

            {/* TEXT */}
            <Typography
              sx={{
                color: "#fff",

                fontSize: {
                  xs: "15px",
                  md: "18px",
                },

                fontWeight: 500,
              }}
            >
              Watch Demo
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* PREMIUM THICK WHITE SHADOW */}
      <Box
        sx={{
          position: "absolute",

          bottom: "-70px",
          left: 0,

          width: "100%",
          height: "260px",

          background: `
            linear-gradient(
              to top,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.92) 18%,
              rgba(255,255,255,0.75) 35%,
              rgba(255,255,255,0.45) 55%,
              rgba(255,255,255,0.18) 72%,
              transparent 100%
            )
          `,

          filter: "blur(30px)",

          opacity: 1,

          zIndex: 4,

          transform: "scaleY(1.2)",

          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default HeroSection;