# Generated by Django 5.0.1 on 2024-01-19 13:12

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Badge_Assignment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "recipient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Badges",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(default="", max_length=10)),
                ("description", models.TextField(default="", max_length=1000)),
                ("criteria", models.CharField(default="", max_length=10)),
                (
                    "image_url",
                    models.ImageField(
                        blank=True, default="", null=True, upload_to="images"
                    ),
                ),
                ("date_created", models.DateField(default=django.utils.timezone.now)),
                ("expiration_durations", models.IntegerField(default=0)),
                (
                    "assigned_users",
                    models.ManyToManyField(
                        related_name="assigned_users",
                        through="Organisation.Badge_Assignment",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "org_id",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="badge_assignment",
            name="badge_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="Organisation.badges"
            ),
        ),
    ]
