# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import Img

@require_http_methods(["POST"])
def uploadImg(request): # 图片上传函数
    if request.method == 'POST':
        img = Img(img_url=request.FILES.get('file'))
        img.save()
    return render(request, 'index.html')

@require_http_methods(["GET"])
def showImg(request):
    response = {}
    try:
        imgs = Img.objects.all() # 从数据库中取出所有的图片路径
        response['list'] = json.loads(serializers.serialize("json", imgs))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)
