// Dashboard.jsx
import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Button,
  Badge,
  Chip,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Changed Logo.png";

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#1a2e1a",
    color: "#fff",
    borderRight: "none",
  },
}));

const DrawerHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "20px 16px",
  justifyContent: "center",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
});

const LogoImage = styled("img")({
  width: 40,
  height: 40,
  objectFit: "contain",
});

const DrawerMenuItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: 10,
  margin: "4px 12px",
  color: "rgba(255,255,255,0.7)",
  "&:hover": {
    backgroundColor: "rgba(76,175,10,0.15)",
    color: "#fff",
  },
  ...(active && {
    backgroundColor: "rgba(76,175,10,0.2)",
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: "#4CAF0A",
    },
  }),
}));

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#fff",
  color: "#111",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
});

const StatCard = styled(Card)({
  borderRadius: 16,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
});

const StatIconWrapper = styled(Box)(({ bgcolor }) => ({
  width: 52,
  height: 52,
  borderRadius: 12,
  backgroundColor: bgcolor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}));

const ActivityCard = styled(Paper)({
  borderRadius: 16,
  padding: "20px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
});

// Menu items
const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Employees", icon: <PeopleIcon />, path: "/employees" },
  { text: "Jobs", icon: <WorkIcon />, path: "/jobs" },
  { text: "Assignments", icon: <AssignmentIcon />, path: "/assignments" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

// Mock data
const statsData = [
  {
    title: "Total Employees",
    value: "1,847",
    change: "+12.5%",
    trend: "up",
    icon: <PeopleIcon />,
    bgcolor: "#4CAF0A",
  },
  {
    title: "Active Jobs",
    value: "432",
    change: "+8.2%",
    trend: "up",
    icon: <WorkIcon />,
    bgcolor: "#2196F3",
  },
  {
    title: "Pending Tasks",
    value: "89",
    change: "-3.1%",
    trend: "down",
    icon: <PendingIcon />,
    bgcolor: "#FF9800",
  },
  {
    title: "Completed",
    value: "2,341",
    change: "+18.7%",
    trend: "up",
    icon: <CheckCircleIcon />,
    bgcolor: "#4CAF0A",
  },
];

const recentActivities = [
  {
    user: "John Doe",
    action: "completed job #1234",
    time: "5 mins ago",
    status: "success",
  },
  {
    user: "Jane Smith",
    action: "assigned to project Alpha",
    time: "15 mins ago",
    status: "pending",
  },
  {
    user: "Mike Johnson",
    action: "submitted report Q4",
    time: "1 hour ago",
    status: "success",
  },
  {
    user: "Sarah Williams",
    action: "requested time off",
    time: "2 hours ago",
    status: "pending",
  },
];

const upcomingTasks = [
  { task: "Team Meeting", time: "10:00 AM", priority: "high" },
  { task: "Review Reports", time: "2:00 PM", priority: "medium" },
  { task: "Client Call", time: "4:30 PM", priority: "high" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // Add logout logic here
    navigate("/login");
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    if (window.innerWidth < 600) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <DrawerHeader>
        <LogoImage src={logo} alt="Crewzaar" />
        <Typography variant="h6" sx={{ ml: 1.5, fontWeight: 700, color: "#4CAF0A" }}>
          Crewzaar
        </Typography>
      </DrawerHeader>
      <Box sx={{ mt: 2 }}>
        {menuItems.map((item, index) => (
          <DrawerMenuItem
            key={item.text}
            active={selectedIndex === index}
            onClick={() => handleMenuItemClick(index)}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === index ? "#4CAF0A" : "rgba(255,255,255,0.5)",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiTypography-root": {
                  fontWeight: selectedIndex === index ? 600 : 400,
                  fontSize: 14,
                },
              }}
            />
          </DrawerMenuItem>
        ))}
      </Box>
      <Box sx={{ position: "absolute", bottom: 20, width: "100%", px: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />
        <DrawerMenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.5)", minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ "& .MuiTypography-root": { fontSize: 14 } }} />
        </DrawerMenuItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f7f5" }}>
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </StyledDrawer>

      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </StyledDrawer>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <StyledAppBar position="sticky">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flex: 1 }} />
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: "none", sm: "block" } }}>
                Admin User
              </Typography>
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar sx={{ width: 35, height: 35, bgcolor: "#4CAF0A" }}>A</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </StyledAppBar>

        <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#111", mb: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
            Welcome back! Here's what's happening with your business today.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <StatCard>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#888", fontWeight: 600, textTransform: "uppercase" }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#111", mt: 1 }}>
                          {stat.value}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          {stat.trend === "up" ? (
                            <TrendingUpIcon sx={{ color: "#4CAF0A", fontSize: 16 }} />
                          ) : (
                            <TrendingDownIcon sx={{ color: "#e24b4a", fontSize: 16 }} />
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              color: stat.trend === "up" ? "#4CAF0A" : "#e24b4a",
                              fontWeight: 600,
                              ml: 0.5,
                            }}
                          >
                            {stat.change}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#aaa", ml: 0.5 }}>
                            vs last month
                          </Typography>
                        </Box>
                      </Box>
                      <StatIconWrapper bgcolor={stat.bgcolor}>
                        {stat.icon}
                      </StatIconWrapper>
                    </Box>
                  </CardContent>
                </StatCard>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <ActivityCard>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Recent Activity
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5, borderBottom: index < recentActivities.length - 1 ? "1px solid #f0f0ea" : "none" }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: activity.status === "success" ? "#e8f5e0" : "#fff3e0", color: activity.status === "success" ? "#4CAF0A" : "#FF9800" }}>
                          {activity.status === "success" ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <PendingIcon sx={{ fontSize: 16 }} />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#111" }}>
                              {activity.user}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              {activity.action}
                            </Typography>
                            <Chip
                              label={activity.status}
                              size="small"
                              sx={{
                                backgroundColor: activity.status === "success" ? "#e8f5e0" : "#fff3e0",
                                color: activity.status === "success" ? "#4CAF0A" : "#FF9800",
                                fontSize: 10,
                                fontWeight: 600,
                                height: 20,
                              }}
                            />
                          </Box>
                        }
                        secondary={activity.time}
                        secondaryTypographyProps={{ variant: "caption", color: "#aaa" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </ActivityCard>
            </Grid>

            <Grid item xs={12} lg={5}>
              <ActivityCard sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Today's Schedule
                </Typography>
                {upcomingTasks.map((task, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: "#f8faf8", borderRadius: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#111" }}>
                        {task.task}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          backgroundColor: task.priority === "high" ? "#ffebee" : "#fff3e0",
                          color: task.priority === "high" ? "#e24b4a" : "#FF9800",
                          fontSize: 10,
                          fontWeight: 600,
                          height: 20,
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ScheduleIcon sx={{ color: "#aaa", fontSize: 14 }} />
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        {task.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </ActivityCard>

              <ActivityCard>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#4CAF0A",
                        "&:hover": { backgroundColor: "#3d9e00" },
                        borderRadius: 2,
                        py: 1.5,
                      }}
                    >
                      <PeopleIcon sx={{ mr: 1, fontSize: 18 }} />
                      Add Employee
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderColor: "#4CAF0A",
                        color: "#4CAF0A",
                        "&:hover": { borderColor: "#3d9e00", backgroundColor: "rgba(76,175,10,0.04)" },
                        borderRadius: 2,
                        py: 1.5,
                      }}
                    >
                      <WorkIcon sx={{ mr: 1, fontSize: 18 }} />
                      Create Job
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderColor: "#2196F3",
                        color: "#2196F3",
                        "&:hover": { borderColor: "#1976D2", backgroundColor: "rgba(33,150,243,0.04)" },
                        borderRadius: 2,
                        py: 1.5,
                      }}
                    >
                      <AssignmentIcon sx={{ mr: 1, fontSize: 18 }} />
                      Assign Task
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderColor: "#FF9800",
                        color: "#FF9800",
                        "&:hover": { borderColor: "#F57C00", backgroundColor: "rgba(255,152,0,0.04)" },
                        borderRadius: 2,
                        py: 1.5,
                      }}
                    >
                      <PendingIcon sx={{ mr: 1, fontSize: 18 }} />
                      View Pending
                    </Button>
                  </Grid>
                </Grid>
              </ActivityCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}