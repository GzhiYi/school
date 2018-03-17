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
from rest_framework import status, generics, permissions, viewsets

from djoser.views import ActivationView as DJActivationView
from djoser import signals
from djoser.conf import settings as djoser_settings
from djoser.serializers import TokenSerializer
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.views import UserCreateView, TokenCreateView, TokenDestroyView
from djoser.views import PasswordResetView as DJPasswordResetView
from .authentication import GYAuthentication
from accounts.services import ActivationEmail

from accounts.models import User
from accounts.serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    ActivationSerializer
)
from lib.utils import AtomicMixin
import smtplib


class UserRegisterView(UserCreateView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
            # send email
            signals.user_registered.send(
                sender=self.__class__, user=user, request=self.request
            )
            context = {'user': user}
            to = [get_user_email(user)]
            if djoser_settings.SEND_ACTIVATION_EMAIL:
                ActivationEmail(self.request, context).send(to)
        except smtplib.SMTPRecipientsRefused as e:
            user.delete()
            return Response(str(e), status=400)
        else:
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLoginView(GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """User login with username and password."""
        token = AuthToken.objects.create(request.user)
        return Response({
            'user': self.get_serializer(request.user).data,
            'token': token
        })


class UserConfirmEmailView(AtomicMixin, GenericAPIView):
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