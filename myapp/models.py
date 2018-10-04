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
    content = models.CharField(max_length=64)
    add_time = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()  #add 'objects = models.Manager()' to resolve 'no objects member' warning
    def __unicode__(self):
        return self.title