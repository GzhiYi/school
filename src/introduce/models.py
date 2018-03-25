from django.db import models
import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class IntroduceSchool(models.Model):
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


class IntroduceTeacher(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce teacher title')
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
        help_text=_('e.g introduce teacher body')
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    date_updated = models.DateTimeField(
        _('date updated'),
        default=timezone.now
    )


class IntroduceProfession(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce profession title')
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
        help_text=_('e.g introduce profession body')
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    date_updated = models.DateTimeField(
        _('date updated'),
        default=timezone.now
    )


class IntroduceCollege(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce college title')
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
        help_text=_('e.g introduce college body')
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    date_updated = models.DateTimeField(
        _('date updated'),
        default=timezone.now
    )


class IntroduceSociety(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce society title')
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
        help_text=_('e.g introduce society body')
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    date_updated = models.DateTimeField(
        _('date updated'),
        default=timezone.now
    )


class IntroduceBase(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce title')
    )

    cover_image = models.CharField(
        _('URL of image'),
        max_length=1024,
        blank=True,
        null=True
    )

    description = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g introduce description')
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    date_updated = models.DateTimeField(
        _('date updated'),
        default=timezone.now
    )