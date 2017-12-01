# -*- coding: utf-8 -*-
from django.conf.urls import url

from dynamic_fields.views import DynamicFieldChoicesView

urlpatterns = [
    url(r'^choices/$', DynamicFieldChoicesView.as_view()),
]

