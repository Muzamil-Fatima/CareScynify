import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../../../api/notificationApi";

import { useAuth } from "../../../hooks/useAuth";

/*

| ROLE BASED NOTIFICATION CONFIGURATION

| Patient is intentionally NOT included.
| Admin is intentionally NOT included.

*/

const roleNotificationConfig = {
  doctor: {
    title: "Doctor Notification Preferences",

    description:
      "Manage how and when you want to receive alerts regarding your patients, appointments, and clinical activities.",

    items: [
      {
        key: "appointmentPending",
        title: "New Appointment Requests",
        description:
          "Receive a notification when a patient submits a new appointment request that requires your approval.",
        icon: <EventAvailableOutlinedIcon fontSize="small" />,
      },

      {
        key: "appointmentCancelled",
        title: "Appointment Cancellations",
        description:
          "Receive a notification when a patient cancels an appointment.",
        icon: <EventAvailableOutlinedIcon fontSize="small" />,
      },

      {
        key: "appointmentReminder",
        title: "Appointment Reminders",
        description:
          "Receive reminders about upcoming appointments with your patients.",
        icon: <EventAvailableOutlinedIcon fontSize="small" />,
      },

      {
        key: "securityAlerts",
        title: "Security & Login Alerts",
        description:
          "Get notified about important security and account activity.",
        icon: <SecurityOutlinedIcon fontSize="small" />,
      },
    ],
  },

  laboratory: {
    title: "Laboratory Notification Preferences",

    description:
      "Manage notifications related to test orders, samples, processing, reports, and laboratory activities.",

    items: [
      {
        key: "testOrders",
        title: "New Test Orders",
        description:
          "Receive notifications when a patient books a new laboratory test.",
        icon: <ScienceOutlinedIcon fontSize="small" />,
      },

      {
        key: "sampleQueue",
        title: "Sample Queue",
        description:
          "Get notified when a new sample is added or requires processing.",
        icon: <BiotechOutlinedIcon fontSize="small" />,
      },

      {
        key: "testProcessing",
        title: "Test Processing",
        description:
          "Receive updates when laboratory tests start or complete processing.",
        icon: <MonitorHeartOutlinedIcon fontSize="small" />,
      },

      {
        key: "reports",
        title: "Laboratory Reports",
        description:
          "Get notified when a laboratory report is generated or ready.",
        icon: <DescriptionOutlinedIcon fontSize="small" />,
      },

      {
        key: "reportDelivered",
        title: "Report Delivery",
        description:
          "Receive notifications when laboratory reports are delivered or made available to patients.",
        icon: <DescriptionOutlinedIcon fontSize="small" />,
      },

      {
        key: "securityAlerts",
        title: "Security & Login Alerts",
        description:
          "Get notified about important security and account activity.",
        icon: <SecurityOutlinedIcon fontSize="small" />,
      },
    ],
  },

  pharmacy: {
    title: "Pharmacy Notification Preferences",

    description:
      "Manage notifications related to medicine orders, inventory, deliveries, and pharmacy activities.",

    items: [
      {
        key: "orders",
        title: "New Orders",
        description:
          "Receive notifications whenever a patient places a new medicine order.",
        icon: <EventAvailableOutlinedIcon fontSize="small" />,
      },

      {
        key: "orderUpdates",
        title: "Order Updates",
        description:
          "Get notified when an order status changes or requires action.",
        icon: <LocalShippingOutlinedIcon fontSize="small" />,
      },

      {
        key: "inventoryAlerts",
        title: "Inventory Alerts",
        description:
          "Receive alerts when medicines are running low or need stock updates.",
        icon: <Inventory2OutlinedIcon fontSize="small" />,
      },

      {
        key: "orderDelivered",
        title: "Delivery Updates",
        description:
          "Get notified when pharmacy orders are delivered or completed.",
        icon: <LocalShippingOutlinedIcon fontSize="small" />,
      },

      {
        key: "orderCancelled",
        title: "Order Cancellations",
        description:
          "Receive notifications when a medicine order is cancelled.",
        icon: <EventAvailableOutlinedIcon fontSize="small" />,
      },

      {
        key: "securityAlerts",
        title: "Security & Login Alerts",
        description:
          "Get notified about important security and account activity.",
        icon: <SecurityOutlinedIcon fontSize="small" />,
      },
    ],
  },
};

const NotificationsTab = () => {
  const { user } = useAuth();

  /*
  
  | Get Current User Role
  
  */

  const role = String(user?.role || "")
    .toLowerCase()
    .trim();

  /*
  
  | Get Role Configuration
  
  */

  const config = roleNotificationConfig[role];

  /*
  
  | Initial Preferences
  
  |
  | These values are only defaults.
  | Actual saved preferences are loaded from the backend.
  |
  */

  const initialPreferences = useMemo(() => {
    if (!config) {
      return {};
    }

    const preferences = {};

    config.items.forEach((item) => {
      preferences[item.key] = {
        system: true,
        email: true,
      };
    });

    return preferences;
  }, [config]);

  const [preferences, setPreferences] = useState(initialPreferences);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  /*
  
  | Load Preferences From Backend
  
  |
  | This runs when the page/component loads.
  | It gets the user's saved preferences from MongoDB.
  |
  */

  useEffect(() => {
    const loadPreferences = async () => {
      if (!config) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getNotificationPreferences();

        /*
         * Backend may return:
         *
         * {
         *   notificationSettings: {...}
         * }
         *
         * or:
         *
         * {
         *   preferences: {...}
         * }
         *
         * Support both structures.
         */

        const backendPreferences =
          data?.notificationSettings || data?.preferences || {};

        /*
         * Start with defaults.
         *
         * This also means if you add a new notification
         * later, that new notification will default to true.
         */

        const mergedPreferences = {
          ...initialPreferences,
        };

        /*
         * Replace defaults with values saved in MongoDB.
         */

        config.items.forEach((item) => {
          if (backendPreferences[item.key]) {
            mergedPreferences[item.key] = {
              system:
                backendPreferences[item.key].system ??
                initialPreferences[item.key].system,

              email:
                backendPreferences[item.key].email ??
                initialPreferences[item.key].email,
            };
          }
        });

        setPreferences(mergedPreferences);
      } catch (error) {
        console.error("Failed to load notification preferences:", error);

        /*
         * If loading fails, keep default values.
         */

        setPreferences(initialPreferences);

        toast.error("Failed to load notification preferences.");
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [config, initialPreferences]);

  /*
  
  | Handle Checkbox Change
  
  */

  const handleChange = (key, channel, value) => {
    setPreferences((prev) => ({
      ...prev,

      [key]: {
        ...prev[key],

        [channel]: value,
      },
    }));
  };

  /*
  
  | Save Preferences
  
  */

  const handleSave = async () => {
    try {
      setSaving(true);

      console.log("SENDING NOTIFICATION SETTINGS:", preferences);

      const response = await updateNotificationPreferences(preferences);

      console.log("NOTIFICATION SAVE RESPONSE:", response);

      toast.success("Your notification preferences have been updated.");
    } catch (error) {
      console.error("NOTIFICATION SAVE ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("RESPONSE:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Failed to update notification preferences.",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  
  | Unsupported Role
  
  |
  | Patient/Admin won't get the Doctor/Lab/Pharmacy settings.
  | This prevents config.items undefined error.
  |
  */

  if (!config) {
    return (
      <div className="space-y-6 w-full min-w-0">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <NotificationsActiveOutlinedIcon />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Notifications
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Notification preferences are not available for this account.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* HEADER */}

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <NotificationsActiveOutlinedIcon className="text-purple-600" />

              {config.title}
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {config.description}
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

      {/* NOTIFICATION PREFERENCES */}

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Column Header */}

        <div className="grid grid-cols-[1fr_100px_100px] gap-3 px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">
            Notification
          </div>

          <div className="text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
            System
          </div>

          <div className="text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
            Email
          </div>
        </div>

        {/* Notification Items */}

        <div>
          {config.items.map((item, index) => (
            <div
              key={item.key}
              className={`grid grid-cols-[1fr_100px_100px] gap-3 items-center px-6 py-5 hover:bg-slate-50 transition ${
                index !== config.items.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              {/* Notification Info */}

              <div className="flex items-start gap-4 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* System Notification */}

              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={preferences[item.key]?.system ?? true}
                  onChange={(e) =>
                    handleChange(item.key, "system", e.target.checked)
                  }
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                  title="System notification"
                />
              </div>

              {/* Email Notification */}

              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={preferences[item.key]?.email ?? true}
                  onChange={(e) =>
                    handleChange(item.key, "email", e.target.checked)
                  }
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                  title="Email notification"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INFORMATION NOTE */}

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center shadow-sm shrink-0">
            <NotificationsActiveOutlinedIcon fontSize="small" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Notification Guidance
            </h4>

            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              System notifications appear inside CareScynify. Email
              notifications are sent to your registered email address. You can
              independently enable or disable either channel.
            </p>
          </div>
        </div>
      </div>

      {/* SAVE BUTTON */}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-2xl transition shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <SaveOutlinedIcon fontSize="small" />
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
};

export default NotificationsTab;
