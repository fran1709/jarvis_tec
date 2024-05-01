import pandas as pd
import pickle

def load_model():
    with open("api/modelos/avocadoPrice.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_avocadoPrice(data):
    loaded_model = load_model()
    new_df = pd.DataFrame(data)
    prediction = loaded_model.predict(new_df)
    print(prediction)
    return "El precio actual del aguacate es alto según el mercado." if prediction[0]==1 else "El precio actual del aguacate es bajo según el mercado."
    