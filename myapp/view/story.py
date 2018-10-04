from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from django.core import serializers
from myapp.models import Story

# Create your views here.
@require_http_methods(["GET"])
def add_story(request):
    response = {}
    try:
        story = Story(title=request.GET.get('title'),content=request.GET.get('content'))
        story.save()
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def show_storys(request):
    response = {}
    try:
        storys = Story.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", storys))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)