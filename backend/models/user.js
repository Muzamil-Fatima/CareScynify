import mongoose from "mongoose";

// define the schema
const userSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    // username: { type: String, unique: true },
    name: { type: String, required: [true, "Name is required"] },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      sparse: true,
    },

    dob: {
      type: Date,
      default: null,
    },

    cnic: {
      type: Number,
      unique: true,
    },
    phone: String,
    address: String,
    accountVerified: { type: Boolean, default: false },
    resetTokenExpire: Date,
    resetToken: String,
    verificationToken: String,
    verificationCodeExpire: Date,
    resetPasswordOTP: String,
    resetPasswordExpire: Date,
    googleId: { type: String },
    authProvider: { type: String },

    // verificationCode: Number,
    avatar: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    role: {
      type: String,
      enum: [
        "doctor",
        "hospital",
        "clinic",
        "pharmacy",
        "laboratory",
        "patient",
      ],
      default: "patient",
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
