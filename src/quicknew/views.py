from rest_framework.decorators import api_view
from rest_framework import viewsets, authentication, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from .models import *
import django_filters.rest_framework
from .serializers import *
from knox.auth import TokenAuthentication


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


class GetNewMinxin(viewsets.ModelViewSet):
    paginate_by = 25
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )


class QuickNewViewSet(DefaultsMixin):

    queryset = QuickNew.objects.all().order_by('-date_created')
    serializer_class = QuickNewSerializer

    # def list(self, request, *args, **kwargs):
    #     news = self.queryset.all()
    #     page = self.paginate_queryset(news)
    #     serializer = self.get_serializer(page, many=True)
    #     return self.get_paginated_response(serializer.data)


class GetQuickNewViewSet(GetNewMinxin):

    queryset = QuickNew.objects.all().order_by('-date_created')
    serializer_class = QuickNewSerializer

    def list(self, request, *args, **kwargs):
        news = self.queryset.all()
        page = self.paginate_queryset(news)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)