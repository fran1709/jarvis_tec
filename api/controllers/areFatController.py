import pandas as pd
import pickle

def load_model():
    with open("api/modelos/areFat.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_obesity(data):
    loaded_model = load_model()
    new_df = pd.DataFrame(data)
    prediction = loaded_model.predict(new_df)
    print(prediction)
    return "Según tus parámetros corporales, no tienes sobrepeso" if prediction[0] == 0 else "Según tus parámetros corporales, tienes sobrepeso"
