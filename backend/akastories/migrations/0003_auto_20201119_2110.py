# Generated by Django 3.1.3 on 2020-11-19 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('akastories', '0002_auto_20201119_1303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storyuser',
            name='username',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
