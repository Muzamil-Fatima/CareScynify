
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/patient/sidebar/SideBar";
import Navbar from "../components/common/Navbar";
import VerificationBanner from "../components/common/VerificationBanner";
import { useAuth } from "../hooks/useAuth";

const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("");

  const { user } = useAuth();

  // Show verification banner for any user whose email is not verified
  const showVerificationBanner = user?.accountVerified === false;

  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Content starts below navbar */}
      <div className="flex h-full pt-14">
        {/* Sidebar */}
        <SideBar
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Email Verification Banner */}
          {showVerificationBanner && <VerificationBanner />}

          {/* Page Content */}
          <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
