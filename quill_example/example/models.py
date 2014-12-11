from django.db import models
from django.utils.encoding import python_2_unicode_compatible

from quill.fields import RichTextField


@python_2_unicode_compatible
class ExampleModel(models.Model):
    editor = RichTextField()
    editor2 = RichTextField(config='basic')

    def __str__(self):
        return 'This is just an example'
