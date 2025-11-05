"""
Face Detection Module

This module provides face detection functionality using OpenCV.
"""

import cv2
import numpy as np
from typing import List, Tuple, Optional


class FaceDetector:
    """
    Face detector using OpenCV's Haar Cascade or DNN models.
    """

    def __init__(self, method: str = 'haar'):
        """
        Initialize the face detector.

        Args:
            method: Detection method ('haar' or 'dnn')
        """
        self.method = method
        self.face_cascade = None
        self.net = None

        if method == 'haar':
            # Load Haar Cascade classifier
            self.face_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            )
        elif method == 'dnn':
            # Load DNN model (to be implemented)
            pass

    def detect_faces(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """
        Detect faces in an image.

        Args:
            image: Input image as numpy array

        Returns:
            List of face bounding boxes as (x, y, width, height)
        """
        if self.method == 'haar':
            return self._detect_faces_haar(image)
        elif self.method == 'dnn':
            return self._detect_faces_dnn(image)
        return []

    def _detect_faces_haar(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """
        Detect faces using Haar Cascade.

        Args:
            image: Input image

        Returns:
            List of face bounding boxes
        """
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )
        return [tuple(face) for face in faces]

    def _detect_faces_dnn(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """
        Detect faces using DNN model.

        Args:
            image: Input image

        Returns:
            List of face bounding boxes
        """
        # To be implemented
        return []

    def extract_face(
        self,
        image: np.ndarray,
        bbox: Tuple[int, int, int, int],
        padding: int = 10
    ) -> Optional[np.ndarray]:
        """
        Extract a face region from an image.

        Args:
            image: Input image
            bbox: Bounding box (x, y, width, height)
            padding: Padding around the face

        Returns:
            Extracted face image or None
        """
        x, y, w, h = bbox
        x = max(0, x - padding)
        y = max(0, y - padding)
        w = w + 2 * padding
        h = h + 2 * padding

        face = image[y:y+h, x:x+w]
        return face if face.size > 0 else None
