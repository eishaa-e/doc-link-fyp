from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)

# Load your pre-trained model
model = load_model('kidney_stone_detection_model.h5')

def preprocess_image(image):
    # Preprocess the image to the required input shape for your model
    image = image.resize((150, 150))
    image = np.array(image) / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))  # Read and open the image
    processed_image = preprocess_image(img)  # Preprocess the image

    prediction = model.predict(processed_image)  # Make prediction
    predicted_class = np.argmax(prediction, axis=-1)

    if predicted_class[0] == 1:
        result = "Stone"
    else:
        result = "Normal"

    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
