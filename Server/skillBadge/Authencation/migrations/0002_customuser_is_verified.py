# Generated by Django 5.0.1 on 2024-01-23 08:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Authencation", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="is_verified",
            field=models.BooleanField(default=False),
        ),
    ]