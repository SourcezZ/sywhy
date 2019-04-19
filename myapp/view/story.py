# -- coding: utf-8 --
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import Story
from myapp.models import Comment

# Create your views here.
@require_http_methods(["POST"])
def add_story(request):
    response = {}
    data = json.loads(request.body)
    try:
        story = Story(title=data['title'],content=data['content'])
        story.save()
        response['msg'] = 'success'
    except  Exception as e:
        response['msg'] = str(e)
        
    return JsonResponse(response)

@require_http_methods(["POST"])
def show_storys(request):
    response = {}
    try:
        storys = Story.objects.filter()
        #storys = Story.objects.filter(id='1')
        response['list']  = json.loads(serializers.serialize("json", storys))
        response['msg'] = 'success'
    except  Exception as e:
        response['msg'] = str(e)
        
    return JsonResponse(response)

@require_http_methods(["POST"])
def show_comments(request):
    response = {}
    try:
        comments = Comment.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", comments))
        response['msg'] = 'success'
    except  Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)

@require_http_methods(["POST"])
def add_comment(request):
    response = {}
    data = json.loads(request.body)
    try:
        comment = Comment(storyId=data['storyId'],commentContent=data['commentContent'])
        comment.save()
        response['msg'] = 'success'
    except  Exception as e:
        response['msg'] = str(e)

    return JsonResponse(response)