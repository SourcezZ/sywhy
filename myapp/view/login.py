# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import User
from myapp.middle.myappUtils import token as tokenUtil, myUtils
from django.core.cache import cache
# django自带的邮件发送模块
from django.core.mail import send_mail

from myproject.settings import EMAIL_FROM

@require_http_methods(["POST"])
def send_register_email(request, send_type='register'):
    response = {}
    # 实例化EmailVerifyRecord对象，将邮件内容保存到数据库，便于查询激活链接是否存在
    # email_record = EmailVerifyRecord()
    # email_record.email = email
    # email_record.send_type = send_type
    # email_record.code = random_str(20) #生成长20的随机字符串用以构成激活链接(域名/active/随机code/)
    # # 只要编写逻辑判断激活链接中的code是否有，就可以对应user的is_active=true
    # email_record.save()

    # 发送邮件功能如下
    # email_title = ""邮件标题
    # email_body = ""主体
    email_to = []
    username = request.data['username']
    email_to.append(request.data['email'])
    validCode = myUtils.getValidCode()
    cache.set(username, validCode, 5*60)
    if send_type == "register":
        email_title = "RainRose注册验证码"
        email_body = f"{username}：您的验证码为：{validCode}"
        # Parameter：subject标题, message主体, from_email发送邮箱, recipient_list邮件列表,
        send_status = send_mail(email_title,email_body,EMAIL_FROM,email_to) #返回真值，判断是否发送OK
        if send_status:
            # 你想怎样
            response['msg'] = 'success'
            return JsonResponse(response)
        else:
            response['msg'] = 'send email fail'
            return JsonResponse(response)

# Create your views here.
@require_http_methods(["POST"])
def add_user(request):
    response = {}
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    validCode = data['validCode']

    #判断验证码是否正确
    if validCode != cache.get(username) : 
        response['msg'] = 'validCode error, please try again'
        return JsonResponse(response)

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

