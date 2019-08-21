# -- coding: utf-8 --
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from myapp.middle.myappUtils.chat_with_tuling import chat_with_tuling as chat


@require_http_methods(["POST"])
def chat_with_tuling(request):
    response = {}
    data = json.loads(request.body)
    try:
        res = chat(data['words'])
        return_code = res['intent']['code']
        if return_code == 4003:
            return_words = '对不起啦，我太累了，需要休息~'
        else:
            return_words = res['results'][0]['values']['text']
        response['return_words'] = return_words
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)
