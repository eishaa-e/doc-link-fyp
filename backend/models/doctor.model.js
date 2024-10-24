const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeSlot = require("./timeSlot.model");

const doctorFeedback = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const DoctorSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String },
  dob: { type: Date },
  gender: { type: String },
  profileImage: { type: String },
  phone: { type: String },
  city: { type: String },
  specialization: { type: String },
  education: { type: String },
  experience: { type: String },
  availableTimeSlots: [TimeSlot],
  feedbacks: [doctorFeedback],
  pmdcCertificate: { type: String },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
