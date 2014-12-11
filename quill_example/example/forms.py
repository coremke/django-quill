from django import forms

from .models import ExampleModel


class ExampleForm(forms.ModelForm):
    class Meta:
        model = ExampleModel
