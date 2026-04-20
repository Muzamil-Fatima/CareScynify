import Report from "../models/reportModel.js";

export const createReport = async (req, res) => {
  try {
    const { patientId, title, testType, notes, uploadedByRole } = req.body;

    const fileUrl = req.file.path;

    const report = await Report.create({
      patientId,
      title,
      testType,
      notes,
      uploadedByRole,
      uploadedBy: req.user._id,
      fileUrl,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};