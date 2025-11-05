# Place trained age estimation models here

## Model Requirements

- Caffe models (.prototxt and .caffemodel files)
- TensorFlow models (.pb or SavedModel format)
- PyTorch models (.pth or .pt files)

## Example Structure

```
models/
├── age_net.caffemodel
├── age_deploy.prototxt
├── gender_net.caffemodel
└── gender_deploy.prototxt
```

## Downloading Pre-trained Models

You can download pre-trained models from:
- OpenCV GitHub: https://github.com/opencv/opencv/tree/master/samples/dnn/face_detector
- Age Gender Detection: https://github.com/smahesh29/Gender-and-Age-Detection

## Model Files (Not Included)

Due to their large size, pre-trained models are not included in the repository.
Please download them separately and place them in this directory.

Note: Add model files to .gitignore to avoid committing large binary files.
