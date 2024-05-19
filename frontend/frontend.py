from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def root():
    return render_template("index.html")

@app.route("/results", methods=["GET"])
def results():
    card_name = request.args.get("name")
    card_image = request.args.get("image")
    return render_template("results.html", card_name=card_name, card_image=card_image)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8000, ssl_context=('cert.pem', 'key.pem'))
