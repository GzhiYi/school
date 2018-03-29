from django.db import models
from django.utils import timezone
from accounts.models import User
from django.utils.translation import ugettext_lazy as _


class Posts(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
        help_text=_('e.g posts title')
    )

    author = models.ForeignKey(User)

    visited = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g posts visited count')
    )

    # comments = models.ForeignKey('Comments')
    #
    # last_comment = models.ForeignKey('Comments')

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

    thumbs_up = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g posts thumbs_up')
    )

    step_on = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g posts step_on')
    )

    content = models.TextField(
        blank=False,
        null=True,
        default='',
        help_text=_('e.g post content')
    )


class Comments(models.Model):
    post = models.ForeignKey(Posts)

    thumbs_up = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g posts thumbs_up')
    )

    author = models.ForeignKey(User)

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

