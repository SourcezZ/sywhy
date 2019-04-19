# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import Img

@require_http_methods(["POST"])
def uploadImg(request): # 图片上传函数
    file = request.FILES.get('file')
    if request.method == 'POST':
        img = Img(imgUrl=file,imgName=file.name)
        img.save()
    return render(request, 'index.html')

@require_http_methods(["POST"])
def showImg(request):
    response = {}
    try:
        imgs = Img.objects.all() # 从数据库中取出所有的图片路径
        response['list'] = json.loads(serializers.serialize("json", imgs))
        response['msg'] = 'success'
    except  Exception as e:
        response['msg'] = str(e)
    return JsonResponse(response)
