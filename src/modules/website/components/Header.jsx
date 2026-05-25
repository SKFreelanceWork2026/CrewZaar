import React, { useState } from "react";

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
import logo from "../../../assets/images/Logo.jpeg";

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
  const [activeItem, setActiveItem] = useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  const drawer = (
    <Box sx={{ width: 250, paddingTop: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => {
                handleNavClick(item);
                handleDrawerToggle();
              }}
              sx={{
                justifyContent: "center",
                mx: 1,
                borderRadius: "8px",
                transition: "background-color 0.25s ease",
                backgroundColor:
                  activeItem === item ? "#f0fae8" : "transparent",
                "&:hover": {
                  backgroundColor: "#f0fae8",
                  "& .nav-label": { color: "#4CAF0A" },
                },
              }}
            >
              <ListItemText
                primary={item}
                slotProps={{
                  primary: {
                    className: "nav-label",
                    sx: {
                      textAlign: "center",
                      fontWeight: activeItem === item ? 700 : 500,
                      color: activeItem === item ? "#4CAF0A" : "#444",
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
              "&:hover": { backgroundColor: "#f0fae8" },
            }}
          >
            <LoginIcon sx={{ marginRight: 1, color: "#555", fontSize: 20 }} />
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

        {/* GET STARTED button — centered, auto width */}
        <Box
          mt={2}
          mb={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: "#4CAF0A",
              borderRadius: "10px",
              fontWeight: "bold",
              paddingY: 1.2,
              paddingX: 4,
              fontSize: "14px",
              textTransform: "uppercase",
              "&:hover": { backgroundColor: "#43a008", boxShadow: "none" },
              boxShadow: "none",
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
    src={logo}
    alt="Crewzaar"
    sx={{
      height: { xs: 38, sm: 42, md: 48 },
      objectFit: "contain",
    }}
  />
</Box>

            {/* DESKTOP MENU */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  sx={{
                    color: activeItem === item ? "#4CAF0A" : "#666",
                    fontSize: "15px",
                    fontWeight: activeItem === item ? 700 : 500,
                    textTransform: "none",
                    borderBottom:
                      activeItem === item
                        ? "2px solid #4CAF0A"
                        : "2px solid transparent",
                    borderRadius: 0,
                    paddingBottom: "8px",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      background: "transparent",
                      color: "#4CAF0A",
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
                gap: { xs: 1, sm: 2, md: 3 },
              }}
            >
              {/* Desktop Login */}
              <Button
                startIcon={<LoginIcon />}
                sx={{
                  display: { xs: "none", md: "flex" },
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
                  display: { xs: "none", md: "flex" },
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
                  display: { xs: "flex", md: "none" },
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
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;