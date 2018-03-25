# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-25 15:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('introduce', '0009_introducebase_introduce_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='introducecollege',
            name='body',
            field=models.TextField(default='', help_text='e.g introduce college body', null=True),
        ),
        migrations.AlterField(
            model_name='introduceprofession',
            name='body',
            field=models.TextField(default='', help_text='e.g introduce profession body', null=True),
        ),
        migrations.AlterField(
            model_name='introduceschool',
            name='body',
            field=models.TextField(default='', help_text='e.g introduce school body', null=True),
        ),
        migrations.AlterField(
            model_name='introducesociety',
            name='body',
            field=models.TextField(default='', help_text='e.g introduce society body', null=True),
        ),
        migrations.AlterField(
            model_name='introduceteacher',
            name='body',
            field=models.TextField(default='', help_text='e.g introduce teacher body', null=True),
        ),
    ]
