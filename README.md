# django-quill

[![Build Status](https://img.shields.io/travis/gsmke/django-quill/master.svg?style=flat)](https://travis-ci.org/gsmke/django-quill)
[![Latest Version](https://img.shields.io/pypi/v/django-quill.svg?style=flat)](https://pypi.python.org/pypi/django-quill/)

Easily use [Quill.js](http://quilljs.com/) in your django admin.

This project is heavily inspired by [django-ckeditor](https://github.com/django-ckeditor/django-ckeditor).

Requires django 1.7.

![Admin Preview](/.screenshots/admin.png?raw=true)

## Quick start

1. Install the package from pypi

    ```bash
    pip install django-quill
    ```

2. Add "quill" to your INSTALLED_APPS setting like this:

    ```python
    INSTALLED_APPS = (
        ...
        'quill',
    )
    ```

## Usage

```python
from django.db import models
from quill.fields import RichTextField


class MyModel(models.Model):
    content = RichTextField()
    content2 = RichTextField(config='basic')
```

If you want to support image uploads, your admin needs to extend from `quill.admin.QuillAdmin`:

```python
from quill.admin import QuillAdmin

class MyAdmin(QuillAdmin):
    pass
```

### Customizing

To customize this app, extend ``apps.QuillConfig`` and modify whatever you need. For example, to add a new toolbar:

```python
from quill.apps import QuillConfig


class MyQuillConfig(QuillConfig):
    my_toolbar = dict(full, toolbar_template='quill/toolbars/my_toolbar.html')
```

To customize the extensions of the images that can be uploaded:

```python
from quill.apps import QuillConfig


class MyQuillConfig(QuillConfig):
    allowed_image_extensions = ['jpeg', 'gif']
```

If you need to call other methods or perform additional actions on the quill editors, they will be available in ``window.DjangoQuillEditors``.

### Provided Toolbars

There are two toolbars that come with this package:

1. Full (default): Provides basic font style and size selection, bold, italics, underline, strikethrough, text color, background color, lists, links, and images.
2. Basic: Provides bold, italic, underline, lists, and links.

## Development

There are several dependencies on npm that are required before building django-quill:

```bash
$ npm install
```

### Auto Compile JS

```bash
$ make watch
```

### Running Tests

```bash
$ make test
```

### Building JS

```bash
$ make build
```


# TODO

1. Better documentation.
2. More tests.
3. Better support for using outside of the admin.
