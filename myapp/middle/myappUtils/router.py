# -- coding: utf-8 --
import requests


def get_img_api():
    url = "https://api.r10086.com:8443/动漫综合2.php"
    headers = {
        "authority": "api.r10086.com:8443",
        "method": "GET",
        "path": "/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882.php",
        "scheme": "https",
        "accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cookie": "Hm_lvt_182a6ea27c01008eff1a2be1c654d282=1587636683",
        "referer": "http://127.0.0.1:7080/",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "cross-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 Edg/81.0.416.64"
    }

    res = requests.get(url, headers=headers)
    return res
