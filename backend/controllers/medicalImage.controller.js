const MedicalImage = require("../models/medicalImage.model");
// Placeholder function for interaction with ML model
const imagePredictionService = require("../services/imagePredictionService");

exports.uploadImage = async (req, res) => {
  try {
    const { user_id } = req.body;
    const imagePath = req.file.path;
    const predictionResult = await imagePredictionService.predict(imagePath);
    const newMedicalImage = new MedicalImage({
      user_id,
      image_path: imagePath,
      prediction_result: predictionResult,
      timestamp: new Date(),
    });
    await newMedicalImage.save();
    res.json(newMedicalImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
