import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default WebsiteRoutes;