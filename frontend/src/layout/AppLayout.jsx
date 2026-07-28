import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/common/Navbar";

const AppLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Content starts below navbar */}
      <div className="flex h-full pt-20">
        {/* Sidebar */}
        <SideBar />

        {/* Main Page Content */}
        <main className="flex-1 bg-gray-50 p-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;