import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import Navbar from "../components/common/Navbar";

const AppLayout = () => {
   const [isOpen, setIsOpen] = useState(true);
    const [activeSidebar, setActiveSidebar] = useState("");
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

        {/* Main Page Content */}
        <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;