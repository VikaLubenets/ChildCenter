import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;