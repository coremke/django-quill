# django-quill Example Project


### Setting up virtualenv

1. Create virtualenv

```bash
$ mkvirtualenv -p $(which pythone) django-quill
```

2. Install django inside the virtualenv

```bash
$ pip install django-quill
```

3. Install quill

```bash
$ python setup.py develop
```

4. Sync Database and create superuser

```bash
$ cd quill_example
$ python manage.py migrate
$ python manage.py createsuperuser
```

### Running Development Server

1. Activate virtualenv

```bash
$ workon django-quill
```

2. Run development server

```bash
$ cd django-quill
$ python manage.py runserver
```

3. In another console window, build django-quill:

```bash
$ make watch
```

4. The example project will be available at http://localhost:8000.
