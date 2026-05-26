
import React from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";

const AppointmentSettings = ({ workplace }) => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const workplaceData =
    profile.doctor?.workplaces?.find((w) => w._id === workplace?._id) || {};

  const settings = workplaceData.settings || {};

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-purple-200"
    >
      {/* Appointment Duration */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Appointment Duration
        </label>

        <div className="flex gap-3">
          <input
            type="number"
            min="1"
            value={settings.appointmentDuration?.value || ""}
            onChange={(e) => {
              setProfile((prev) => {
                const updated = prev.doctor.workplaces.map((w) => {
                  if (w._id !== workplace._id) return w;

                  return {
                    ...w,
                    settings: {
                      ...w.settings,
                      appointmentDuration: {
                        ...w.settings?.appointmentDuration,
                        value: Number(e.target.value),
                      },
                    },
                  };
                });

                return {
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    workplaces: updated,
                  },
                };
              });

              setIsDirty(true);
            }}
            className="w-24 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-300
                       transition-all duration-200 hover:border-gray-300"
          />

          <select
            value={settings.appointmentDuration?.unit || "minutes"}
            onChange={(e) => {
              setProfile((prev) => {
                const updated = prev.doctor.workplaces.map((w) => {
                  if (w._id !== workplace._id) return w;

                  return {
                    ...w,
                    settings: {
                      ...w.settings,
                      appointmentDuration: {
                        ...w.settings?.appointmentDuration,
                        unit: e.target.value,
                      },
                    },
                  };
                });

                return {
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    workplaces: updated,
                  },
                };
              });

              setIsDirty(true);
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-purple-400
                       transition-all duration-200 hover:border-gray-300"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>

      {/* Appointment Fee */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Appointment Fee
        </label>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={settings.appointmentFee || ""}
            onChange={(e) => {
              setProfile((prev) => {
                const updated = prev.doctor.workplaces.map((w) => {
                  if (w._id !== workplace._id) return w;

                  return {
                    ...w,
                    settings: {
                      ...w.settings,
                      appointmentFee: Number(e.target.value),
                    },
                  };
                });

                return {
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    workplaces: updated,
                  },
                };
              });

              setIsDirty(true);
            }}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-300
                       transition-all duration-200 hover:border-gray-300"
          />
          <span className="text-gray-500 font-medium">PKR</span>
        </div>
      </div>

      {/* Consultation Type */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Consultation Type
        </label>

        <select
          className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-purple-400
                     transition-all duration-200 hover:border-gray-300"
        >
          <option>Online + Clinic</option>
          <option>Online Only</option>
          <option>Clinic Only</option>
          <option>Home Visits</option>
        </select>
      </div>

      {/* Max Patients */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Max Patients / Day
        </label>

        <input
          type="number"
          placeholder="e.g. 20"
          className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-300
                     transition-all duration-200 hover:border-gray-300"
        />
      </div>

      {/* Break Time */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Break Between Patients (min)
        </label>

        <input
          type="number"
          placeholder="e.g. 10"
          className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-300
                     transition-all duration-200 hover:border-gray-300"
        />
      </div>

      {/* Booking Window */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Booking Allowed (Days Ahead)
        </label>

        <input
          type="number"
          placeholder="e.g. 7"
          className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-300
                     transition-all duration-200 hover:border-gray-300"
        />
      </div>

      {/* Follow-up Fee */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Follow-up Fee
        </label>

        <input
          type="number"
          placeholder="e.g. 500"
          className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-purple-300
                     transition-all duration-200 hover:border-gray-300"
        />
      </div>
    </div>
  );
};

export default AppointmentSettings;