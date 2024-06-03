import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
  {
    title: String,
    price: String,
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);

export default Certificate;