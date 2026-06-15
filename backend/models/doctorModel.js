import mongoose from "mongoose";

const drSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Professional Details
    specialization: {
      type: String,
    },

    experience: {
      type: String,
      default: 0,
    },

    qualifications: {
      type: String,
    },

    licenseNo: {
      type: String,
      unique: true,
    },
    workplaces: [
      {
        name: String,
        location: String,
        type: {
          type: String,
          enum: ["clinic", "hospital"],
          default: "clinic",
        },

        settings: {
          appointmentDuration: {
            value: { type: Number },
            unit: { type: String, default: "minutes" },
          },

          appointmentFee: { type: Number },

          maxPatientsPerDay: {
            type: Number,
          },

          breakMinutes: {
            type: Number,
          },

          bookingWindow: {
            type: Number,
          },

          consultationType: {
            type: String,
            enum: ["online", "physical", "online + physical"],
            default: "online",
          },
        },

        availability: {
          type: Object,
          default: {},
        },

        slots: {
          type: mongoose.Schema.Types.Mixed,
          default: {},
        },
      },
    ],
    education: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        school: String,
        degree: String,
        field: String,
        startYear: String,
        endYear: String,
        description: String,
      },
    ],

    experienceDetails: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        hospital: String,
        role: String,
        employmentType: String,
        location: String,
        startYear: String,
        endYear: String,
        currentlyWorking: Boolean,
        description: String,
      },
    ],

    fee: {
      type: Number,
    },

    consultationTime: {
      type: String,
    },

    drRoomNo: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active",
    },

    note: {
      type: String,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true },
);

const Doctor = mongoose.model("Doctor", drSchema);
export default Doctor;
