import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    location: { type: String, required: true, trim: true },
    images: [{ type: String }],
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
