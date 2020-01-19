# -*- coding: utf-8 -*-
from wechatpy.utils import check_signature
from wechatpy.exceptions import InvalidSignatureException
from wechatpy import parse_message
from wechatpy.replies import TextReply

from django.http import HttpResponse

from django.views.decorators.http import require_http_methods
import json
from django.core import serializers
from myapp.models import Story


@require_http_methods(["GET", "POST"])
def on_get(req):
    resp = {}
    if req.method == 'GET':
        try:
            check_signature(token='123', signature=req.GET['signature'], timestamp=req.GET['timestamp'],
                            nonce=req.GET['nonce'])
        except InvalidSignatureException:
            pass
        return HttpResponse(req.GET['echostr'])
    else:
        xml = req.body
        msg_info = parse_message(xml)
        if '牛皮' not in msg_info.content:
            return HttpResponse()
        num = 5
        try:
            num = int(msg_info.content.replace('牛皮', ''))
        except Exception as e:
            pass
        if msg_info.type == 'text':
            stories = Story.objects.order_by('-addTime')[:num]
            res_msg_list = json.loads(serializers.serialize("json", stories))
            resp = ''
            for res_msg in res_msg_list:
                resp += res_msg['fields']['content'] + '\n'
            resp += 'over la~'
            reply = TextReply(content=resp, message=msg_info)
            xml = reply.render()
            req._body = xml
    return HttpResponse(req.body)
