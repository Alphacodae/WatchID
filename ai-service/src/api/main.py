"""
WatchID AI Service API

Flask API for face detection and age estimation.
"""

from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from face_detection import FaceDetector
from age_estimation import AgeEstimator

app = Flask(__name__)

# Initialize detectors
face_detector = FaceDetector(method='haar')
age_estimator = AgeEstimator()


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    """
    return jsonify({
        'status': 'healthy',
        'service': 'WatchID AI Service',
        'version': '1.0.0'
    })


@app.route('/detect-age', methods=['POST'])
def detect_age():
    """
    Detect faces and estimate age from an image.

    Expected request body:
    {
        "image": "base64_encoded_image"
    }

    Returns:
    {
        "faces": [
            {
                "bbox": [x, y, width, height],
                "age": estimated_age
            }
        ]
    }
    """
    try:
        # Get image from request
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        # Decode base64 image
        image_data = base64.b64decode(data['image'])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({'error': 'Invalid image format'}), 400

        # Detect faces
        faces = face_detector.detect_faces(image)

        # Estimate age for each face
        results = []
        for bbox in faces:
            face_img = face_detector.extract_face(image, bbox)
            if face_img is not None:
                age = age_estimator.estimate_age(face_img)
                results.append({
                    'bbox': list(bbox),
                    'age': age
                })

        return jsonify({
            'faces': results,
            'count': len(results)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/detect-faces', methods=['POST'])
def detect_faces():
    """
    Detect faces in an image without age estimation.

    Expected request body:
    {
        "image": "base64_encoded_image"
    }

    Returns:
    {
        "faces": [
            {
                "bbox": [x, y, width, height]
            }
        ]
    }
    """
    try:
        # Get image from request
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        # Decode base64 image
        image_data = base64.b64decode(data['image'])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({'error': 'Invalid image format'}), 400

        # Detect faces
        faces = face_detector.detect_faces(image)

        # Format results
        results = [{'bbox': list(bbox)} for bbox in faces]

        return jsonify({
            'faces': results,
            'count': len(results)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
