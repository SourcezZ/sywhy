# -- coding: utf-8 --
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
import os
import collections
from random import randrange
import re

def getModelList(path):
    queue = collections.deque()
    queue.append(path)
    model_list = [] #总list
    modeMap = {} #存放对应包名与子包名的map
    modelList = [] #存放modelId包名的list
    while len(queue) != 0:
        dirpath = queue.popleft()
        filelist = os.listdir(dirpath)
        for listname in filelist:
            fileabspath = os.path.join(dirpath, listname)
            if os.path.isdir(fileabspath):
                # print("目录："+listname)
                queue.append(fileabspath)
            else:
                if fileabspath.find('index.json') != -1 :
                    url = './' + fileabspath.replace('appfront/','')
                    urlSplit = re.split(r".*/model/", url)[1].split('\\')
                    modelIdUrl = urlSplit[0]
                    modelTexturesIdUrl = urlSplit[1]
                    modelList.append(modelIdUrl) if modelIdUrl not in modelList else ''
                    modeMap[modelIdUrl] = [] if modelIdUrl not in modeMap else modeMap[modelIdUrl]
                    modeMap[modelIdUrl].append(modelTexturesIdUrl)
                    # print("普通文件"+fileabspath)
    model_list.append(modelList)
    model_list.append(modeMap)
    return model_list

# a = 'E:\\Source\\Documents\\VS Code\\OnlyForPractice\\appfront\\static\\live2d_2\\live2d_api\\model\\bilibili-live\\22\\index.json'
# print(a.find('index.json'))

# getModelList("E:\Source\Documents\VS Code\OnlyForPractice\\appfront\static\live2d_2\live2d_api\model")

@require_http_methods(["GET"])
def getlive2d(request):
    response = {}
    data = request.GET
    
    model_list = getModelList('appfront/static/live2d_2/live2d_api/model/')
    isRandom = int(data.getlist('isRandom')[0])
    if isRandom == 1:
        modelId = randrange(0,len(model_list[0]))
        modelTexturesId = randrange(0,len(model_list[1][model_list[0][modelId]]))
    else:
        modelId = int(data.getlist('modelId')[0])
        modelTexturesId = int(data.getlist('modelTexturesId')[0])

    modelIdUrl = model_list[0][modelId]
    modelTexturesIdUrl = model_list[1][modelIdUrl][modelTexturesId]
    # random_index = randrange(0,len(model_list))
    
    url = './static/live2d_2/live2d_api/model/' + modelIdUrl + '/' + modelTexturesIdUrl + '/index.json'

    response['url'] = url

    return JsonResponse(response)
