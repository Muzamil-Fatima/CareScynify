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
  const debounceRef = useRef(null);

  const toMinutes = (t = "") => {
    if (!t || !t.includes(":")) return null;
    const [h, m] = t.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  };

  const hasConflict = (workplaceId, day, start1, end1) => {
    const workplaces = profileRef.current?.doctor?.workplaces || [];

    for (let w of workplaces) {
      if (w._id === workplaceId) continue;

      const slot = w?.availability?.[day];
      if (!slot?.start || !slot?.end) continue;

      const s2 = toMinutes(slot.start);
      const e2 = toMinutes(slot.end);

      if (start1 < e2 && end1 > s2) {
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

    const key = `${workplaceId}-${day}`;

    // ❌ CLEAR OLD ERROR FIRST
    setConflicts((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    // ❌ SKIP IF NOTHING CHANGED
    if (current.start === newStart && current.end === newEnd) {
      return true;
    }

    // ❌ UPDATE UI FIRST
    setProfile((prev) => {
      const updated = (prev.doctor?.workplaces || []).map((w) =>
        w._id === workplaceId
          ? {
              ...w,
              availability: {
                ...w.availability,
                [day]: { start: newStart, end: newEnd },
              },
            }
          : w,
      );

      return {
        ...prev,
        doctor: { ...prev.doctor, workplaces: updated },
      };
    });

    setIsDirty(true);

    // ❌ VALIDATION ONLY WHEN BOTH VALUES EXIST
    if (!newStart || !newEnd) return true;

    const startMin = toMinutes(newStart);
    const endMin = toMinutes(newEnd);

    // ❌ INVALID RANGE
    if (startMin === null || endMin === null) {
      setConflicts((prev) => ({
        ...prev,
        [key]: "Invalid time range",
      }));
      return false;
    }
    if (startMin === null || endMin === null || startMin >= endMin) {
      setConflicts((prev) => ({
        ...prev,
        [key]: "Invalid time range",
      }));
      return false;
    }

    // ❌ CONFLICT CHECK
    const conflict = hasConflict(workplaceId, day, startMin, endMin);

    if (conflict) {
      setConflicts((prev) => ({
        ...prev,
        [key]: conflict,
      }));
      return false;
    }

    // ✅ DEBOUNCED API CALL
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      saveToServer(workplaceId, day, newStart, newEnd);
    }, 500);

    return true;
  };

  const saveToServer = async (workplaceId, day, start, end) => {
    const currentReq = ++requestRef.current;

    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: { start, end },
        },
      });

      if (currentReq !== requestRef.current) return;

      if (!res?.success) {
        toast.error(res?.message || "Update failed");
      }
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
        return;
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
          doctor: { ...prev.doctor, workplaces: updated },
        };
      });

      setConflicts((prev) => {
        const copy = { ...prev };
        delete copy[`${workplaceId}-${day}`];
        return copy;
      });

      setIsDirty(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  return { setDayTime, removeDay };
};
