const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.get(
  "/get-profile",
  authenticateToken,
  doctorController.getDoctorProfile,
);
router.get("/", authenticateToken, doctorController.getAllDoctors);
router.put(
  "/update-profile",
  authenticateToken,
  doctorController.updateDoctorProfile,
);
router.get(
  "/get-profile/:id",
  authenticateToken,
  doctorController.getDoctorProfileById,
);
router.post(
  "/doctors/:doctorId/feedback",
  authenticateToken,
  doctorController.addFeedback,
);

module.exports = router;
