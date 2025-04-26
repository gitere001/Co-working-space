import mongoose from "mongoose";

const deskRoomSchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["desk", "meeting-room", "private-office"], required: true },
    capacity: { type: Number },
    pricePerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

const DeskRoom = mongoose.model("DeskRoom", deskRoomSchema);

export default DeskRoom;
