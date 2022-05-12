from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from weather.models import Locations


def api_home(request, *args, **kwargs):
    model_data = Locations.objects.all().order_by("?").first()
    data = {}
    if model_data:
        data['id'] = model_data.id
        data['city'] = model_data.city

    return JsonResponse(data)
