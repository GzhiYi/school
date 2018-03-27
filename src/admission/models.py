from django.db import models
import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class AdmissionStatus(models.Model):
    name = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g admission user name')
    )

    id_num = models.CharField(
        max_length=100,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g admission id')
    )

    status = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g admission status')
    )
