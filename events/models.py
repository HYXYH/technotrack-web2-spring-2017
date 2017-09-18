# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from core.models import AuthorableModel, DateableModel
from django.db import models

# Create your models here.


class Event(AuthorableModel, DateableModel):
    title = models.TextField()

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

    def __unicode__(self):
        return "эвент: {}".format(self.title)