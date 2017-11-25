# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from core.api.serializers import BasicUserSerializer
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from  django.http.request import HttpRequest
from ugc.models import Post, Comment, Like


class CommentSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = BasicUserSerializer()
    likes_count = serializers.ReadOnlyField()
    text = serializers.CharField()

    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = BasicUserSerializer()

    class Meta:
        model = Like
        fields = '__all__'


class ContentTypeSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    api = serializers.SerializerMethodField('api_link')

    class Meta:
        model = ContentType
        fields = ('id', 'model', 'api')

    def api_link(self, obj):
        # return HttpRequest.build_absolute_uri(location='api:{}-list'.format(obj.model))
        return reverse('api:{}-list'.format(obj.model))


class PostSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = BasicUserSerializer(read_only=True)
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    likes = LikeSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    text = serializers.CharField(required=True)

    class Meta:
        model = Post
        fields = '__all__'


