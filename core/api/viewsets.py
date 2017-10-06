from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from serializers import BasicUserSerializer, FullUserSerializer
from core.permissions import IsOwnerOrReadOnly, permissions
from core.models import User

# Create your views here.


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly)

    def get_serializer(self, instance=None, *args, **kwargs):
        if instance == self.request.user:
            return FullUserSerializer(instance, *args, **kwargs)
        else:
            return super(UserViewSet, self).get_serializer(instance=instance, *args, **kwargs)
