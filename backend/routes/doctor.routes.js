const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const {authenticateToken} = require("../middleware/auth.middleware");

router.get(
    "/",
    
    doctorController.getAllDoctors);
router.get(
    "/get-profile",
   
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
    "/:doctorId/feedback",
    authenticateToken,
    doctorController.addFeedback,
);
router.put(
    "/update-profile-image",
    authenticateToken,
    doctorController.uploadProfileImage,
);
router.put(
    "/update-availability",
    authenticateToken,
    doctorController.updateDoctorAvailability
);
router.get(
    "/:doctorId/booked-slots", authenticateToken, doctorController.getBookedSlots);

module.exports = router;
