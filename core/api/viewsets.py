from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import list_route
from serializers import BasicUserSerializer, FullUserSerializer
from core.permissions import ReadOnly, permissions
from core.models import User


# Create your views here.


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer
    permission_classes = (ReadOnly,)

    def get_serializer(self, instance=None, *args, **kwargs):
        if instance == self.request.user:
            return FullUserSerializer(instance, *args, **kwargs)
        else:
            return super(UserViewSet, self).get_serializer(instance=instance, *args, **kwargs)

    @list_route(methods=['post'], url_path='register')
    def create_auth(self, request):
        serialized = FullUserSerializer(data=request.data)
        if serialized.is_valid():
            User.objects.create_user(
                serialized.init_data['email'],
                serialized.init_data['username'],
                serialized.init_data['password']
            )
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get', 'put'], permission_classes=[permissions.IsAuthenticated], url_path='me')
    def my_profile(self, request):
        serialized = FullUserSerializer(User.objects.get(id=request.user.id))
        return Response(serialized.data, status=status.HTTP_200_OK)
