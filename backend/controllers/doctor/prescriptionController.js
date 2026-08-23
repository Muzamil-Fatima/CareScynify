import mongoose from "mongoose";

import Prescription from "../../models/doctor/PrescriptionModel.js";
import Doctor from "../../models/doctor/doctorModel.js";
import Patient from "../../models/patientModel.js";

import cloudinary from "../../utils/cloudinary.js";
import streamifier from "streamifier";

import generatePrescriptionPdf from "../../utils/generatePrescriptionPdf.js";

const uploadPdfToCloudinary = (buffer, prescriptionId) => {
  return new Promise((resolve, reject) => {
    if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
      return reject(new Error("PDF buffer is empty."));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "prescriptions",
        resource_type: "raw",
        type: "upload",

        public_id: `${prescriptionId}.pdf`,

        overwrite: true,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result?.secure_url) {
          return reject(
            new Error(
              "Cloudinary upload succeeded but secure_url was not returned.",
            ),
          );
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.on("error", reject);

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

//  Normalize PDF Buffer doctorId

const normalizePdfBuffer = (pdf) => {
  if (!pdf) {
    return null;
  }

  if (Buffer.isBuffer(pdf)) {
    return pdf;
  }

  if (pdf instanceof Uint8Array) {
    return Buffer.from(pdf);
  }

  if (pdf instanceof ArrayBuffer) {
    return Buffer.from(pdf);
  }

  if (ArrayBuffer.isView(pdf)) {
    return Buffer.from(pdf.buffer, pdf.byteOffset, pdf.byteLength);
  }

  return null;
};

//  Get Logged-in Doctor doctorId

const getLoggedInDoctor = async (req) => {
  const userId = req.user?._id || req.user?.id;

  if (!userId) {
    return null;
  }

  return Doctor.findOne({
    userId,
  });
};

//  Get Doctor Workplace doctorId

const getDoctorWorkplace = (doctor, workplaceId) => {
  if (!doctor?.workplaces || !workplaceId) {
    return null;
  }

  return doctor.workplaces.find(
    (workplace) => String(workplace._id) === String(workplaceId),
  );
};

const getPatientUserId = async (patientId) => {
  const patient = await Patient.findById(patientId).select("userId").lean();

  if (!patient) {
    return null;
  }

  return patient.userId || null;
};

// Normalize Medicines doctorId

const normalizeMedicines = (medicines) => {
  if (!Array.isArray(medicines)) {
    return [];
  }

  return medicines
    .filter((item) => item?.medicine?.trim())
    .map((item) => ({
      medicine: item?.medicine?.trim() || "",
      dosage: item?.dosage?.trim() || "",
      frequency: item?.frequency?.trim() || "",
      duration: item?.duration?.trim() || "",
      instructions: item?.instructions?.trim() || "",
    }));
};

//  Normalize String Array (symptoms / labTests) doctorId

const normalizeStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

// Populate Prescription For PDF doctorId

const populatePrescriptionForPdf = async (prescription) => {
  await prescription.populate([
    {
      path: "doctorId",
      select:
        "drId specialization qualifications qualification digitalSignature workplaces userId",

      populate: {
        path: "userId",
        select: "name firstName lastName email phone avatar",
      },
    },

    {
      path: "patientId",
      populate: {
        path: "userId",
        select: "name firstName lastName email phone avatar",
      },
    },

    {
      path: "appointmentId",
      select:
        "appointmentId date appointmentDate appointmentTime consultationType status",
    },
  ]);

  return prescription;
};

//  CREATE PRESCRIPTION doctorId

export const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      workplaceId,
      diagnosis,
      symptoms,
      medicines,
      labTests,
      advice,
      followUpDate,
    } = req.body;

    // VALIDATION

    if (!appointmentId || !patientId || !workplaceId) {
      return res.status(400).json({
        success: false,
        message: "Appointment, patient and workplace are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(workplaceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid workplace ID.",
      });
    }

    // LOGGED-IN DOCTOR

    const doctor = await getLoggedInDoctor(req);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    // PATIENT

    const patientUserId = await getPatientUserId(patientId);

    if (!patientUserId) {
      return res.status(404).json({
        success: false,
        message: "Patient user account not found.",
      });
    }

    // WORKPLACE

    const workplace = getDoctorWorkplace(doctor, workplaceId);

    if (!workplace) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found for this doctor.",
      });
    }

    // CHECK EXISTING PRESCRIPTION

    const existingPrescription = await Prescription.findOne({
      appointmentId,
    });

    if (existingPrescription) {
      return res.status(400).json({
        success: false,
        message: "Prescription already exists for this appointment.",
        prescription: existingPrescription,
      });
    }

    // NORMALIZE DATA

    const normalizedDiagnosis = diagnosis?.trim() || "";

    const normalizedSymptoms = normalizeStringArray(symptoms);

    const normalizedMedicines = normalizeMedicines(medicines);

    const normalizedLabTests = normalizeStringArray(labTests);

    const normalizedAdvice = advice?.trim() || "";

    const normalizedFollowUpDate = followUpDate || null;

    // SAVE PRESCRIPTION FIRST

    const prescription = await Prescription.create({
      appointmentId,
      userId: patientUserId,
      patientId,
      doctorId: doctor._id,
      workplaceId,
      diagnosis: normalizedDiagnosis,
      symptoms: normalizedSymptoms,
      medicines: normalizedMedicines,
      labTests: normalizedLabTests,
      advice: normalizedAdvice,
      followUpDate: normalizedFollowUpDate,
      pdfUrl: "",
    });

    // GENERATE PDF

    try {
      await populatePrescriptionForPdf(prescription);

      const pdfData = prescription.toObject();

      pdfData.workplace = workplace;

      const generatedPdf = await generatePrescriptionPdf(pdfData);

      const pdfBuffer = normalizePdfBuffer(generatedPdf);

      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error(
          "Prescription PDF generator did not return a valid PDF buffer.",
        );
      }

      // UPLOAD PDF

      const pdfUrl = await uploadPdfToCloudinary(
        pdfBuffer,
        `${prescription.prescriptionId}.pdf`,
      );

      // UPDATE PDF URL

      prescription.pdfUrl = pdfUrl;

      await prescription.save();
    } catch (pdfError) {
      console.error("Prescription PDF generation/upload failed:", pdfError);

      // Prescription is already saved.
      // PDF failure should not delete prescription.
    }

    // FINAL RESPONSE

    const savedPrescription = await Prescription.findById(prescription._id);

    return res.status(201).json({
      success: true,
      message: "Prescription created successfully.",
      prescription: savedPrescription,
    });
  } catch (error) {
    console.error("CREATE PRESCRIPTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

//  UPDATE PRESCRIPTION doctorId

export const updatePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    // Doctor  doctorId

    const doctor = await getLoggedInDoctor(req);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    //  Validate ID doctorId

    if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid prescription ID.",
      });
    }

    //  Find Prescription doctorId

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

    //  Workplace  doctorId

    const workplace = getDoctorWorkplace(doctor, prescription.workplaceId);

    if (!workplace) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found for this doctor.",
      });
    }

    // Request Data doctorId

    const { diagnosis, symptoms, medicines, labTests, advice, followUpDate } =
      req.body;

    // Normalize Incoming Medical Data doctorId

    const normalizedDiagnosis = diagnosis?.trim() || "";
    const normalizedSymptoms = normalizeStringArray(symptoms);
    const normalizedMedicines = normalizeMedicines(medicines);
    const normalizedLabTests = normalizeStringArray(labTests);
    const normalizedAdvice = advice?.trim() || "";
    const normalizedFollowUpDate = followUpDate || null;

    // doctorId Apply Updated Fields To Prescription

    prescription.diagnosis = normalizedDiagnosis;
    prescription.symptoms = normalizedSymptoms;
    prescription.medicines = normalizedMedicines;
    prescription.labTests = normalizedLabTests;
    prescription.advice = normalizedAdvice;
    prescription.followUpDate = normalizedFollowUpDate;

    // Temporary PDF Prescription doctorId

    const prescriptionForPdf = new Prescription({
      prescriptionId: prescription.prescriptionId,

      pdfUrl: prescription.pdfUrl,

      appointmentId: prescription.appointmentId,

      userId: prescription.userId,

      patientId: prescription.patientId,

      doctorId: prescription.doctorId,

      workplaceId: prescription.workplaceId,

      diagnosis: normalizedDiagnosis,
      symptoms: normalizedSymptoms,
      medicines: normalizedMedicines,
      labTests: normalizedLabTests,
      advice: normalizedAdvice,
      followUpDate: normalizedFollowUpDate,
    });

    //Populate

    await populatePrescriptionForPdf(prescriptionForPdf);

    // Workplace For PDF

    const pdfData = prescriptionForPdf.toObject();
    pdfData.workplace = workplace;

    const generatedPdf = await generatePrescriptionPdf(pdfData);

    const pdfBuffer = normalizePdfBuffer(generatedPdf);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error(
        "Updated prescription PDF generator did not return a valid PDF buffer.",
      );
    }

    //  Upload New PDF
    // doctorId

    const pdfUrl = await uploadPdfToCloudinary(
      pdfBuffer,
      `${prescription.prescriptionId}.pdf`,
    );

    // Update MongoDB doctorId

    prescription.pdfUrl = pdfUrl;

    const savedPrescription = await prescription.save();

    //  Response doctorId

    return res.status(200).json({
      success: true,
      message: "Prescription updated successfully.",
      prescription: savedPrescription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
//  GET PRESCRIPTION BY APPOINTMENT doctorId
export const getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const doctor = await getLoggedInDoctor(req);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const prescription = await Prescription.findOne({
      appointmentId,
      doctorId: doctor._id,
    })
      .populate({
        path: "doctorId",
        select:
          "drId specialization qualifications qualification digitalSignature workplaces",

        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "appointmentId",
        select:
          "appointmentId date appointmentDate appointmentTime consultationType status",
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
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
// GET PATIENT PRESCRIPTION HISTORY doctorId
export const getPatientPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.params;

    const doctor = await getLoggedInDoctor(req);

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
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "doctorId",
        select:
          "drId specialization qualifications qualification digitalSignature workplaces",

        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "appointmentId",
        select:
          "appointmentId date appointmentDate appointmentTime consultationType status",
      });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
//  GET PRESCRIPTION BY ID doctorId
export const getPrescriptionById = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const doctor = await getLoggedInDoctor(req);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid prescription ID.",
      });
    }

    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      doctorId: doctor._id,
    })
      .populate({
        path: "doctorId",
        select:
          "drId specialization qualifications qualification digitalSignature workplaces",

        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "appointmentId",
        select:
          "appointmentId date appointmentDate appointmentTime consultationType status",
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
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

//  GET ALL PRESCRIPTIONS OF LOGGED-IN PATIENT doctorId
export const getMyPrescriptions = async (req, res) => {
  try {
    const patientUserId = req.user?._id || req.user?.id;

    if (!patientUserId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const prescriptions = await Prescription.find({
      userId: patientUserId,
    })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "doctorId",
        select:
          "drId specialization qualifications qualification digitalSignature workplaces",

        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "appointmentId",
        select:
          "appointmentId date appointmentDate appointmentTime consultationType status",
      });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

//  GET SINGLE PRESCRIPTION OF LOGGED-IN PATIENT doctorId
export const getMyPrescriptionById = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const patientUserId = req.user?._id || req.user?.id;

    if (!patientUserId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid prescription ID.",
      });
    }

    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      userId: patientUserId,
    })
      .populate({
        path: "doctorId",
        select:
          "drId specialization qualifications qualification digitalSignature workplaces",

        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name firstName lastName email phone avatar",
        },
      })
      .populate({
        path: "appointmentId",
        select:
          "appointmentId date appointmentDate appointmentTime consultationType status",
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
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
