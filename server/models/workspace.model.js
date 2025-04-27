import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    features: [{ type: String, trim: true }],
    popular: { type: Boolean, default: false },
    billingPeriod: { type: String, required: true, trim: true },
    images: [{ type: String, trim: true }]  // Array of image URLs
  },
  { timestamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
