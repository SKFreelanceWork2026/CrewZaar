import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
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

import logo from "../../../assets/images/Logo.jpeg";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Platform", id: "platform" },
  { label: "Services", id: "services" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
];

function Header() {
   const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const scrollToSection = (id, label) => {
    setActiveItem(label);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const drawer = (
    <Box sx={{ width: 250, paddingTop: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => {
                scrollToSection(item.id, item.label);
                handleDrawerToggle();
              }}
              sx={{
                justifyContent: "center",
                mx: 1,
                borderRadius: "8px",
                transition: "background-color 0.25s ease",
                backgroundColor:
                  activeItem === item.label ? "#f0fae8" : "transparent",
                "&:hover": {
                  backgroundColor: "#f0fae8",
                  "& .nav-label": {
                    color: "#4CAF0A",
                  },
                },
              }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    className: "nav-label",
                    sx: {
                      textAlign: "center",
                      fontWeight:
                        activeItem === item.label ? 700 : 500,
                      color:
                        activeItem === item.label
                          ? "#4CAF0A"
                          : "#444",
                      transition: "color 0.25s ease",
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Login */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleDrawerToggle}
            sx={{
              justifyContent: "center",
              mx: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#f0fae8",
              },
            }}
          >
            <LoginIcon
              sx={{
                marginRight: 1,
                color: "#555",
                fontSize: 20,
              }}
            />
            <ListItemText
              primary="Login"
              slotProps={{
                primary: {
                  sx: {
                    textAlign: "center",
                    fontWeight: 500,
                    color: "#444",
                    flexGrow: 0,
                  },
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* GET STARTED */}
        <Box
          mt={2}
          mb={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
<Button
  variant="contained"
    onClick={() => {
    localStorage.removeItem("showProfile");
    navigate("/employee-wizard");
  }}
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
    textTransform: "uppercase",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#43a008",
      boxShadow: "none",
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
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderTop: "2px solid #4CAF0A",
          zIndex: 1200,
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
                src={logo}
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

            {/* Desktop Menu */}
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
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() =>
                    scrollToSection(item.id, item.label)
                  }
                  sx={{
                    color:
                      activeItem === item.label
                        ? "#4CAF0A"
                        : "#666",
                    fontSize: "15px",
                    fontWeight:
                      activeItem === item.label ? 700 : 500,
                    textTransform: "none",
                    borderBottom:
                      activeItem === item.label
                        ? "2px solid #4CAF0A"
                        : "2px solid transparent",
                    borderRadius: 0,
                    paddingBottom: "8px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: "transparent",
                      color: "#4CAF0A",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right Side */}
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
              {/* Login */}
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

              {/* Get Started */}
         <Button
  variant="contained"
  onClick={() => navigate("/employee-wizard")}
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
    textTransform: "uppercase",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#43a008",
      boxShadow: "none",
    },
  }}
>
  GET STARTED
</Button>
              {/* Mobile Menu */}
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

      {/* Header Spacer */}
      <Toolbar />

      {/* Mobile Drawer */}
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