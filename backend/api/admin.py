from django.contrib import admin

from weather.models import Locations, Log


admin.site.register(Locations)
admin.site.register(Log)
