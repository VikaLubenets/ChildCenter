import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['master-class', 'lesson', 'ecological'],
      required: true
    },
    startTime: String,
    endTime: String,
    date: String,
    everyWeek: Boolean,
    address: String,
    price: String,
    imagesSrc: [String]
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;