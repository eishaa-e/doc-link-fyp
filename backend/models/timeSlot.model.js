const mongoose = require("mongoose");
const {Schema} = mongoose;

const TimeSlotSchema = new Schema({
    dayOfWeek: {
        type: String,
        required: true,
        enum: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
    },
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
}, {_id: false});

module.exports = TimeSlotSchema;
