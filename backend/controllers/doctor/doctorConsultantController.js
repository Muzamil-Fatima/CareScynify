import Doctor from "../../models/doctorModel.js";

// ---------------- UTILS ----------------
const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const hasOverlap = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && aEnd > bStart;
};

// ======================================================
// GET CONSULTANT HOURS (ALL WORKPLACES)
// ======================================================
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
      workplaces: doctor.workplaces || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// ADD WORKPLACE (OPTIONAL FOR CONSULTANT FLOW)
// ======================================================
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
      ...req.body,
      availability: req.body.availability || {},
      settings: req.body.settings || {},
    };

    doctor.workplaces.push(newWorkplace);

    await doctor.save();

    return res.status(201).json({
      success: true,
      message: "Workplace added successfully",
      workplace: doctor.workplaces.at(-1), // IMPORTANT for frontend consistency
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE WORKPLACE
// ======================================================
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

    doctor.workplaces = doctor.workplaces.filter(
      (w) => w._id.toString() !== workplaceId
    );

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Workplace deleted",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET AVAILABLE SLOTS
// ======================================================
export const getConsultantSlots = async (req, res) => {
  try {
    const { workplaceId, day } = req.query;

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

    const schedule = workplace.availability?.[day];

    if (!schedule?.start || !schedule?.end) {
      return res.status(400).json({
        success: false,
        message: "No consultant hours for this day",
      });
    }

    const duration = workplace.settings?.appointmentDuration?.value || 30;

    let current = toMinutes(schedule.start);
    const end = toMinutes(schedule.end);

    const slots = [];

    while (current < end) {
      const h = Math.floor(current / 60);
      const m = current % 60;

      slots.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );

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

// ======================================================
// UPDATE CONSULTANT HOURS (FIXED + SAFE)
// ======================================================
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

    // ---------------- CLEAN DATA ----------------
    const cleaned = {};

    for (const day in availability) {
      const slot = availability[day];

      if (slot?.start && slot?.end) {
        cleaned[day] = {
          start: slot.start,
          end: slot.end,
        };
      }
    }

    if (Object.keys(cleaned).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability data",
      });
    }

    // ---------------- CONFLICT CHECK ----------------
    for (const day in cleaned) {
      const newSlot = cleaned[day];

      const newStart = toMinutes(newSlot.start);
      const newEnd = toMinutes(newSlot.end);

      for (const w of doctor.workplaces) {
        if (w._id.toString() === workplaceId) continue;

        const existing = w.availability?.[day];
        if (!existing?.start || !existing?.end) continue;

        const exStart = toMinutes(existing.start);
        const exEnd = toMinutes(existing.end);

        if (hasOverlap(newStart, newEnd, exStart, exEnd)) {
          return res.status(400).json({
            success: false,
            message: `Conflict with ${w.name || "another workplace"} on ${day}`,
          });
        }
      }
    }

    // ---------------- SAVE ----------------
    workplace.availability = {
      ...workplace.availability,
      ...cleaned,
    };

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Consultant hours updated successfully",
      workplace, // IMPORTANT for frontend update
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};