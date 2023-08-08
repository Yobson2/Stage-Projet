from flask import Flask, request, jsonify
import redis
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/allData": {"origins": "http://localhost:5173", "methods": ["GET"]}})

port = 8082
redis_host = 'localhost'
redis_port = 6379
client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)

@app.route('/')
def home():
    return 'Bienvenue sur mon serveur'

@app.route('/addPhoto', methods=['POST'])
def add_photo():
    try:
        data = request.json
        count = client.incr('count')  
        key = f'infos{count}'
        client.set(key, data)
        return jsonify({'message': 'Données ajoutées avec succès dans Redis'}), 200
    except Exception as e:
        return jsonify({'error': 'Erreur lors de l\'ajout de la photo'}), 500

# @app.route('/allData', methods=['GET'])
# def get_all_data():
#     try:
#         all_keys = client.keys('infos*')
#         all_data = {}
#         for key in all_keys:
#             value = client.get(key)
#             all_data[key] = value
#             print(f"Clé: {key}, Valeur: {value}")  # Ajoutez cette ligne pour le débogage
#         response = jsonify(all_data)
#         response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
#         return response, 200
#     except Exception as e:
#         print(f"Erreur: {e}")  # Ajoutez cette ligne pour le débogage
#         return jsonify({'error': 'Erreur lors de la récupération des données'}), 500


if __name__ == '__main__':
    app.run(port=port)
