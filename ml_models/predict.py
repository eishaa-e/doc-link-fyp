# from flask import Flask, request, jsonify, send_file
# import cv2
# import numpy as np
# import onnxruntime as ort
# from PIL import Image, ImageDraw
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# from PIL import Image
# import io
# import base64


# app = Flask(__name__)

# # Load your pre-trained models
# # kidney_stone_model = load_model('./kidney_stone_detection/kidney_stone_detection_model.h5')

# # Load your ONNX model
# kidney_stone_model_path = 'kidney_stone_model.onnx'
# kidney_stone_session = ort.InferenceSession(kidney_stone_model_path)

# brain_tumor_model = load_model('./brain_tumor_detection/brain_tumor_detection_model.h5')

# def preprocess_image(image, input_shape):
    
#     image = image.convert("RGB")
#     image = image.resize(input_shape)
#     image = np.array(image) / 255.0
#     image = np.expand_dims(image, axis=0)
#     return image

# def preprocess_image_for_onnx(image, input_shape):
#     image = image.convert("RGB")
#     image = image.resize(input_shape)
#     image = np.array(image, dtype=np.float32) / 255.0
#     image = np.transpose(image, (2, 0, 1))  # Change data layout to CHW
#     image = np.expand_dims(image, axis=0)  # Add batch dimension
#     return image

# def preprocess_predictions(predictions):
#     """Flatten and filter predictions."""
#     flat_predictions = []
#     for batch in predictions:
#         for pred in batch:
#             if len(pred) >= 5:  # Ensure valid length
#                 flat_predictions.append(pred[:6])  # Trim to first 6 elements if extra data exists
#     return flat_predictions


# def draw_bounding_boxes(image, predictions, class_names, threshold=0.5):
#     """Draw bounding boxes and labels on the image."""
#     for pred in predictions:
#         print("pred: ", pred)
#         x1, y1, x2, y2, conf, cls = pred
#         label = "Kidney_Stone"
#         cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#         cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#     return image


# @app.route('/predict/kidney-stone', methods=['POST'])
# def predict_kidney_stone():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     img = Image.open(io.BytesIO(file.read()))
#     input_shape = (640, 640)  # Update as per the model's requirement
    
#     # Preprocess the image
#     processed_image = preprocess_image_for_onnx(img, input_shape)
#     input_name = kidney_stone_session.get_inputs()[0].name
#     output_name = kidney_stone_session.get_outputs()[0].name
    
#     # Run inference
#     predictions = kidney_stone_session.run([output_name], {input_name: processed_image})[0]
#     print("\npredictions: ", predictions)

#     # Process and draw bounding boxes
#     original_image = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
#     class_names = ["Normal", "Stone"]  # Update with your actual class names
#     predictions_flat = preprocess_predictions(predictions)
#     image_with_boxes = draw_bounding_boxes(original_image, predictions_flat, class_names)

#     print("\nimage_with_boxes: ", image_with_boxes)
#     print("\n")

#     # Check if any stone is detected (based on confidence threshold)
#     predictions_flat = predictions.reshape(-1, 6)  # Adjust if the number of elements differs
#     stone_detected = any(pred[4] > 0.3 and int(pred[5]) == 1 for pred in predictions_flat)
#     print("\nStone Detected: ", stone_detected)


#     _, buffer = cv2.imencode('.jpg', image_with_boxes)
#     img_base64 = base64.b64encode(buffer).decode('utf-8')

#     return jsonify({
#         "has_stone": stone_detected,
#         "image": img_base64
#     })



# @app.route('/predict/brain-tumor', methods=['POST'])
# def predict_brain_tumor():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     img = Image.open(io.BytesIO(file.read()))  # Read and open the image
#     processed_image = preprocess_image(img, (200, 200))  # Preprocess for brain tumor model

#     # Make prediction
#     prediction = brain_tumor_model.predict(processed_image)
    
#     # The output for binary classification would be a single probability value between 0 and 1
#     predicted_class = (prediction[0] > 0.5).astype("int32")  # Classify based on probability

#     if predicted_class == 1:
#         result = "Tumor Detected"
#     else:
#         result = "No Tumor Detected"

#     return jsonify({"Brain": result})


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001)


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

# Initialize Flask App
app = Flask(__name__)

# Load YOLOv8 Model
model = YOLO("kidney_stone_model.pt")

brain_tumor_model = load_model('./brain_tumor_detection/brain_tumor_detection_model.h5')


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
    
    # The output for binary classification would be a single probability value between 0 and 1
    predicted_class = (prediction[0] > 0.5).astype("int32")  # Classify based on probability

    if predicted_class == 1:
        result = "Tumor Detected"
    else:
        result = "No Tumor Detected"

    return jsonify({"Brain": result})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
