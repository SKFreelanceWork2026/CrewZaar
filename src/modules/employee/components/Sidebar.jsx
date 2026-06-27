// components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiStar,
  FiAward,
  FiBarChart2,
  FiClipboard,
  FiFileText,
  FiBell,
  FiMessageSquare,
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/employee-panel/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/employee-panel/employee-wizard", icon: FiUser, label: "Employee Wizard" },
    { path: "/employee-panel/profile", icon: FiBriefcase, label: "Profile" },
    { path: "/employee-panel/skills", icon: FiStar, label: "Skills" },
    { path: "/employee-panel/assessments", icon: FiAward, label: "Assessments" },
    { path: "/employee-panel/applied-jobs", icon: FiClipboard, label: "Applied Jobs" },
    { path: "/employee-panel/documents", icon: FiFileText, label: "Documents" },
    { path: "/employee-panel/messages", icon: FiMessageSquare, label: "Messages" },
    { path: "/employee-panel/notifications", icon: FiBell, label: "Notifications" },
    { path: "/employee-panel/settings", icon: FiSettings, label: "Settings" },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/employee-panel/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <FiX size={22} className="text-gray-600" /> : <FiMenu size={22} className="text-gray-600" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">Crewzaar</h1>
              <p className="text-xs text-gray-500 font-medium">Employee Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 h-[calc(100vh-5rem)] overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-green-50 text-green-700 font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon size={20} className={active ? "text-green-600" : "text-gray-500"} />
                    <span className="text-sm flex-1 text-left">{item.label}</span>
                    {active && (
                      <span className="w-1.5 h-6 bg-green-600 rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Logout - Fixed at bottom */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
              >
                <FiLogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;