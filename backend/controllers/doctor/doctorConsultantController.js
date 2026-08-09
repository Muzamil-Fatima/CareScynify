import Doctor from "../../models/doctor/doctorModel.js";
// UTILS
const toMinutes = (t = "") => {
  if (!t || !t.includes(":")) return null;
  const [h, m] = t.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
};

const hasOverlap = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && aEnd > bStart;
};
const generateWorkplaceSlots = (workplace) => {
  const durationObj = workplace.settings?.appointmentDuration;

  let duration = 30;

  if (durationObj?.value) {
    duration =
      durationObj.unit === "hours"
        ? Number(durationObj.value) * 60
        : Number(durationObj.value);
  }

  const breakMinutes = workplace.settings?.breakMinutes || 0;

  const maxPerDay = workplace.settings?.maxPatientsPerDay || 999;

  const toMinutes = (t = "") => {
    if (!t || !t.includes(":")) return null;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const generateSlots = (start, end) => {
    const slots = [];

    let current = toMinutes(start);
    const endTime = toMinutes(end);

    if (current === null || endTime === null) return [];

    while (current + duration <= endTime && slots.length < maxPerDay) {
      const h = Math.floor(current / 60);
      const m = current % 60;

      slots.push({
        startTime: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        isBooked: false,
      });

      current += duration + breakMinutes;
    }

    return slots;
  };

  const generatedSlots = {};

  for (const day in workplace.availability || {}) {
    const slot = workplace.availability[day];
    if (!slot?.start || !slot?.end) continue;

    generatedSlots[day] = generateSlots(slot.start, slot.end);
  }

  workplace.slots = generatedSlots;
};
// GET CONSULTANT HOURS
export const getConsultantHours = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      doctor: {
        workplaces: doctor.workplaces || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ADD WORKPLACE
export const addConsultantHours = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const newWorkplace = {
      name: req.body.name || "New Workplace",
      location: req.body.location || "",
      type: req.body.type || "clinic",
      availability: req.body.availability || {},
      settings: req.body.settings || {},
    };

    // push first
    doctor.workplaces.push(newWorkplace);

    const createdWorkplace = doctor.workplaces.at(-1);

    // GENERATE SLOTS ON CREATE
    generateWorkplaceSlots(createdWorkplace);

    await doctor.save();

    return res.status(201).json({
      success: true,
      message: "Workplace added successfully with slots",
      workplace: createdWorkplace,
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE WORKPLACE
export const deleteConsultantHours = async (req, res) => {
  try {
    const { workplaceId } = req.params;

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const beforeCount = doctor.workplaces.length;

    doctor.workplaces = doctor.workplaces.filter(
      (w) => w._id.toString() !== workplaceId,
    );

    if (doctor.workplaces.length === beforeCount) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found",
      });
    }

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Workplace deleted successfully",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET AVAILABLE SLOTS
export const getConsultantSlots = async (req, res) => {
  try {
    const { workplaceId, day } = req.query;

    if (!workplaceId || !day) {
      return res.status(400).json({
        success: false,
        message: "workplaceId and day are required",
      });
    }

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found",
      });
    }
    const availability = workplace.availability
      ? Object.fromEntries(workplace.availability)
      : {};
    const schedule = availability?.[day];

    if (!schedule?.start || !schedule?.end) {
      return res.status(400).json({
        success: false,
        message: "No availability for this day",
      });
    }

    const duration = workplace.settings?.appointmentDuration?.value || 30;

    //  allow CLEAR operation
    if (!slot?.start && !slot?.end) {
      cleaned[day] = {
        start: "",
        end: "",
      };
    }

    const start = toMinutes(slot?.start);
    const end = toMinutes(slot?.end);

    if (start === null || end === null || start >= end) {
      return res.status(400).json({
        success: false,
        message: `Invalid time range for ${day}`,
      });
    }

    const slots = [];
    let current = start;

    while (current + duration <= end) {
      const h = Math.floor(current / 60);
      const m = current % 60;

      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);

      current += duration;
    }

    return res.status(200).json({
      success: true,
      slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// UPDATE CONSULTANT HOURS
export const updateConsultantHours = async (req, res) => {
  try {
    const { workplaceId } = req.params;
    const { availability } = req.body;

    if (!availability || typeof availability !== "object") {
      return res.status(400).json({
        success: false,
        message: "Availability is required",
      });
    }

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found",
      });
    }

    //  START FROM CURRENT STATE (important for safe mutation)
    const updatedAvailability = { ...(workplace.availability || {}) };

    for (const day in availability) {
      const slot = availability[day];

      // DELETE CASE
      if (!slot) {
        delete updatedAvailability[day];
        continue;
      }

      //  VALIDATION
      const start = toMinutes(slot?.start);
      const end = toMinutes(slot?.end);

      if (start === null || end === null || start >= end) {
        return res.status(400).json({
          success: false,
          message: `Invalid time range for ${day}`,
        });
      }

      //  UPDATE CASE
      updatedAvailability[day] = {
        start: slot.start,
        end: slot.end,
      };
    }

    // FINAL ASSIGNMENT (MERGING )
    workplace.availability = updatedAvailability;

    // regenerate slots
    generateWorkplaceSlots(workplace);

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      workplace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
