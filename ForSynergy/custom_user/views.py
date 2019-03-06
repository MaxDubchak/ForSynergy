"""Module that provides CRUD view for user model"""
import json
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout

from custom_user.models import CustomUser


@require_http_methods(['POST'])
def log_in(request):
    """Login of the existing user. Handles post and get requests."""
    data = json.loads(request.body)
    if not data:
        return HttpResponse('Empty body received', status=400)

    credentials = {
        'email': data.get('email'),
        'password': data.get('password'),
    }
    user = authenticate(**credentials)
    if not user:
        return HttpResponse('Invalid email or password', status=400)

    login(request, user)

    return HttpResponse('Successfully logged in', status=200)


@require_http_methods(['POST'])
def create_user(request):
    """Function that provides user registration"""
    data = json.loads(request.body)
    if not data:
        return HttpResponse('Empty body received', status=400)

    credentials = {
        'email': data.get('email'),
        'password': data.get('password'),
    }

    user = CustomUser.create(**credentials)

    if not user:
        return HttpResponse('User with this email already exists', status=400)

    return HttpResponse('Successfully signed up', status=200)


@require_http_methods(['GET'])
def log_out(request):
    """Logout the existing user"""
    logout(request)
    response = HttpResponseRedirect('/')
    return response


@require_http_methods(['PUT'])
def change_password(request):
    """Change password for current user"""
    data = json.loads(request.body)
    user = request.user
    if not user.check_password(data.get('old_password')):
        return HttpResponse('Old password is incorrect', status=400)

    is_updated = user.update(password=data.get('new_password'))
    if not is_updated:
        return HttpResponse('Failed to update password', status=400)

    return HttpResponse('password successfully updated', status=200)


@require_http_methods(['GET'])
def get_all_users(request):
    """Retrieve all existing users"""
    users = CustomUser.get_all_users()
    data = [user.to_dict() for user in users]
    return JsonResponse(data, status=200, safe=False)
