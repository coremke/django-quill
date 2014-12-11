============
django-quill
============

Easily use [Quill.js](http://quilljs.com/) in your django admin.

This project is heavily inspired by `django-ckeditor <https://github.com/django-ckeditor/django-ckeditor>`_.

Requires django 1.7.

.. image:: /.screenshots/admin.png?raw=true

Quick start
-----------

1. Install the package from pypi

.. code:: bash

    pip install django-quill

2. Add "quill" to your INSTALLED_APPS setting like this:

.. code:: python

    INSTALLED_APPS = (
        ...
        'quill',
    )

Usage
-----

.. code:: python

    from django.db import models
    from quill.fields import RichTextField


    class MyModel(models.Model):
        content = RichTextField()
        content2 = RichTextField(config='basic')


Customizing
^^^^^^^^^^^

To customize this app, extend ``apps.QuillConfig`` and modify whatever you need. For example, to add a new toolbar:

.. code:: python

    from quill.apps import QuillConfig


    class MyQuillConfig(QuillConfig):
        my_toolbar = dict(full, toolbar_template='quill/toolbars/my_toolbar.html')

Provided Toolbars
^^^^^^^^^^^^^^^^^

There are two toolbars that come with this package:

1. Full (default): Provides basic font style and size selection, bold, italics, underline, strikethrough, text color, background color, lists, and links.
2. Basic: Provides bold, italic, underline, lists, and links.

Development
-----------

Running Tests
^^^^^^^^^^^^^

.. code:: bash

    $ make test

Building JS
^^^^^^^^^^^

.. code:: bash

    $ make build


TODO
----

1. Better documentation on RTD.
2. More tests.
3. Image support.
4. Better support for using outside of the admin.
