from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Locations(models.Model):
    city = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.city


class Log(models.Model):
    user_id = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    query_date = models.DateTimeField(default=datetime.now)
    location_id = models.ForeignKey(Locations, to_field='city',null=True, on_delete=models.SET_NULL)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    query_result = models.JSONField(null=True)
    query_time = models.FloatField()
    query_success = models.BooleanField(default=False)
