import Report from "../models/reportModel.js";
import { generateMedicalExplanation } from "../services/ai/reportExplainService.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
// ADD REPORT
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

    // Decide resource type
    const resourceType =
      req.file.mimetype === "application/pdf" ? "raw" : "image";

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

    console.log("Cloudinary Result:", result);

    //  Create proper file URL
    let fileUrl = result.secure_url;

    console.log("Final File URL:", fileUrl);
    console.log("Cloudinary Result:", {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
    });
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
      console.log("Background AI Processing Error:", error.message || error);

      report.status = "Failed";
      await report.save();
    }
  } catch (error) {
    console.log("Upload Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET REPORTS
export const getReports = async (req, res) => {
  try {
    const userId = req.userId;

    const reports = await Report.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
