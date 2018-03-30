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

    comment = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g posts comments_count')
    )

    last_comment = models.DateTimeField(
        _('last_comment'),
        null=False,
        blank=False,
        auto_now=True
    )

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
        null=False,
        default='',
        help_text=_('e.g post content')
    )

    is_top = models.BooleanField(default=False)

    is_recommended = models.BooleanField(default=False)

    post_type = models.IntegerField(
        blank=False,
        null=False,
        default=1,
        help_text=_('e.g posts type')
    )

    is_deleted = models.BooleanField(default=False)


class Comments(models.Model):
    post = models.ForeignKey(Posts)

    thumbs_up = models.IntegerField(
        blank=False,
        null=False,
        default=0,
        help_text=_('e.g posts thumbs_up')
    )

    content = models.TextField(
        blank=False,
        null=False,
        default='',
        help_text=_('e.g comment content')
    )

    author = models.ForeignKey(User)

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )

