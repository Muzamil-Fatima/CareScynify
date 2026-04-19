import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main area below navbar */}
      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar */}
        <SideBar />

        {/* Page Content */}
        <div className="flex-1 bg-gray-50 p-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
