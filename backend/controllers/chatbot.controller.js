const ChatbotInteraction = require("../models/chatbotInteraction.model");

exports.interact = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    console.log("Message: ", message);
    const response = "";
    const newInteraction = new ChatbotInteraction({
      user_id,
      message,
      response,
      timestamp: new Date()
    });
    await newInteraction.save();
    res.json(newInteraction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
