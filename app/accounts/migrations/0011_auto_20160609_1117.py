# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-09 11:17
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_auto_20160608_0745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='key_expires',
            field=models.DateTimeField(default=datetime.datetime(2016, 6, 9, 11, 17, 11, 502190)),
        ),
    ]