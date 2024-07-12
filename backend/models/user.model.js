const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["doctor", "patient"],
  },
  profile: {
    age: Number,
    gender: String,
    specialization: String, // for doctors
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
