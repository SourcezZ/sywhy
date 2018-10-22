# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
# python manage.py makemigrations myapp
# python manage.py migrate
class Book(models.Model):
    book_name = models.CharField(max_length=64)
    add_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.book_name

class Story(models.Model):
    title = models.CharField(max_length=64)
    content = models.CharField(max_length=256)
    add_time = models.DateTimeField(auto_now_add=True)
    commitFlag = models.CharField(max_length=64,default='false')
    objects = models.Manager()  #add 'objects = models.Manager()' to resolve 'no objects member' warning
    def __unicode__(self):
        return self.title

class Comment(models.Model):
    commentId = models.CharField(max_length=64)
    commentContent = models.CharField(max_length=256)
    add_time = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()
    def __unicode__(self):
        return self.commentContent

class Img(models.Model):
    img_name = models.CharField(max_length=256,default='false')
    img_url = models.ImageField(upload_to='media/') # upload_to指定图片上传的途径，如果不存在则自动创建
    objects = models.Manager()

class User(models.Model):
    account = models.CharField(max_length=64)
    password = models.CharField(max_length=256)
    objects = models.Manager()