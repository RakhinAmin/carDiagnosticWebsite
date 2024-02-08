from django.urls import path
from .views import handle_brake_response

urlpatterns = [
    path('api/v1/questions/brake/', handle_brake_response,
         name='handle_brake_response'),
    # Add more URL patterns as needed
]
