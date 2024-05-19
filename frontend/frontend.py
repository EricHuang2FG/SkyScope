from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def root():
   return render_template("index.html")

if __name__ == "__main__":
   app.run(host="0.0.0.0", debug=True, port=8000, ssl_context=('cert.pem', 'key.pem'))