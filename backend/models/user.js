import mongoose from "mongoose";

// define the schema
const userSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    // username: { type: String, unique: true },
    name: { type: String, trim: true, required: [true, "Name is required"] },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    dob: {
      type: Date,
      default: null,
    },

    cnic: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    phone: { type: String, index: true },
    address: { type: String, trim: true },
    accountVerified: { type: Boolean, default: false },
    resetTokenExpire: Date,
    resetToken: String,
    verificationToken: String,
    verificationCodeExpire: Date,
    resetPasswordOTP: String,
    resetPasswordExpire: Date,
    googleId: { type: String, trim: true },
    authProvider: { type: String, trim: true },

    // verificationCode: Number,
    avatar: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    languages: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        language: String,
        proficiency: String,
      },
    ],
    role: {
      type: String,
      enum: ["doctor", "pharmacy", "laboratory", "patient"],
      default: "patient",
      required: true,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    isProfileCompleted: {
      type: Boolean,
      default: false,
    },

    createdByDoctor: {
      type: Boolean,
      default: false,
    },
    notificationSettings: {
      type: Map,
      of: new mongoose.Schema(
        {
          system: {
            type: Boolean,
            default: true,
          },
          email: {
            type: Boolean,
            default: true,
          },
        },
        {
          _id: false,
        },
      ),
      default: {},
    },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
