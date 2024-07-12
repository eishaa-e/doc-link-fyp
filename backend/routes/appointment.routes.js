const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

router.post("/book", appointmentController.bookAppointment);
router.get("/:userId", appointmentController.getAppointments);

module.exports = router;
