# -*- coding: utf-8 -*-
from django.db.models.signals import post_save, pre_delete
from django.db.models import F
from .models import Comment, Like


def count_likes(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('likes_count') + 1)
    elif deleted:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('likes_count') - 1)


def count_comments(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('comments_count') + 1)
    elif deleted:
        instance.object.__class__.objects.filter(id=instance.object.pk).update(likes_count=F('comments_count') - 1)


post_save.connect(count_likes, Like)
pre_delete.connect(count_likes, Like)
post_save.connect(count_comments, Comment)
pre_delete.connect(count_comments, Comment)
