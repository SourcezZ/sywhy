# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import User
from myapp.view import token as tokenFunc


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
        response['error_num'] = 1
        return JsonResponse(response)

    try:
        user = User(username=username, password=password)
        user.save()
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

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
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    validPwd = userList[0]['fields']['password']
    if(password == validPwd):
        response['token'] = tokenFunc.create_token(username)
        response['msg'] = 'success'

    return JsonResponse(response)

@require_http_methods(["POST"])
def loginInfo(request):
    response = {}
    data = json.loads(request.body)
    accessToken = data['token']
    if accessToken != None:
        username = tokenFunc.get_username(accessToken)
        response['username'] = username

    return JsonResponse(response)