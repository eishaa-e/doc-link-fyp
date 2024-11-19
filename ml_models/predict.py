from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)

# Load your pre-trained models
kidney_stone_model = load_model('./kidney_stone_detection/kidney_stone_detection_model.h5')
brain_tumor_model = load_model('./brain_tumor_detection/brain_tumor_detection_model.h5')

def preprocess_image(image, target_size):
    
    image = image.convert("RGB")
    image = image.resize(target_size)
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image


@app.route('/predict/kidney-stone', methods=['POST'])
def predict_kidney_stone():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))  # Read and open the image
    processed_image = preprocess_image(img, (150, 150))  # Preprocess for kidney stone model

    prediction = kidney_stone_model.predict(processed_image)  # Make prediction
    predicted_class = np.argmax(prediction, axis=-1)

    if predicted_class[0] == 1:
        result = "Stone"
    else:
        result = "Normal"

    return jsonify({"prediction": result})

@app.route('/predict/brain-tumor', methods=['POST'])
def predict_brain_tumor():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))  # Read and open the image
    processed_image = preprocess_image(img, (200, 200))  # Preprocess for brain tumor model

    # Make prediction
    prediction = brain_tumor_model.predict(processed_image)
    
    # The output for binary classification would be a single probability value between 0 and 1
    predicted_class = (prediction[0] > 0.5).astype("int32")  # Classify based on probability

    if predicted_class == 1:
        result = "Tumor Detected"
    else:
        result = "No Tumor Detected"

    return jsonify({"Brain": result})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
