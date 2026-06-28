// components/Layout.jsx
// Combined Layout — Sidebar + Header + <Outlet/> all in one file.
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, Award, CalendarDays, Send, Briefcase,
  FolderOpen, Trophy, MessageSquare, Bell, Settings, HelpCircle,
  LogOut, Menu, X, ChevronDown, ShieldCheck,
} from "lucide-react";
import SummaryApi from "../../../common/index";

const GREEN = "#4CAF0A";

/* ───────────────────────── shared: read employee from session ───────────────────────── */
function useEmployee() {
  const [employee, setEmployee] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [flags, setFlags] = useState({ profileVerified: false, documentVerified: false });

  useEffect(() => {
    try {
      const data = sessionStorage.getItem("employee");
      if (data) {
        const emp = JSON.parse(data);
        setEmployee(emp);
        if (emp.profile_image) {
          setProfileImg(`${SummaryApi.getprofileimage.url}${emp.profile_image}`);
        }
      }
      setFlags({
        profileVerified: sessionStorage.getItem("profile_verified") === "1",
        documentVerified: sessionStorage.getItem("document_verified") === "1",
      });
    } catch (e) {
      console.error("Error parsing employee data:", e);
    }
  }, []);

  return { employee, profileImg, ...flags };
}

const getInitials = (name) => {
  if (!name) return "JD";
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
};

const getRoleDisplay = (employee) =>
  employee?.role
    ? employee.role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Employee";

/* ───────────────────────── Avatar (image or initials) ───────────────────────── */
const Avatar = ({ name, imgSrc, size = 40 }) => {
  const [imgError, setImgError] = useState(false);
  if (imgSrc && !imgError) {
    return (
      <img
        src={imgSrc}
        alt={name}
        onError={() => setImgError(true)}
        style={{
          width: size, height: size, borderRadius: "50%", objectFit: "cover",
          border: `2px solid ${GREEN}`,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(135deg, ${GREEN}, #2d7a06)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `2px solid ${GREEN}`, flexShrink: 0,
      }}
    >
      <span style={{ color: "#fff", fontWeight: 700, fontSize: size * 0.36 }}>
        {getInitials(name)}
      </span>
    </div>
  );
};

/* ───────────────────────── SIDEBAR ───────────────────────── */
const menuItems = [
  { path: "/employee-panel/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/employee-panel/profile", icon: User, label: "My Profile" },
  { path: "/employee-panel/skill-test", icon: Award, label: "Skill Test & Score" },
  { path: "/employee-panel/interview-schedule", icon: CalendarDays, label: "Interview Schedule" },
  { path: "/employee-panel/job-invitations", icon: Send, label: "Job Invitations" },
  { path: "/employee-panel/applied-jobs", icon: Briefcase, label: "Applied Jobs" },
  { path: "/employee-panel/my-works", icon: FolderOpen, label: "My Works" },
  { path: "/employee-panel/achievements", icon: Trophy, label: "My Achievements" },
  { path: "/employee-panel/messages", icon: MessageSquare, label: "Messages" },
  { path: "/employee-panel/notifications", icon: Bell, label: "Notifications" },
  { path: "/employee-panel/settings", icon: Settings, label: "Settings" },
  { path: "/employee-panel/help-support", icon: HelpCircle, label: "Help & Support" },
];

const Sidebar = ({ employee, profileVerified, documentVerified, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const visibilityLabel =
    profileVerified && documentVerified ? "High" : profileVerified || documentVerified ? "Medium" : "Low";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/employee-panel/login", { replace: true });
  };

  return (
    <>
      {/* Sidebar - Full height with smooth transition */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-gray-200 shadow-2xl z-40 transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Section - with proper padding */}
        <div className="h-20 flex items-center px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #2d7a06)` }}
            >
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight leading-tight">Crewzaar</h1>
              <p className="text-[10px] text-gray-500 font-medium leading-tight">Skip the search. Hire the Best.</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu - with proper spacing */}
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "font-semibold shadow-sm bg-[#edffd6] text-[#2d7a06]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon 
                      size={20} 
                      color={active ? GREEN : "#9ca3af"} 
                      strokeWidth={active ? 2.5 : 2} 
                    />
                    <span className="text-sm flex-1 text-left font-medium">{item.label}</span>
                    {active && (
                      <span 
                        className="w-1.5 h-6 rounded-full flex-shrink-0" 
                        style={{ background: GREEN }} 
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Profile Visibility + Logout */}
        <div className="p-4 flex-shrink-0 border-t border-gray-200 space-y-3">
          {/* Profile Visibility Card */}
          <div
            className="rounded-2xl p-4 text-white"
            style={{ background: `linear-gradient(135deg, ${GREEN}, #2d7a06)` }}
          >
            <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
              <ShieldCheck size={14} /> Profile Visibility
            </div>
            <div className="text-2xl font-bold mb-3">{visibilityLabel}</div>
            <button
              onClick={() => {
                navigate("/employee-panel/profile");
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className="w-full bg-white/95 hover:bg-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
              style={{ color: GREEN }}
            >
              Improve Profile
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
          >
            <LogOut size={19} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay - only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

/* ───────────────────────── HEADER ───────────────────────── */
const Header = ({ employee, profileVerified, onMenuClick }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    if (employee?.profile_image) {
      setProfileImg(`${SummaryApi.getprofileimage.url}${employee.profile_image}`);
    }
  }, [employee]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/employee-panel/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-[280px] h-20 bg-white border-b border-gray-200 z-30 transition-all duration-300">
      <div className="h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Welcome text with proper padding */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Menu button - visible on mobile, hidden on desktop */}
          <button 
            onClick={onMenuClick} 
            className="lg:hidden flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={22} className="text-gray-600" />
          </button>
          
          <div className="min-w-0">
            <h1 className="text-base md:text-xl font-bold text-gray-800 truncate">
              Welcome back, {employee?.full_name || "Employee"} 👋
            </h1>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block truncate">
              {profileVerified
                ? "Your profile is verified and visible to top companies"
                : "Complete your profile to get verified"}
            </p>
          </div>
        </div>

        {/* Right: Icons + Avatar with proper spacing */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Message Icon */}
          <button className="relative p-2.5 md:p-3 rounded-xl hover:bg-gray-100 transition-colors">
            <MessageSquare size={20} className="text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
              2
            </span>
          </button>

          {/* Bell Icon */}
          <button className="relative p-2.5 md:p-3 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
              5
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1.5 md:px-3 md:py-2 rounded-xl transition-colors"
            >
              <Avatar name={employee?.full_name} imgSrc={profileImg} size={40} />
              <ChevronDown 
                size={18} 
                className={`text-gray-400 hidden lg:block transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-40">
                  {/* Profile Header */}
                  <div className="p-5 border-b border-gray-100 text-center">
                    <div className="flex justify-center mb-3">
                      <Avatar name={employee?.full_name} imgSrc={profileImg} size={64} />
                    </div>
                    <h2 className="font-bold text-gray-800">{employee?.full_name || "Employee"}</h2>
                    <p className="text-sm text-gray-500">{getRoleDisplay(employee)}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {employee?.employee_id ?? "N/A"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      navigate("/employee-panel/profile");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <User size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/employee-panel/settings");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Settings size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-colors text-red-600 border-t border-gray-100"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

/* ───────────────────────── LAYOUT (default export) ───────────────────────── */
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { employee, profileVerified, documentVerified } = useEmployee();

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        employee={employee}
        profileVerified={profileVerified}
        documentVerified={documentVerified}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="lg:ml-[280px] flex flex-col min-h-screen transition-all duration-300">
        <Header
          employee={employee}
          profileVerified={profileVerified}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        {/* Main content with proper padding and margin */}
        <main className="mt-20 p-4 md:p-6 lg:p-8 flex-1">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;