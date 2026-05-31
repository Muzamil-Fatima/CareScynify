import { useRef } from "react";
import { updateConsultantHours } from "../api/doctorApi";
import toast from "react-hot-toast";

export const useConsultationHours = (
  profileRef,
  setProfile,
  setIsDirty,
  setConflicts,
) => {
  const requestRef = useRef(0);

  const toMinutes = (t = "") => {
    if (!t.includes(":")) return 0;
    const [h, m] = t.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const hasConflict = (workplaceId, day, newStart, newEnd) => {
    const workplaces = profileRef.current?.doctor?.workplaces ?? [];

    if (!newStart || !newEnd) return null;

    const start1 = toMinutes(newStart);
    const end1 = toMinutes(newEnd);

    for (let w of workplaces) {
      if (w._id === workplaceId) continue;

      const slot = w?.availability?.[day];
      if (!slot?.start || !slot?.end) continue;

      const start2 = toMinutes(slot.start);
      const end2 = toMinutes(slot.end);

      if (start1 < end2 && end1 > start2) {
        return w.name || "Another Workplace";
      }
    }

    return null;
  };

  const setDayTime = (workplaceId, day, field, value) => {
    const workplace = profileRef.current?.doctor?.workplaces?.find(
      (w) => w._id === workplaceId,
    );

    const current = workplace?.availability?.[day] || {
      start: "",
      end: "",
    };

    const newStart = field === "start" ? value : current.start;
    const newEnd = field === "end" ? value : current.end;

    // update UI instantly
    setProfile((prev) => {
      const updated = (prev.doctor?.workplaces || []).map((w) =>
        w._id === workplaceId
          ? {
              ...w,
              availability: {
                ...w.availability,
                [day]: {
                  start: newStart,
                  end: newEnd,
                },
              },
            }
          : w,
      );

      return {
        ...prev,
        doctor: {
          ...prev.doctor,
          workplaces: updated,
        },
      };
    });

    setIsDirty(true);

    // ❗ ONLY CALL API WHEN BOTH EXISTS
    if (!newStart || !newEnd) return true;
    const conflict = hasConflict(workplaceId, day, newStart, newEnd);
    if (conflict) {
      setConflicts((prev) => ({
        ...prev,
        [`${workplaceId}-${day}`]: conflict,
      }));

      toast.error(`Conflict with ${conflict}`);
      return false;
    }
    saveToServer(workplaceId, day, newStart, newEnd);
    return true;
  };
  const saveToServer = async (workplaceId, day, start, end) => {
    const currentReq = ++requestRef.current;

    setConflicts((prev) => {
      const copy = { ...prev };
      delete copy[`${workplaceId}-${day}`];
      return copy;
    });
    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: { start, end },
        },
      });

      if (currentReq !== requestRef.current) return;

      if (!res?.success) {
        toast.error(res?.message || "Update failed");
        return;
      }

      setProfile((prev) => prev); // already updated optimistically
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  const removeDay = async (workplaceId, day) => {
    const currentReq = ++requestRef.current;

    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: { start: "", end: "" },
        },
      });

      if (currentReq !== requestRef.current) return;

      if (!res?.success) {
        toast.error(res?.message || "Failed");
        return false;
      }

      setProfile((prev) => {
        const updated = (prev.doctor?.workplaces || []).map((w) =>
          w._id === workplaceId
            ? {
                ...w,
                availability: {
                  ...w.availability,
                  [day]: { start: "", end: "" },
                },
              }
            : w,
        );

        return {
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: updated,
          },
        };
      });

      setIsDirty(true);
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
      return false;
    }
  };

  return { setDayTime, removeDay };
};
