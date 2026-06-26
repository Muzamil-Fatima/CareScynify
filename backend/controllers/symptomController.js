import SymptomAnalysis from "../models/symptomModel.js";
import { analyzeSymptomsWithAI } from "../services/ai/symptomService.js";

//  Analyze
export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender, duration } = req.body;
    const userId = req.user._id;

    if (!symptoms || !age || !gender || !duration) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const aiResponse = await analyzeSymptomsWithAI({
      symptoms,
      age,
      gender,
      duration,
    });

    const newAnalysis = new SymptomAnalysis({
      userId,
      symptoms,
      age,
      gender,
      duration,
      result: {
        conditions: aiResponse.conditions,
        severity: aiResponse.severity,
        specialist: aiResponse.specialist,
        homeCare: aiResponse.homeCare,
        emergencySigns: aiResponse.emergency,
      },
    });

    await newAnalysis.save();

    return res.status(201).json(newAnalysis);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// Patient Profile history
export const getPatientHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    //  sorted by createdAt descending
    const history = await SymptomAnalysis.find({ userId })
      .sort({ createdAt: -1 }) // Newest first
      .limit(5); // top 5

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch history" });
  }
};
