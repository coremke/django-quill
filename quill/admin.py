import json

from django.conf.urls import patterns, url
from django.contrib import admin
from django.core.files.storage import default_storage
from django.http import Http404, HttpResponse, HttpResponseBadRequest

from .helpers import save_file


class QuillAdmin(admin.ModelAdmin):

    """Admin class offering the ability to accept file uploads."""

    def get_urls(self):
        """Add URLs needed to handle image uploads."""
        urls = patterns(
            '',
            url(r'^upload/$', self.admin_site.admin_view(self.handle_upload), name='quill-file-upload'),
        )
        return urls + super(QuillAdmin, self).get_urls()

    def handle_upload(self, request):
        """Handle file uploads from WYSIWYG."""
        if request.method != 'POST':
            raise Http404

        if request.is_ajax():
            try:
                filename = request.GET['quillUploadFile']
                data = request
                is_raw = True
            except KeyError:
                return HttpResponseBadRequest("Invalid file upload.")
        else:
            if len(request.FILES) != 1:
                return HttpResponseBadRequest("Can only upload 1 file at a time.")
            try:
                data = request.FILES['quillUploadFile']
                filename = data.name
                is_raw = False
            except KeyError:
                return HttpResponseBadRequest('Missing image `quillUploadFile`.')

        url = save_file(data, filename, is_raw, default_storage)
        response_data = {}
        response_data['url'] = url

        # Response content type needs to be text/html here or else
        # IE will try to download the file.
        return HttpResponse(json.dumps(response_data), content_type="text/html; charset=utf-8")
