// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header - Fixed */}
        <Header />

        {/* Page Content */}
        <main className="mt-20 lg:mt-20 p-4 md:p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;