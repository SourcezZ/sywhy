from django.utils.deprecation import MiddlewareMixin


class middle11(MiddlewareMixin):
    def process_request(self, request):
        print("")

    def process_response(self, request, response):
        print("")
        return response


class middle2(MiddlewareMixin):
    def process_request(self, request):
        print("中间件2请求")

    def process_response(self, request, response):
        print("中间件2返回")
        return response