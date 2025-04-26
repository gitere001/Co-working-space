import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String }, // optional
  },
  { timestamps: true }
);

const Amenity = mongoose.model("Amenity", amenitySchema);

export default Amenity;
