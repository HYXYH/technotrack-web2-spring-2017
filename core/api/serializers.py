from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from core.models import User


class BasicUserSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.ReadOnlyField()
    first_name = serializers.ReadOnlyField()
    last_name = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    # following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'following',)


class FullUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
