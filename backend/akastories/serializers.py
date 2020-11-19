from rest_framework import serializers
from .models import StoryUser

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryUser
        fields = ['username', 'story_image', 'updated_at']

class StoryUserSerializer(serializers.ModelSerializer):
    following = StorySerializer(many=True, read_only=True)

    class Meta:
        model = StoryUser
        fields = ['username', 'following', 'story_image']


class UpdateDataSerializer(serializers.Serializer):
    nim = serializers.CharField(min_length=8, max_length=8)
    username = serializers.CharField(max_length=20, required=False)
    profile_image = serializers.ImageField(required=False)
    story_image = serializers.ImageField(required=False)
