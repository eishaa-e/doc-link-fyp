const ChatbotInteraction = require("../models/chatbotInteraction.model");
// Placeholder function for interaction with ML model
const chatbotService = require("../services/chatbotService");

exports.interact = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    const response = await chatbotService.getResponse(message);
    const newInteraction = new ChatbotInteraction({
      user_id,
      message,
      response,
      timestamp: new Date(),
    });
    await newInteraction.save();
    res.json(newInteraction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
