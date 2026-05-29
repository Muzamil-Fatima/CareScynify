import React from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";
import { X } from "lucide-react";

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DrConsultation = ({ workplace }) => {
  const { profile, setProfile, setIsDirty, conflicts, setConflicts } =
    useDoctor();

  const workplaceData =
    profile.doctor?.workplaces?.find((w) => w._id === workplace?._id) || {};

  const availability = workplaceData.availability || {};

  // CONFLICT CHECK
  const hasConflict = (day, newStart, newEnd) => {
    const workplaces = profile.doctor?.workplaces || [];

    for (let w of workplaces) {
      if (w._id === workplace._id) continue;

      const slot = w?.availability?.[day];
      if (!slot?.start || !slot?.end) continue;

      if (newStart < slot.end && newEnd > slot.start) {
        return w.name || "Another Workplace";
      }
    }

    return null;
  };

  // HANDLE CHANGE (AUTO SAVE + BLOCK)
  const handleChange = (day, field, value) => {
    setProfile((prev) => {
      const updatedWorkplaces = prev.doctor.workplaces.map((w) => {
        if (w._id !== workplace._id) return w;

        const current = w?.availability?.[day] || {
          start: "",
          end: "",
        };

        const newStart = field === "start" ? value : current.start;
        const newEnd = field === "end" ? value : current.end;

        const conflictPlace = hasConflict(day, newStart, newEnd);

        // GLOBAL STATE UPDATE (SAFE MAP)
        setConflicts((prevConflicts) => ({
          ...prevConflicts,
          [`${workplace._id}-${day}`]: conflictPlace || null,
        }));

        //  BLOCK SAVE IF CONFLICT
        if (conflictPlace) return w;

        return {
          ...w,
          availability: {
            ...w.availability,
            [day]: {
              ...current,
              [field]: value,
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

    setIsDirty(true);
  };

  // CLEAR TIME
  const clearTime = (day) => {
    handleChange(day, "start", "");
    handleChange(day, "end", "");
  };

  // DURATION CALC
  const calculateDuration = (start, end) => {
    if (!start || !end) return null;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;

    if (endMin <= startMin) return null;

    const diff = endMin - startMin;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <label className="text-lg font-semibold text-gray-800">
          Consultation Hours (Per Day)
        </label>
        <span className="text-sm text-gray-400">
          Set available timing
        </span>
      </div>

      {/* GLOBAL WARNING */}
      {conflicts &&
        Object.values(conflicts).some(Boolean) && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            ⚠ One or more schedules conflict with another workplace timing.
          </div>
        )}

      {/* DAYS */}
      {daysList.map((day) => {
        const start = availability?.[day]?.start || "";
        const end = availability?.[day]?.end || "";

        const isAvailable = start && end;
        const duration = calculateDuration(start, end);

        const key = `${workplace._id}-${day}`;
        const dayConflict = conflicts?.[key];

        return (
          <div
            key={day}
            className={`border rounded-2xl p-4 transition-all duration-200
            ${
              dayConflict
                ? "border-red-300 bg-red-50"
                : "border-gray-100 bg-linear-to-r from-white to-gray-50"
            }`}
          >
            {/* TOP ROW */}
            <div className="flex items-center gap-4 flex-nowrap">

              {/* DAY */}
              <div className="min-w-15">
                <p className="font-semibold text-gray-800 text-lg">
                  {day}
                </p>
              </div>

              {/* STATUS */}
              <div className="w-22.5">
                {isAvailable ? (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
                    Available
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-500">
                    Not Set
                  </span>
                )}
              </div>

              {/* INPUTS */}
              <div className="flex items-end gap-3 flex-1 min-w-0">

                {/* START */}
                <input
                  type="time"
                  value={start}
                  onChange={(e) =>
                    handleChange(day, "start", e.target.value)
                  }
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50"
                />

                {/* END */}
                <input
                  type="time"
                  value={end}
                  onChange={(e) =>
                    handleChange(day, "end", e.target.value)
                  }
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50"
                />

                {/* CLEAR */}
                <button
                  onClick={() => clearTime(day)}
                  className="shrink-0 h-10 w-10 flex items-center justify-center
                  rounded-xl border border-red-100 text-red-500 hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PER DAY ERROR */}
            {dayConflict && (
              <div className="mt-2 text-xs text-red-600 font-medium">
                ⚠ Conflict with <b>{dayConflict}</b>
              </div>
            )}

            {/* DURATION */}
            {duration && (
              <div className="flex justify-end mt-3">
                <div className="text-sm text-purple-600 font-medium">
                  {duration}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DrConsultation;