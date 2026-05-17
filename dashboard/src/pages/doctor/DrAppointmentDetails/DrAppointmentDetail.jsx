import React from "react";
import DrConsultation from "./DrConsultation";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const DrAppointmentDetails = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const doctor = profile.doctor || {};

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Appointment Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Days */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Available Days</label>

          <div className="grid grid-cols-4 gap-2">
            {daysList.map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={day}
                  checked={doctor.availableDays?.includes(day) || false}
                  onChange={(e) => {
                    const { checked } = e.target;

                    setProfile((prev) => {
                      const days = prev.doctor.availableDays || [];

                      return {
                        ...prev,
                        doctor: {
                          ...prev.doctor,
                          availableDays: checked
                            ? [...days, day]
                            : days.filter((d) => d !== day),
                        },
                      };
                    });

                    setIsDirty(true);
                  }}
                  className="accent-blue-500"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Consultation */}
        <DrConsultation />

        {/* Room No */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Room No.</label>
          <input
            value={doctor.drRoomNo || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                doctor: {
                  ...prev.doctor,
                  drRoomNo: value,
                },
              }));

              setIsDirty(true);
            }}
            type="text"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Appointment Duration</label>

          <div className="flex gap-2">
            <input
              value={doctor.appointmentDuration?.value || ""}
              onChange={(e) => {
                const value = e.target.value;

                setProfile((prev) => ({
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    appointmentDuration: {
                      ...prev.doctor.appointmentDuration,
                      value: Number(value),
                    },
                  },
                }));

                setIsDirty(true);
              }}
              type="number"
              min="1"
              placeholder="Enter value"
              className="border border-gray-300 rounded-lg p-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={doctor.appointmentDuration?.unit || "minutes"}
              onChange={(e) => {
                const value = e.target.value;

                setProfile((prev) => ({
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    appointmentDuration: {
                      ...prev.doctor.appointmentDuration,
                      unit: value,
                    },
                  },
                }));

                setIsDirty(true);
              }}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Status</label>
          <select
            value={doctor.status || "Active"}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                doctor: {
                  ...prev.doctor,
                  status: value,
                },
              }));

              setIsDirty(true);
            }}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Note */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Note</label>
          <textarea
            value={doctor.note || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                doctor: {
                  ...prev.doctor,
                  note: value,
                },
              }));

              setIsDirty(true);
            }}
            placeholder="Enter a short note for patients"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default DrAppointmentDetails;
