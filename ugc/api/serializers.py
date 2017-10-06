# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from ugc.models import Post, Comment, Like


class LikedObjectRelatedField(serializers.RelatedField):

    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, Post):
            serializer = PostSerializer(value)
            # return str(value.id)
        elif isinstance(value, Comment):
            serializer = CommentSerializer(value)
            # return str(value.id)
        else:
            raise Exception('Unexpected type of liked object')

        return serializer.data


class PostSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    # todo
    # likes = serializers.HyperlinkedRelatedField(view_name='like-detail', queryset=Like.objects.all())

    class Meta:
        model = Post
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()
    # todo
    # object = serializers.HyperlinkedRelatedField(read_only=True, view_name='post-detail')

    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.ReadOnlyField(source='author.id')
    # todo: тут нужно hyperlink, но у него view_name зависит от типа, как это сделать?
    object = LikedObjectRelatedField(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'
