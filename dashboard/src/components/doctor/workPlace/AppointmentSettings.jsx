
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const AppointmentSettings = ({ workplace }) => {
  const {
    profile,
    setIsDirty,
    saveWorkplaceSettings,
  } = useDoctor();

  // Find the currently selected workplace
  const workplaceData = useMemo(() => {
    return profile?.doctor?.workplaces?.find(
      (w) => w?._id === workplace?._id
    );
  }, [profile?.doctor?.workplaces, workplace?._id]);

  // Local settings for the CURRENT workplace
  const [settings, setSettings] = useState(
    workplaceData?.settings || {}
  );

  // Keep latest save function
  const saveRef = useRef(saveWorkplaceSettings);

  useEffect(() => {
    saveRef.current = saveWorkplaceSettings;
  }, [saveWorkplaceSettings]);

  // Autosave settings
  useEffect(() => {
    if (!workplace?._id) return;

    const timer = setTimeout(() => {
      saveRef.current(workplace._id, settings);
    }, 800);

    return () => clearTimeout(timer);
  }, [settings, workplace?._id]);

  // Update local workplace settings
  const updateWorkplace = useCallback(
    (updater) => {
      setSettings((prev) => updater(prev));
      setIsDirty(true);
    },
    [setIsDirty]
  );

  if (!workplace?._id) return null;

  return (
    <div className="space-y-5">

      {/* Appointment Duration */}
      <div>
        <label className="block mb-2 font-medium">
          Appointment Duration
        </label>

        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            value={settings?.appointmentDuration?.value ?? ""}
            onChange={(e) =>
              updateWorkplace((prev) => ({
                ...prev,
                appointmentDuration: {
                  ...(prev.appointmentDuration ?? {}),
                  value:
                    e.target.value === ""
                      ? ""
                      : Number(e.target.value),
                },
              }))
            }
            className="w-24 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            value={
              settings?.appointmentDuration?.unit || "minutes"
            }
            onChange={(e) =>
              updateWorkplace((prev) => ({
                ...prev,
                appointmentDuration: {
                  ...(prev.appointmentDuration ?? {}),
                  unit: e.target.value,
                },
              }))
            }
            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>

      {/* Appointment Fee */}
      <div>
        <label className="block mb-2 font-medium">
          Appointment Fee
        </label>

        <input
          type="number"
          min="0"
          value={settings?.appointmentFee ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            updateWorkplace((prev) => ({
              ...prev,
              appointmentFee:
                value === ""
                  ? ""
                  : Math.max(0, Number(value)),
            }));
          }}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Consultation Type */}
      <div>
        <label className="block mb-2 font-medium">
          Consultation Type
        </label>

        <select
          value={settings?.consultationType || "online"}
          onChange={(e) =>
            updateWorkplace((prev) => ({
              ...prev,
              consultationType: e.target.value,
            }))
          }
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="online">Online</option>
          <option value="physical">Physical</option>
          <option value="online_physical">
            Online + Physical
          </option>
        </select>
      </div>

      {/* Max Patients */}
      <div>
        <label className="block mb-2 font-medium">
          Max Patients / Day
        </label>

        <input
          type="number"
          min="0"
          value={settings?.maxPatientsPerDay ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            updateWorkplace((prev) => ({
              ...prev,
              maxPatientsPerDay:
                value === ""
                  ? ""
                  : Math.max(0, Number(value)),
            }));
          }}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Break Time */}
      <div>
        <label className="block mb-2 font-medium">
          Break Between Patients (min)
        </label>

        <input
          type="number"
          min="0"
          value={settings?.breakMinutes ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            updateWorkplace((prev) => ({
              ...prev,
              breakMinutes:
                value === ""
                  ? ""
                  : Math.max(0, Number(value)),
            }));
          }}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Booking Window */}
      <div>
        <label className="block mb-2 font-medium">
          Booking Allowed (Days Ahead)
        </label>

        <input
          type="number"
          min="0"
          value={settings?.bookingWindow ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            updateWorkplace((prev) => ({
              ...prev,
              bookingWindow:
                value === ""
                  ? ""
                  : Math.max(0, Number(value)),
            }));
          }}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

    </div>
  );
};

export default AppointmentSettings;