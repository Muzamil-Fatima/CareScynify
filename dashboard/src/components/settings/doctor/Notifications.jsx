import React, { useState } from "react";
import toast from "react-hot-toast";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const NotificationsTab = () => {
  const [preferences, setPreferences] = useState({
    appointments: true,
    criticalVitals: false,
    labResults: true,
    clincialChats: true,
    inventoryAlerts: false,
    securityAlerts: true,
  });

  const handleSave = () => {
    toast.success("Your notification preferences have been updated.");
  };

  const notificationItems = [
    {
      key: "appointments",
      title: "New Appointments & Cancellations",
      description:
        "Get notified immediately when a patient books, reschedules, or cancels an appointment with you.",
      icon: <EventAvailableOutlinedIcon fontSize="small" />,
    },
    {
      key: "criticalVitals",
      title: "Critical Patient Vitals & Telemetry",
      description:
        "Receive high-priority emergency alerts if an assigned patient's health metrics cross safety thresholds.",
      icon: <MonitorHeartOutlinedIcon fontSize="small" />,
    },
    {
      key: "labResults",
      title: "Patient Lab & Test Results",
      description:
        "Get an alert as soon as laboratory or radiology reports are uploaded for your review.",
      icon: <BiotechOutlinedIcon fontSize="small" />,
    },
    {
      key: "clincialChats",
      title: "Patient Queries & Staff Messages",
      description:
        "Receive real-time notifications for new chat messages from your patients or clinic receptionists.",
      icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" />,
    },
    {
      key: "inventoryAlerts",
      title: "Clinic & Operation Materials Stock",
      description:
        "Receive alerts if your frequently prescribed medications or surgical equipment run low on stock.",
      icon: <Inventory2OutlinedIcon fontSize="small" />,
    },
    {
      key: "securityAlerts",
      title: "Security & Login Alerts",
      description:
        "Get notified immediately if your doctor portal account is accessed from a new device or location.",
      icon: <SecurityOutlinedIcon fontSize="small" />,
    },
  ];

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <NotificationsActiveOutlinedIcon className="text-purple-600" />
              Doctor Notification Preferences
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Manage how and when you want to receive alerts regarding your
              patients, schedule, and clinic updates.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-100 px-4 py-2 rounded-2xl">
            <p className="text-[10px] uppercase tracking-widest font-bold text-purple-700">
              Notification Center
            </p>
            <p className="text-xs font-semibold text-slate-700">
              Customize your alert experience
            </p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="space-y-4">
          {notificationItems.map((item, index) => (
            <label
              key={item.key}
              className={`flex items-center justify-between gap-4 p-4 rounded-2xl transition cursor-pointer hover:bg-slate-50 ${
                index !== notificationItems.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={preferences[item.key]}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    [item.key]: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-purple-600 rounded cursor-pointer shrink-0"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Information Note */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center shadow-xs shrink-0">
            <NotificationsActiveOutlinedIcon fontSize="small" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Notification Guidance
            </h4>

            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Critical health alerts and security notifications are recommended
              for all practitioners to ensure patient safety and account
              protection.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-3 rounded-2xl transition shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <SaveOutlinedIcon fontSize="small" />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationsTab;