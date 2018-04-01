from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class QuickNew(models.Model):
    title = models.CharField(
        max_length=50,
        blank=False,
        null=True,
        default='',
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
