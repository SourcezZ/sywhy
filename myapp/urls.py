from django.conf.urls import url, include
from myapp.view import views
from myapp.view import story

urlpatterns = [
url(r'add_book$', views.add_book, ),
url(r'show_books$', views.show_books, ),

url(r'add_story$',story.add_story),
url(r'show_storys$',story.show_storys),

url(r'add_comment$',story.add_comment),
url(r'show_comments$',story.show_comments),
]