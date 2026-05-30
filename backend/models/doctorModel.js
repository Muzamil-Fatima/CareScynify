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
        name: {
          type: String,
          required: true,
          trim: true,
        },

        location: {
          type: String,
          required: true,
          trim: true,
        },

        type: {
          type: String,
          enum: ["clinic", "hospital"],
          default: "clinic",
        },
        settings: {
          appointmentDuration: {
            value: { type: Number, default: 30 },
            unit: { type: String, default: "minutes" },
          },

          appointmentFee: {
            type: Number,
            default: 0,
          },

          followUpFee: {
            type: Number,
            default: 0,
          },

          maxPatientsPerDay: {
            type: Number,
            default: 20,
          },

          breakTime: {
            type: Number,
            default: 10,
          },

          bookingWindow: {
            type: Number,
            default: 7,
          },

          consultationType: {
            type: String,
            enum: ["online", "clinic", "home visit",],
            default: "online",
          },
        },

        availability: {
          type: Map,
          of: {
            start: { type: String, default: "" },
            end: { type: String, default: "" },
          },
          default: {},
        },
      },
    ],
    education: [
      {
        degree: String,
        institute: String,
        passingYear: String,
        description: String,
      },
    ],
    fee: {
      type: Number,
    },

    // Appointment Details
    availableDays: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],

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
