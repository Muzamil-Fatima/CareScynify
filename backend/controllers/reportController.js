import Report from "../models/reportModel.js";

// SAVE REPORT
export const addReport = async (req, res) => {
  try {
    // console.log(req.body);

    const { title, category, fileUrl } = req.body;

    const userId = req.userId; //  GET FROM JWT (NOT FRONTEND)

    const report = await Report.create({
      userId,
      title,
      category,
      fileUrl,
      status: "Pending",
      doctor: "Pending AI",
    });

    res.status(201).json(report);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const userId = req.userId; //  from JWT

    const reports = await Report.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};