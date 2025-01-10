from flask import Flask, request, jsonify, send_file, send_from_directory
from ultralytics import YOLO
import cv2
import numpy as np
import os
import io
import base64
from PIL import Image, ImageDraw
import tensorflow as tf
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load YOLOv8 Model
model = YOLO("kidney_stone_model.pt")

brain_tumor_model = load_model('./brain_tumor_detection/using_CNN/brain_tumor_detection_model.h5')


def preprocess_image(image, input_shape):
    image = image.convert("RGB")
    image = image.resize(input_shape)
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image


@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


@app.route('/predict/kidney-stone', methods=['POST'])
def predict_kidney_stone():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Save uploaded image
    image_file = request.files['image']
    image_path = "uploaded_image.jpg"
    image_file.save(image_path)

    # Perform prediction
    results = model.predict(source=image_path, conf=0.25)

    # Extract predictions
    predictions = results[0].boxes.data.cpu().numpy()  # Bounding boxes, confidence, class
    image = cv2.imread(image_path)
    height, width = image.shape[:2]
    response = {"predictions": []}

    for box in predictions:
        x1, y1, x2, y2, conf, cls = box
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
        label = "Stone" if int(cls) == 0 else "No Stone"

        # Draw bounding box on the image
        color = (0, 255, 0) if label == "Stone" else (0, 0, 255)
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)
        cv2.putText(image, f"{label} {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        # Append to response
        response['predictions'].append({
            "label": label,
            "confidence": float(conf),
            "box": [x1, y1, x2, y2]
        })

    # Convert OpenCV image (numpy array) to PIL Image
    processed_img = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    # Convert the processed image to a base64 string
    img_buffer = io.BytesIO()
    processed_img.save(img_buffer, format="JPEG")
    img_buffer.seek(0)
    img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')

    # Add image to response
    response['result_image'] = img_base64

    # Return JSON response
    return jsonify(response)


@app.route('/predict/brain-tumor', methods=['POST'])
def predict_brain_tumor():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))  # Read and open the image
    processed_image = preprocess_image(img, (200, 200))  # Preprocess for brain tumor model

    # Make prediction
    prediction = brain_tumor_model.predict(processed_image)
    
    predicted_class = (prediction[0] > 0.5).astype("int32")  # Classify based on probability

    if predicted_class == 1:
        result = "Tumor Detected"
    else:
        result = "No Tumor Detected"

    return jsonify({"Brain": result})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
