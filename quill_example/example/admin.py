from django.contrib import admin
from quill.admin import QuillAdmin

from .models import ExampleModel

admin.site.register(ExampleModel, QuillAdmin)
