const express = require("express");
const router = express.Router();
const multer = require("multer");
const medicalImageController = require("../controllers/medicalImage.controller");

const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  upload.single("image"),
  medicalImageController.uploadImage,
);

module.exports = router;
