
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware"); // Import the middleware

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password/:token", authController.resetPassword); 
router.post("/update-password", authenticateToken, authController.updatePassword);



module.exports = router;
