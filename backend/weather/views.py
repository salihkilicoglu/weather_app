from rest_framework import generics
from django.contrib.auth.mixins import LoginRequiredMixin

from api.mixins import IsAdminUserMixin
from .models import Locations
from .serializers import LocationsSerializer


class LocationsListAPIView(
    LoginRequiredMixin,
    generics.ListAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

locations_list_view = LocationsListAPIView.as_view()


class LocationsCreateAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.CreateAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

locations_create_view = LocationsCreateAPIView.as_view()


class LocationsDetailAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.RetrieveAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

locations_detail_view = LocationsDetailAPIView.as_view()


class LocationsUpdateAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.UpdateAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer
    lookup_field = 'pk'

locations_update_view = LocationsUpdateAPIView.as_view()


class LocationsDestroyAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.DestroyAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer
    lookup_field = 'pk'

locations_destroy_view = LocationsDestroyAPIView.as_view()
