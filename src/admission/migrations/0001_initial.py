# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-27 08:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdmissionStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='e.g admission user name', max_length=50, null=True)),
                ('id_num', models.CharField(default='', help_text='e.g admission id', max_length=100, null=True)),
                ('status', models.IntegerField(default=0, help_text='e.g admission status')),
            ],
        ),
    ]
