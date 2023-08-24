from typing import Union
from ultralytics import YOLO


class YoloModel:
    """
    Custom YOLO model

    :param weights_path: path to the weights file
    """

    def __init__(self, weights_path="./models/weights/yolov8n_best.pt"):
        self.model = YOLO(weights_path)

    def detect(self, images: Union[str, list[str]]):
        """
        detect Assentify logos
        :param images:
        :return:
        """

        return self.model(images, save=True)
