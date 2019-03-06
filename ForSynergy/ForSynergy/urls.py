"""ForSynergy URL Configuration"""
from django.urls import path, include, re_path

urlpatterns = [
    path('api/user/', include('custom_user.urls')),
    re_path('.*', include('home.urls')),
]
