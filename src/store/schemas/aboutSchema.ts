import mongoose, { Schema } from "mongoose";

const aboutSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['studio', 'rent'],
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const About = mongoose.models.About || mongoose.model("About", aboutSchema);

export default About;