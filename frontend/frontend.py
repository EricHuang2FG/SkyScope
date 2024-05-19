
from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS

app = Flask(__name__, static_url_path="/./media")
CORS(app)

@app.route("/", methods=["GET", "POST"])
def root():
    return send_file("index.html")

@app.route("/index.html", methods=["GET", "POST"])
def indexHTML():
    return send_file("index.html")

@app.route("/index.css", methods=["GET", "POST"])
def indexCSS():
    return send_file("index.css")

@app.route("/results.css", methods=["GET", "POST"])
def resultsCSS():
    return send_file("results.css")

@app.route("/reset.css", methods=["GET", "POST"])
def resetCSS():
    return send_file("reset.css")

@app.route("/index.js", methods=["GET", "POST"])
def indexJS():
    return send_file("index.js")

@app.route("/compass.html", methods=["GET", "POST"])
def compassHTML():
    return send_file("compass.html")

@app.route("/compass.js", methods=["GET", "POST"])
def compassJS():
    return send_file("compass.js")

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8000, ssl_context=('cert.pem', 'key.pem'))