import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "../website/pages/Home";
import ContactUs from "../website/pages/ContactUs";

const WebsiteRoutes = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>
  );
};

export default WebsiteRoutes;