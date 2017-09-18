from django.db.models.signals import post_save, pre_delete
from .models import Comment, Like


def count_likes(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        instance.object.likes_count += 1
        instance.object.save()
    elif deleted:
        instance.object.likes_count -= 1
        instance.object.save()


def count_comments(instance, created=False, deleted=False, *args, **kwargs):
    if created:
        instance.object.comments_count += 1
        instance.object.save()
    elif deleted:
        instance.object.comments_count -= 1
        instance.object.save()


post_save.connect(count_likes, Like)
pre_delete.connect(count_likes, Like)
post_save.connect(count_comments, Comment)
pre_delete.connect(count_comments, Comment)
