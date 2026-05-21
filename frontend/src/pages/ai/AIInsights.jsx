import React from "react";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      title: "Heart Health Analysis",
      status: "Good",
      message: "Your heart rate is stable, synchronized, and well within your baseline normal range.",
      icon: <FavoriteOutlinedIcon fontSize="small" />,
      color: "text-emerald-600 border-emerald-100 bg-emerald-50/50",
      badge: "bg-emerald-500 text-white",
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 2,
      title: "Blood Pressure Trend",
      status: "Monitor",
      message: "Slight systolic fluctuations detected over the last 48 hours. Keep monitoring daily.",
      icon: <TrendingUpOutlinedIcon fontSize="small" />,
      color: "text-amber-600 border-amber-100 bg-amber-50/50",
      badge: "bg-amber-500 text-white",
      iconBg: "bg-amber-50 text-amber-600"
    },
    {
      id: 3,
      title: "Risk Assessment",
      status: "Low Risk",
      message: "No major immediate clinical health risks or critical threshold violations detected.",
      icon: <WarningAmberOutlinedIcon fontSize="small" />,
      color: "text-sky-600 border-sky-100 bg-sky-50/50",
      badge: "bg-sky-500 text-white",
      iconBg: "bg-sky-50 text-sky-600"
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#f8fafc] min-h-screen">

      {/* PREMIUM HEADER ARCHITECTURE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shadow-xs">
              <SmartToyOutlinedIcon fontSize="small" />
            </div>
            AI Health Insights
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time neural diagnostic evaluation computed from your synced biometric telemetry.
          </p>
        </div>
        
        {/* Model Status Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs text-[11px] font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Engine: BioMed-LLM v4.2 Active
        </div>
      </div>

      {/* CORE AI SUMMARY GRADIENT CARD */}
      <div className="relative overflow-hidden bg-linear-to-r from-purple-900 via-indigo-950 to-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-xs border border-white/5">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-purple-300">
            <PsychologyOutlinedIcon fontSize="small" />
          </div>
          <h2 className="text-base font-bold tracking-wide">Automated Diagnostic Summary</h2>
        </div>

        <p className="text-sm text-purple-100/90 leading-relaxed max-w-3xl">
          Based on your aggregate medical records and recent data uploads, the neural platform suggests that your overall physiological health parameters are currently <strong>stable</strong>. No emergency patterns are indicated. Continue following your prescribed workout routines and maintain standard cardiovascular targets.
        </p>
      </div>

      {/* INSIGHT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:border-purple-200 hover:shadow-xs transition duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header inside Card */}
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase ${item.badge}`}>
                  {item.status}
                </span>
              </div>

              {/* Title & Body */}
              <h3 className="text-sm font-bold text-slate-800 mt-4">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {item.message}
              </p>
            </div>

            {/* Status indicator bar style border wrapper */}
            <div className={`mt-5 p-2 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 ${item.color}`}>
              <AutoAwesomeOutlinedIcon className="text-[12px]" /> System validated telemetry.
            </div>
          </div>
        ))}
      </div>

      {/* PREMIUM AI CO-PILOT CHAT INTERFACE */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <AutoAwesomeOutlinedIcon fontSize="small" className="text-purple-600" />
            Interactive Medical Co-Pilot
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Query your data layers safely. Our conversational engine provides contextual evaluations based on your history.
          </p>
        </div>

        {/* Input Interactive Arena */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <input
            type="text"
            placeholder="Ask something like: 'Analyze why my blood pressure fluctuates in the morning'..."
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition"
          />

          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-xs shadow-purple-100 transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
            Send Query <ArrowForwardIcon className="text-[12px]" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default AIInsights;