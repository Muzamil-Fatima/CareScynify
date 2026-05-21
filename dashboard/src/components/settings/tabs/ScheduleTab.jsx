import React, { useState } from "react";
import toast from "react-hot-toast";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";

const ScheduleTab = () => {
  // Days of the week data layout
  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  // State Management for Doctor Schedule configuration
  const [schedule, setSchedule] = useState({
    activeDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    slotDuration: "20", // in minutes
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "17:00",
    eveningEnd: "21:00",
    allowEmergencyBookings: true,
  });

  const toggleDay = (dayKey) => {
    setSchedule((prev) => ({
      ...prev,
      activeDays: {
        ...prev.activeDays,
        [dayKey]: !prev.activeDays[dayKey],
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchedule((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Integrated back-end API structures go here
    toast.success("Doctor consultation schedule updated successfully!");
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header Banner metadata */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CalendarMonthOutlinedIcon className="text-purple-600" />
          Consultation Schedule & Shifts
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure your standard weekly operational calendar, active consultation time blocks, and check-up intervals.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        
        {/* 1. WEEKLY ROUTINE DAYS SELECTOR */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Available Practice Days
          </label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => {
              const isActive = schedule.activeDays[day.key];
              return (
                <button
                  type="button"
                  key={day.key}
                  onClick={() => toggleDay(day.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition border select-none cursor-pointer
                    ${
                      isActive
                        ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 2. INTERVAL DURATION CONTROL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <HourglassEmptyOutlinedIcon fontSize="inherit" /> Consultation Slot Duration
            </label>
            <select
              name="slotDuration"
              value={schedule.slotDuration}
              onChange={handleInputChange}
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 transition cursor-pointer"
            >
              <option value="10">10 Minutes per patient</option>
              <option value="15">15 Minutes per patient</option>
              <option value="20">20 Minutes per patient</option>
              <option value="30">30 Minutes per patient</option>
              <option value="45">45 Minutes per patient</option>
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col justify-end pb-2">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                name="allowEmergencyBookings"
                checked={schedule.allowEmergencyBookings}
                onChange={handleInputChange}
                className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
              />
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
                  Allow Emergency Overlap
                </p>
                <p className="text-xs text-slate-400">
                  Allows receptionists to force-book urgent cases over standard intervals.
                </p>
              </div>
            </label>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 3. DUAL SHIFT ROUTINE SETUP */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <AccessTimeOutlinedIcon fontSize="small" className="text-slate-400" />
            Shift Hour Configurations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning Block */}
            <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md tracking-wide">
                Morning Session
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Session Start</label>
                  <input
                    type="time"
                    name="morningStart"
                    value={schedule.morningStart}
                    onChange={handleInputChange}
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-2 outline-none focus:border-purple-600 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Session End</label>
                  <input
                    type="time"
                    name="morningEnd"
                    value={schedule.morningEnd}
                    onChange={handleInputChange}
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-2 outline-none focus:border-purple-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Evening Block */}
            <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md tracking-wide">
                Evening Session
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Session Start</label>
                  <input
                    type="time"
                    name="eveningStart"
                    value={schedule.eveningStart}
                    onChange={handleInputChange}
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-2 outline-none focus:border-purple-600 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Session End</label>
                  <input
                    type="time"
                    name="eveningEnd"
                    value={schedule.eveningEnd}
                    onChange={handleInputChange}
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-2 outline-none focus:border-purple-600 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ACTIONS */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            Save Practice Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTab;