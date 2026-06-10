import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";

// Using your exact requested asset path for the footer logo
import logo from "../../../assets/images/foooterlogo.png";
import footerbg from "../../../assets/images/Footerbg.jpeg";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// Typography Style Definitions
const headingStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: "18px",
  mb: 2.5,
};

const subTextStyle = {
  fontFamily: "'Familjen Grotesk','Arimo',sans-serif",
  fontSize: "13px",
  color: "#bdbdbd",
  mb: 1.6,
  cursor: "pointer",
  transition: "0.3s",
  display: "block",
  "&:hover": {
    color: "#4CAF0A",
    pl: 0.5,
  },
};

const contactLabelStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: "14px",
};

const contactSubTextStyle = {
  fontFamily: "'Familjen Grotesk','Arimo',sans-serif",
  color: "#bdbdbd",
  fontSize: "13px",
  mt: 0.5,
};

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        backgroundImage: `url(${footerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* MAIN LINKS GRID */}
        <Grid
          container
          spacing={{ xs: 4, sm: 4, md: 2 }}
          sx={{
            justifyContent: "space-between",
          }}
        >
          {/* BRAND COLUMN */}
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 2, md: 0 },
            }}
          >
            {/* LOGO — Uses foooterlogo.png exclusively with strict dimension handling */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                mb: 3,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Crewzaar Logo"
                sx={{
                  width: { xs: 160, sm: 200, md: 220 },
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                fontFamily: "'Familjen Grotesk','Arimo',sans-serif",
                color: "#bdbdbd",
                lineHeight: 1.8,
                fontSize: "14px",
                maxWidth: "340px",
                mx: { xs: "auto", md: 0 },
                mb: 3,
              }}
            >
              Building the future of work. Connect verified talent with
              innovative companies in a seamless virtual ecosystem.
            </Typography>

            {/* SOCIALS */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
                (Icon, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      backgroundColor: "#111",
                      color: "#fff",
                      width: 40,
                      height: 40,
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#4CAF0A",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </IconButton>
                )
              )}
            </Box>
          </Grid>

          {/* PLATFORM COLUMN — xs={6} forces a clean 2-column split on mobile phones */}
          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            sx={{
              textAlign: { xs: "left", sm: "left" },
              pl: { xs: 1, sm: 0 }
            }}
          >
            <Typography sx={headingStyle}>Platform</Typography>
            {["Features", "Pricing", "Security", "Roadmap"].map((item) => (
              <Typography key={item} sx={subTextStyle}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* COMPANY COLUMN */}
          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            sx={{
              textAlign: { xs: "left", sm: "left" },
              pl: { xs: 1, sm: 0 }
            }}
          >
            <Typography sx={headingStyle}>Company</Typography>
            {["About Us", "Careers", "Press", "Contact"].map((item) => (
              <Typography key={item} sx={subTextStyle}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* RESOURCES COLUMN */}
          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            sx={{
              textAlign: { xs: "left", sm: "left" },
              pl: { xs: 1, sm: 0 },
              mt: { xs: 2, sm: 0 } // Extra margin space on mobile row wrap
            }}
          >
            <Typography sx={headingStyle}>Resources</Typography>
            {["Blog", "Help Center", "Community", "Docs"].map((item) => (
              <Typography key={item} sx={subTextStyle}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* LEGAL COLUMN */}
          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            sx={{
              textAlign: { xs: "left", sm: "left" },
              pl: { xs: 1, sm: 0 },
              mt: { xs: 2, sm: 0 }
            }}
          >
            <Typography sx={headingStyle}>Legal</Typography>
            {["Privacy Policy", "Terms", "Cookie Policy", "GDPR"].map(
              (item) => (
                <Typography key={item} sx={subTextStyle}>
                  {item}
                </Typography>
              )
            )}
          </Grid>
        </Grid>

        {/* DIVIDER */}
        <Box
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            my: { xs: 5, md: 6 },
          }}
        />

        {/* CONTACT INFO BOTTOM BAR */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 4,
            textAlign: "left",
            px: { xs: 1, sm: 0 }
          }}
        >
          {/* EMAIL */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <EmailOutlinedIcon sx={{ color: "#4CAF0A", fontSize: 22 }} />
            <Box>
              <Typography sx={contactLabelStyle}>Email</Typography>
              <Typography sx={contactSubTextStyle}>
                hello@crewzaar.com
              </Typography>
            </Box>
          </Box>

          {/* PHONE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <PhoneOutlinedIcon sx={{ color: "#4CAF0A", fontSize: 22 }} />
            <Box>
              <Typography sx={contactLabelStyle}>Phone</Typography>
              <Typography sx={contactSubTextStyle}>
                +1 (234) 567-890
              </Typography>
            </Box>
          </Box>

          {/* LOCATION */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <LocationOnOutlinedIcon sx={{ color: "#4CAF0A", fontSize: 22 }} />
            <Box>
              <Typography sx={contactLabelStyle}>Location</Typography>
              <Typography sx={contactSubTextStyle}>
                San Francisco, CA
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* COPYRIGHT */}
        <Typography
          align="center"
          sx={{
            fontFamily: "'Familjen Grotesk','Arimo',sans-serif",
            color: "#8e8e8e",
            mt: { xs: 6, md: 8 },
            fontSize: { xs: "12px", md: "13px" },
            lineHeight: 1.8,
          }}
        >
          © 2026 Crewzaar. All rights reserved. Built with passion for the
          future of work.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;