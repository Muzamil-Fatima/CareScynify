import React, { useState } from "react";

const NotificationSetting = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleSave = () => {
    alert("Notification settings saved!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Notification Settings</h2>

        <div className="space-y-6">
          {/* Email Notification */}
          <div className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition">
            <div>
              <h3 className="text-lg font-semibold">Email Notifications</h3>
              <p className="text-gray-600">Receive updates via email</p>
            </div>
            <input
              type="checkbox"
              name="email"
              checked={notifications.email}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500"
            />
          </div>

          {/* SMS Notification */}
          <div className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition">
            <div>
              <h3 className="text-lg font-semibold">SMS Notifications</h3>
              <p className="text-gray-600">Receive updates via SMS</p>
            </div>
            <input
              type="checkbox"
              name="sms"
              checked={notifications.sms}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500"
            />
          </div>

          {/* Push Notification */}
          <div className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition">
            <div>
              <h3 className="text-lg font-semibold">Push Notifications</h3>
              <p className="text-gray-600">Receive real-time notifications on your device</p>
            </div>
            <input
              type="checkbox"
              name="push"
              checked={notifications.push}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;