# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import AppConfig


class UgcConfig(AppConfig):
    name = 'ugc'
    verbose_name = 'Юзер Генерейтед Контент'

    def ready(self):
        import signals
