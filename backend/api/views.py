from rest_framework.decorators import api_view
from rest_framework.response import Response

from weather.models import Locations
from weather.serializers import LocationsSerializer


@api_view(["GET"])
def api_home(request, *args, **kwargs):
    instance = Locations.objects.all().order_by("?").first()
    data = {}
    if instance:
        data = LocationsSerializer(instance).data

    return Response(data)
