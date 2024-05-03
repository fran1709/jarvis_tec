import pandas as pd
import pickle

def load_model():
    with open("api/modelos/strokePrediction.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_stroke(data):
    loaded_model = load_model()
    new_df = pd.DataFrame(data)
    prediction = loaded_model.predict(new_df)
    print(prediction)
    return "Según sus parametros, sí tiene riesgo de un ataque cerebro-vascular" if prediction[0] == 0 else "Según sus parametros, no tiene riesgo de un ataque cerebro-vascular"
