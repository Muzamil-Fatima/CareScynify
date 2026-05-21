import React, { useState } from "react";
import toast from "react-hot-toast";

const NotificationsTab = () => {
  const [preferences, setPreferences] = useState({
    appointments: true,
    criticalVitals: false,
    labResults: true,
    clincialChats: true,
    inventoryAlerts: false,
    securityAlerts: true
  });

  const handleSave = () => {
    // API integrations can be placed here
    toast.success("Your notification preferences have been updated.");
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Doctor Notification Preferences</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage how and when you want to receive alerts regarding your patients, schedule, and clinic updates.
        </p>
      </div>

      <div className="max-w-xl space-y-1">
        {/* 1. New Patient Bookings */}
        <label className="flex items-center justify-between py-3.5 border-b border-slate-100 cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
              New Appointments & Cancellations
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Get notified immediately when a patient books, reschedules, or cancels an appointment with you.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.appointments}
            onChange={(e) => setPreferences({ ...preferences, appointments: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
          />
        </label>

        {/* 2. Critical Patient Vitals */}
        <label className="flex items-center justify-between py-3.5 border-b border-slate-100 cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
              Critical Patient Vitals & Telemetry
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Receive high-priority emergency alerts if an assigned patient's health metrics cross safety thresholds.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.criticalVitals}
            onChange={(e) => setPreferences({ ...preferences, criticalVitals: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
          />
        </label>

        {/* 3. Lab & Diagnostic Reports */}
        <label className="flex items-center justify-between py-3.5 border-b border-slate-100 cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
              Patient Lab & Test Results
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Get an alert as soon as laboratory or radiology reports are uploaded for your review.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.labResults}
            onChange={(e) => setPreferences({ ...preferences, labResults: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
          />
        </label>

        {/* 4. Clinical Chats */}
        <label className="flex items-center justify-between py-3.5 border-b border-slate-100 cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
              Patient Queries & Staff Messages
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Receive real-time notifications for new chat messages from your patients or clinic receptionists.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.clincialChats}
            onChange={(e) => setPreferences({ ...preferences, clincialChats: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
          />
        </label>

        {/* 5. Medical Inventory Alerts */}
        <label className="flex items-center justify-between py-3.5 border-b border-slate-100 cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
              Clinic & Operation Materials Stock
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Receive alerts if your frequently prescribed medications or surgical equipment run low on stock.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.inventoryAlerts}
            onChange={(e) => setPreferences({ ...preferences, inventoryAlerts: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
          />
        </label>

        {/* 6. Account Security */}
        <label className="flex items-center justify-between py-3.5 cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
              Security & Login Alerts
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Get notified immediately if your doctor portal account is accessed from a new device or location.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.securityAlerts}
            onChange={(e) => setPreferences({ ...preferences, securityAlerts: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
          />
        </label>
      </div>

      {/* Action Button */}
      <div className="max-w-xl flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationsTab;