from django import forms
from django.apps import apps
from django.forms.util import flatatt
from django.template.loader import render_to_string
from django.templatetags.static import static
from django.utils.safestring import mark_safe


class QuillEditorWidget(forms.Textarea):

    """Widget used to render a QuillJS WYSIWYG."""

    class Media:
        css = {
            'all': (
                static('quill/css/vendor/quill-0.19.11.snow.css'),
                static('quill/css/quill.css'),
            )
        }

        js = (
            static('quill/js/vendor/SimpleAjaxUploader-1a6f62289d.min.js'),
            static('quill/js/build/quill-django.min.js'),
        )

    def __init__(self, config='default', *args, **kwargs):
        """Create a new Quill WYSIWYG Widget.

        :param str config: The QuillJS config to use (from :py:class:`quill.apps.QuillConfig`)

        """
        self.config = config
        super(QuillEditorWidget, self).__init__(*args, **kwargs)

    def render(self, name, value, attrs={}):
        """Render the Quill WYSIWYG."""
        if value is None:
            value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        quill_app = apps.get_app_config('quill')
        quill_config = getattr(quill_app, self.config)

        return mark_safe(render_to_string(quill_config['template'], {
            'final_attrs': flatatt(final_attrs),
            'value': value,
            'id': final_attrs['id'],
            'config': self.config,
        }))
