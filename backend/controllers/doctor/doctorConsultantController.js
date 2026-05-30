import Doctor from "../../models/doctorModel.js";

//  GET CONSULTANT HOURS
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
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ADD WORKPLACE CONSULTANT
export const addConsultantHours = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.workplaces.push(req.body);

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Consultant hours added",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  DELETE CONSULTANT
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
      (w) => w._id.toString() !== workplaceId,
    );

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Consultant removed",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET AVAILABLE SLOTS (KEEP SAME LOGIC)
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

    const workplace = doctor.workplaces.find(
      (w) => w._id.toString() === workplaceId,
    );

    if (!workplace) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found",
      });
    }

    const schedule = workplace.availability?.get
      ? workplace.availability.get(day)
      : workplace.availability?.[day];

    if (!schedule || !schedule.start || !schedule.end) {
      return res.status(400).json({
        success: false,
        message: "No consultant hours for this day",
      });
    }

    const duration = workplace.settings?.appointmentDuration?.value || 30;

    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    let current = toMinutes(schedule.start);
    const endMin = toMinutes(schedule.end);

    const slots = [];

    while (current < endMin) {
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
    return res.status(500).json({ message: error.message });
  }
};

//  UPDATE SINGLE CONSULTANT HOURS
export const updateConsultantHours = async (req, res) => {
  try {
    const { workplaceId } = req.params;

    const availability =
      req.body && typeof req.body.availability === "object"
        ? req.body.availability
        : {};

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

    // clean data
    const cleanedAvailability = {};

    for (let day in availability) {
      const slot = availability[day];

      if (slot?.start && slot?.end) {
        cleanedAvailability[day] = {
          start: slot.start,
          end: slot.end,
        };
      }
    }

    if (Object.keys(cleanedAvailability).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid time slots provided",
      });
    }

    // ---------------- CONFLICT CHECK (FIXED) ----------------
    for (let day in cleanedAvailability) {
      const newSlot = cleanedAvailability[day];

      for (let w of doctor.workplaces) {
        if (w._id.toString() === workplaceId) continue;

        const existing =
          w.availability instanceof Map
            ? w.availability.get(day)
            : w.availability?.[day];

        if (!existing?.start || !existing?.end) continue;

        const newStart = newSlot.start;
        const newEnd = newSlot.end;
        const exStart = existing.start;
        const exEnd = existing.end;

        if (newStart < exEnd && newEnd > exStart) {
          return res.status(400).json({
            success: false,
            message: `Conflict with ${w.name || "another workplace"} on ${day}`,
          });
        }
      }
    }

    // ---------------- SAFE SAVE (FIXED) ----------------
    Object.keys(cleanedAvailability).forEach((day) => {
      workplace.availability.set(day, cleanedAvailability[day]);
    });

    doctor.markModified("workplaces");

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Consultation hours updated",
      workplace,
    });
  } catch (error) {
    console.error("UPDATE CONSULTANT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const hasOverlap = (newStart, newEnd, existingStart, existingEnd) => {
  return newStart < existingEnd && newEnd > existingStart;
};
