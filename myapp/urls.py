# -- coding: utf-8 --
from django.conf.urls import url, include
from myapp.view import views
from myapp.view import story
from myapp.view import img  # 添加
from myapp.view import login

urlpatterns = [
    url(r'add_book$', views.add_book, ),
    url(r'show_books$', views.show_books, ),

    url(r'add_story$', story.add_story),
    url(r'show_storys$', story.show_storys),

    url(r'add_comment$', story.add_comment),
    url(r'show_comments$', story.show_comments),

    url(r'uploadImg$', img.uploadImg),
    url(r'showImg$', img.showImg),
    url(r'uploadImgForUs$', img.uploadImgForUs),
    url(r'showImgForUs', img.showImgForUs),

    url(r'add_user', login.add_user),
    url(r'login', login.login),
    url(r'get_username', login.get_username),
    url(r'send_register_email', login.send_register_email),

    url(r'', login.other_request)
]
