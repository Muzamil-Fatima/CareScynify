import { updateConsultantHours } from "../api/doctorApi";
import toast from "react-hot-toast";

export const useConsultationHours = (
  profile,
  setProfile,
  setIsDirty,
  setConflicts
) => {
  // CONFLICT CHECK
  const hasConflict = (workplaceId, day, newStart, newEnd) => {
    const workplaces = profile?.doctor?.workplaces || [];

    for (let w of workplaces) {
      if (w._id === workplaceId) continue;

      const slot = w?.availability?.[day];
      if (!slot?.start || !slot?.end) continue;

      if (newStart < slot.end && newEnd > slot.start) {
        return w.name || "Another Workplace";
      }
    }

    return null;
  };

  //  UPDATE TIME (MAIN FUNCTION)
  const setDayTime = async (workplaceId, day, field, value) => {
    const workplace = profile?.doctor?.workplaces?.find(
      (w) => w._id === workplaceId
    );

    const current = workplace?.availability?.[day] || {
      start: "",
      end: "",
    };

    const newStart = field === "start" ? value : current.start;
    const newEnd = field === "end" ? value : current.end;

    //  CHECK CONFLICT
    const conflict = hasConflict(workplaceId, day, newStart, newEnd);

    setConflicts((prev) => ({
      ...prev,
      [`${workplaceId}-${day}`]: conflict || null,
    }));

    if (conflict) {
      toast.error(`Conflict with ${conflict}`);
      return false;
    }

    // API CALL
    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: {
            ...current,
            [field]: value,
          },
        },
      });

      if (!res?.success) {
        toast.error(res?.message || "Update failed");
        return false;
      }

      // UPDATE LOCAL STATE
      setProfile((prev) => {
        const updatedWorkplaces = prev.doctor.workplaces.map((w) =>
          w._id === workplaceId
            ? {
                ...w,
                availability: {
                  ...w.availability,
                  [day]: {
                    ...current,
                    [field]: value,
                  },
                },
              }
            : w
        );

        return {
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: updatedWorkplaces,
          },
        };
      });

      setIsDirty(false);
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
      return false;
    }
  };

  // CLEAR DAY (REMOVE SLOT)
  const removeDay = async (workplaceId, day) => {
    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: {
            start: "",
            end: "",
          },
        },
      });

      if (!res?.success) {
        toast.error(res?.message || "Failed to clear day");
        return false;
      }

      setProfile((prev) => {
        const updatedWorkplaces = prev.doctor.workplaces.map((w) =>
          w._id === workplaceId
            ? {
                ...w,
                availability: {
                  ...w.availability,
                  [day]: { start: "", end: "" },
                },
              }
            : w
        );

        return {
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: updatedWorkplaces,
          },
        };
      });

      toast.success("Day cleared");
      return true;
    } catch (err) {
        console.error(err);
      toast.error("Server error");
      return false;
    }
  };

  return {
    setDayTime,
    removeDay,
  };
};