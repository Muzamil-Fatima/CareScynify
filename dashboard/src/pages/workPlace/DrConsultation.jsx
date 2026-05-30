import React, { useRef } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";
import { X } from "lucide-react";
import { updateConsultantHours } from "../../api/doctorApi";
import toast from "react-hot-toast";

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DrConsultation = ({ workplace }) => {
  const { profile, setProfile, setIsDirty, conflicts, setConflicts } =
    useDoctor();

  const saveTimeout = useRef(null);

  const workplaceId = workplace?._id;

  const currentWorkplace = profile?.doctor?.workplaces?.find(
    (w) => w?._id === workplaceId,
  );

  const availability = currentWorkplace?.availability || {};

  const handleChange = (day, field, value) => {
    const currentDay = availability?.[day] || { start: "", end: "" };

    const updatedDay = {
      ...currentDay,
      [field]: value,
    };

    const updatedAvailability = {
      ...availability,
      [day]: updatedDay,
    };
    setProfile((prev) => {
      const updatedWorkplaces = prev.doctor.workplaces.map((w) =>
        w._id === workplaceId
          ? {
              ...w,
              availability: updatedAvailability,
            }
          : w,
      );

      return {
        ...prev,
        doctor: {
          ...prev.doctor,
          workplaces: updatedWorkplaces,
        },
      };
    });
    const key = `${workplaceId}-${day}`;

    setConflicts((p) => ({
      ...p,
      [key]: null,
    }));

    const start = updatedDay.start;
    const end = updatedDay.end;

    if (start && end) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);

      saveTimeout.current = setTimeout(() => {
        saveAvailability(updatedAvailability);
      }, 1000);
    }

    setIsDirty(true);
  };

  const saveAvailability = async (data) => {
    if (!workplaceId) return;

    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: data,
      });

      if (!res?.success) {
        toast.error(res?.message || "Save failed");
        return;
      }

      setProfile((prev) => {
        const updated = (prev?.doctor?.workplaces || []).map((w) =>
          w?._id === workplaceId ? { ...w, availability: data } : w,
        );

        return {
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: updated,
          },
        };
      });

      setIsDirty(false);
      toast.success("Saved");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const clearTime = (day) => {
    handleChange(day, "start", "");
    handleChange(day, "end", "");
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return null;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const diff = eh * 60 + em - (sh * 60 + sm);

    if (diff <= 0) return null;

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    return h && m ? `${h}h ${m}m` : h ? `${h}h` : `${m}m`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div className="flex justify-between items-center">
        <label className="text-lg font-semibold text-gray-800">
          Consultation Hours (Per Day)
        </label>
      </div>

      {conflicts && Object.values(conflicts).some(Boolean) && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
          ⚠ Conflict detected
        </div>
      )}

      {daysList.map((day) => {
        const start = availability?.[day]?.start || "";
        const end = availability?.[day]?.end || "";

        const key = `${workplaceId}-${day}`;
        const conflict = conflicts?.[key];

        const isAvailable = start && end;
        const duration = calculateDuration(start, end);

        return (
          <div key={day} className="border rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="min-w-15 font-semibold">{day}</div>

              <div className="w-22.5">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isAvailable ? "Available" : "Not Set"}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-1">
                <input
                  type="time"
                  value={start}
                  onChange={(e) => handleChange(day, "start", e.target.value)}
                  className="px-3 py-2 border rounded-xl bg-gray-50"
                />

                <input
                  type="time"
                  value={end}
                  onChange={(e) => handleChange(day, "end", e.target.value)}
                  className="px-3 py-2 border rounded-xl bg-gray-50"
                />

                <button
                  onClick={() => clearTime(day)}
                  className="h-10 w-10 flex items-center justify-center text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {conflict && (
              <div className="text-xs text-red-600 mt-2">
                ⚠ Conflict with {conflict}
              </div>
            )}

            {duration && (
              <div className="text-right text-purple-600 text-sm mt-2">
                {duration}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DrConsultation;
