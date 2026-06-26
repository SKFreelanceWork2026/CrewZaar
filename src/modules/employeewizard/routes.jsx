import { Routes, Route } from "react-router-dom";
import EmployeeWizard from "./pages/EmployeeWizard";

const EmployeeWizardRoutes = () => {
  return (
    <Routes>
      <Route index element={<EmployeeWizard />} />
    </Routes>
  );
};

export default EmployeeWizardRoutes;