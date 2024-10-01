const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["doctor", "patient"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: {
        type: String, // Token for password reset
    },
    resetPasswordExpires: {
        type: Date, // Expiration date for the reset token
    },
});

module.exports = mongoose.model("User", userSchema);
