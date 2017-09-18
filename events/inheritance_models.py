from django.db import models


class WatchableModel(models.Model):
    activity_event = 'activity_event'
    follow_event = 'follow_event'

    @staticmethod
    def set_signal(handler):
        raise NotImplemented

    def get_title_for_event(self):
        raise NotImplemented
        # return 'title: {}'.self.title

    def get_event_type(self):
        raise NotImplemented
    #   return activity_event
    #   return follow_event

    class Meta:
        abstract = True