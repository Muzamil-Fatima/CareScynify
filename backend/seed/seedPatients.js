import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database.js";
import Patient from "../models/patientModel.js";
import User from "../models/user.js"; // ⚠️ make sure path is correct

dotenv.config({ path: "../.env" });

await connectDB();

try {
  // 👉 get all patient users from DB
  const users = await User.find({ role: "patient" });

  if (!users.length) {
    console.log("No patient users found");
    process.exit(1);
  }

  const patients = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    patients.push({
      userId: user._id, // ✅ correct ObjectId reference

      allergies: i % 2 === 0 ? ["dust"] : ["pollen"],
      medications: ["paracetamol"],
      chronicDiseases: [],

      medicalHistory: {
        diseases: ["flu"],
        surgeries: [],
        familyHistory: "none",
        smoking: "no",
        alcohol: "no",
      },

      emergencyContact: {
        name: "Guardian",
        phone: "03000000000",
        relation: "father",
        address: "Narowal",
      },

      gender: i % 2 === 0 ? "male" : "female",
      bloodGroup: i % 2 === 0 ? "A+" : "B+",
      dob: new Date("2000-01-01"),
    });
  }

  await Patient.insertMany(patients);

  console.log(`${patients.length} patients created successfully`);
} catch (error) {
  console.log("Seed error:", error.message);
} finally {
  mongoose.connection.close();
  process.exit();
}