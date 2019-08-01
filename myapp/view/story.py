# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import Story
from myapp.models import Comment
from django.db import transaction

# Create your views here.
@require_http_methods(["POST"])
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
        #storys = Story.objects.filter(id='1')
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
