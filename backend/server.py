from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import get_target_position as gtp
import serial_communicate

app = Flask(__name__)
CORS(app)

actual_horizontal_angle = 0
actual_vertical_angle = 0
target = None
lat = None
long = None
elevation = None
track = False

gtp.get_file()

@app.route("/skyscope", methods=["GET", "POST"])
def main():
    print("called main")
    global track
    track = True
    data = request.get_json()
    global target
    target = data.get("target")
    global lat
    lat = data.get("latitude")
    global long
    long = data.get("longitude")
    global elevation
    elevation = data.get("elevation")
    horizontal_angle, vertical_angle = gtp.calculate(target, lat, long, elevation)
    return jsonify({"horizontal_angle": horizontal_angle, "vertical_angle": vertical_angle})
    # if request.method == "POST":
    #     data = request.get_json()
    #     if not data:
    #         return jsonify({"message": "bad request, not enough arguments"}), 400

    #     global target
    #     target = data.get("target")
    #     global lat
    #     lat = data.get("latitude")
    #     global long
    #     long = data.get("longitude")
    #     global elevation
    #     elevation = data.get("elevation")

    #     gtp.get_file()
    #     if not all([target, lat, long, elevation]):
    #         return jsonify({"message": "bad request, missing arguments"}), 400

    #     horizontal_angle, vertical_angle = gtp.calculate(target, lat, long, elevation)
    #     # print(horizontal_angle, vertical_angle)

    #     return jsonify({"message": "successful", "horizontal_angle": horizontal_angle, "vertical_angle": vertical_angle})

    # else:
    #     # Define or pass the values of target, lat, long, and elevation for GET requests
    #     # Assuming you have default or test values
    #     target = "default_target"
    #     lat = "default_latitude"
    #     long = "default_longitude"
    #     elevation = "default_elevation"
       
    #     horizontal_angle, vertical_angle = gtp.calculate(target, lat, long, elevation)
    #     return jsonify({"coordinates": [horizontal_angle, vertical_angle]}), 200

@app.route("/angles", methods=["POST"])
def receive_angles():
    data = request.get_json()
    if not data:
        print("Nothing received for the data, exiting...")
        return jsonify({"error": "An oopsie occurred, no gyatt for you"}), 400

    if actual_vertical_angle is None or actual_horizontal_angle is None:
        return jsonify({"error": "An oopsie occurred, no gyatt for you"}), 400

    horizontal_angle = ((data.get("horizontal_angle")))
    if(horizontal_angle <= 0 and horizontal_angle >= -180):
        horizontal_angle = abs(horizontal_angle)
    else:
        horizontal_angle = 360 - horizontal_angle

    horizontal_angle %= 360

    vertical_angle = ((data.get("vertical_angle") % 360))
   
    if horizontal_angle is None or vertical_angle is None:
        return jsonify({"error": "An oopsie occurred, missing angles"}), 400

    if vertical_angle > 180:
        vertical_angle = -(360 - vertical_angle)

    if track:
        azimuth, altitude_deg = gtp.calculate(target, lat, long, elevation)

        # print(f"we are facing: {(horizontal_angle, vertical_angle)}, but we want to face {(azimuth, altitude_deg)}")
        # print((azimuth, altitude_deg))
        serial_communicate.send_angle_to_mc(azimuth, altitude_deg, horizontal_angle, vertical_angle)
    return jsonify({"horizontal_angle": horizontal_angle, "vertical_angle": vertical_angle}), 200


@app.route("/", methods=["GET", "POST"])
def root():
    return render_template("index.html")

@app.route("/results", methods=["GET"])
def results():
    card_name = request.args.get("name")
    card_image = request.args.get("image")
    return render_template("results.html", card_name=card_name, card_image=card_image)

@app.route("/compass.html", methods=["GET", "POST"])
def compass():
    return render_template("compass.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=9001, ssl_context=('cert.pem', 'key.pem'))
