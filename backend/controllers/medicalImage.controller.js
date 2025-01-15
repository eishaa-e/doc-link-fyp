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
    formData.append("image", fs.createReadStream(image.path));

    const flaskResponse = await axios.post(
      "http://localhost:5001/predict/kidney-stone",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    console.log("kidney stone result: ", flaskResponse.data);

    const { predictions, result_image } = flaskResponse.data;

    res.json({ predictions, resultImage: result_image });

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
    formData.append("image", fs.createReadStream(image.path));

    const flaskResponse = await axios.post(
      "http://localhost:5001/predict/brain-tumor",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    console.log("brain tumor result: ", flaskResponse.data);

    const { predictions, result_image } = flaskResponse.data;

    res.json({ predictions, resultImage: result_image });

    fs.unlinkSync(image.path);
  } catch (error) {
    console.error("Error making prediction", error);
    res.status(500).json({ error: "Failed to get prediction" });
  }
};
