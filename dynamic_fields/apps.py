# -*- coding: utf-8 -*-
from django.apps import AppConfig
from django.conf import settings
from importlib import import_module


class DynamicFieldsApp(AppConfig):
    name = 'dynamic_fields'
    verbose_name = "Django Dynamic Form Fields"

    def ready(self):
        patch_urls()


def patch_urls():
    from django.conf.urls import include, url
    from django.core.urlresolvers import clear_url_caches, reverse, NoReverseMatch

    try:
        reverse('dynamic_fields:choices')
    except NoReverseMatch:
        urlconf_module = import_module(settings.ROOT_URLCONF)
        urlconf_module.urlpatterns = [
            url(r'^dynamic_fields/', include('dynamic_fields.urls')),
        ] + urlconf_module.urlpatterns
        clear_url_caches()
