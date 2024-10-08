const express = require("express");
const router = express.Router();
const multer = require("multer");
const medicalImageController = require("../controllers/medicalImage.controller");
const {authenticateToken} = require("../middleware/auth.middleware");

const upload = multer({dest: 'uploads/'});  // 'uploads/' is the folder where uploaded files will be temporarily stored

router.post(
    "/predict/kidney-stone",
    authenticateToken,
    upload.single('image'),
    medicalImageController.predictKidneyStone,
);

module.exports = router;
