from rest_framework import serializers, exceptions

from accounts.models import User
# from lib.utils import validate_email as email_is_valid
from django.utils.translation import ugettext_lazy as _

from djoser import constants, utils
from djoser.serializers import UidAndTokenSerializer as DJUidAndTokenSerializer
from accounts.services import check_token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'is_superuser', 'gender', 'phone_number')


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ('id', 'email', 'password')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    # def validate_email(self, value):
    #     """
    #     Validate if email is valid or there is an user using the email.
    #
    #     :param value: string
    #     :return: string
    #     """
    #
    #     if not email_is_valid(value):
    #         raise serializers.ValidationError('Please use a different email address provider.')
    #
    #     if User.objects.filter(email=value).exists():
    #         raise serializers.ValidationError('Email already in use, please use a different email address.')
    #
    #     return value

class UidAndTokenSerializer(serializers.Serializer):
    key_salt = 'django.contrib.auth.tokens.PasswordResetTokenGenerator'

    uid = serializers.CharField()
    token = serializers.CharField()

    default_error_messages = {
        'invalid_token': _('Invalid token for given user.'),
        'invalid_uid': _('Invalid user id or user doesn\'t exist.')
    }

    def validate_uid(self, value):
        try:
            uid = utils.decode_uid(value)
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            self.fail('invalid_uid')

        return value

    def validate(self, attrs):
        attrs = super(UidAndTokenSerializer, self).validate(attrs)
        is_token_valid = check_token(self.user, attrs['token'])
        if is_token_valid:
            return attrs
        else:
            self.fail('invalid_token')


class ActivationSerializer(UidAndTokenSerializer):
    default_error_message = {'stale_token': _('Stale token for given user.')}

    def validate(self, attrs):
        attrs = super(ActivationSerializer, self).validate(attrs)
        if not self.user.is_active:
            return attrs
        raise exceptions.PermissionDenied(self.error_messages['stale_token'])


class HandlerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'