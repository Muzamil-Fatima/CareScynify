import mongoose from "mongoose";
import Report from "../models/reportModel.js";
import LabReport from "../models/laboratory/LabReport.js";
import Patient from "../models/patientModel.js";
import { generateMedicalExplanation } from "../services/ai/reportExplainService.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
export const addReport = async (req, res) => {
  try {
    const { category } = req.body;

    // Validate category
    if (!category) {
      return res.status(400).json({
        message: "Category missing",
      });
    }

    // Validate file
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Use "auto" so Cloudinary handles PDFs/images inline instead of forcing download
    const resourceType = "auto";

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "reports",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // console.log("Cloudinary Result:", result);

    //  Create proper file URL
    let fileUrl = result.secure_url;

    // Save report in DB
    const report = await Report.create({
      userId: req.userId,
      title: req.file.originalname,
      category,
      fileUrl,

      mimeType: req.file.mimetype,
      status: "Processing",
    });

    // Send response immediately
    res.status(201).json(report);

    // AI processing in background
    try {
      const explanation = await generateMedicalExplanation(
        fileUrl,
        req.file.mimetype,
      );

      report.explanation = explanation;
      report.status = "Completed";

      await report.save();
    } catch (error) {
      // console.log("Background AI Processing Error:", error.message || error);

      report.status = "Failed";
      await report.save();
    }
  } catch (error) {
    // console.log("Upload Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// get reports
export const getReports = async (req, res) => {
  try {
    const userId = req.userId;

    // User uploaded reports
    const userReports = await Report.find({
      userId: userId,
    }).sort({
      createdAt: -1,
    });

    const patient = await Patient.findOne({
      userId: userId,
    });

    let labReports = [];

    if (patient) {
      labReports = await LabReport.find({
        patientId: patient._id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

      // Add category for frontend
      labReports = labReports.map((report) => ({
        ...report,
        category: "Lab",
      }));
    }

    res.status(200).json({
      reports: userReports,
      labReports: labReports,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET SINGLE REPORT

export const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;

    if (!reportId) {
      return res.status(400).json({
        message: "Report ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({
        message: "Invalid Report ID",
      });
    }

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Security:
    // Patient can only access their own report.
    if (report.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view this report",
      });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("getReportById Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
