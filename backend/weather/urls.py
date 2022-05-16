from django.urls import path

from . import views


urlpatterns = [
    # path('', view),   /api/weather/
    path('locations/', views.locations_list_view, name='locations-list'),
    path('locations/create/', views.locations_create_view, name='locations-create'),
    path('locations/<str:city>/update/', views.locations_update_view, name='locations-edit'),
    path('locations/<str:city>/delete/', views.locations_destroy_view),
    path('users/', views.user_list_view),
    path('users/create/', views.user_create_view),
    path('users/<str:username>/update/', views.user_update_view),
    path('users/<str:username>/delete/', views.user_destroy_view),
    path('users/<str:username>/', views.user_detail_view),
]
