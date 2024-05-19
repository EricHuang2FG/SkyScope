from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import get_target_position as gtp

app = Flask(__name__)
CORS(app)

actual_horizontal_angle = 0
actual_vertical_angle = 0

@app.route("/", methods=["GET", "POST"])
def root():
    return render_template("index.html")

@app.route("/skyscope", methods=["GET", "POST"])
def main():
    if request.method == "POST":
        data = request.get_json()
        if not data:
            return jsonify({"message": "bad request, not enough arguments"}), 400

        target = data.get("target")
        lat = data.get("latitude")
        long = data.get("longitude")
        elevation = data.get("elevation")

        gtp.get_file()
        if not all([target, lat, long, elevation]):
            return jsonify({"message": "bad request, missing arguments"}), 400

        horizontal_angle, vertical_angle = gtp.calculate(target, lat, long, elevation)
        print(horizontal_angle, vertical_angle)

        return jsonify({"message": "successful", "horizontal_angle": horizontal_angle, "vertical_angle": vertical_angle})

    else:
        # Define or pass the values of target, lat, long, and elevation for GET requests
        # Assuming you have default or test values
        target = "default_target"
        lat = "default_latitude"
        long = "default_longitude"
        elevation = "default_elevation"
       
        horizontal_angle, vertical_angle = gtp.calculate(target, lat, long, elevation)
        return jsonify({"coordinates": [horizontal_angle, vertical_angle]}), 200

@app.route("/angles", methods=["POST"])
def receive_angles():
    data = request.get_json()
    if not data:
        print("Nothing received for the data, exiting...")
        return jsonify({"error": "An oopsie occurred, no gyatt for you"}), 400

    if actual_vertical_angle is None or actual_horizontal_angle is None:
        return jsonify({"error": "An oopsie occurred, no gyatt for you"}), 400

    horizontal_angle = ((data.get("horizontal_angle")) % 360)
    vertical_angle = ((data.get("vertical_angle") % 360))
   
    if horizontal_angle is None or vertical_angle is None:
        return jsonify({"error": "An oopsie occurred, missing angles"}), 400

    # horizontal_answer = actual_horizontal_angle - horizontal_angle
    # vertical_answer = actual_vertical_angle - vertical_angle

    if vertical_angle > 180:
        vertical_angle = -(360 - vertical_angle)

    # print(horizontal_answer, vertical_answer)
    print(horizontal_angle, vertical_angle)

    return jsonify({"horizontal_angle": horizontal_angle, "vertical_angle": vertical_angle}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=9001, ssl_context=('cert.pem', 'key.pem'))