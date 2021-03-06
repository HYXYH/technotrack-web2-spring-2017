# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals
from celery import shared_task
from templated_email import InlineImage
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from core.models import User



def send_mail(subject, text, template, context, to):

    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]
    email = EmailMultiAlternatives(subject, text, 'noreply@pepetter.com', to)

    pic = InlineImage('pepe.png', open(
        '/Users/Oskar/Desktop/Phystech/Technotrack/WEB2/Project/src/core/static/images/pepe_logo.png', 'rb').read(),
                      'image/png')
    pic.attach_to_message(email)
    context['pepe_logo'] = pic
    html = render_to_string(template, context)
    email.attach_alternative(html, 'text/html')

    email.send()


@shared_task
def send_confirmation_mail(user_pk):

    user = User.objects.all().get(pk=user_pk)

    if user.email is None:
        return
    to = user.email

    subject = 'Успешная регистрация'
    text = 'Всё ништяк, зайди на сайт: http://0.0.0.0:8000'

    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]

    context = {'username': user.username, 'html_text': 'Добро пожаловать на сайт'}
    send_mail(subject, text, 'emails/new_post_letter.html', context, to)
