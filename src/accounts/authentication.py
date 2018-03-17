from rest_framework import authentication, exceptions
from django.utils.translation import ugettext_lazy as _

class GYAuthentication(authentication.TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed(_('Invalid token.'))
        return (token.user, token)