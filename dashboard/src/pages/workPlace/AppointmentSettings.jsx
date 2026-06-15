import React, { useCallback } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";
import { useDoctorWorkplace } from "../../hooks/useDoctorWorkplace";

const AppointmentSettings = ({ workplace }) => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  // use API hook
  const { updateWorkplace: apiUpdateWorkplace } = useDoctorWorkplace(
    profile,
    setProfile
  );

  // SINGLE CLEAN UPDATE FUNCTION
  const updateWorkplace = useCallback(
    (workplaceId, updater) => {
      const currentSettings =
        profile?.doctor?.workplaces?.find((w) => w._id === workplaceId)
          ?.settings || {};

      const nextSettings = updater(currentSettings);

      // 🚀 send ONLY to backend (no local deep merge)
      apiUpdateWorkplace(workplaceId, {
        settings: nextSettings,
      });

      setIsDirty(true);
    },
    [profile, apiUpdateWorkplace, setIsDirty]
  );

  const workplaceData = profile?.doctor?.workplaces?.find(
    (w) => w._id === workplace?._id
  );

  const settings = workplaceData?.settings || {};

  if (!workplace?._id) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">

      {/* Appointment Duration */}
      <div>
        <label className="block mb-2 font-medium">
          Appointment Duration
        </label>

        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            value={settings?.appointmentDuration?.value || 0}
            onChange={(e) =>
              updateWorkplace(workplace._id, (prev) => ({
                ...prev,
                appointmentDuration: {
                  ...prev.appointmentDuration,
                  value: Number(e.target.value),
                },
              }))
            }
            className="w-24 px-3 py-2 border rounded-xl bg-gray-50"
          />

          <select
            value={settings?.appointmentDuration?.unit || "minutes"}
            onChange={(e) =>
              updateWorkplace(workplace._id, (prev) => ({
                ...prev,
                appointmentDuration: {
                  ...prev.appointmentDuration,
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
          value={settings?.appointmentFee ?? ""}
          onChange={(e) =>
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              appointmentFee: Number(e.target.value),
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
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
            updateWorkplace(workplace._id, (prev) => ({
              ...prev,
              consultationType: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border rounded-xl bg-gray-50"
        >
          <option value="online">Online</option>
          <option value="physical">Physical</option>
          <option value="online + physical">Online + Physical</option>
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
          min="0"
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
          min="0"
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
    </div>
  );
};

export default AppointmentSettings;