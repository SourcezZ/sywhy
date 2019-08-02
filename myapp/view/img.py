# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse, HttpResponse
import json
import os
from django.core import serializers
from myapp.models import Img
from myapp.models import ImgOnlyUpload
from django.conf import settings
from myapp.middle.myappUtils.img_utils import make_little_img

@require_http_methods(["POST"])
def uploadImg(request):  # 图片上传函数
    response = {}
    file = request.FILES.get('file')
    try:
        img = Img(imgUrl=file, imgName=file.name)
        img.save()
        make_little_img(file.name)
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
    # return render(request, 'index.html')
    return JsonResponse(response)


@require_http_methods(["POST"])
def showImg(request):
    response = {}
    try:
        imgs = Img.objects.all()  # 从数据库中取出所有的图片路径
        response['list'] = json.loads(serializers.serialize("json", imgs))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
    return JsonResponse(response)
    # imagepath = os.path.join(settings.BASE_DIR, "appfront/src/upload/media/8.jpg")  # 图片路径
    # with open(imagepath, 'rb') as f:
    #     image_data = f.read()
    # return HttpResponse(image_data, content_type="image/png")


@require_http_methods(["POST"])
def showImgForUs(request):
    response = {}
    name = []
    file_dir = r'./appfront/dist/upload/img/us/'
    for root, dirs, files in os.walk(file_dir):
        for file in files:
            name.append(file)
    try:
        response['list'] = name
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
    return JsonResponse(response)


@require_http_methods(["POST"])
def uploadImgForUs(request):  # 图片上传函数
    response = {}
    file = request.FILES.get('file')
    try:
        img = ImgOnlyUpload(imgUrl=file)
        img.save()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
    # return render(request, 'index.html')
    return JsonResponse(response)
