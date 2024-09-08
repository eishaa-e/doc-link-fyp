const mongoose = require("mongoose");
const {Schema} = mongoose;

const TimeSlotSchema = new Schema({
    dayOfWeek: {
        type: String,
        required: true,
        enum: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
    },
    startTime: {type: String, required: true}, // Format: "HH:mm"
    endTime: {type: String, required: true},   // Format: "HH:mm"
    isBooked: {type: Boolean, default: false}, // Available slot for that day/time
}, {_id: false});

module.exports = TimeSlotSchema;
