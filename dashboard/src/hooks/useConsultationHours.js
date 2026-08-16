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

  // TIME TO MINUTES

  const toMinutes = (time = "") => {
    if (!time || !time.includes(":")) return null;

    const [hours, minutes] = time.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      return null;
    }

    return hours * 60 + minutes;
  };

  // CHECK ALL CONFLICTS FOR ONE DAY

  const validateDayConflicts = (workplaces, day) => {
    const newConflicts = {};

    for (const workplace of workplaces) {
      const currentSlot = workplace?.availability?.[day];

      if (!currentSlot?.start || !currentSlot?.end) {
        continue;
      }

      const currentStart = toMinutes(currentSlot.start);
      const currentEnd = toMinutes(currentSlot.end);

      if (
        currentStart === null ||
        currentEnd === null ||
        currentStart >= currentEnd
      ) {
        newConflicts[`${workplace._id}-${day}`] = "Invalid time range";

        continue;
      }

      // Check this workplace against EVERY other workplace
      for (const otherWorkplace of workplaces) {
        if (otherWorkplace._id === workplace._id) {
          continue;
        }

        const otherSlot = otherWorkplace?.availability?.[day];

        if (!otherSlot?.start || !otherSlot?.end) {
          continue;
        }

        const otherStart = toMinutes(otherSlot.start);
        const otherEnd = toMinutes(otherSlot.end);

        if (
          otherStart === null ||
          otherEnd === null ||
          otherStart >= otherEnd
        ) {
          continue;
        }

        const isOverlapping =
          currentStart < otherEnd && currentEnd > otherStart;

        if (isOverlapping) {
          newConflicts[`${workplace._id}-${day}`] =
            otherWorkplace.name || "Another Workplace";

          // We found the actual workplace causing
          // the conflict, so stop checking this one.
          break;
        }
      }
    }

    return newConflicts;
  };

  // UPDATE DAY TIME

  const setDayTime = (workplaceId, day, field, value) => {
    const currentWorkplaces = profileRef.current?.doctor?.workplaces || [];

    const currentWorkplace = currentWorkplaces.find(
      (w) => w._id === workplaceId,
    );

    const current = currentWorkplace?.availability?.[day] || {
      start: "",
      end: "",
    };

    const newStart = field === "start" ? value : current.start;

    const newEnd = field === "end" ? value : current.end;

    // UPDATE PROFILE WITH NEW TIME

    const updatedWorkplaces = currentWorkplaces.map((workplace) =>
      workplace._id === workplaceId
        ? {
            ...workplace,
            availability: {
              ...workplace.availability,
              [day]: {
                start: newStart,
                end: newEnd,
              },
            },
          }
        : workplace,
    );

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        workplaces: updatedWorkplaces,
      },
    }));

    // CLEAR OLD CONFLICTS FOR THIS DAY
    // Then calculate them again using the NEW times.
    setConflicts((prev) => {
      const copy = { ...prev };

      Object.keys(copy).forEach((key) => {
        if (key.endsWith(`-${day}`)) {
          delete copy[key];
        }
      });

      return copy;
    });

    // NOTHING CHANGED

    if (current.start === newStart && current.end === newEnd) {
      return true;
    }

    // WAIT UNTIL BOTH TIMES EXIST

    if (!newStart || !newEnd) {
      return true;
    }

    // VALIDATE NEW TIME

    const startMinutes = toMinutes(newStart);
    const endMinutes = toMinutes(newEnd);

    if (
      startMinutes === null ||
      endMinutes === null ||
      startMinutes >= endMinutes
    ) {
      setConflicts((prev) => ({
        ...prev,
        [`${workplaceId}-${day}`]: "Invalid time range",
      }));

      return false;
    }

    // CHECK ALL WORKPLACES USING UPDATED DATA

    const dayConflicts = validateDayConflicts(updatedWorkplaces, day);

    // UPDATE CONFLICT STATE

    setConflicts((prev) => {
      const copy = { ...prev };

      // Remove all old conflicts for this day
      Object.keys(copy).forEach((key) => {
        if (key.endsWith(`-${day}`)) {
          delete copy[key];
        }
      });

      // Add newly detected conflicts
      return {
        ...copy,
        ...dayConflicts,
      };
    });

    // IF CONFLICT EXISTS → DO NOT SAVE

    if (Object.keys(dayConflicts).length > 0) {
      clearTimeout(debounceRef.current);
      return false;
    }

    // NO CONFLICT → SAVE

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      saveToServer(workplaceId, day, newStart, newEnd);
    }, 500);

    return true;
  };

  // SAVE TO SERVER

  const saveToServer = async (workplaceId, day, start, end) => {
    const currentReq = ++requestRef.current;

    const key = `${workplaceId}-${day}`;

    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: {
            start,
            end,
          },
        },
      });

      // Ignore old request
      if (currentReq !== requestRef.current) {
        return;
      }

      // Backend failed
      if (!res?.success) {
        toast.error(res?.message || "Failed to save consultation hours");

        return;
      }

      // Remove conflict after successful save
      setConflicts((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });

      toast.success(res?.message || "Consultation hours saved successfully");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to save consultation hours",
      );
    }
  };

  // REMOVE DAY

  const removeDay = async (workplaceId, day) => {
    // Cancel pending time save
    clearTimeout(debounceRef.current);

    const currentReq = ++requestRef.current;

    try {
      const res = await updateConsultantHours(workplaceId, {
        availability: {
          [day]: null,
        },
      });

      if (currentReq !== requestRef.current) {
        return;
      }

      if (!res?.success) {
        toast.error(res?.message || "Failed to remove day");

        return;
      }

      // UPDATE PROFILE

      setProfile((prev) => {
        const updatedWorkplaces = (prev.doctor?.workplaces || []).map(
          (workplace) => {
            if (workplace._id !== workplaceId) {
              return workplace;
            }

            const availability = {
              ...(workplace.availability || {}),
            };

            delete availability[day];

            return {
              ...workplace,
              availability,
            };
          },
        );

        return {
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: updatedWorkplaces,
          },
        };
      });

      // RECALCULATE OTHER WORKPLACE CONFLICTS

      const updatedWorkplaces = (
        profileRef.current?.doctor?.workplaces || []
      ).map((workplace) => {
        if (workplace._id !== workplaceId) {
          return workplace;
        }

        const availability = {
          ...(workplace.availability || {}),
        };

        delete availability[day];

        return {
          ...workplace,
          availability,
        };
      });

      const dayConflicts = validateDayConflicts(updatedWorkplaces, day);

      setConflicts((prev) => {
        const copy = { ...prev };

        // Remove old conflicts for this day
        Object.keys(copy).forEach((key) => {
          if (key.endsWith(`-${day}`)) {
            delete copy[key];
          }
        });

        return {
          ...copy,
          ...dayConflicts,
        };
      });

      toast.success(res?.message || "Consultation day removed successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove day");
    }
  };

  // RETURN

  return {
    setDayTime,
    removeDay,
  };
};
