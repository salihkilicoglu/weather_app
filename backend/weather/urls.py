from django.urls import path, include
from rest_framework import routers

from . import views


urlpatterns = [
    # path('', view),   /api/weather/
    path('locations/', views.locations_list_view, name='locations-list'),
    path('locations/create/', views.locations_create_view, name='locations-create'),
    path('locations/<int:pk>/update/', views.locations_update_view, name='locations-edit'),
    path('locations/<int:pk>/delete/', views.locations_destroy_view),
    path('locations/<int:pk>/', views.locations_detail_view, name='locations-detail'),
    path('users/', views.user_list_view),
    path('users/create/', views.user_create_view),
    path('users/<int:pk>/update/', views.user_update_view),
    path('users/<int:pk>/delete/', views.user_destroy_view),
    path('users/<int:pk>/', views.user_detail_view),
]
