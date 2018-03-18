from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage
from djoser import utils
from django.conf import settings
from django.utils.crypto import constant_time_compare, salted_hmac
from django.utils.http import base36_to_int, int_to_base36

from datetime import date
key_salt = "django.contrib.auth.tokens.PasswordResetTokenGenerator"

def _make_hash_value(user, timestamp):
    # Ensure results are consistent across DB backends
    return str(user.pk) + user.password + str(timestamp)

def _make_token_with_timestamp(user, timestamp):
    # timestamp is number of days since 2001-1-1.  Converted to
    # base 36, this gives us a 3 digit string until about 2121
    ts_b36 = int_to_base36(timestamp)

    # By hashing on the internal state of the user and using state
    # that is sure to change (the password salt will change as soon as
    # the password is set, at least for current Django auth, and
    # last_login will also change), we produce a hash that will be
    # invalid as soon as it is used.
    # We limit the hash to 20 chars to keep URL short

    hash = salted_hmac(
        key_salt,
        _make_hash_value(user, timestamp),
        secret=settings.SECRET_KEY,
    ).hexdigest()[::2]

    return "%s-%s" % (ts_b36, hash)

def _num_days(dt):
    return (dt - date(2001, 1, 1)).days

def _today():
    # Used for mocking in tests
    return date.today()

def check_token(user, token):
    if not (user and token):
        return False
    # Parse the token
    try:
        ts_b36, hash = token.split("-")
    except ValueError:
        return False

    try:
        ts = base36_to_int(ts_b36)
    except ValueError:
        return False

    # Check that the timestamp/uid has not been tampered with
    print(_make_token_with_timestamp(user, ts), token)
    if not constant_time_compare(_make_token_with_timestamp(user, ts), token):
        return False
    return True

def make_token(user):
        """
        Return a token that can be used once to do a password reset
        for the given user.
        """
        return _make_token_with_timestamp(user, _num_days(_today()))

class ActivationEmail(BaseEmailMessage):
    template_name = 'email/activation.html'

    def get_context_data(self):
        print("context_data", self)
        context = super(ActivationEmail, self).get_context_data()

        user = context.get('user')
        context['uid'] = utils.encode_uid(user.pk)
        context['token'] = make_token(user)
        context['url'] = settings.DJOSER['ACTIVATION_URL'].format(**context)
        return context