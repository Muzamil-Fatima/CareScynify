import Doctor from "../../models/doctorModel.js";
// GET FULL SCHEDULE (ALL WORKPLACES)
export const getDoctorSchedule = async (req, res) => {
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
      { new: true },
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
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
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
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

    const schedule = workplace.availability?.[day];

    if (!schedule || !schedule.start || !schedule.end) {
      return res.status(400).json({
        success: false,
        message: "No schedule for this day",
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
// update single workplace schedule (availability + settings)
export const updateWorkplaceSchedule = async (req, res) => {
  try {
    const { workplaceId } = req.params;
    const { availability, settings } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res
        .status(404)
        .json({ success: false, message: "Workplace not found" });
    }

    // ✔ ONLY UPDATE SELECTED WORKPLACE
    if (availability) {
      workplace.availability = {
        ...workplace.availability,
        ...availability,
      };
    }

    if (settings) {
      workplace.settings = {
        ...workplace.settings,
        ...settings,

        appointmentDuration: {
          value:
            settings?.appointmentDuration?.value ??
            workplace.settings?.appointmentDuration?.value ??
            30,

          unit:
            settings?.appointmentDuration?.unit ??
            workplace.settings?.appointmentDuration?.unit ??
            "minutes",
        },
      };
    }

    await doctor.save();

    return res.status(200).json({
      success: true,
      workplace,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
