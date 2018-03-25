from django.db import models
import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Introduce(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce school title')
    )

    cover_image = models.CharField(
        _('URL of image'),
        max_length=1024,
        blank=True,
        null=True
    )

    body = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce school body')
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    date_updated = models.DateTimeField(
        _('date updated'),
        default=timezone.now
    )