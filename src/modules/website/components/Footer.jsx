import React from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        pt: {
          xs: 5,
          md: 6,
        },
        pb: 4,
      }}
    >
      {/* BACKGROUND EFFECT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/dark-mosaic.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* TOP SECTION */}
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: {
              xs: "center",
              md: "space-between",
            },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT SECTION */}
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
            }}
          >
            {/* LOGO */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
                gap: 1.5,
                mb: 2.5,
              }}
            >
              {/* FALLBACK LOGO */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #4CAF0A 0%, #7E57FF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                C
              </Box>

              {/* LOGO TEXT */}
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "24px",
                      sm: "28px",
                      md: "32px",
                    },
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-1px",
                  }}
                >
                  Crewzaar
                </Typography>

                <Typography
                  sx={{
                    color: "#9e9e9e",
                    fontSize: "11px",
                    mt: 0.5,
                    letterSpacing: "0.4px",
                  }}
                >
                  Build Your Crew. Run Your Company.
                </Typography>
              </Box>
            </Box>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                color: "#bdbdbd",
                lineHeight: 1.7,
                fontSize: {
                  xs: "13px",
                  md: "14px",
                },
                maxWidth: "340px",
                mx: {
                  xs: "auto",
                  md: 0,
                },
                mb: 3,
              }}
            >
              Building the future of work. Connect verified talent
              with innovative companies in a seamless virtual ecosystem.
            </Typography>

            {/* SOCIAL ICONS */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
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

          {/* PLATFORM */}
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              pl: {
                md: 2,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                mb: 2.5,
              }}
            >
              Platform
            </Typography>

            {["Features", "Pricing", "Security", "Roadmap"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    color: "#bdbdbd",
                    mb: 1.6,
                    cursor: "pointer",
                    transition: "0.3s",
                    fontSize: "13px",
                    "&:hover": {
                      color: "#4CAF0A",
                      pl: 0.5,
                    },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Grid>

          {/* COMPANY */}
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              pl: {
                md: 2,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                mb: 2.5,
              }}
            >
              Company
            </Typography>

            {["About Us", "Careers", "Press", "Contact"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    color: "#bdbdbd",
                    mb: 1.6,
                    cursor: "pointer",
                    transition: "0.3s",
                    fontSize: "13px",
                    "&:hover": {
                      color: "#4CAF0A",
                      pl: 0.5,
                    },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Grid>

          {/* RESOURCES */}
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              pl: {
                md: 2,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                mb: 2.5,
              }}
            >
              Resources
            </Typography>

            {["Blog", "Help Center", "Community", "Docs"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    color: "#bdbdbd",
                    mb: 1.6,
                    cursor: "pointer",
                    transition: "0.3s",
                    fontSize: "13px",
                    "&:hover": {
                      color: "#4CAF0A",
                      pl: 0.5,
                    },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Grid>

          {/* LEGAL */}
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              pl: {
                md: 2,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                mb: 2.5,
              }}
            >
              Legal
            </Typography>

            {[
              "Privacy Policy",
              "Terms",
              "Cookie Policy",
              "GDPR",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  color: "#bdbdbd",
                  mb: 1.6,
                  cursor: "pointer",
                  transition: "0.3s",
                  fontSize: "13px",
                  "&:hover": {
                    color: "#4CAF0A",
                    pl: 0.5,
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        {/* DIVIDER */}
        <Box
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            my: {
              xs: 4,
              md: 5,
            },
          }}
        />

        {/* CONTACT INFO */}
        <Grid
          container
          spacing={4}
          textAlign={{
            xs: "center",
            md: "left",
          }}
        >
          {/* EMAIL */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
                gap: 1.5,
              }}
            >
              <EmailOutlinedIcon
                sx={{
                  color: "#4CAF0A",
                  fontSize: 22,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Email
                </Typography>

                <Typography
                  sx={{
                    color: "#bdbdbd",
                    fontSize: "13px",
                    mt: 0.5,
                  }}
                >
                  hello@crewzaar.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* PHONE */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
                gap: 1.5,
              }}
            >
              <PhoneOutlinedIcon
                sx={{
                  color: "#4CAF0A",
                  fontSize: 22,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Phone
                </Typography>

                <Typography
                  sx={{
                    color: "#bdbdbd",
                    fontSize: "13px",
                    mt: 0.5,
                  }}
                >
                  +1 (234) 567-890
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* LOCATION */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
                gap: 1.5,
              }}
            >
              <LocationOnOutlinedIcon
                sx={{
                  color: "#4CAF0A",
                  fontSize: 22,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Location
                </Typography>

                <Typography
                  sx={{
                    color: "#bdbdbd",
                    fontSize: "13px",
                    mt: 0.5,
                  }}
                >
                  San Francisco, CA
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* COPYRIGHT */}
        <Typography
          align="center"
          sx={{
            color: "#8e8e8e",
            mt: {
              xs: 5,
              md: 6,
            },
            fontSize: "12px",
            lineHeight: 1.8,
          }}
        >
          © 2026 Crewzaar. All rights reserved. Built with passion
          for the future of work.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;