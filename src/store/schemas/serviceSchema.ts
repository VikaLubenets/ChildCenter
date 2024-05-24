import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    title: String,
    description: String,
    srcImage: String,
    link: String,
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;