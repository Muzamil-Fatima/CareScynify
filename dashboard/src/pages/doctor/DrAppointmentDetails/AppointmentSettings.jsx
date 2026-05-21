import React from "react";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const AppointmentSettings = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();
  const doctor = profile.doctor || {};

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
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
            value={doctor.appointmentDuration?.value || ""}
            onChange={(e) => {
              setProfile((prev) => ({
                ...prev,
                doctor: {
                  ...prev.doctor,
                  appointmentDuration: {
                    ...prev.doctor.appointmentDuration,
                    value: Number(e.target.value),
                  },
                },
              }));
              setIsDirty(true);
            }}
            className="w-24 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-300
                       transition-all duration-200 hover:border-gray-300"
          />

          <select
            value={doctor.appointmentDuration?.unit || "minutes"}
            onChange={(e) => {
              setProfile((prev) => ({
                ...prev,
                doctor: {
                  ...prev.doctor,
                  appointmentDuration: {
                    ...prev.doctor.appointmentDuration,
                    unit: e.target.value,
                  },
                },
              }));
              setIsDirty(true);
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-blue-400
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
            value={doctor.appointmentFee || ""}
            onChange={(e) => {
              setProfile((prev) => ({
                ...prev,
                doctor: {
                  ...prev.doctor,
                  appointmentFee: Number(e.target.value),
                },
              }));
              setIsDirty(true);
            }}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                       focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-300
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
                     focus:bg-white focus:ring-2 focus:ring-blue-400
                     transition-all duration-200 hover:border-gray-300"
        >
          <option>Online + Clinic</option>
          <option>Online Only</option>
          <option>Clinic Only</option>
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
                     focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-300
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
                     focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-300
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
                     focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-300
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
                     focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-300
                     transition-all duration-200 hover:border-gray-300"
        />
      </div>

    </div>
  );
};

export default AppointmentSettings;