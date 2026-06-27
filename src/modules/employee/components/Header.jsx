// components/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiMail,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMenu,
} from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const data = sessionStorage.getItem("employee");
      if (data) {
        setEmployee(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error parsing employee data:", error);
    }
  }, []);

  const getInitials = () => {
    if (!employee?.full_name) return "JD";
    const names = employee.full_name.split(" ").slice(0, 2);
    return names.map(n => n[0]).join("").toUpperCase();
  };

  const getRoleDisplay = () => {
    if (employee?.role) {
      return employee.role.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    }
    return "Employee";
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/employee-panel/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-72 h-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-30 transition-all duration-300">
      <div className="h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="lg:hidden">
            <FiMenu size={22} className="text-gray-600" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
              {employee ? `Employee Management Portal - ${getRoleDisplay()}` : "Employee Management Portal"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
          {/* Search - Hidden on small screens */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 lg:px-4 lg:py-2.5 w-32 lg:w-64 xl:w-80 transition-all focus-within:ring-2 focus-within:ring-green-500/20">
            <FiSearch className="text-gray-400 flex-shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Mail */}
          <button className="relative bg-gray-100 p-2 md:p-3 rounded-xl hover:bg-gray-200 transition-colors">
            <FiMail size={18} className="md:w-5 md:h-5" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] md:text-[10px] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-semibold">
              4
            </span>
          </button>

          {/* Notification */}
          <button className="relative bg-gray-100 p-2 md:p-3 rounded-xl hover:bg-gray-200 transition-colors">
            <FiBell size={18} className="md:w-5 md:h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] md:text-[10px] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-semibold">
              9
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 md:gap-3 hover:bg-gray-100 px-2 py-1.5 md:px-3 md:py-2 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-green-500 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-sm md:text-base">
                {getInitials()}
              </div>

              <div className="hidden lg:block text-left">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {employee?.full_name || "Employee"}
                </h3>
                <p className="text-xs text-gray-500 truncate max-w-[100px]">
                  {employee?.role ? employee.role.replace(/_/g, " ") : "Employee"}
                </p>
              </div>

              <FiChevronDown size={16} className="text-gray-400 hidden lg:block" />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                <div className="p-5 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-2xl">
                    {getInitials()}
                  </div>
                  <h2 className="text-center font-bold mt-3 text-gray-800">
                    {employee?.full_name || "Employee"}
                  </h2>
                  <p className="text-center text-sm text-gray-500">
                    {employee?.email || "employee@crewzaar.com"}
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    ID: {employee?.employee_id || "N/A"}
                  </p>
                </div>

                <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                  <FiUser size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">My Profile</span>
                </button>

                <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                  <FiSettings size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Settings</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-colors text-red-600 border-t border-gray-100"
                >
                  <FiLogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;