// view_patient
// create_patient
// edit_patient
// delete_patient

// view_appointment
// create_appointment

import mongoose from "mongoose";
const roleSchema = new mongoose.Schema(
  {
    // role like Doctor,Receptionist,Admin
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //   is it role of any hospital or clinic
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    // permission list
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true },
);
export default mongoose.model("Role", roleSchema);
