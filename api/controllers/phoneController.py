import pandas as pd
import pickle

def load_model():
    with open("api/modelos/phonePrediction.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_phone(data):
    loaded_model = load_model()
    new_df = pd.DataFrame(data)
    prediction = loaded_model.predict(new_df)
    print(prediction)
    return "Según sus parámetros, el cliente no cambiará de empresa." if prediction[0] == 0 else "Según sus parámetros, el cliente sí cambiará de empresa."
