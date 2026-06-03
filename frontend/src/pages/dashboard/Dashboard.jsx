import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Material UI Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";

// Mock Data for Premium Health Analytics Graph
const healthData = [
  { month: "Jan", heartRate: 72, bloodSugar: 95 },
  { month: "Feb", heartRate: 75, bloodSugar: 98 },
  { month: "Mar", heartRate: 71, bloodSugar: 92 },
  { month: "Apr", heartRate: 78, bloodSugar: 104 },
  { month: "May", heartRate: 74, bloodSugar: 99 },
  { month: "Jun", heartRate: 73, bloodSugar: 96 },
];

const PatientDashboard = () => {
  return (
    <div className="p-8 space-y-8 bg-[#f8fafc] min-h-screen">
      {/* 1. PREMIUM HEADER BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-linear-to-r from-purple-900 to-indigo-950 p-6 rounded-3xl shadow-xs text-white">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome Back, Patient Portal
          </h1>
          <p className="text-purple-200/80 text-xs mt-1">
            Your telemetry sync is active. Everything looks optimal and steady
            today.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
          Last Sync: Today, 10:45 AM
        </div>
      </div>

      {/* 2. TOP METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Profile */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 group hover:border-purple-200 transition">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <PersonOutlineOutlinedIcon />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              My Profile
            </h3>
            <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">
              Verified Patient
            </p>
          </div>
        </div>

        {/* Card 2: Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 group hover:border-blue-200 transition">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <CalendarMonthOutlinedIcon />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Appointments
            </h3>
            <p className="text-sm font-bold text-slate-800 mt-0.5">
              3 Upcoming Visits
            </p>
          </div>
        </div>

        {/* Card 3: Reports */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 group hover:border-emerald-200 transition">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <DescriptionOutlinedIcon />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Lab Records
            </h3>
            <p className="text-sm font-bold text-slate-800 mt-0.5">
              2 New Reports Available
            </p>
          </div>
        </div>

        {/* Card 4: Health Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 group hover:border-rose-200 transition">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
            <LocalHospitalOutlinedIcon />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Health Vitals
            </h3>
            <p className="text-sm font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
              Stable Condition
            </p>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE GRAPH & VITALS SUMMARY CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Line Graph Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Health Progress Tracking
              </h2>
              <p className="text-xs text-slate-400">
                Monthly breakdown tracking heart rates vs glucose margins.
              </p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-600" /> Heart
                Rate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Blood
                Sugar
              </span>
            </div>
          </div>

          {/* Premium Recharts Render Arena */}
          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={healthData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#9333ea"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#purpleGlow)"
                />
                <Area
                  type="monotone"
                  dataKey="bloodSugar"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#blueGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Summary Vitals Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-1">
              Current Medical Vitals
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Latest clinical evaluations compiled locally.
            </p>

            <div className="space-y-3">
              {/* Vital Row 1 */}
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <FavoriteBorderOutlinedIcon
                    className="text-rose-500"
                    fontSize="small"
                  />
                  <span>Blood Pressure Status</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  120/80 mmHg
                </span>
              </div>

              {/* Vital Row 2 */}
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <OpacityOutlinedIcon
                    className="text-blue-500"
                    fontSize="small"
                  />
                  <span>Blood Sugar (Fasting)</span>
                </div>
                <span className="text-xs font-bold text-slate-800">
                  96 mg/dL
                </span>
              </div>

              {/* Vital Row 3 */}
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <PersonOutlineOutlinedIcon
                    className="text-purple-500"
                    fontSize="small"
                  />
                  <span>Body Mass Index (BMI)</span>
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  23.4 (Normal)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Informational Notice Footer */}
          <div className="mt-4 p-3 rounded-xl bg-purple-50/50 border border-purple-100/50 text-[11px] text-purple-900 leading-relaxed">
            💡 <strong>Doctor's Advice:</strong> Continue your morning workout
            routine and maintain low hydration targets.
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACTION FOOTER STAGE */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-800">
          Quick Portal Operations
        </h2>

        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs shadow-purple-100 transition cursor-pointer flex items-center gap-1.5">
            Book Appointment <ArrowForwardIosIcon className="text-[10px]" />
          </button>

          <button className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
            Download Laboratory Reports
          </button>

          <button className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
            AI Symptom Assessment Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
