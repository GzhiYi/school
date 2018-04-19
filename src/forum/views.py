from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics, permissions, viewsets, filters
import django_filters.rest_framework
from djoser.views import ActivationView as DJActivationView
from djoser import signals
from djoser.conf import settings as djoser_settings
from djoser.serializers import TokenSerializer
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.views import UserCreateView, TokenCreateView, TokenDestroyView
from djoser.views import PasswordResetView as DJPasswordResetView
# from .authentication import GYAuthentication
# from .services import ActivationEmail
from django.conf import settings

from forum.models import *
from forum.serializers import *
# from lib.utils import AtomicMixin
import smtplib


class DefaultsMixin(viewsets.ModelViewSet):

    """
    Default settings for view auth, permissions,
    filtering and pagination
    """

    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )
    paginate_by = 25
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )


class GetPostsMixin(viewsets.ModelViewSet):
    paginate_by = 25
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )


class GetPostsViewSet(GetPostsMixin):
    queryset = Posts.objects.filter(is_deleted=False).order_by('-date_created')
    serializer_class = PostsSerializer

    def list(self, request, *args, **kwargs):
        if request.query_params.get('id'):
            posts = self.queryset.filter(id=request.query_params.get('id'))
            for post in posts: 
                post.visited += 1 
                post.save()
        elif request.query_params.get('au'):
            posts = self.queryset.filter(author_id=request.query_params.get('au'))
        else:
            posts = self.queryset.all()
        comments = list(posts)
        for item in comments:
            comment_data = Comments.objects.filter(post_id=item.id)
            item.comment = len(comment_data) 
        page = self.paginate_queryset(comments)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class GetPostsAdminViewSet(GetPostsMixin):
    queryset = Posts.objects.all().order_by('-date_created')
    serializer_class = PostsSerializer

    def list(self, request, *args, **kwargs):
        if request.query_params.get('id'):
            posts = self.queryset.filter(id=request.query_params.get('id'))
            for post in posts:
                post.visited += 1
                post.save()
        elif request.query_params.get('au'):
            posts = self.queryset.filter(
                author_id=request.query_params.get('au'))
        else:
            posts = self.queryset.all()
        comments = list(posts)
        for item in comments:
            comment_data = Comments.objects.filter(post_id=item.id)
            item.comment = len(comment_data)
        page = self.paginate_queryset(comments)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
class GetTopPostsViewSet(GetPostsMixin):
    queryset = Posts.objects.filter(is_top=True , is_deleted=False)
    serializer_class = PostsSerializer

    def list(self, request, *args, **kwargs):
        posts = self.queryset.all()
        comments = list(posts)
        for item in comments:
            comment_data = Comments.objects.filter(post_id=item.id)
            item.comment = len(comment_data) 
        page = self.paginate_queryset(comments)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class GetRecommendedPostsViewSet(GetPostsMixin):
    queryset = Posts.objects.filter(is_recommended=True, is_deleted=False)
    serializer_class = PostsSerializer

    def list(self, request, *args, **kwargs):
        posts = self.queryset.all()
        print(posts)
        comments = list(posts)
        for item in comments:
            comment_data = Comments.objects.filter(post_id=item.id)
            item.comment = len(comment_data) 
        page = self.paginate_queryset(comments)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class AddPostsDataViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all()
    serializer_class = PostsAddDataSerializer


class GetCommentsView(GetPostsMixin):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

    def list(self, request, *args, **kwargs):
        comments = self.queryset.all()
        comments = list(comments)
        if request.query_params.get('id'):
            comments = [item for item in comments if str(item.post.id) == request.query_params.get('id')]  
        elif request.query_params.get('au'):
            comments = [item for item in comments if str(item.author_id) == request.query_params.get('au')]  
        page = self.paginate_queryset(comments)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
            

class AddCommentsViewSet(GetPostsMixin):
    queryset = Comments.objects.all()
    serializer_class = AddCommentsSerializer


class HandlePostAdmin(DefaultsMixin):

    """ API endpoint for listing and creating notes """
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    # do 0-top, 1-recommend, 2-delete 

    def put(self, request, *args, **kwargs):
        post_id = request.data['post_id']
        method = request.data['method']
        do = request.data['do']
        put_target = Posts.objects.get(id=post_id)
        if do == 0:
            if method == 0:
                put_target.is_top = False
                put_target.save() 
                return Response("取消置顶成功", status=status.HTTP_200_OK)
            else:
                put_target.is_top = True
                put_target.save()
                return Response("置顶成功", status=status.HTTP_200_OK)
        elif do == 1:
            if method == 0:
                put_target.is_recommended = False
                put_target.save()
                return Response("取消推荐成功", status=status.HTTP_200_OK)
            else:
                put_target.is_recommended = True
                put_target.save()
                return Response("推荐成功", status=status.HTTP_200_OK)
        else:
            if method == 0:
                put_target.is_deleted = False
                put_target.save()
                return Response("取消删除成功", status=status.HTTP_200_OK)
            else:
                put_target.is_deleted = True
                put_target.save()
                return Response("删除成功", status=status.HTTP_200_OK)

