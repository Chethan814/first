"""
URL configuration for SwiftRides project.

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
from django.contrib import admin
from django.urls import path, include
from home import views
from user_profile import views as user_views
from django.conf import settings
from django.conf.urls.static import static

# less use the include() it appends last path in url routing

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('__reload__/', include('django_browser_reload.urls')),
    
    path('', include('home.urls')),
    path('search/', views.searching, name='search'),
    
    path('user/', include('user_profile.urls')),
    path('UserLog/', user_views.UserLog, name='UserLog'),
    path('user_search/', user_views.user_searching, name='user_searching'),
    
    path('login/', user_views.Login, name='login'),
    path('signup/', user_views.Signup, name='signup'),
    path('logout/', user_views.Logout, name='logout'),
    
    path('car/<int:car_id>/', views.car_detail, name='car_details'),
    path('car/make/<str:make>/', views.car_detail_by_make,
         name='car_detail_by_make'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
