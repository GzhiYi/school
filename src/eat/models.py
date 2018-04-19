from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Eat(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
    )

    description = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
    )

    cover = models.CharField(
        _('URL of cover'),
        max_length=1024,
        default='https://files.jb51.net/file_images/game/201610/20161015204638166.jpg',
        blank=True,
        null=True
    )

    content = models.TextField(
        blank=False,
        null=True,
        default='',
    )

    date_created = models.DateTimeField(
        _('date created'),
        default=timezone.now
    )
