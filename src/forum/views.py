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
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    def list(self, request, *args, **kwargs):
        posts = self.queryset.all()
        for post in posts:
            user = User.objects.filter(id=post.author_id)
            print(user)
            # post['author_detail'] = user
            
        # print(posts)
        page = self.paginate_queryset(posts)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)