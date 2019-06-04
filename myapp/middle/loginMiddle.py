# -- coding: utf-8 --
from django.utils.deprecation import MiddlewareMixin
from myapp.middle.myappUtils import token as tokenUtil
from myapp.middle.myappUtils import apiList
import json
from django.http import JsonResponse


def checkIsLogin(requestPath, token):
    ''' 不需登陆  => 0 \n 需登陆  => 1 \n 不在api中 => 2 \n '''
    response = {}
    api = str(requestPath).replace('/api/', '')

    if api in apiList.UNNEEDLOGIN:
        return None
    elif api in apiList.NEEDLOGIN:
        loginDict = {0: '请先登录', 1: '已登陆', 2: '您的登陆会话超时，请重新登录'}
        loginStatus = tokenUtil.check_token(token)
        if(loginStatus != 1):
            print('\n' + loginDict[loginStatus])
            response['loginStatus'] = loginStatus
            response['msg'] = loginDict[loginStatus]
            return JsonResponse(response)
    else:
        print('\nnot in api')
        response['msg'] = 'illegal request'
        return JsonResponse(response)
    return None


class middleLogin(MiddlewareMixin):
    def process_request(self, request):
        try:
            request.data = json.loads(request.body)
        except Exception:
            try:
                request.data = request.POST
            except Exception:
                request.data = {}

        token = request.data.get('token')
        notLogin = checkIsLogin(request.path, token)
        if notLogin:
            return notLogin  # notLogin有值时，表示用户未登录， 结束请求, 返回JsonResponse信息

    def process_response(self, request, response):
        return response


class middle2(MiddlewareMixin):
    def process_request(self, request):
        print("中间件2请求")

    def process_response(self, request, response):
        print("中间件2返回")
        return response
