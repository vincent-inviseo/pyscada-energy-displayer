# Generated by Django 4.2.6 on 2023-10-10 12:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pyscada', '0105_edit_generic_device_protocol'),
    ]

    operations = [
        migrations.CreateModel(
            name='EnergyDisplayer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(default='', max_length=400)),
                ('variable', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pyscada.variable', verbose_name='Variable')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]