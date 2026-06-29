// EmployeeRoutes.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Layout from "./components/Layout";
import Dashboard from "../employee/Dashboard";
import Profile from "../employee/Profile";
import SkillAssessment from "../employee/Skillassessment";

import JobInvitations from "../employee/Jobinvitations";
import AppliedJobs from "../employee/Appliedjobs";
import Portfolio from "../employee/Portfolio";


/**
 * ProtectedRoute — re-checks sessionStorage every time the location
 * changes (not just once on mount), and logs exactly what it finds.
 * This removes any ambiguity about *when* the auth flag is read.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const flag = sessionStorage.getItem("isAuthenticated") === "true";
    const employee = sessionStorage.getItem("employee");

    console.log("[ProtectedRoute] checking auth", {
      path: location.pathname,
      isAuthenticatedFlag: sessionStorage.getItem("isAuthenticated"),
      hasEmployeeData: !!employee,
    });

    setIsAuthenticated(flag);
    setAuthChecked(true);
  }, [location.pathname]);

  // Avoid a one-frame flash to /login while the check above runs
  if (!authChecked) return null;

  if (!isAuthenticated) {
    console.warn(
      "[ProtectedRoute] NOT authenticated — redirecting to login from",
      location.pathname
    );
    return <Navigate to="/employee-panel/login" state={{ from: location }} replace />;
  }

  return children;
};

const EmployeeRoutes = () => {
  return (
    <Routes>
      {/* Login — always accessible */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill-test" element={<SkillAssessment />} />
        <Route path="/job-invitations" element={<JobInvitations />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/my-works" element={<Portfolio />} />

      </Route>

      {/* Catch-all — log what path slipped through, then send home */}
      <Route
        path="*"
        element={<UnmatchedRouteRedirect />}
      />
    </Routes>
  );
};

const UnmatchedRouteRedirect = () => {
  const location = useLocation();
  useEffect(() => {
    console.warn(
      "[EmployeeRoutes] No route matched — falling through to catch-all for path:",
      location.pathname
    );
  }, [location.pathname]);

  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  return (
    <Navigate
      to={isAuthenticated ? "/employee-panel/dashboard" : "/employee-panel/login"}
      replace
    />
  );
};

export default EmployeeRoutes;