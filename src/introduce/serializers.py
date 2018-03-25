
from rest_framework import serializers
from .models import Introduce
from accounts.serializers import UserSerializer


class IntroduceSerializer(serializers.ModelSerializer):
    # created_by = UserSerializer(read_only=True)

    class Meta:
        model = Introduce
        fields = ('id', 'title', 'body', 'cover_image', 'date_created', 'date_updated')


class BasicIntroduceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Introduce
        fields = ('id', 'title', 'cover_image')
