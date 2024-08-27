const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Patient routes
router.get(
  "/get-profile",
  authenticateToken,
  patientController.getPatientProfile,
);
router.get("/", authenticateToken, patientController.getAllPatients);
router.put(
  "/update-profile",
  authenticateToken,
  patientController.updatePatientProfile,
);
router.get(
  "/get-profile/:id",
  authenticateToken,
  patientController.getPatientProfileById,
);

module.exports = router;
