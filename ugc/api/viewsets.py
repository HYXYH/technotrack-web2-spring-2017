from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from serializers import PostSerializer, CommentSerializer, LikeSerializer
from ugc.models import Post, Comment, Like
from core.permissions import IsOwnerOrReadOnly, permissions

# Create your views here.


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
