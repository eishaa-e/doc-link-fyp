const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeSlot = require("./timeSlot.model");

const DoctorSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String },
  dob: { type: Date },
  gender: { type: String },
  phone: { type: String },
  city: { type: String },
  specialization: { type: String },
  education: { type: String },
  experience: { type: String },
  availableTimeSlots: [TimeSlot],
  feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
});

module.exports = mongoose.model("Doctor", DoctorSchema);
