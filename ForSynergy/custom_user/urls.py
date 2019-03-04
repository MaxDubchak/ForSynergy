"""This module contains urls for custom_user views"""
from django.urls import path

from custom_user.views import log_in, create_user, change_password, log_out

urlpatterns = [
    path('login', log_in, name='login'),
    path('create_user', create_user, 'create_user'),
    path('change_password', change_password, 'password'),
    path('logout', log_out, 'logout')
]
