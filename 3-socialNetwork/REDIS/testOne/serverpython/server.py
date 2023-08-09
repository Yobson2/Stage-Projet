from flask import Flask, request, jsonify
import redis
import json

app = Flask(__name__)
client = redis.StrictRedis(host='localhost', port=6379, db=0)  # Assurez-vous d'adapter les informations de connexion à Redis

@app.route('/')
def home():
    return 'test server'

@app.route('/addPhoto', methods=['POST'])
def add_photo():
    data = request.json

    data_string = json.dumps(data)
    count = 1
    key = f'user{count}'

    client.set(key, data_string)
    
    return 'Data set successfully in Redis.'

@app.route('/allData', methods=['GET'])
def get_all_data():
    tb = []

    data = client.get('user1')
    if data:
        mesdonnees = json.loads(data)
        tb.append(mesdonnees)
        return 'Données récupérées depuis Redis: ' + json.dumps(mesdonnees)
    else:
        return 'Aucune donnée trouvée dans Redis.'

if __name__ == '__main__':
    app.run(port=8081)
