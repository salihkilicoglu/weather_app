from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Locations


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        required_fields = ['username','password']
        unique_fields = ['username',]

    def create(self, validated_data):
        """Create new user with encrypted password and return it"""
        password = validated_data.pop('password', None)
        user = super().create(validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = [
            'city',
        ]