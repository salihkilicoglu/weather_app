from rest_framework import generics

from api.mixins import IsAdminUserMixin
from .models import Locations
from .serializers import LocationsSerializer


class LocationsListCreateAPIView(
    IsAdminUserMixin,
    generics.ListCreateAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

locations_list_create_view = LocationsListCreateAPIView.as_view()


class LocationsDetailAPIView(
    IsAdminUserMixin,
    generics.RetrieveAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

locations_detail_view = LocationsDetailAPIView.as_view()


class LocationsUpdateAPIView(
    IsAdminUserMixin,
    generics.UpdateAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer
    lookup_field = 'pk'

locations_update_view = LocationsUpdateAPIView.as_view()


class LocationsDestroyAPIView(
    IsAdminUserMixin,
    generics.DestroyAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer
    lookup_field = 'pk'

locations_destroy_view = LocationsDestroyAPIView.as_view()
