from django.urls import path
from . import views


urlpatterns = [
    # path('', view),   /api/weather/
    path('locations/', views.locations_list_create_view, name='locations-list'),
    path('locations/<int:pk>/update/', views.locations_update_view, name='locations-edit'),
    path('locations/<int:pk>/delete/', views.locations_destroy_view),
    path('locations/<int:pk>/', views.locations_detail_view, name='locations-detail')
]
