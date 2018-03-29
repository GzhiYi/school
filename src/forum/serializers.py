from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer


class PostsSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Posts
        fields = ('id', 'title', 'author', 'visited', 'date_created', 'thumbs_up', 'step_on', 'content', 'is_top')


class CommentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comments
        fields = ('id', 'post', 'thumbs_up', 'author', 'date_created')
