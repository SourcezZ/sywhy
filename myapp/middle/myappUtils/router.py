# -- coding: utf-8 --
import requests


def get_img_api():
    url = "http://www.dmoe.cc/random.php"

    res = requests.get(url)
    return res
