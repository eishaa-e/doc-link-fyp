const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient_id: { type: Schema.Types.ObjectId, ref: "User" },
  doctor_id: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
  time_slot: String,
  status: {
    type: String,
    required: true,
    enum: ["cancelled", "completed", "pending"],
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
