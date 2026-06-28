import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import WebsiteRoutes from "../modules/website/routes";
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
        {/* Employee panel — must come BEFORE the wildcard website route */}
        <Route path="/employee-panel/*" element={<EmployeeRoutes />} />

        {/* Employee wizard — must come BEFORE the wildcard website route */}
        <Route path="/employee-wizard/*" element={<EmployeeWizardRoutes />} />

        {/* Main website routes — wildcard last so it doesn't swallow other paths */}
        <Route path="/*" element={<WebsiteRoutes />} />
      </Routes>
    </>
  );
};

export default AppRoutes;