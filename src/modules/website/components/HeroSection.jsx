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

const slides = [
  {
    bg: herobg1,
    heading: "HIRE VERIFIED TALENT INSTANTLY",
    subtitle:
      "Connect verified employees with companies. No job searching, only opportunities. The future of work starts here.",
  },
  {
    bg: herobg2,
    heading: "PROVE. MATCH. HIRE INSTANTLY",
    subtitle:
      "The fast-track platform where real-world talent meets immediate opportunity.",
  },
  {
    bg: herobg3,
    heading: "ELITE SKILLS. INSTANT HIRING",
    subtitle:
      "The fast-track platform where real-world talent meets immediate opportunity.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        height: {
          xs: "78vh",
          sm: "82vh",
          md: "88vh",
          lg: "92vh",
        },
        minHeight: {
          xs: "560px",
          sm: "620px",
          md: "720px",
        },
      }}
    >
      {/* BACKGROUND IMAGES */}
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: current === index ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
            filter: "brightness(1.12) contrast(1.10)",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.35))",
            },
          }}
        />
      ))}

      {/* PREVIOUS BUTTON */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: { xs: 8, sm: 12, md: 20 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: { xs: 34, sm: 40, md: 48 },
          height: { xs: 34, sm: 40, md: 48 },
          backgroundColor: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          backdropFilter: "blur(6px)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.20)",
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
          right: { xs: 8, sm: 12, md: 20 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: { xs: 34, sm: 40, md: 48 },
          height: { xs: 34, sm: 40, md: 48 },
          backgroundColor: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          backdropFilter: "blur(6px)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.20)",
          },
        }}
      >
        <ArrowForwardIosRoundedIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
      </IconButton>

      {/* DOTS */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 18, md: 28 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: current === index ? 26 : 8,
              height: 8,
              borderRadius: "999px",
              backgroundColor:
                current === index ? "#7ED321" : "rgba(255,255,255,0.55)",
              transition: "0.35s ease",
              cursor: "pointer",
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
          width: "100%",
          maxWidth: "1500px !important",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* HEADING */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,           // ← reduced from 900
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-1px",
              textAlign: "center",
              width: "100%",
              maxWidth: "1200px",
              whiteSpace: "nowrap",      // ← forces single line
              overflow: "hidden",
              textOverflow: "ellipsis",
              px: { xs: 1, sm: 2 },
              fontSize: {
                xs: "18px",
                sm: "32px",
                md: "48px",
                lg: "60px",
                xl: "68px",
              },
              mb: { xs: 2, md: 2.5 },
              textShadow: "0 6px 30px rgba(0,0,0,0.45)",
              transition: "opacity 0.6s ease-in-out",
            }}
          >
            {slides[current].heading}
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.94)",
              width: "100%",
              maxWidth: "760px",
              lineHeight: 1.7,
              fontWeight: 300,           // ← reduced from 400
              textAlign: "center",
              px: { xs: 2, sm: 0 },
              fontSize: { xs: "13px", sm: "15px", md: "17px" },  // ← slightly reduced
              mb: { xs: 4, md: 5 },
              textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              transition: "opacity 0.6s ease-in-out",
            }}
          >
            {slides[current].subtitle}
          </Typography>

          {/* BUTTONS */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.85)",
                  borderWidth: "2px",
                  color: "#fff",
                  minWidth: { xs: 240, sm: 220 },
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.2, md: 1.45 },
                  borderRadius: "12px",
                  fontSize: { xs: "12px", md: "15px" },
                  fontWeight: 700,
                  textTransform: "uppercase",
                  backdropFilter: "blur(5px)",
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                JOIN AS EMPLOYEE
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#55C10F",
                  color: "#fff",
                  minWidth: { xs: 240, sm: 220 },
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.25, md: 1.5 },
                  borderRadius: "12px",
                  fontSize: { xs: "12px", md: "15px" },
                  fontWeight: 700,
                  textTransform: "uppercase",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#49ad0a",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 28px rgba(85,193,15,0.30)",
                  },
                }}
              >
                HIRE EMPLOYEES
              </Button>
            </Stack>
          </Box>

          {/* WATCH DEMO */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1.5, sm: 2 },
              mt: { xs: 5, md: 6 },
            }}
          >
            <Box
              sx={{
                width: { xs: 56, md: 70 },
                height: { xs: 56, md: 70 },
                borderRadius: "50%",
                backgroundColor: "#7ED321",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "0.35s",
                boxShadow: "0 12px 35px rgba(126,211,33,0.40)",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <PlayArrowRoundedIcon
                sx={{ color: "#fff", fontSize: { xs: 32, md: 42 } }}
              />
            </Box>

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 500,
                textAlign: "center",
                fontSize: { xs: "14px", md: "20px" },
                textShadow: "0 2px 12px rgba(0,0,0,0.35)",
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