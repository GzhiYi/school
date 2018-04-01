
from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer


class QuickNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuickNew
        fields = ('title', 'content', 'date_created')
