# -- coding: utf-8 --
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import os
import collections
import random
import re


def get_model_list(path):
    queue = collections.deque()
    queue.append(path)
    model_list = []  # 总list
    mode_map = {}  # 存放对应包名与子包名的map
    model_id_list = []  # 存放modelId包名的list
    while len(queue) != 0:
        dir_path = queue.popleft()
        file_list = os.listdir(dir_path)
        for list_name in file_list:
            file_abspath = os.path.join(dir_path, list_name)
            if os.path.isdir(file_abspath):
                # print("目录："+listname)
                queue.append(file_abspath)
            else:
                if file_abspath.find('index.json') != -1:
                    url = './' + file_abspath.replace('appfront/', '')
                    url = url.replace('\\', '/')
                    url_split = re.split(r".*/model/", url)[1]
                    url_split_split = url_split.split('/')
                    model_id_url = url_split_split[0]
                    model_textures_id_url = url_split_split[1]
                    model_id_list.append(model_id_url) if model_id_url not in model_id_list else ''
                    mode_map[model_id_url] = [] if model_id_url not in mode_map else mode_map[model_id_url]
                    mode_map[model_id_url].append(model_textures_id_url)
                    # print("普通文件"+fileabspath)
    model_list.append(model_id_list)
    model_list.append(mode_map)
    return model_list


@require_http_methods(["GET"])
def get_live2d(request):
    response = {}
    data = request.GET
    default_url = None
    try:
        default_url = data.getlist('defaultUrl')[0]
    except Exception as e:
        print('no defaultUrl:' + str(e))

    model_list = get_model_list('appfront/static/live2d_2/live2d_api/model/')
    is_random = int(data.getlist('isRandom')[0])

    try:
        if is_random == 1:
            model_id = random.randrange(0, len(model_list[0]))
            model_textures_id = random.randrange(0, len(model_list[1][model_list[0][model_id]]))
        else:
            model_id = int(data.getlist('modelId')[0])
            model_textures_id = int(data.getlist('modelTexturesId')[0])
    except Exception as e:
        print('catch exception:' + str(e))
        model_id = 0
        model_textures_id = 0

    model_id_url = model_list[0][model_id]
    model_textures_id_url = model_list[1][model_id_url][model_textures_id]

    url = './static/live2d_2/live2d_api/model/' + model_id_url + '/' + model_textures_id_url + '/index.json'

    response['url'] = url
    if default_url is not None:
        response['url'] = default_url
    response['modelId'] = model_id
    response['modelTexturesId'] = model_textures_id

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_rand_json(request):
    response = {}
    data = request.GET

    try:
        model_id = int(data.getlist('modelId')[0])
        model_textures_id = int(data.getlist('modelTexturesId')[0])
    except Exception as e:
        print('no model_id and model_textures_id:' + str(e))
        model_id = 0
        model_textures_id = 0
    model_list = get_model_list('appfront/static/live2d_2/live2d_api/model/')

    model_id_url = model_list[0][model_id]
    model_textures_id_url = model_list[1][model_id_url][model_textures_id]

    if model_id == 1 or model_id == 4:
        # modeId为1 或者4时，用包里的其他模型
        rand_model_textures_id_url = random.choice(model_list[1][model_id_url])
        url = './static/live2d_2/live2d_api/model/' + model_id_url + '/' + rand_model_textures_id_url + '/index.json'
    else:
        try:
            random_url = 'appfront/static/live2d_2/live2d_api/model/' + model_id_url + '/' + model_textures_id_url + '/randomJson/'
            random_list = os.listdir(random_url)
            random_json = random.choice(random_list)
            url = random_url.replace('appfront', '.') + random_json
        except Exception as e:
            print('no dir:' + str(e))
            # modeId为1 或者4时，用包里的其他模型
            rand_model_textures_id_url = random.choice(model_list[1][model_id_url])
            url = './static/live2d_2/live2d_api/model/' + model_id_url + '/' + rand_model_textures_id_url + '/index.json'

    response['url'] = url
    response['modelId'] = model_id
    response['modelTexturesId'] = model_textures_id
    return JsonResponse(response)
