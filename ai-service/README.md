# WatchID AI Service

This is the AI service for WatchID, providing face detection and age estimation capabilities using Python and OpenCV.

## Technology Stack

- **Language**: Python 3.8+
- **Framework**: Flask
- **Computer Vision**: OpenCV
- **Libraries**: NumPy, Pillow

## Project Structure

```
ai-service/
├── src/
│   ├── face_detection/
│   │   ├── __init__.py
│   │   └── detector.py
│   ├── age_estimation/
│   │   ├── __init__.py
│   │   └── estimator.py
│   └── api/
│       └── main.py
├── models/
│   └── (trained models will be stored here)
├── tests/
├── requirements.txt
└── README.md
```

## Features

### Face Detection

- Detect faces in images using OpenCV Haar Cascades
- Support for multiple detection methods (Haar, DNN)
- Face extraction with configurable padding

### Age Estimation

- Estimate age from facial features
- Age range categorization
- Support for custom pre-trained models

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager
- OpenCV compatible system

### Installation

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

### Running the Service

Development mode:

```bash
python src/api/main.py
```

Production mode with Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 src.api.main:app
```

The service will be available at `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "service": "WatchID AI Service",
  "version": "1.0.0"
}
```

### Detect Age

Detect faces and estimate age from an image.

```
POST /detect-age
Content-Type: application/json

{
  "image": "base64_encoded_image_data"
}
```

Response:
```json
{
  "faces": [
    {
      "bbox": [x, y, width, height],
      "age": 25
    }
  ],
  "count": 1
}
```

### Detect Faces

Detect faces without age estimation.

```
POST /detect-faces
Content-Type: application/json

{
  "image": "base64_encoded_image_data"
}
```

Response:
```json
{
  "faces": [
    {
      "bbox": [x, y, width, height]
    }
  ],
  "count": 1
}
```

## Usage Examples

### Python Example

```python
import requests
import base64

# Read image
with open('image.jpg', 'rb') as f:
    image_data = base64.b64encode(f.read()).decode('utf-8')

# Send request
response = requests.post(
    'http://localhost:5000/detect-age',
    json={'image': image_data}
)

# Process response
result = response.json()
print(f"Detected {result['count']} face(s)")
for face in result['faces']:
    print(f"Age: {face['age']}, BBox: {face['bbox']}")
```

### cURL Example

```bash
curl -X POST http://localhost:5000/detect-age \
  -H "Content-Type: application/json" \
  -d '{
    "image": "'"$(base64 -w 0 image.jpg)"'"
  }'
```

## Development

### Project Status

- ✅ Project structure setup
- ✅ Face detection with Haar Cascades
- ✅ Basic API endpoints
- 🚧 Age estimation (placeholder implementation)
- 📋 DNN-based face detection
- 📋 Custom age estimation model training
- 📋 Model optimization

### Adding a Pre-trained Model

1. Download the model files
2. Place them in the `models/` directory
3. Update the model loading code in `age_estimation/estimator.py`
4. Update the model path in the API initialization

### Testing

Run tests:

```bash
pytest tests/
```

With coverage:

```bash
pytest --cov=src tests/
```

## Model Information

### Face Detection Models

- **Haar Cascade**: Built-in OpenCV Haar Cascade for frontal face detection
- **DNN Model** (planned): Deep learning-based face detection

### Age Estimation Models

Age estimation models should be placed in the `models/` directory. Supported formats:

- Caffe models (.prototxt, .caffemodel)
- TensorFlow models
- PyTorch models (with conversion)

## Configuration

Environment variables:

- `FLASK_ENV`: Development or production
- `MODEL_PATH`: Path to age estimation model
- `PORT`: Service port (default: 5000)
- `HOST`: Service host (default: 0.0.0.0)

## Performance

- Face detection: ~50-100ms per image (depending on resolution)
- Age estimation: ~100-200ms per face
- Recommended image size: 640x480 to 1920x1080

## Troubleshooting

### OpenCV Installation Issues

If you encounter issues installing OpenCV:

```bash
pip install opencv-python-headless
```

### Import Errors

Make sure you're in the virtual environment:

```bash
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### Memory Issues

For large images or batch processing, consider:
- Resizing images before processing
- Processing images in batches
- Increasing system memory

## Future Enhancements

- [ ] Support for multiple face detection models
- [ ] Real-time video stream processing
- [ ] GPU acceleration support
- [ ] Custom model training pipeline
- [ ] Face recognition capabilities
- [ ] Emotion detection
- [ ] Gender classification

## License

MIT License
