from flask import Flask, request, jsonify
from flask_cors import CORS
from serial_communicate import send_angle_to_mc
import get_target_position as util

app = Flask(__name__)
CORS(app)

@app.route("/skyscope", methods=["POST"])
def receive_info():
    data = request.get_json()
    if not data:
        print("Nothing received for the data, exiting...")
        return jsonify({"error": "An oopsie occurred, no gyatt for you"}), 400

    print("wallahi this works :)")
    target = data["target"]
    latitude = data["latitude"]
    longitude = data["longitude"]
    util.get_file()
    # send_data("moon", 43.475, -80.529, 338)
    send_data(target, longitude, latitude)
    
def send_data(target, longitude, latitude, elevation):
    horizontal_angle, vertical_angle = util.calculate(target, longitude, latitude, elevation)
    send_angle_to_mc(horizontal_angle, vertical_angle)

app.run(debug=True, port=8080)