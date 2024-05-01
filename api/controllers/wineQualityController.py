import pandas as pd
import pickle

def load_model():
    with open("api/modelos/wineQuality.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_wineQuality(data):
    loaded_model = load_model()
    new_df = pd.DataFrame([data])
    prediction = loaded_model.predict(new_df)
    print(prediction)
    return "La calidad del vino es buena según las especificaciones de preparación proporcionadas." if prediction[0]==1 else "La calidad del vino es mala según las especificaciones de preparación proporcionadas."
    