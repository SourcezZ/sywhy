# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import User
from myapp.middle.myappUtils import token as tokenUtil


# Create your views here.
@require_http_methods(["POST"])
def add_user(request):
    response = {}
    data = json.loads(request.body)
    username = data['username']
    password = data['password']

    #判断账号是否存在
    user = User.objects.filter(username=username)
    userList = json.loads(serializers.serialize("json", user))
    if(len(userList) != 0):
        response['msg'] = 'username exists'
        return JsonResponse(response)

    try:
        user = User(username=username, password=password)
        user.save()
        response['msg'] = 'success'
    except  Exception as e:
        response['msg'] = str(e)
        
    return JsonResponse(response)

@require_http_methods(["POST"])
def login(request):
    response = {}
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    try:
        user = User.objects.filter(username=username)
        userList = json.loads(serializers.serialize("json", user))
    except  Exception as e:
        response['msg'] = str(e)

    if userList != []:
        validPwd = userList[0]['fields']['password']
        if(password == validPwd):
            response['token'] = tokenUtil.create_token(username)
            response['msg'] = 'success'
        else:
            response['msg'] = 'password valid failed'
    else:
        response['msg'] = 'username not exists, please log up'
        
    return JsonResponse(response)

@require_http_methods(["POST"])
def get_username(request):
    response = {}
    accessToken = request.data.get('token')
    try:
        if accessToken != None:
            username = tokenUtil.get_username(accessToken)
            response['username'] = username
            response['msg'] = 'success'
    finally:
        if(response.get('msg') != 'success'):
            response['msg'] = 'your session is time out, please login in again'
    return JsonResponse(response)