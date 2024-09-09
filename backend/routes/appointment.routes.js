const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/book", authenticateToken, appointmentController.bookAppointment);
router.get(
  "/:appointmentId",
  authenticateToken,
  appointmentController.getAppointment,
);
router.get(
  "/patients/:patientId",
  authenticateToken,
  appointmentController.getAppointmentsByPatient,
);
router.get(
  "/doctors/:doctorId",
  authenticateToken,
  appointmentController.getAppointmentsByDoctor,
);
router.patch(
  "/status/:appointmentId",
  authenticateToken,
  appointmentController.updateAppointmentStatus,
);

module.exports = router;
