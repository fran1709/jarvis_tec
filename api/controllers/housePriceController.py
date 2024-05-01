import pandas as pd
import pickle

def load_model():
    with open("api/modelos/housePrice.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    return loaded_model

def predict_housePrice(data):
    loaded_model = load_model()
    # Extract the tax amount and structure tax value
    taxamount = data['taxamount']
    structuretaxvaluedollarcnt = data['structuretaxvaluedollarcnt']
    # Make a prediction
    prediction = loaded_model.predict([[1, taxamount, structuretaxvaluedollarcnt]])
    print(prediction)
    return 'Según el monto de impuesto y valor de impuesto sobre la estructura en dólares proporcionados. El precio de la casa ronda los ' + str(round(prediction[0], 2)) + ' $.'
    