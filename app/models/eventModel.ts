import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for event"],
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, "Please provide a start"],
  },
  end: {
    type: Date,
    required: [true, "Please provide a end"],
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  invitees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = mongoose.models.events || mongoose.model("events", eventSchema);

export default Event;
