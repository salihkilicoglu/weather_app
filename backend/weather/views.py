from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from rest_framework.exceptions import APIException

from api.mixins import IsAdminUserMixin
from .models import Locations, Log
from .serializers import LocationsSerializer, LogSerializer, UserSerializer

class HomeView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html')

home_view = HomeView.as_view()


class LogListAPIView(
    LoginRequiredMixin,
    generics.ListAPIView):
    serializer_class = LogSerializer
    queryset = Log.objects.all()

log_list_view = LogListAPIView.as_view()


class LogCreateAPIView(
    LoginRequiredMixin,
    generics.CreateAPIView):
    serializer_class = LogSerializer
    queryset = Log.objects.all()

    def perform_create(self, serializer):
        def get_client_ip(request):
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            return ip

        ip_address = serializer.validated_data.get('ip_address') or None
        if ip_address is None:
            ip_address = get_client_ip(self.request)
        serializer.save(user_id=self.request.user, ip_address=ip_address)

log_create_view = LogCreateAPIView.as_view()


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
        username = self.get_object().username
        if username == 'root':
            raise APIException('You can not update/delete root user')
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
        username = instance.username
        if username == 'root':
            raise APIException('You can not update/delete root user')
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
