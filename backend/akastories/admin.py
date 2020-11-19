from django.contrib import admin
from .models import StoryUser

# Register your models here.
class StoryUserAdmin(admin.ModelAdmin):
    list_display = ('nim', 'username', 'updated_at')

admin.site.register(StoryUser, StoryUserAdmin)
