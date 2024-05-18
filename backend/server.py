from flask import Flask, request, jsonify
from flask_cors import CORS
import get_target_position as gtp

app = Flask(__name__)
CORS(app)

@app.route("/skyscope", methods=["GET", "POST"])
def main():
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

if __name__ == "__main__":
    app.run(debug=True, port=9001)
