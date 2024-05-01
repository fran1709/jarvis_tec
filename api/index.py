from flask import Flask, request, jsonify
from controllers.housePriceController import predict_housePrice
from controllers.wineQualityController import predict_wineQuality
from controllers.avocadoPriceController import predict_avocadoPrice
from controllers.areFatController import predict_obesity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/areFat', methods=['POST'])
def areFat():
    data = request.json
    prediction = predict_obesity(data)
    return jsonify({"prediction": prediction})

@app.route('/avocado', methods=['POST'])
def avocadoPrice():
    data = request.json
    prediction = predict_avocadoPrice(data)
    return jsonify({"prediction": prediction})

@app.route('/wine', methods=['POST'])
def wineQuality():
    data = request.json
    prediction = predict_wineQuality(data)
    return jsonify({"prediction": prediction})

@app.route('/house', methods=['POST'])
def housePrice():
    data = request.json
    prediction = predict_housePrice(data)
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
