import React from "react";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const DrConsultation = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const doctor = profile.doctor || {};

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700">Consultation Hours</label>

        <div className="flex items-center gap-4">

          {/* Start Time */}
          <div className="flex flex-col">
            <label htmlFor="start-time">Start Time</label>
            <input
              type="time"
              value={doctor.consultStart || ""}
              onChange={(e) => {
                const value = e.target.value;

                setProfile((prev) => ({
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    consultStart: value,
                  },
                }));

                setIsDirty(true);
              }}
              className="mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col">
            <label htmlFor="end-time">End Time</label>
            <input
              type="time"
              value={doctor.consultEnd || ""}
              onChange={(e) => {
                const value = e.target.value;

                setProfile((prev) => ({
                  ...prev,
                  doctor: {
                    ...prev.doctor,
                    consultEnd: value,
                  },
                }));

                setIsDirty(true);
              }}
              className="mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DrConsultation;