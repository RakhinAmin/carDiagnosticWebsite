"""
URL configuration for carDiagnostic project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Importing necessary modules from Django
from django.contrib import admin
# Path defines the route of a URL to the corresponding page, include defines any external URL configurations
from django.urls import path, include

# Defining URL patterns for the Django application
urlpatterns = [
    # Admin page URL
    path('admin/', admin.site.urls),

    # API endpoints for authentication using Djoser
    path('api/v1/auth/', include('djoser.urls')),

    # Additional API endpoints for JWT authentication using Djoser
    path('api/v1/auth/', include('djoser.urls.jwt')),
]
