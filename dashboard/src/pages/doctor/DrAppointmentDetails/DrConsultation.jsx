import React from "react";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DrConsultation = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const doctor = profile.doctor || {};
  const availability = doctor.availability || {};

  const handleChange = (day, field, value) => {
    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        availability: {
          ...prev.doctor.availability,
          [day]: {
            ...prev.doctor.availability?.[day],
            [field]: value,
          },
        },
      },
    }));

    setIsDirty(true);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5
                    transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-purple-200"
    >
      <label className="text-lg font-semibold text-gray-800">
        Consultation Hours (Per Day)
      </label>

      {daysList.map((day) => {
        const isAvailable =
          availability?.[day]?.start && availability?.[day]?.end;

        return (
          <div
            key={day}
            className="flex flex-wrap md:flex-nowrap items-center gap-4
                       border border-gray-100 rounded-xl p-4 bg-white
                       transition-all duration-300
                       hover:shadow-md hover:-translate-y-1 hover:border-purple-200"
          >
            {/* Day */}
            <div className="w-16 font-semibold text-gray-700">{day}</div>

            {/* Status */}
            <div className="w-28 text-sm">
              {isAvailable ? (
                <span className="text-green-600 font-medium">Available</span>
              ) : (
                <span className="text-gray-400">Not set</span>
              )}
            </div>

            {/* Inputs */}
            <div className="flex gap-4 flex-wrap">
              {/* Start */}
              <input
                type="time"
                value={availability?.[day]?.start || ""}
                onChange={(e) => handleChange(day, "start", e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                           focus:bg-white focus:ring-2 focus:ring-purple-400
                           transition-all duration-200 hover:border-gray-300"
              />

              {/* End */}
              <input
                type="time"
                value={availability?.[day]?.end || ""}
                onChange={(e) => handleChange(day, "end", e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                           focus:bg-white focus:ring-2 focus:ring-purple-400
                           transition-all duration-200 hover:border-gray-300"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DrConsultation;
