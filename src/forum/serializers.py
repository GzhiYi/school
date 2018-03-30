from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer
# from forum.serializers import PostsSerializer


class PostsSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comment = 0
    class Meta:
        model = Posts
        fields = ('id', 'comment', 'last_comment', 'title', 'author', 'visited',
                  'date_created', 'thumbs_up', 'step_on', 'content', 'is_top', 'is_recommended', 'post_type', 'is_deleted')

class PostsAddDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        
        fields = ('id', 'title', 'author', 'visited',
                  'date_created', 'thumbs_up', 'step_on', 'content', 'is_top', 'post_type')


class CommentsSerializer(serializers.ModelSerializer):
    # post = PostsSerializer(read_only=True)
    author = UserSerializer(read_only=True)
    class Meta:
        model = Comments
        fields = ('id', 'post', 'thumbs_up', 'author', 'date_created', 'content')


class AddCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments

        fields = ('id', 'post', 'thumbs_up', 'author', 'date_created', 'content')
