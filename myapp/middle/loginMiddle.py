# -- coding: utf-8 --
from django.utils.deprecation import MiddlewareMixin
from myapp.middle.myappUtils import token as tokenUtil
from myapp.middle.myappUtils import apiList
import json
from django.http import JsonResponse

def getApiFlag(api):
        ''' 不需要登陆  => 0 \n 不需登陆  => 1 \n 不在api中 => 2 \n '''
        if api in apiList.UNNEEDLOGIN:
            return 0
        elif api in apiList.NEEDLOGIN:
            return 1
        else:
            return 2

def userLoginInfo(token):
    username = tokenUtil.get_username(token)
    return username

class middleLogin(MiddlewareMixin):
    def process_request(self, request):
        response = {}
        try:
            request.data = json.loads(request.body)
        except Exception:
            request.data = {}

        api = str(request.path).replace('/api/','')
        apiFlag = getApiFlag(api)

        #需要登陆的请求，返回'需要登陆'；非法请求返回'非法请求'
        if apiFlag == 1:
            username = userLoginInfo(request.data['token'])
            if username == None:
                response['msg'] = 'please log in'
                return response
        elif apiFlag == 2:
            response['msg'] = 'illegal request'
            return response

    def process_response(self, request, response):
        print("")
        return response


class middle2(MiddlewareMixin):
    def process_request(self, request):
        print("中间件2请求")
        
    def process_response(self, request, response):
        print("中间件2返回")
        return response