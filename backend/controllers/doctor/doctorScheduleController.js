import Doctor from "../../models/doctorModel.js";
// GET FULL SCHEDULE (ALL WORKPLACES)
export const getDoctorSchedule = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ADD / UPDATE WORKPLACE SCHEDULE
export const updateSchedule = async (req, res) => {
  try {
    const { workplaces } = req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          workplaces,
        },
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ADD SINGLE WORKPLACE SCHEDULE
export const addSchedule = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.workplaces.push(req.body);

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Workplace schedule added",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// DELETE WORKPLACE SCHEDULE
export const deleteSchedule = async (req, res) => {
  try {
    const { workplaceId } = req.params;

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
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
    return res.status(500).json({ message: error.message });
  }
};
// GET AVAILABLE SLOTS
export const getAvailableSlots = async (req, res) => {
  try {
    const { workplaceId, day } = req.query;

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    const schedule = workplace.availability?.[day];

    if (!schedule || !schedule.start || !schedule.end) {
      return res.status(400).json({ message: "No schedule for this day" });
    }

    const duration =
      workplace.settings?.appointmentDuration?.value || 30;

    const slots = [];

    let start = schedule.start;
    let end = schedule.end;

    // SIMPLE SLOT GENERATION (basic version)
    let current = start;

    while (current < end) {
      slots.push(current);

      // advance time (simplified logic - can improve later)
      const [h, m] = current.split(":").map(Number);

      let total = h * 60 + m + duration;

      let nh = Math.floor(total / 60);
      let nm = total % 60;

      current = `${String(nh).padStart(2, "0")}:${String(nm).padStart(
        2,
        "0"
      )}`;
    }

    return res.status(200).json({
      success: true,
      slots,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update single workplace schedule (availability + settings)
export const updateWorkplaceSchedule = async (req, res) => {
  try {
    const { workplaceId } = req.params;
    const { availability, settings } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    if (availability) workplace.availability = availability;
    if (settings) workplace.settings = settings;

    await doctor.save();

    return res.status(200).json({
      success: true,
      workplace,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};