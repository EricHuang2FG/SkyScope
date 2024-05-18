from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/localhost:8080", methods=["POST"])
def receive_info():
    data = request.get_json()
    if not data:
        print("Nothing received for the data, exiting...")
        return jsonify({"error": "An oopsie occurred"}), 400

    print("wallahi this works :)")
    name = data["name"]
    city = data["city"]
    latitude = data["latitude"]
    longitude = data["longitude"]

  

app.run(debug=True)