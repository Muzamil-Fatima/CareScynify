import mongoose from "mongoose";

// define the schema
const drSchema = new mongoose.Schema({
  // personal information
  drImage: { type: String },
  drName: { type: String },
  drCNIC: { type: Number, unique: true },
  drEmail: { type: String, unique:true },
  drDOB: { type: Date },
  drPhone: { type: Number, unique: true },
  drAddress: { type: String },
  // Professional Details
  drId: { type: Number, unique: true },
  drSpecialization: { type: String },
  drExperience: { type: Number },
  drQualifications: { type: String },
  drUserName: { type: String, unique: true },
  drPassword: { type: String },
  drLicenseNo: { type: String, unique: true },
  //   dr appointment details
  drAvailableDays: { type: String },
  drConsultationTime: { type: String },
  drRoomNo: { type: String },
  drAppointmentDuration: { type: String },
  drStatus: { type: String },
  drNote: { type: String },
  // extra filed
  drFee: { type: Number },
});
