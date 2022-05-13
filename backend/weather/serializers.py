from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Locations


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        required_fields = ['username',]
        read_only_fields = ['password',]
        unique_fields = ['username',]    


class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = [
            'city',
        ]