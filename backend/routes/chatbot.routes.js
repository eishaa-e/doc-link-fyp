const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot.controller");

router.post("/interact", chatbotController.interact);

module.exports = router;
