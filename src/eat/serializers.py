
from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer


class QuickNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Eat
        fields = ('title', 'content', 'description', 'date_created', 'cover')
