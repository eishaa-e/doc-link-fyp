const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatbotInteractionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  response: String,
  timestamp: Date,
});

module.exports = mongoose.model("ChatbotInteraction", chatbotInteractionSchema);
