import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Patient Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here is your health overview.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Profile */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <PersonOutlineOutlinedIcon className="text-purple-600" />
          <h2 className="text-lg font-semibold mt-2">Profile</h2>
          <p className="text-sm text-gray-500">Complete your profile</p>
        </div>

        {/* Appointments */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <CalendarMonthOutlinedIcon className="text-blue-600" />
          <h2 className="text-lg font-semibold mt-2">Appointments</h2>
          <p className="text-sm text-gray-500">3 upcoming visits</p>
        </div>

        {/* Reports */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <DescriptionOutlinedIcon className="text-green-600" />
          <h2 className="text-lg font-semibold mt-2">Reports</h2>
          <p className="text-sm text-gray-500">2 new reports</p>
        </div>

        {/* Hospital */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <LocalHospitalOutlinedIcon className="text-red-500" />
          <h2 className="text-lg font-semibold mt-2">Health Status</h2>
          <p className="text-sm text-gray-500">Stable</p>
        </div>

      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Health Summary */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Health Overview
          </h2>

          <div className="space-y-3 text-sm text-gray-600">

            <div className="flex justify-between">
              <span>Blood Pressure</span>
              <span className="text-green-600">Normal</span>
            </div>

            <div className="flex justify-between">
              <span>Heart Rate</span>
              <span className="text-green-600">78 bpm</span>
            </div>

            <div className="flex justify-between">
              <span>Blood Group</span>
              <span>O+</span>
            </div>

          </div>
        </div>

        {/* Activity */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Activity
          </h2>

          <div className="space-y-3 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <TrendingUpOutlinedIcon fontSize="small" />
              <span>Profile updated</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUpOutlinedIcon fontSize="small" />
              <span>Report downloaded</span>
            </div>

          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-3">

          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl">
            Book Appointment
          </button>

          <button className="px-4 py-2 border rounded-xl">
            View Reports
          </button>

          <button className="px-4 py-2 border rounded-xl">
            AI Health Chat
          </button>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;