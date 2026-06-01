import Doctor from "../../models/doctorModel.js";

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
      availability: req.body.availability || {},
      settings: req.body.settings || {},
    };

    doctor.workplaces.push(newWorkplace);
    await doctor.save();

    return res.status(201).json({
      success: true,
      message: "Workplace added successfully",
      workplace: doctor.workplaces.at(-1),
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

    // CLEAN INPUT
    const cleaned = {};

    for (const day in availability) {
      const slot = availability[day];

      const start = toMinutes(slot?.start);
      const end = toMinutes(slot?.end);

      if (start === null || end === null || start >= end) {
        return res.status(400).json({
          success: false,
          message: `Invalid time range for ${day}`,
        });
      }

      cleaned[day] = {
        start: slot.start,
        end: slot.end,
      };
    }

    if (Object.keys(cleaned).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability data",
      });
    }

    // CONFLICT CHECK
    for (const day in cleaned) {
      const newStart = toMinutes(cleaned[day].start);
      const newEnd = toMinutes(cleaned[day].end);

      for (const w of doctor.workplaces) {
        if (w._id.toString() === workplaceId) continue;

        const existing = w.availability?.[day];
        if (!existing?.start || !existing?.end) continue;

        const exStart = toMinutes(existing.start);
        const exEnd = toMinutes(existing.end);

        if (hasOverlap(newStart, newEnd, exStart, exEnd)) {
          return res.status(400).json({
            success: false,
            message: `Time overlaps with "${w.name || "another workplace"}" on ${day}`,
          });
        }
      }
    }

    // APPLY UPDATE
    workplace.availability = {
      ...(workplace.availability || {}),
      ...cleaned,
    };

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Consultant hours updated successfully",
      workplace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
