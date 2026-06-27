// EmployeeRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Layout from "./components/Layout";
import Dashboard from "../employee/Dashboard";

const EmployeeRoutes = () => {
  const isAuthenticated =
    sessionStorage.getItem("isAuthenticated") === "true";

  return (
    <Routes>
      {/* Login - Always accessible */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Check authentication at route level */}
      <Route
        element={
          isAuthenticated ? (
            <Layout />
          ) : (
            <Navigate to="/employee-panel/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
   
        {/* Add other protected routes here */}
      </Route>

      {/* Catch all - Redirect to login */}
      <Route
        path="*"
        element={<Navigate to="/employee-panel/login" replace />}
      />
    </Routes>
  );
};

export default EmployeeRoutes;