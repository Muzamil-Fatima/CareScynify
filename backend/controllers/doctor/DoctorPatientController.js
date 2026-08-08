import DoctorPatient from "../../models/doctor/doctorAddPatientModel.js";
import Doctor from "../../models/doctor/doctorModel.js";
import User from "../../models/user.js";
import Patient from "../../models/patientModel.js";
// Add Doctor Patient
export const addDoctorPatient = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const {
      name,
      phone,
      gender,
      dob,
      address,
      notes,
    } = req.body;


    const cleanPhone = phone?.trim();


    if (!name || !cleanPhone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required.",
      });
    }


    // Check doctor already added this phone
    const existingDoctorPatient = await DoctorPatient.findOne({
      doctorId: doctor._id,
      phone: cleanPhone,
    });


    if (existingDoctorPatient) {
      return res.status(400).json({
        success: false,
        message: "Patient already added.",
      });
    }



    // Find existing user
    let user = await User.findOne({
      phone: cleanPhone,
    });



    // Create user account
    if (!user) {
      user = await User.create({
        name,
        phone: cleanPhone,
        email: `${cleanPhone}@patient.com`,
        password: `${cleanPhone.slice(-4)}Patient@123`,
        role: "patient",
        createdByDoctor: true,
        isProfileCompleted: false,
      });
    }



    // Find patient profile
    let patientProfile = await Patient.findOne({
      userId: user._id,
    });



    // Create patient profile
    if (!patientProfile) {
      patientProfile = await Patient.create({
        userId: user._id,
        gender: gender || "other",
        dob: dob || null,
        address: address || "",
        notes: notes || "",
      });
    }



    // Create doctor patient relation
    const doctorPatient = await DoctorPatient.create({
      doctorId: doctor._id,
      patientId: patientProfile._id,
      name: user.name,
      phone: cleanPhone,
      gender: gender || "other",
      dob: dob || null,
      address: address || "",
      notes: notes || "",
    });



    return res.status(201).json({
      success: true,
      message: "Patient added successfully.",
      patient: {
        _id: patientProfile._id,
        doctorPatientId: doctorPatient._id,
        userId: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });


  } catch (error) {

    console.error("Add Doctor Patient Error:", error);


    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Get Doctor Patient
export const getDoctorPatient = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }


    const patient = await DoctorPatient.findOne({
      _id: req.params.id,
      doctorId: doctor._id,
    })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone avatar dob cnic",
        },
      });


    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }


    res.status(200).json({
      success: true,
      patient,
    });


  } catch (error) {

    console.error("getDoctorPatient Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Doctor Patient
export const updateDoctorPatient = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const doctorId = doctor._id;
    const patient = await DoctorPatient.findOneAndUpdate(
      {
        _id: req.params.id,
        doctorId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully.",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDoctorPatients = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const patients = await DoctorPatient.find({
      doctorId: doctor._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Doctor Patient
export const deleteDoctorPatient = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const doctorId = doctor._id;
    const patient = await DoctorPatient.findOneAndDelete({
      _id: req.params.id,
      doctorId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
