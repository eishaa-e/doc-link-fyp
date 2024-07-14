const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const {authenticateToken} = require('../middleware/auth.middleware');

// Doctor routes
router.get("/get-profile", authenticateToken, doctorController.getDoctorProfile);
router.get("/", authenticateToken, doctorController.getAllDoctors);
router.put("/update-profile", authenticateToken, doctorController.updateDoctorProfile);


module.exports = router;
