# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
'''

Create your models here.
python manage.py makemigrations myapp
python manage.py migrate

'''


class Book(models.Model):
    bookId = models.AutoField(primary_key=True)
    bookName = models.CharField(max_length=64)
    addTime = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.bookName


class Story(models.Model):
    storyId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64)
    content = models.CharField(max_length=256)
    addTime = models.DateTimeField(auto_now_add=True)
    commitFlag = models.CharField(max_length=64, default='0')
    # add 'objects = models.Manager()' to resolve 'no objects member' warning
    objects = models.Manager()

    def __unicode__(self):
        return self.title


class Comment(models.Model):
    commentId = models.AutoField(primary_key=True)
    storyId = models.IntegerField()
    commentContent = models.CharField(max_length=256)
    addTime = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()

    def __unicode__(self):
        return self.commentContent


class Img(models.Model):
    imgId = models.AutoField(primary_key=True)
    imgName = models.CharField(max_length=256, default='no_name')
    imgUrl = models.ImageField(upload_to='')  # upload_to指定图片上传的途径，如果不存在则自动创建
    addTime = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()


class ImgOnlyUpload(models.Model):
    # upload_to指定图片上传的途径，如果不存在则自动创建
    imgUrl = models.ImageField(upload_to='./us/')
    objects = models.Manager()


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=256, null=True)
    email = models.CharField(max_length=256, default='')
    objects = models.Manager()

    def __unicode__(self):
        return self.username
