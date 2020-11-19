from django.db import models
from django_resized import ResizedImageField

# Create your models here.

def profile_image_file_name(instance, filename):
    return '/'.join(['profile', instance.nim + '.jpg'])

def story_file_name(instance, filename):
    return '/'.join(['story', instance.nim + '.jpg'])

class StoryUser(models.Model):
    nim = models.CharField(max_length=8, primary_key=True)
    username = models.CharField(max_length=20)
    updated_at = models.DateTimeField(auto_now=True)
    following = models.ManyToManyField("self", symmetrical=False, blank=True)
    profile_image = ResizedImageField(size=[500, 300], upload_to=profile_image_file_name, blank=True, null=True, quality=100, force_format='JPEG', keep_meta=False)
    story_image = ResizedImageField(size=[1000, 1000], upload_to=story_file_name, blank=True, null=True, quality=100, force_format='JPEG', keep_meta=False)

    def __str__(self):
        return self.nim

