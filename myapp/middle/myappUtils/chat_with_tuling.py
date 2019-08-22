# -- coding: utf-8 --
import requests
import json
from myproject.settings import TULING_API_KEY


def chat_with_tuling(word):
    req = {
        "reqType": 0,
        "perception": {
            "inputText": {
                "text": word
            },
            "selfInfo": {
                "location": {
                    "city": "重庆",
                    "province": "重庆",
                    "street": "渝北区锦橙路5号"
                }
            }
        },
        "userInfo": {
            "apiKey": TULING_API_KEY,
            "userId": "01"
        }
    }
    req = json.dumps(req)
    url = 'http://openapi.tuling123.com/openapi/api/v2'
    response = requests.post(url, data=req)
    content = json.loads(response.text)
    if content.find('爸爸'):
        content = '当然是源源啦,要叫他一起来玩儿吗?'
    # res = content['results'][0]['values']['text']
    return content
