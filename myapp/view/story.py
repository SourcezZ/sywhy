# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import Story
from myapp.models import Comment
from django.db import transaction
from django.core.mail import send_mail
from myproject.settings import EMAIL_GET_NEW_MESSAGE
import threading

import logging

logger = logging.getLogger(__name__)
get_words_logger = logging.getLogger("get_words")


def send_mail_wrapper(func):
    def wrapper(request, *args, **kwargs):
        def send():
            content = json.loads(request.body)['content']
            email_title = "有新留言啦~"
            email_body = '''\n\t有一条新留言：{}'''.format(content)
            email_to = ['598481331@qq.com']

            get_words_logger.info("sending:" + str(content))
            send_status = send_mail(email_title, email_body,
                                    EMAIL_GET_NEW_MESSAGE, email_to, content)  # 返回真值，判断是否发送OK
            get_words_logger.info("sending over:" + str(send_status))

        # threading.Thread(target=send, args=(request,)).start()
        threading.Thread(target=send).start()
        return func(request, *args, **kwargs)

    return wrapper


# Create your views here.
@require_http_methods(["POST"])
@send_mail_wrapper
def add_story(request):
    response = {}
    data = json.loads(request.body)
    try:
        story = Story(title=data['title'], content=data['content'])
        story.save()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


@require_http_methods(["POST"])
def show_storys(request):
    response = {}
    try:
        storys = Story.objects.filter().order_by('-addTime')
        # storys = Story.objects.filter(id='1')
        response['list'] = json.loads(serializers.serialize("json", storys))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


@require_http_methods(["POST"])
def show_comments(request):
    response = {}
    try:
        comments = Comment.objects.filter()
        response['list'] = json.loads(serializers.serialize("json", comments))
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)


@require_http_methods(["POST"])
@transaction.atomic  # 整体事务回滚
def add_comment(request):
    response = {}
    data = json.loads(request.body)
    try:
        comment = Comment(storyId=data['storyId'],
                          commentContent=data['commentContent'])
        story = Story.objects.get(storyId=data['storyId'])
        story.commitFlag = '1'
        story.save()
        comment.save()
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)
