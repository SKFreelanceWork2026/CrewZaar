import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  IconButton,
} from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import herobg1 from "../../../assets/images/herobg1.png";
import herobg2 from "../../../assets/images/herobg2.png";
import herobg3 from "../../../assets/images/herobg3.png";

const bgImages = [herobg1, herobg2, herobg3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + bgImages.length) % bgImages.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % bgImages.length);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "100vh",
          md: "110vh",
        },
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND CAROUSEL */}
      {bgImages.map((img, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            inset: 0,

            backgroundImage: `url(${img})`,

            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

            transition: "opacity 1.8s ease-in-out",

            opacity: current === index ? 1 : 0,

            filter: "brightness(1.18) contrast(1.12)",

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,

              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.26), rgba(0,0,0,0.72))",
            },
          }}
        />
      ))}

      {/* TOP SHADE */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,

          width: "100%",
          height: "140px",

          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",

          zIndex: 2,
        }}
      />

      {/* PREV BUTTON */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: { xs: 10, md: 28 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,

          width: { xs: 38, md: 52 },
          height: { xs: 38, md: 52 },

          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          border: "1.5px solid rgba(255,255,255,0.30)",

          color: "#fff",

          transition: "0.3s",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.22)",
            borderColor: "rgba(255,255,255,0.6)",
            transform: "translateY(-50%) scale(1.08)",
          },
        }}
      >
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
      </IconButton>

      {/* NEXT BUTTON */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: { xs: 10, md: 28 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,

          width: { xs: 38, md: 52 },
          height: { xs: 38, md: 52 },

          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          border: "1.5px solid rgba(255,255,255,0.30)",

          color: "#fff",

          transition: "0.3s",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.22)",
            borderColor: "rgba(255,255,255,0.6)",
            transform: "translateY(-50%) scale(1.08)",
          },
        }}
      >
        <ArrowForwardIosRoundedIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
      </IconButton>

      {/* DOTS */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 24, md: 36 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,

          display: "flex",
          alignItems: "center",
          gap: { xs: 1, md: 1.2 },
        }}
      >
        {bgImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: current === index ? { xs: 28, md: 36 } : { xs: 8, md: 10 },
              height: { xs: 8, md: 10 },

              borderRadius: "999px",

              backgroundColor:
                current === index ? "#7ED321" : "rgba(255,255,255,0.45)",

              cursor: "pointer",

              transition: "all 0.4s ease",

              "&:hover": {
                backgroundColor:
                  current === index ? "#7ED321" : "rgba(255,255,255,0.75)",
              },
            }}
          />
        ))}
      </Box>

      {/* CONTENT */}
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 5,

          maxWidth: "1900px !important",

          height: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* HEADING */}
          <Typography
            sx={{
              color: "#fff",

              fontWeight: 800,

              textTransform: "uppercase",

              lineHeight: 1.08,

              letterSpacing: "-1px",

              whiteSpace: {
                xs: "normal",
                md: "nowrap",
              },

              fontSize: {
                xs: "28px",
                sm: "38px",
                md: "52px",
                lg: "64px",
                xl: "74px",
              },

              mb: {
                xs: 2,
                md: 2.5,
              },

              textShadow: "0px 6px 22px rgba(0,0,0,0.55)",
            }}
          >
            PROVE. MATCH. HIRE INSTANTLY
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.92)",

              maxWidth: "760px",

              lineHeight: 1.6,

              fontWeight: 300,

              fontSize: {
                xs: "15px",
                sm: "16px",
                md: "19px",
              },

              px: {
                xs: 2,
                md: 0,
              },

              mb: {
                xs: 4,
                md: 4.5,
              },

              textShadow: "0px 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            The fast-track platform where real-world talent meets immediate
            opportunity.
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
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#55C10F",

                color: "#fff",

                px: { xs: 4, md: 5 },
                py: { xs: 1.2, md: 1.45 },

                borderRadius: "10px",

                fontSize: { xs: "13px", md: "16px" },

                fontWeight: 700,

                textTransform: "uppercase",

                boxShadow: "none",

                transition: "0.35s",

                "&:hover": {
                  backgroundColor: "#49ad0a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 30px rgba(85,193,15,0.35)",
                },
              }}
            >
              Hire Employees
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.85)",

                borderWidth: "2px",

                color: "#fff",

                px: { xs: 4, md: 5 },
                py: { xs: 1.15, md: 1.4 },

                borderRadius: "10px",

                fontSize: { xs: "13px", md: "16px" },

                fontWeight: 700,

                textTransform: "uppercase",

                backdropFilter: "blur(5px)",

                transition: "0.35s",

                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  transform: "translateY(-2px)",
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

              mt: {
                xs: 8,
                md: 10,
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 58, md: 72 },
                height: { xs: 58, md: 72 },

                borderRadius: "50%",

                backgroundColor: "#7ED321",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                cursor: "pointer",

                transition: "0.35s",

                boxShadow: "0 10px 35px rgba(126,211,33,0.45)",

                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <PlayArrowRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: { xs: 34, md: 42 },
                }}
              />
            </Box>

            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "15px", md: "20px" },
                fontWeight: 500,
                textShadow: "0px 2px 10px rgba(0,0,0,0.4)",
              }}
            >
              Watch Demo
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;