const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Doctor, Lab, etc.

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },

  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});
export default mongoose.model("Role", roleSchema);
