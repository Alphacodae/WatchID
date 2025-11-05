# Import Libraries
import cv2
import os
import numpy as np
import uuid
from typing import Dict, List, Optional

# The model architecture
AGE_MODEL = 'weights/deploy_age.prototxt'
# The model pre-trained weights
AGE_PROTO = 'weights/age_net.caffemodel'
# Mean substraction for preprocessing
MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
# Original 8 age classes (for internal probability calculation)
AGE_INTERVALS = ['(0, 2)', '(4, 6)', '(8, 12)', '(15, 20)',
                 '(25, 32)', '(38, 43)', '(48, 53)', '(60, 100)']
# Face detection models
FACE_PROTO = "weights/deploy.prototxt.txt"
FACE_MODEL = "weights/res10_300x300_ssd_iter_140000_fp16.caffemodel"
# Initialize frame size
max_frame_width = 2800

# load face Caffe model
face_net = cv2.dnn.readNetFromCaffe(FACE_PROTO, FACE_MODEL)
# Load age prediction model
age_net = cv2.dnn.readNetFromCaffe(AGE_MODEL, AGE_PROTO)


def get_faces(frame, confidence_threshold=0.5):
    """Returns the box coordinates of all detected faces"""
    # Get the actual dimensions of the frame being processed
    current_height, current_width = frame.shape[:2]
    
    # convert the frame into a blob to be ready for NN input
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104, 177.0, 123.0))
    # set the image as input to the NN
    face_net.setInput(blob)
    # perform inference and get predictions
    output = np.squeeze(face_net.forward())
    # initialize the result list
    faces = []
    # Loop over the faces detected
    for i in range(output.shape[0]):
        confidence = output[i, 2]
        if confidence > confidence_threshold:
            # Use the actual dimensions of the current frame for scaling the box coordinates
            box = output[i, 3:7] * np.array([current_width, current_height, current_width, current_height])
            # convert to integers
            start_x, start_y, end_x, end_y = box.astype(int)
            # widen the box
            start_x, start_y, end_x, end_y = start_x - \
                10, start_y - 10, end_x + 10, end_y + 10
            start_x = 0 if start_x < 0 else start_x
            start_y = 0 if start_y < 0 else start_y
            end_x = 0 if end_x < 0 else end_x
            end_y = 0 if end_y < 0 else end_y
            # append to our list
            faces.append((start_x, start_y, end_x, end_y))
    return faces


def display_img(title, img):
    """Displays an image on screen and maintains the output until the user presses a key"""
    # Create a resizable window
    cv2.namedWindow(title, cv2.WINDOW_NORMAL)
    # Display Image on screen
    cv2.imshow(title, img)
    # Resize window to fit screen better (adjust these values as needed)
    cv2.resizeWindow(title, 1200, 800)
    # Maintain output until user presses a key
    cv2.waitKey(0)
    # Destroy windows when user presses a key
    cv2.destroyAllWindows()


def image_resize(image, width=None, height=None, inter=cv2.INTER_AREA):
    """Resize an image without distortion"""
    dim = None
    (h, w) = image.shape[:2]
    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))
    return cv2.resize(image, dim, interpolation=inter)


def classify_age_group(age_preds):
    """
    Classify if person is under 18 or 18 and above based on age prediction probabilities
    
    Indices 0-3: (0,2), (4,6), (8,12), (15,20) -> Under 18
    Indices 4-7: (25,32), (38,43), (48,53), (60,100) -> 18 and Above
    """
    # Sum probabilities for under 18 (first 4 age groups)
    under_18_prob = np.sum(age_preds[0:4])
    
    # Sum probabilities for 18 and above (last 4 age groups)
    above_18_prob = np.sum(age_preds[4:8])
    
    if under_18_prob > above_18_prob:
        return "Under 18", under_18_prob
    else:
        return "18 and Above", above_18_prob


def predict_age_api(input_path: str, return_image: bool = False) -> Dict:
    """
    Predict if faces in the image are under 18 or 18 and above
    Returns a dictionary with results suitable for API responses
    
    Args:
        input_path: Path to the input image
        return_image: If True, saves and returns path to annotated image
        
    Returns:
        Dictionary containing:
        - success: bool
        - message: str
        - faces_detected: int
        - faces: list of face predictions
        - annotated_image_path: str (optional, if return_image=True)
    """
    # Check if file exists
    if not os.path.exists(input_path):
        return {
            "success": False,
            "message": f"File '{input_path}' not found",
            "faces_detected": 0,
            "faces": []
        }
    
    # Read Input Image
    img = cv2.imread(input_path)
    
    # Check if image was loaded successfully
    if img is None:
        return {
            "success": False,
            "message": f"Could not read image from '{input_path}'",
            "faces_detected": 0,
            "faces": []
        }
    
    # Take a copy of the initial image and resize it
    frame = img.copy()
    if frame.shape[1] > max_frame_width:
        frame = image_resize(frame, width=max_frame_width)
    
    faces = get_faces(frame)
    
    if len(faces) == 0:
        return {
            "success": True,
            "message": "No faces detected in the image",
            "faces_detected": 0,
            "faces": []
        }
    
    results = []
    
    for i, (start_x, start_y, end_x, end_y) in enumerate(faces):
        face_img = frame[start_y: end_y, start_x: end_x]
        
        # Preprocess image for the model
        blob = cv2.dnn.blobFromImage(
            image=face_img, scalefactor=1.0, size=(227, 227), 
            mean=MODEL_MEAN_VALUES, swapRB=False
        )
        
        # Predict Age
        age_net.setInput(blob)
        age_preds = age_net.forward()
        
        # Get detailed probabilities
        detailed_probs = {
            AGE_INTERVALS[j]: float(age_preds[0, j]) 
            for j in range(age_preds[0].shape[0])
        }
        
        # Classify as Under 18 or 18 and Above
        age_category, confidence = classify_age_group(age_preds[0])
        
        # Store face result
        face_result = {
            "face_id": i + 1,
            "age_category": age_category,
            "confidence": float(confidence),
            "bounding_box": {
                "x1": int(start_x),
                "y1": int(start_y),
                "x2": int(end_x),
                "y2": int(end_y)
            },
            "detailed_probabilities": detailed_probs
        }
        results.append(face_result)
        
        # Annotate image if requested
        if return_image:
            label = f"{age_category} ({confidence*100:.2f}%)"
            label_color = (0, 0, 255) if age_category == "Under 18" else (0, 255, 0)
            
            yPos = start_y - 15
            while yPos < 15:
                yPos += 15
            
            cv2.putText(frame, label, (start_x, yPos),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.54, label_color, thickness=2)
            cv2.rectangle(frame, (start_x, start_y), (end_x, end_y), 
                         color=label_color, thickness=2)
    
    response = {
        "success": True,
        "message": f"Successfully detected {len(faces)} face(s)",
        "faces_detected": len(faces),
        "faces": results
    }
    
    # Save annotated image if requested
    if return_image:
        output_path = f"annotated_{uuid.uuid4().hex}.jpg"
        cv2.imwrite(output_path, frame)
        response["annotated_image_path"] = output_path
    
    return response


def predict_age(input_path: str):
    """
    Predict if faces in the image are under 18 or 18 and above
    This function displays results visually (for local testing)
    """
    # Check if file exists
    if not os.path.exists(input_path):
        print(f"Error: File '{input_path}' not found!")
        print(f"Current working directory: {os.getcwd()}")
        print(f"Looking for file at: {os.path.abspath(input_path)}")
        return
    
    # Read Input Image
    img = cv2.imread(input_path)
    
    # Check if image was loaded successfully
    if img is None:
        print(f"Error: Could not read image from '{input_path}'")
        print("Possible reasons:")
        print("  - File is corrupted")
        print("  - File format is not supported")
        print("  - File path contains special characters")
        return
    
    # Take a copy of the initial image and resize it
    frame = img.copy()
    if frame.shape[1] > max_frame_width:
        frame = image_resize(frame, width=max_frame_width)
    faces = get_faces(frame)
    
    if len(faces) == 0:
        print("No faces detected in the image")
        return
    
    for i, (start_x, start_y, end_x, end_y) in enumerate(faces):
        face_img = frame[start_y: end_y, start_x: end_x]
        # Preprocess image for the model
        blob = cv2.dnn.blobFromImage(
            image=face_img, scalefactor=1.0, size=(227, 227), 
            mean=MODEL_MEAN_VALUES, swapRB=False
        )
        # Predict Age
        age_net.setInput(blob)
        age_preds = age_net.forward()
        
        # Print detailed probabilities for each original age group
        print("="*30, f"Face {i+1} Detailed Probabilities", "="*30)
        for j in range(age_preds[0].shape[0]):  
            print(f" {AGE_INTERVALS[j]}: {age_preds[0, j]*100:.2f}%")
        
        # Classify as Under 18 or 18 and Above
        age_category, confidence = classify_age_group(age_preds[0])
        
        print(f"\n{'='*30} Final Classification {'='*30}")
        print(f"Age Category: {age_category}")
        print(f"Confidence: {confidence*100:.2f}%")
        print("="*80 + "\n")
        
        # Draw the box and label
        label = f"{age_category} ({confidence*100:.2f}%)"
        
        # Determine label color based on age category
        label_color = (0, 0, 255) if age_category == "Under 18" else (0, 255, 0)
        
        # Get position for text
        yPos = start_y - 15
        while yPos < 15:
            yPos += 15
        
        # Write the text into the frame
        cv2.putText(frame, label, (start_x, yPos),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.54, label_color, thickness=2)
        # Draw rectangle around face
        cv2.rectangle(frame, (start_x, start_y), (end_x, end_y), 
                     color=label_color, thickness=2)
    
    # Display processed image
    display_img('Age Verification System', frame)


if __name__ == '__main__':
    # Example for local testing with visual display
    image_path = "baby.png"
    
    print("=== Local Testing Mode ===")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Looking for image: {image_path}")
    print(f"Absolute path: {os.path.abspath(image_path)}")
    print(f"File exists: {os.path.exists(image_path)}")
    print("-" * 80)
    
    # Use this for visual display (local testing)
    # predict_age(image_path)
    
    # Use this for API-style response (no display)
    result = predict_age_api(image_path, return_image=True)
    print("\n=== API Response ===")
    print(result)