# -- coding: utf-8 --
import base64
import os

from django.views.decorators.http import require_http_methods
from django.http import JsonResponse, HttpResponse
import json
from myapp.middle.myappUtils.router import get_img_api as get_img


# Create your views here.
@require_http_methods(["POST"])
def get_img_api(request):
    data = json.loads(request.body)
    res = get_img()
    # path_url: str = res.request.path_url
    # img_name = path_url.split('/')[-1]
    # server_img_dir = "appfront/dist/upload/img.img_api/"
    # server_img_path = server_img_dir + img_name
    # if not os.path.exists(server_img_dir):
    #     os.mkdir(server_img_dir)
    #
    # if os.path.exists(server_img_path):
    #     with open(server_img_path, "r") as fp:
    #         content = fp.read()
    # else:
    #     with open(server_img_path, "wb") as fp:
    #         fp.write(res.content)
    #         content = fp.read()
    # result = base64.b64encode(content)
    result = base64.b64encode(res.content)
    ext = res.url.split('.')[-1]
    content_type = "image/" + ext
    res_data = {
        'msg': 'success',
        "img": result.decode("utf-8"),
        "content_type": content_type
    }
    return JsonResponse(res_data)
    # return HttpResponse(res_data, content_type=content_type)
