# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from events.models import Event


class EventSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    title = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['__all__']