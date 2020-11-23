from rest_framework import serializers
from datetime import datetime, timedelta
from .models import StoryUser

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryUser
        fields = ['username', 'updated_at', 'story_image']

class UserStorySerializer(serializers.ModelSerializer):
    stories = serializers.SerializerMethodField() # StorySerializer(many=True, read_only=True)

    def get_stories(self, story_user):
        qs = story_user.following.order_by("-updated_at").exclude(story_image='').filter(updated_at__gte=datetime.utcnow() - timedelta(hours=24))
        return StorySerializer(qs, many=True).data

    class Meta:
        model = StoryUser
        fields = ['stories']


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryUser
        fields = ['username']

class UserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    def get_followers(self, story_user):
        qs = StoryUser.objects.filter(following=story_user)
        return [x.get('username') for x in FollowerSerializer(qs, many=True).data]

    def get_following(self, story_user):
        return [x.username for x in story_user.following.all()]

    class Meta:
        model = StoryUser
        fields = ['username', 'following', 'followers', 'profile_image', 'story_image']


class UpdateDataSerializer(serializers.Serializer):
    nim = serializers.CharField(min_length=8, max_length=8)
    username = serializers.CharField(max_length=20, required=False)
    profile_image = serializers.ImageField(required=False)
    story_image = serializers.ImageField(required=False)


class FollowUserSerializer(serializers.Serializer):
    nim = serializers.CharField(min_length=8, max_length=8)
    username = serializers.CharField(max_length=20, required=False)