# Generated by Django 4.2.3 on 2023-11-13 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('energydisplayer', '0005_remove_energydisplayer_displayertype'),
    ]

    operations = [
        migrations.AddField(
            model_name='energydisplayer',
            name='displayType',
            field=models.CharField(choices=[('Energy consummation', 'Energy consummation'), ('CO2 estimation', 'CO2 estimation')], default=('Energy consummation', 'Energy consummation'), max_length=50, verbose_name='Display type'),
        ),
    ]
