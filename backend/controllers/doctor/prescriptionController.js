import Doctor from "../../models/doctorModel.js";
import Prescription from "../../models/PrescriptionModel.js";

export const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      diagnosis,
      symptoms,
      medicines,
      labTests,
      advice,
      followUpDate,
    } = req.body;

    // Find logged-in doctor
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    // Check if prescription already exists
    const existingPrescription = await Prescription.findOne({
      appointmentId,
    });

    if (existingPrescription) {
      return res.status(400).json({
        success: false,
        message: "Prescription already exists for this appointment.",
      });
    }

    const prescription = await Prescription.create({
      appointmentId,
      userId: req.user._id,
      patientId,
      doctorId: doctor._id,
      workplaceId: doctor.workplaceId,
      diagnosis,
      symptoms,
      medicines,
      labTests,
      advice,
      followUpDate,
      status: "draft",
    });

    return res.status(201).json({
      success: true,
      message: "Prescription created successfully.",
      prescription,
    });
  } catch (error) {
    console.error("Create Prescription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update prescription
export const updatePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    // Ensure the logged-in doctor owns this prescription
    if (prescription.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this prescription.",
      });
    }

    const {
      diagnosis,
      symptoms,
      medicines,
      labTests,
      advice,
      followUpDate,
      status,
    } = req.body;

    prescription.diagnosis = diagnosis;
    prescription.symptoms = symptoms;
    prescription.medicines = medicines;
    prescription.labTests = labTests;
    prescription.advice = advice;
    prescription.followUpDate = followUpDate;

    if (status) {
      prescription.status = status;
    }

    await prescription.save();

    return res.status(200).json({
      success: true,
      message: "Prescription updated successfully.",
      prescription,
    });
  } catch (error) {
    console.error("Update Prescription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get prescription by appointment
export const getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find logged-in doctor
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const prescription = await Prescription.findOne({
      appointmentId,
      doctorId: doctor._id,
    });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    return res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Get Prescription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get prescription by patient
export const getPatientPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find logged-in doctor
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const prescriptions = await Prescription.find({
      patientId,
      doctorId: doctor._id,
    })
      .sort({ createdAt: -1 })
      .populate("appointmentId", "appointmentDate appointmentTime status");

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    console.error("Get Patient Prescriptions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get prescription by id

export const getPrescriptionById = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    // Find logged-in doctor
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      doctorId: doctor._id,
    })
      .populate("patientId")
      .populate("appointmentId")
      .populate("workplaceId");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    return res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Get Prescription By Id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Delete prescription (optional)

export const deletePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    // Find logged-in doctor
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      doctorId: doctor._id,
    });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    await prescription.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Prescription deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Prescription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all prescriptions of logged-in patient
export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("doctorId", "specialization qualification")
      .populate("appointmentId", "appointmentDate appointmentTime status")
      .populate("workplaceId");

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    console.error("Get My Prescriptions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get a single prescription of logged-in patient
export const getMyPrescriptionById = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      patientId: req.user._id,
    })
      .populate("doctorId")
      .populate("appointmentId")
      .populate("workplaceId");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    return res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Get My Prescription By Id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};