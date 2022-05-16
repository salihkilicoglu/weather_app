from django.views import View
from rest_framework import generics
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.shortcuts import render

from api.mixins import IsAdminUserMixin
from .models import Locations
from .serializers import LocationsSerializer, UserSerializer

class HomeView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html')

home_view = HomeView.as_view()

# Users
class UserListAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

user_list_view = UserListAPIView.as_view()


class UserCreateAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

user_create_view = UserCreateAPIView.as_view()


class UserDetailAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'

user_detail_view = UserDetailAPIView.as_view()


class UserUpdateAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.UpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'

    def perform_update(self, serializer):
        id = self.request.path[19:20]
        if id == '1':
            raise Exception("You can not update/delete root user")
        serializer.save()

user_update_view = UserUpdateAPIView.as_view()


class UserDestroyAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.DestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'

    def perform_destroy(self, instance):
        id = self.request.path[19:20]
        if id == '1':
            raise Exception("You can not update/delete root user")
        super().perform_destroy(instance)

user_destroy_view = UserDestroyAPIView.as_view()


# Locations
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
    lookup_field = 'city'

locations_update_view = LocationsUpdateAPIView.as_view()


class LocationsDestroyAPIView(
    LoginRequiredMixin,
    IsAdminUserMixin,
    generics.DestroyAPIView):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer
    lookup_field = 'city'

locations_destroy_view = LocationsDestroyAPIView.as_view()
