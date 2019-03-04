"""ForSynergy URL Configuration"""
from django.urls import path, include

urlpatterns = [
    path('user/', include('custom_user.urls')),
]
