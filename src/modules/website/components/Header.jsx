import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import logo from "../../../assets/images/Changed Logo.png";

const navItems = [
  { label: "Home", id: "home", isPage: false, path: "/" },
  { label: "Platform", id: "platform", isPage: false, path: "/" },
  { label: "How It Works", id: "how-it-works", isPage: false, path: "/" },
  { label: "Services", id: "services", isPage: false, path: "/" },
  { label: "Pricing", id: "pricing", isPage: false, path: "/" },
  { label: "Contact", id: "contact-us", isPage: true, path: "/contact-us" },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isManualNav = useRef(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Initialize activeItem based on current URL
  const [activeItem, setActiveItem] = useState(
    location.pathname === "/contact-us" ? "Contact" : "Home"
  );

  // Handle resize to close drawer on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  // SIMPLIFIED: Update active item based on route only
  useEffect(() => {
    if (location.pathname === "/contact-us") {
      setActiveItem("Contact");
    } else {
      setActiveItem("Home");
    }
  }, [location.pathname]);

  // Separate open/close handlers
  const handleDrawerOpen = () => setMobileOpen(true);
  const handleDrawerClose = () => setMobileOpen(false);

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

  // Simplified navigation
  const handleNavigation = (item) => {
    setActiveItem(item.label);

    if (item.isPage) {
      navigate(item.path);
      setMobileOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setMobileOpen(false);
      // Wait for navigation then scroll
      setTimeout(() => {
        scrollToSection(item.id, item.label);
      }, 100);
      return;
    }

    scrollToSection(item.id, item.label);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250, paddingTop: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item)}
              sx={{
                color: activeItem === item.label ? "#4CAF0A" : "#666",
                fontSize: "15px",
                fontWeight: activeItem === item.label ? 600 : 500,
                textTransform: "none",
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "#f0fae8",
                  color: "#4CAF0A",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Login */}
        <ListItem disablePadding>
<ListItemButton
  onClick={() => {
    navigate("/employee-panel");  // 👈 change this
    handleDrawerClose();
  }}
  sx={{
    justifyContent: "center",
    mx: 1,
    borderRadius: "8px",
    "&:hover": { backgroundColor: "#f0fae8" },
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
              sessionStorage.removeItem("showProfile");
              navigate("/employee-wizard");
              handleDrawerClose();
            }}
            sx={{
              backgroundColor: "#4CAF0A",
              borderRadius: "10px",
              fontWeight: "bold",
              paddingY: 1.2,
              paddingX: 4,
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
              minHeight: "88px",
              height: "88px",
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/");
                  setActiveItem("Home");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }}
              />
            </Box>

            {/* Desktop Menu - Fixed width buttons with text-only underline */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 0.5,
                flex: 1,
                justifyContent: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  disableRipple
                  sx={{
                    width: "105px",
                    minWidth: "105px",
                    height: "48px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textTransform: "none",
                    borderRadius: 0,
                    background: "transparent",
                    padding: 0,
                    "&:hover": {
                      background: "transparent",
                    },
                    "&:hover .nav-label-span": {
                      color: "#4CAF0A",
                    },
                  }}
                >
                  <Box
                    component="span"
                    className="nav-label-span"
                    sx={{
                      display: "inline-block",
                      width: "fit-content",
                      color: activeItem === item.label ? "#4CAF0A" : "#666",
                      fontSize: "15px",
                      fontWeight: activeItem === item.label ? 600 : 500,
                      borderBottom:
                        activeItem === item.label
                          ? "2px solid #4CAF0A"
                          : "2px solid transparent",
                      paddingBottom: "2px",
                      lineHeight: 1.2,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Box>
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
  onClick={() => navigate("/employee-panel")}  // 👈 add this
  sx={{
    display: { xs: "none", md: "flex" },
    color: "#555",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "15px",
    minWidth: "auto",
    padding: "6px 12px",
  }}
>
  Login
</Button>
              {/* Get Started */}
              <Button
                variant="contained"
                onClick={() => {
                  sessionStorage.removeItem("showProfile");
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

              {/* Mobile Menu */}
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerOpen}
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
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: false,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;