from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import User

# Create your views here.
@require_http_methods(["GET"])
def add_user(request):
    response = {}
    try:
        user = User(account=request.GET.get('account'),password=request.GET.get('password'))
        user.save()
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def loginInfo(request):
    response = {}
    try:
        user = User.objects.filter()
        #storys = Story.objects.filter(id='1')
        response['list']  = json.loads(serializers.serialize("json", user))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)