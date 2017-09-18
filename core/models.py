# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models.signals import m2m_changed
from events.inheritance_models import WatchableModel
from django.contrib.auth.models import AbstractUser
from django.db import models


class DateableModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser, DateableModel, WatchableModel):

    following = models.ManyToManyField('self', blank=True)
    # wall = models.ManyToMany(Event, blank=True)

    @staticmethod
    def set_signal(handler):
        m2m_changed.connect(handler, User.following.through)

    def get_title_for_event(self):
        return "{} теперь подписан на {}".format(self.username,'{}')

    def get_event_type(self):
        return self.follow_event

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class AuthorableModel(models.Model):
    author = models.ForeignKey(User, verbose_name='Автор')

    class Meta:
        abstract = True


# inheritance_models - что делать когда циклический импорт