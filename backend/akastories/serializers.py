from rest_framework import serializers
from .models import StoryUser

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryUser
        fields = ['username', 'story_image', 'updated_at']


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryUser
        fields = ['username']

class StoryUserSerializer(serializers.ModelSerializer):
    following = StorySerializer(many=True, read_only=True)
    followers = serializers.SerializerMethodField()

    def get_followers(self, story_user):
        qs = StoryUser.objects.filter(following=story_user)
        return [x.get('username') for x in FollowerSerializer(qs, many=True).data]

    class Meta:
        model = StoryUser
        fields = ['username', 'following', 'followers', 'story_image']


class UpdateDataSerializer(serializers.Serializer):
    nim = serializers.CharField(min_length=8, max_length=8)
    username = serializers.CharField(max_length=20, required=False)
    profile_image = serializers.ImageField(required=False)
    story_image = serializers.ImageField(required=False)
