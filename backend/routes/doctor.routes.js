const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const {authenticateToken} = require("../middleware/auth.middleware");
const patientController = require("../controllers/patient.controller");

router.get(
    "/",
    authenticateToken,
    doctorController.getAllDoctors);
router.get(
    "/get-profile",
    authenticateToken,
    doctorController.getDoctorProfile,
);
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
router.put(
    "/update-profile-image",
    authenticateToken,
    doctorController.uploadProfileImage,
);

module.exports = router;
