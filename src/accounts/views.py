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
from .authentication import GYAuthentication
from .services import ActivationEmail
from django.conf import settings
from lib.utils import AtomicMixin
from accounts.models import User
from accounts.serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    HandlerUserSerializer,
    ActivationSerializer
)
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


class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        """User registration view."""
        return self.create(request)


class UserLoginView(GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """User login with username and password."""
        token = AuthToken.objects.create(request.user)
        print(token)
        return Response({
            'user': self.get_serializer(request.user).data,
            'token': token
        })


class UserUpdateView(DefaultsMixin):
    queryset = User.objects.all()
    serializer_class = HandlerUserSerializer

    def list(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)

    def put(self, request, *args, **kwargs):
        uid = request.data['id']
        first_name = request.data['first_name']
        phone_number = request.data['phone_number']
        gender = request.data['gender']
        photo = request.data['photo_url']
        put_target = User.objects.get(id=uid)
        put_target.first_name = first_name
        put_target.phone_number = phone_number
        put_target.gender = gender
        put_target.photo_url = photo
        put_target.save()
        return Response({
            'user': self.get_serializer(request.user).data
        })


class UserConfirmEmailView(GenericAPIView):
    serializer_class = None
    authentication_classes = ()

    def get(self, request, activation_key):
        """
        View for confirm email.

        Receive an activation key as parameter and confirm email.
        """
        print(request)
        user = get_object_or_404(User, activation_key=str(activation_key))
        if user.confirm_email():
            return Response(status=status.HTTP_200_OK)

        log.warning(message='Email confirmation key not found.',
                    details={'http_status_code': status.HTTP_404_NOT_FOUND})
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserEmailConfirmationStatusView(GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        user = self.request.user
        return Response({'status': user.confirmed_email}, status=status.HTTP_200_OK)


class ActivationView(DJActivationView):
    """
    Use this endpoint to activate user account.
    """
    serializer_class = ActivationSerializer

    class ResentActivationEmailViewSet(generics.CreateAPIView):
        authentication_classes = (GYAuthentication,)
        permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        is_active = request.user.is_active
        if is_active:
            return Response('你已经激活', status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        signals.user_registered.send(
            sender=self.__class__, user=user, request=self.request
        )

        context = {'user': user}
        to = [get_user_email(user)]
        if djoser_settings.SEND_ACTIVATION_EMAIL:
            ActivationEmail(self.request, context).send(to)
        else:
            return Response("Sent Email Error", status=status.HTTP_501_NOT_IMPLEMENTED)

        return Response(status=status.HTTP_200_OK)


class HandlerUserViewSet(DefaultsMixin):

    """ API endpoint for listing and creating notes """
    queryset = User.objects.all()
    serializer_class = HandlerUserSerializer
    filter_fields = ['first_name', 'email', 'phone_number']

    def list(self, request, *args, **kwargs):
        first_name = request.GET.get('n', None)
        if first_name:
            users = self.queryset.filter(first_name=first_name)
            page = self.paginate_queryset(users)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        users = self.queryset.all()
        page = self.paginate_queryset(users)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def put(self, request, *args, **kwargs):
        request_data = request.data['id']
        method = request.data['method']
        if method == 0:
            for item in request_data:
                put_target = User.objects.get(id=item)
                put_target.is_active = False
                put_target.save()
        else:
            for item in request_data:
                put_target = User.objects.get(id=item)
                put_target.is_active = True
                put_target.save()
        return Response("success", status=status.HTTP_200_OK)
