const MedicalImage = require("../models/medicalImage.model");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

exports.predictKidneyStone = async (req, res) => {
  console.log("image: ", req.body);

  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(image.path)); // Use the path of the file uploaded to the server

    // Send the image to the Flask API for prediction
    const flaskResponse = await axios.post(
      "http://localhost:5001/predict/kidney-stone",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    // Send the prediction result back to the frontend or Postman
    res.json(flaskResponse.data);

    // Remove the file from the server after processing
    fs.unlinkSync(image.path);
  } catch (error) {
    console.error("Error making prediction", error);
    res.status(500).json({ error: "Failed to get prediction" });
  }
};

exports.predictBrainTumor = async (req, res) => {
  console.log("image: ", req.body);

  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(image.path)); // Use the path of the file uploaded to the server

    // Send the image to the Flask API for prediction
    const flaskResponse = await axios.post(
      "http://localhost:5001/predict/brain-tumor",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    // Send the prediction result back to the frontend or Postman
    res.json(flaskResponse.data);

    // Remove the file from the server after processing
    fs.unlinkSync(image.path);
  } catch (error) {
    console.error("Error making prediction", error);
    res.status(500).json({ error: "Failed to get prediction" });
  }
};
