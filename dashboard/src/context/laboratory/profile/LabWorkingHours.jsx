import React from "react";
import { useLaboratory } from "../../../context/laboratory/LaboratoryContext";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const LabWorkingHours = () => {
  const { profile, setProfile, setIsDirty } = useLaboratory();

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const workingHours = profile?.laboratory?.workingHours || [];

  const handleChange = (index, field, value) => {
    const updated = [...workingHours];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setProfile((prev) => ({
      ...prev,
      laboratory: {
        ...prev.laboratory,
        workingHours: updated,
      },
    }));

    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Working Hours
      </h2>

      <div className="space-y-5">
        {days.map((day, index) => {
          const item = workingHours[index] || {
            day,
            isOpen: true,
            open: "",
            close: "",
          };

          return (
            <div
              key={day}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border rounded-xl p-4 bg-gray-50"
            >
              {/* Day */}
              <div className="font-semibold text-gray-700">{day}</div>

              {/* Open / Closed */}
              <div className="flex items-center gap-3">
                <input
                  id={day}
                  type="checkbox"
                  checked={item.isOpen}
                  onChange={(e) =>
                    handleChange(index, "isOpen", e.target.checked)
                  }
                  className="w-5 h-5 accent-purple-600"
                />

                <label htmlFor={day} className="text-gray-700">
                  {item.isOpen ? "Open" : "Closed"}
                </label>
              </div>

              {/* Opening Time */}
              <input
                type="time"
                className={inputClass}
                disabled={!item.isOpen}
                value={item.open}
                onChange={(e) =>
                  handleChange(index, "open", e.target.value)
                }
              />

              {/* Closing Time */}
              <input
                type="time"
                className={inputClass}
                disabled={!item.isOpen}
                value={item.close}
                onChange={(e) =>
                  handleChange(index, "close", e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabWorkingHours;