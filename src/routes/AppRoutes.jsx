import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import WebsiteRoutes from "../modules/website/routes";          // ← correct import
import EmployeeWizardRoutes from "../modules/employeewizard/routes";
import EmployeeRoutes from "../modules/employee/routes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main website routes */}
        <Route path="/*" element={<WebsiteRoutes />} />
        
        {/* Employee wizard routes */}
        <Route path="/employee-wizard/*" element={<EmployeeWizardRoutes />} />
        
        {/* Employee panel routes */}
        <Route path="/employee-panel/*" element={<EmployeeRoutes />} />
      </Routes>
    </>
  );
};

export default AppRoutes;