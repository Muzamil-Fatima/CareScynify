import LabReport from "../../models/laboratory/LabReport.js";
import LabSample from "../../models/laboratory/LabSample.js";
import Laboratory from "../../models/laboratory/labModel.js";
import cloudinary from "../../utils/cloudinary.js";
import streamifier from "streamifier";
import generateLabReportPdf from "../../utils/generateLabReportPdf.js";
import { generateMedicalExplanation } from "../../services/ai/reportExplainService.js";
const uploadPdfToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "lab-reports",
        resource_type: "raw",
        type: "upload",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
// Create Report
// Create Report
export const createLabReport = async (req, res) => {
  try {
    const { sampleId, results, overallRemarks } = req.body;

    const laboratory = await Laboratory.findOne({ userId: req.user.id });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found.",
      });
    }

    const sample = await LabSample.findById(sampleId)
      .populate("labPatientId", "name age gender mobile")
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email",
        },
      });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found.",
      });
    }

    if (sample.sampleStatus !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Sample must be completed before creating a report.",
      });
    }

    if (sample.reportId) {
      return res.status(400).json({
        success: false,
        message: "Report already exists for this sample.",
      });
    }

    // Create Report
    const report = new LabReport({
      laboratoryId: laboratory._id,
      sampleId: sample._id,
      patientId: sample.patientId || null,
      labPatientId: sample.labPatientId,
      results: results || [],
      overallRemarks: overallRemarks || "",
      verifiedBy: req.user.id,
      reportStatus: "Verified",
    });

    await report.save();

    // Populate report for PDF
    await report.populate([
      {
        path: "laboratoryId",
        select: "labName",
      },
      {
        path: "labPatientId",
        select: "name age gender mobile",
      },
      {
        path: "patientId",
        populate: {
          path: "userId",
          select: "name",
        },
      },
      {
        path: "sampleId",
        select: "sampleId",
      },
      {
        path: "verifiedBy",
        select: "name",
      },
    ]);

    // Generate PDF
    const pdfBuffer = await generateLabReportPdf(report);

    // Upload PDF
    const pdfUrl = await uploadPdfToCloudinary(pdfBuffer);

    // Save PDF URL
    report.pdfUrl = pdfUrl;
    await report.save();

    // Link report with sample
    sample.reportId = report._id;
    await sample.save();

    // Send response immediately
    res.status(201).json({
      success: true,
      message: "Lab report created successfully.",
      report,
    });

   
    // Generate AI Summary (Background)
 
    try {
      const explanation = await generateMedicalExplanation(
        pdfUrl,
        "application/pdf",
      );

      report.explanation = explanation;
      await report.save();

      console.log("AI Summary generated successfully.");
    } catch (error) {
      console.error("AI Summary Error:", error.message);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//  Get All Reports
export const getLabReports = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({ userId: req.user.id });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found.",
      });
    }

    const reports = await LabReport.find({
      laboratoryId: laboratory._id,
    })
      .populate("labPatientId", "name age gender mobile")
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone avatar",
        },
      })
      .populate("sampleId", "sampleId sampleStatus")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
//  get lab report by id
export const getLabReportById = async (req, res) => {
  try {
    const report = await LabReport.findById(req.params.id)
      .populate({
        path: "labPatientId",
        select: "name age gender mobile",
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone avatar",
        },
      })
      .populate({
        path: "sampleId",
        select: "sampleId sampleStatus tests",
      })
      .populate({
        path: "laboratoryId",
        select: "labName",
      })
      .populate({
        path: "verifiedBy",
        select: "name",
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }
    // console.log(JSON.stringify(report, null, 2));
    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    // console.error("Get Lab Report Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Report
export const updateLabReport = async (req, res) => {
  try {
    const { results, overallRemarks, reportStatus } = req.body;

    const report = await LabReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    if (results) report.results = results;

    if (overallRemarks !== undefined) report.overallRemarks = overallRemarks;

    if (reportStatus) report.reportStatus = reportStatus;

    if (reportStatus === "Verified") {
      report.verifiedBy = req.user.id;
    }

    await report.save();

    res.status(200).json({
      success: true,
      message: "Report updated successfully.",
      report,
    });
  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Delete Report
export const deleteLabReport = async (req, res) => {
  try {
    const report = await LabReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    await LabSample.findByIdAndUpdate(report.sampleId, {
      reportId: null,
    });

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: "Report deleted successfully.",
    });
  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
