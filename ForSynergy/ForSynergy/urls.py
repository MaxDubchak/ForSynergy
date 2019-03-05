"""ForSynergy URL Configuration"""
from django.urls import path, include

urlpatterns = [
    path('api/user/', include('custom_user.urls')),
]
