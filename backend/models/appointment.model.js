const mongoose = require("mongoose");
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    patient_id: {type: Schema.Types.ObjectId, ref: "User"},
    doctor_id: {type: Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, required: true},
    time_slot: {
        startTime: {type: String, required: true},
        endTime: {type: String, required: true}
    },
    status: {
        type: String,
        required: true,
        enum: ["REQUESTED", "BOOKED", "REJECTED", "CANCELLED", "COMPLETED"],
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
