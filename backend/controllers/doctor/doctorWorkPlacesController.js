import Doctor from "../../models/doctorModel.js";

export const addWorkplace = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newWorkplace = {
      name: req.body.name,
      location: req.body.location,
      type: req.body.type || "clinic",
      availability: {},
      settings: {
        appointmentDuration: { value: 15, unit: "minutes" },
        appointmentFee: 0,
      },
    };

    doctor.workplaces.push(newWorkplace);

    await doctor.save();

    return res.status(201).json({
      success: true,
      message: "Workplace added successfully",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update doctor workplaces
export const updateWorkplace = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { id } = req.params;

    const workplace = doctor.workplaces.id(id);

    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    workplace.name = req.body.name || workplace.name;
    workplace.location = req.body.location || workplace.location;
    workplace.type = req.body.type || workplace.type;

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Workplace updated successfully",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete workplace
export const deleteWorkplace = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { id } = req.params;

    doctor.workplaces = doctor.workplaces.filter(
      (w) => w._id.toString() !== id
    );

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Workplace deleted successfully",
      workplaces: doctor.workplaces,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getWorkplaces = async (req, res) => {
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