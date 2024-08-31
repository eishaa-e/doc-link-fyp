const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/", authenticateToken, feedbackController.addFeedback);
router.get("/", feedbackController.getAllFeedback);

module.exports = router;
