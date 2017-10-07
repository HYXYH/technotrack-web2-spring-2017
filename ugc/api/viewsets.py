# -*- coding: utf-8 -*-
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import GenericAPIView
from serializers import PostSerializer, CommentSerializer, LikeSerializer, ContentTypeSerializer
from django.contrib.contenttypes.models import ContentType
from ugc.models import Post, Comment, Like
from core.permissions import IsOwnerOrReadOnly, ReadOnly, permissions

# Create your views here.

# todo: сделать viewset который по object_id + content_type выдаёт объект


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly)

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        return qs

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class ContentTypeViewSet(ModelViewSet):
    # queryset = ContentType.objects.none()
    serializer_class = ContentTypeSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly, )

    def get_queryset(self):
        queryset = ContentType.objects.all()
        hasApi = []
        for q in queryset:
            if hasattr(q.model_class(), 'hasAPI'):
                if q.model_class().hasAPI:
                    hasApi.append(q.id)
        return queryset.filter(id__in=hasApi)
