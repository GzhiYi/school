# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-30 05:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admission', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admissionstatus',
            name='status',
            field=models.CharField(default='', help_text='e.g admission status', max_length=100, null=True),
        ),
    ]
