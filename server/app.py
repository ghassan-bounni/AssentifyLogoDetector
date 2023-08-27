import os
import shutil

from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from models.model import YoloModel


app = Flask(__name__)
CORS(app)

app.config["UPLOAD_FOLDER"] = "static/input/"

yolo = YoloModel()


@app.route("/", methods=["GET"])
@cross_origin()
def api():
    """
    ping the server

    :return: json response
    """
    return jsonify({"response": "pong!"})


@app.route("/detect", methods=["POST"])
def detect():
    """
    detect Assentify logos

    :return: json response
    """

    # empty the upload folder if it exists
    if os.path.exists(app.config["UPLOAD_FOLDER"]):
        shutil.rmtree(app.config["UPLOAD_FOLDER"])

    os.mkdir(app.config["UPLOAD_FOLDER"])

    # get images from request
    images = request.files.getlist("images[]")

    # check if images are present
    if len(images) == 0:
        return jsonify({"error": "no images found"}), 400

    for image in images:
        # check if the input is valid
        if not image.filename.endswith((".jpg", ".jpeg", ".png")):
            return jsonify({"error": "invalid input format"}), 400

        # save the image
        save_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
        image.save(save_path)
        Image.open(save_path).resize((640, 640)).save(save_path)

    # detect the images
    results = yolo.detect(
        [
            os.path.join(app.config["UPLOAD_FOLDER"], image)
            for image in os.listdir(app.config["UPLOAD_FOLDER"])
        ]
    )

    # empty the predict folder
    if os.path.exists("static/predict/"):
        shutil.rmtree("static/predict/")

    # move the images to the static folder and delete the runs folder
    shutil.move("runs/detect/predict/", "static/")
    shutil.rmtree("runs/")

    return jsonify(
        {
            "results": [
                request.base_url.replace("/detect", "")
                + os.path.join("/images/", image)
                for image in os.listdir("static/predict/")
            ]
        }
    )


@app.route("/images/<image_id>", methods=["GET"])
def get_images(image_id: str):
    """
    get the images from the server

    :param image_id: image id
    :return: Response
    """

    return app.send_static_file(f"predict/{image_id}")


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=os.environ.get("FLASK_RUN_PORT", 5000))
