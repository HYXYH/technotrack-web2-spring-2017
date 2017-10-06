from .inheritance_models import WatchableModel
from .models import Event


def create_event(instance, created=False, *args, **kwargs):
    if instance.get_event_type() is WatchableModel.activity_event:
        if created:
            event = Event()
            event.author = instance.author
            event.title = instance.get_title_for_event()
            event.save()
    elif instance.get_event_type() is WatchableModel.follow_event:
        action = kwargs.get('action')
        if action and action in 'post_add':
            fuid = next(iter(kwargs['pk_set']))
            model = kwargs['model']
            event = Event()
            event.author = instance
            event.title = instance.get_title_for_event().format(model.objects.get(id=fuid))
            event.save()


for model in WatchableModel.__subclasses__():
    model.set_signal(create_event)
    # print 'set watchable signal for {}'.format(model)