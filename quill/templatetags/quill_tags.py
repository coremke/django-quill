import json

from django import template
from django.apps import apps


register = template.Library()
quill_app = apps.get_app_config('quill')


@register.filter()
def quill_conf(name):
    """Get a value from the configuration app."""
    return getattr(quill_app, name)
quill_conf.is_safe = True


@register.filter()
def quill_conf_json(name):
    """Get a value from the configuration app as JSON."""
    return json.dumps(getattr(quill_app, name))
quill_conf_json.is_safe = True


@register.simple_tag(takes_context=True)
def render_toolbar(context, config):
    """Render the toolbar for the given config."""
    quill_config = getattr(quill_app, config)
    t = template.loader.get_template(quill_config['toolbar_template'])
    return t.render(context)


@register.simple_tag(takes_context=True)
def render_editor(context, config):
    """Render the editor for the given config."""
    quill_config = getattr(quill_app, config)
    t = template.loader.get_template(quill_config['editor_template'])
    return t.render(context)
