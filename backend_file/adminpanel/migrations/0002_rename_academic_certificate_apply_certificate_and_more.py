# Generated by Django 4.2.4 on 2023-09-20 10:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='apply',
            old_name='academic_certificate',
            new_name='certificate',
        ),
        migrations.RenameField(
            model_name='apply',
            old_name='current_address',
            new_name='currentAddress',
        ),
        migrations.RenameField(
            model_name='apply',
            old_name='phone',
            new_name='mobile',
        ),
        migrations.RenameField(
            model_name='apply',
            old_name='scan_passport',
            new_name='passport',
        ),
        migrations.RenameField(
            model_name='apply',
            old_name='permanent_address',
            new_name='permanentAddress',
        ),
        migrations.RenameField(
            model_name='apply',
            old_name='pp_photo',
            new_name='photo',
        ),
    ]