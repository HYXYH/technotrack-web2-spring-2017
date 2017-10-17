# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from  django.http.request import HttpRequest
from ugc.models import Post, Comment, Like


class PostSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    # todo
    # likes = serializers.HyperlinkedRelatedField(view_name='like-detail', queryset=Like.objects.all(), many=True)
    comments = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Post
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()

    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')

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
