import pandas as pd
import pickle

def load_model():
    with open("api/modelos/carPrices.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_car(data):
    loaded_model = load_model()
    new_df = pd.DataFrame(data)
    prediction = loaded_model.predict(new_df)
    print(prediction)
    predicted_price = prediction[0][0]
    return f"Según sus parámetros, el precio del vehículo es de {predicted_price:.2f}"