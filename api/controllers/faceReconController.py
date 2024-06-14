from flask import Flask, request, jsonify
from flask_cors import CORS
import keras
import pandas as pd
import numpy as np
from PIL import Image
import io
import pickle

app = Flask(__name__)
CORS(app)   

def load_model():
    # with open("api/modelos/faceRecon.pkl", "rb") as f:
    #     loaded_model = pickle.load(f)
    model =  keras.models.load_model("api/modelos/faceRecon.h5")

    return model

def predict_Face(data):
    loaded_model = load_model()
    image = image.resize((128, 128))  # Redimensionar la imagen al tamaño esperado por el modelo
    image = np.array(image).astype('float32') / 255  # Normalizar la imagen
    image = np.expand_dims(image, axis=0)  # Añadir una dimensión para batch
    prediction = loaded_model.predict(image)
    predicted_person = prediction[0][0]
    return f"La persona identificada es {predicted_person}"

#def reconFace()
def recognize_face():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'})
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})
        image = Image.open(io.BytesIO(file.read()))
        result = predict_Face(image)
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)})
