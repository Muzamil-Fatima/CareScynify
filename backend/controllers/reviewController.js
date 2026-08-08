import Review from "../models/reviewModel.js";
import Doctor from "../models/doctor/doctorModel.js";

export const createReview = async (req, res) => {
  try {
    const { appointmentId, doctorId, rating, comment } = req.body;

    const existingReview = await Review.findOne({ appointment: appointmentId });

    if (existingReview) {
      return res.status(400).json({
        message: "Review already submitted",
      });
    }

    const review = await Review.create({
      patient: req.user._id,
      doctor: doctorId,
      appointment: appointmentId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// dashboard doctor seen own review
export const getDoctorReviews = async (req, res) => {
  try {
    // 1. find doctor profile using logged-in user
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // 2. fetch reviews using doctor._id
    const reviews = await Review.find({
      doctor: doctor._id,
    })
      .populate("patient", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      patient: req.user._id,
    }).populate("doctor", "name specialization");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getReviewByAppointment = async (req, res) => {
  try {
    const review = await Review.findOne({
      appointment: req.params.appointmentId,
    }).populate("patient", "name");

    if (!review) {
      return res.status(404).json({ message: "No review found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPublicDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({
      doctor: doctorId,
    })
      .populate("patient", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};