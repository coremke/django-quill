from django.db import models
from django import forms

from .widgets import QuillEditorWidget


class RichTextField(models.TextField):

    """Extended TextField that provides WYSIWYG with QuillJS."""

    def __init__(self, config='default', *args, **kwargs):
        """Create a new WYSIWYG field.

        :param str config: The QuillJS config to use (from :py:class:`quill.apps.QuillConfig`)

        """
        self.config = config
        super(RichTextField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        """Get the form for field."""
        defaults = {
            'form_class': RichTextFormField,
            'config': self.config,
        }
        defaults.update(kwargs)
        return super(RichTextField, self).formfield(**defaults)


class RichTextFormField(forms.fields.CharField):

    """Extend form field for QuillJS WYSIWYG."""

    def __init__(self, config='default', *args, **kwargs):
        """Create a new WYSIWYG form field.

        :param str config: The QuillJS config to use (from :py:class:`quill.apps.QuillConfig`)

        """
        kwargs.update({
            'widget': QuillEditorWidget(config=config)
        })
        super(RichTextFormField, self).__init__(*args, **kwargs)
