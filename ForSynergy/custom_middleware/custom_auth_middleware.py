"""This module implements custom authentication middleware."""

from django.http import HttpResponse

GUEST_PATHS = [
    '/api/user/login',
    '/api/user/register',
]


class CustomAuthMiddleware:
    """
    Custom middleware that performs authentication validations for cases when
    the path is not available for anonymous users and logged in user.
    """

    def __init__(self, get_response):
        """Initialize middleware instance."""
        self.get_response = get_response

    def __call__(self, request):
        """Provide authentication validations on middleware call."""
        if not request.path_info.startswith('/api'):
            response = self.get_response(request)
            return response

        for path in GUEST_PATHS:
            if request.path_info.startswith(path):
                if request.user.is_authenticated:
                    return HttpResponse('Unavailable for authenticated users', status=403)
                response = self.get_response(request)
                return response

        if not request.user.is_authenticated:
            return HttpResponse('Unavailable for unauthenticated users', status=403)

        response = self.get_response(request)
        return response
