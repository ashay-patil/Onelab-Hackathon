import os
import sys
import numpy as np

# Suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Force UTF-8 encoding
sys.stdout.reconfigure(encoding='utf-8')

# Suppress progress bars from TensorFlow
import logging
tf.get_logger().setLevel(logging.ERROR)

model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../model/deepfake_detector.h5"))

if not os.path.exists(model_path):
    print("Error: Model file not found", flush=True)
    sys.exit(1)

try:
    model = load_model(model_path, compile=False)
except Exception as e:
    print(f"Error loading model: {e}", flush=True)
    sys.exit(1)

def predict_image(img_path):
    """Function to predict if an image is real or fake"""
    if not os.path.exists(img_path):
        return "Error: Image file not found"

    try:
        img = image.load_img(img_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        prediction = model.predict(img_array, verbose=0) 
        return "Real" if prediction[0][0] < 0.5 else "Fake"
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No image path provided", flush=True)
        sys.exit(1)

    image_path = sys.argv[1]
    result = predict_image(image_path)

    sys.stdout.write(result + "\n")
    sys.stdout.flush()
