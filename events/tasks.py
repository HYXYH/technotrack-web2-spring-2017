# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Event
import json
import requests

from cent.core import generate_api_sign

@shared_task
def notify_users(event_pk):

    event = Event.objects.all().prefetch_related('author').get(pk=event_pk)
    followers = event.author.followers.all()
    for follower in followers:
        commands = [
            {
                "method": "publish",
                "params": {"channel": "events-{}".format(follower.pk), "data": "{}".format(event.title)}
            }
        ]
        encoded_data = json.dumps(commands)
        sign = generate_api_sign("6a72807c-8ff6-492b-80f9-4e45e6f07f87", encoded_data)
        headers = {'Content-type': 'application/json', 'X-API-Sign': sign}
        requests.post("http://0.0.0.0:8081/api/", data=encoded_data, headers=headers)
