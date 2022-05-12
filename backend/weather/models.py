from django.db import models


class Locations(models.Model):
    city = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.city
