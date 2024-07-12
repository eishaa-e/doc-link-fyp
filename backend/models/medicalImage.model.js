const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalImageSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  image_path: String,
  prediction_result: String,
  timestamp: Date,
});

module.exports = mongoose.model("MedicalImage", medicalImageSchema);
