from django import forms

from .models import Locations


class LocationsForm(forms.ModelForm):
    class Meta:
        model = Locations
        fields = [
            'city',
        ]



