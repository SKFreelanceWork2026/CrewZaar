import { Routes, Route } from "react-router-dom";

import WebsiteRoutes from "../modules/website/routes";

// future
// import AdminRoutes from "../modules/admin/routes";
// import EmployeeRoutes from "../modules/employee/routes";
// import EmployerRoutes from "../modules/employer/routes";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Website */}
      <Route path="/*" element={<WebsiteRoutes />} />

      {/* Future Panels */}
      {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
      {/* <Route path="/employee/*" element={<EmployeeRoutes />} /> */}
      {/* <Route path="/employer/*" element={<EmployerRoutes />} /> */}

    </Routes>
  );
};

export default AppRoutes;