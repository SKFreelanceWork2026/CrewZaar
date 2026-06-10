import React, { useState, useEffect } from "react";
import ChooseRole from "../components/ChooseRole";
import ProfileSection from "../components/ProfileSection";

const EmployeeWizard = () => {
  const [showProfile, setShowProfile] = useState(
    localStorage.getItem("showProfile") === "true"
  );

  const handleRoleSelect = () => {
    setShowProfile(true);
    localStorage.setItem("showProfile", "true");

    // Add browser history entry
    window.history.pushState({ page: "profile" }, "");
  };

  useEffect(() => {
    const handlePopState = () => {
      setShowProfile(false);
      localStorage.removeItem("showProfile");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {!showProfile && (
        <ChooseRole onSelectRole={handleRoleSelect} />
      )}

      {showProfile && <ProfileSection />}
    </>
  );
};

export default EmployeeWizard;