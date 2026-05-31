import React, { useCallback } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";

const AppointmentSettings = ({ workplace }) => {
  const { profile, setProfile, setIsDirty, saveWorkplaceSettings } =
    useDoctor();

  const updateWorkplace = useCallback(
    (workplaceId, updater) => {
      // get current settings safely
      const currentSettings =
        profile?.doctor?.workplaces?.find((w) => w._id === workplaceId)
          ?.settings || {};

      // compute next settings
      const nextSettings = updater(currentSettings);

      // update UI state immediately
      setProfile((prev) => {
        const workplaces = prev.doctor?.workplaces || [];

        const updatedWorkplaces = workplaces.map((w) => {
          if (w._id !== workplaceId) return w;

          return {
            ...w,
            settings: {
              ...w.settings,
              ...nextSettings,
              appointmentDuration: {
                ...w.settings?.appointmentDuration,
                ...nextSettings?.appointmentDuration,
              },
            },
          };
        });

        return {
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: updatedWorkplaces,
          },
        };
      });

      // save to backend immediately (safe + no race condition)
      saveWorkplaceSettings(workplaceId, nextSettings);

      setIsDirty(true);
    },
    [profile, setProfile, saveWorkplaceSettings, setIsDirty],
  );

  const workplaceData = profile?.doctor?.workplaces?.find(
    (w) => w._id === workplace?._id,
  );

  const settings = workplaceData?.settings || {};

  if (!workplace?._id) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      {/* Appointment Duration */}
      <div>
        <label className="block mb-2 font-medium">Appointment Duration</label>

        <div className="flex gap-3">
          <input
            type="number"
            min="1"
            value={settings?.appointmentDuration?.value}
            onChange={(e) =>
              updateWorkplace(workplace._id, (prev) => ({
                ...prev,
                appointmentDuration: {
                  ...(prev.appointmentDuration || {}),
                  value: Number(e.target.value),
                },
              }))
            }
            className="w-24 px-3 py-2 border rounded-xl bg-gray-50"
          />

          <select
            value={settings?.appointmentDuration?.unit ?? "minutes"}
            onChange={(e) =>
              updateWorkplace(workplace._id, (prev) => ({
                ...prev,
                appointmentDuration: {
                  ...(prev.appointmentDuration || {}),
                  unit: e.target.value,
                },
              }))
            }
            className="px-3 py-2 border rounded-xl bg-gray-50"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>

      {/* Appointment Fee */}
      <div>
        <label className="block mb-2 font-medium">Appointment Fee</label>

        <input
          type="number"
          value={settings?.appointmentFee ?? 0}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              appointmentFee: parseInt(e.target.value, 10) || 0,
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Consultation Type */}
      <div>
        <label className="block mb-2 font-medium">Consultation Type</label>

        <select
          value={settings?.consultationType ?? "online"}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              consultationType: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        >
          <option value="online">Online</option>
          <option value="clinic">Clinic</option>
          <option value="home visit">Home Visit</option>
        </select>
      </div>

      {/* Max Patients */}
      <div>
        <label className="block mb-2 font-medium">Max Patients / Day</label>

        <input
          type="number"
          value={settings?.maxPatientsPerDay ?? 0}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              maxPatientsPerDay: Number(e.target.value),
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Break Time */}
      <div>
        <label className="block mb-2 font-medium">
          Break Between Patients (min)
        </label>

        <input
          type="number"
          value={settings?.breakTime ?? 0}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              breakTime: Number(e.target.value),
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Booking Window */}
      <div>
        <label className="block mb-2 font-medium">
          Booking Allowed (Days Ahead)
        </label>

        <input
          type="number"
          value={settings?.bookingWindow ?? 0}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              bookingWindow: Number(e.target.value),
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Follow-up Fee */}
      <div>
        <label className="block mb-2 font-medium">Follow-up Fee</label>

        <input
          type="number"
          value={settings?.followUpFee ?? 0}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              followUpFee: Number(e.target.value),
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        />
      </div>
    </div>
  );
};

export default AppointmentSettings;
