import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";

const navItems = [
  "Home",
  "Platform",
  "Services",
  "How It Works",
  "Pricing",
  "Contact",
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        paddingTop: 2,
      }}
      onClick={handleDrawerToggle}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton>
            <LoginIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>

        <Box px={2} mt={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4CAF0A",
              borderRadius: "10px",
              fontWeight: "bold",
              paddingY: 1.2,
              "&:hover": {
                backgroundColor: "#43a008",
              },
            }}
          >
            GET STARTED
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderTop: "2px solid #4CAF0A",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: "78px",
            }}
          >
            {/* LOGO */}
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                src="https://crewzaar.com/assets/logo.png"
                alt="Crewzaar"
                sx={{
                  height: {
                    xs: 38,
                    sm: 42,
                    md: 48,
                  },
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* DESKTOP MENU */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 4,
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={item}
                  sx={{
                    color: "#666",
                    fontSize: "15px",
                    fontWeight: 500,
                    textTransform: "none",
                    borderBottom:
                      index === 0
                        ? "2px solid #7CB342"
                        : "2px solid transparent",
                    borderRadius: 0,
                    paddingBottom: "8px",
                    "&:hover": {
                      background: "transparent",
                      color: "#000",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* RIGHT SIDE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1,
                  sm: 2,
                  md: 3,
                },
              }}
            >
              {/* Desktop Login */}
              <Button
                startIcon={<LoginIcon />}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  color: "#555",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  minWidth: "auto",
                }}
              >
                Login
              </Button>

              {/* Desktop Get Started */}
              <Button
                variant="contained"
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  backgroundColor: "#4CAF0A",
                  color: "#fff",
                  borderRadius: "10px",
                  paddingX: 4,
                  paddingY: 1.3,
                  fontWeight: 700,
                  fontSize: "14px",
                  boxShadow: "none",
                  textTransform: "uppercase",
                  marginLeft: 1,
                  "&:hover": {
                    backgroundColor: "#43a008",
                    boxShadow: "none",
                  },
                }}
              >
                GET STARTED
              </Button>

              {/* MOBILE MENU BUTTON */}
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                  color: "#333",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;