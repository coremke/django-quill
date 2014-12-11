from django.shortcuts import render

from .models import ExampleModel


def home(request):
    data = ExampleModel.objects.all()
    return render(request, 'index.html', {
        'data': data
    })
