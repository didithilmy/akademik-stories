from django.shortcuts import render
from django.utils.timezone import make_aware
from django.db import IntegrityError
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from .serializers import UserSerializer, UpdateDataSerializer, UserStorySerializer, FollowUserSerializer
from .models import StoryUser
# Create your views here.

class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'nim'
    queryset = StoryUser.objects.all()


class StoryView(generics.RetrieveAPIView):
    serializer_class = UserStorySerializer
    lookup_field = 'nim'
    queryset = StoryUser.objects.all()


class UpdateDataView(generics.GenericAPIView):
    serializer_class = UpdateDataSerializer
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({'code': 'input_error', 'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        nim = serializer.validated_data['nim']
        username = serializer.validated_data.get('username')
        story_image = serializer.validated_data.get('story_image')
        profile_image = serializer.validated_data.get('profile_image')
        
        story_user, created = StoryUser.objects.get_or_create(nim=nim)

        if username:
            story_user.username = username
        
        if story_image:
            story_user.story_image = story_image
        
        if profile_image:
            story_user.profile_image = profile_image
        
        try:
            story_user.save()
            return Response(UserSerializer(story_user).data)
        except IntegrityError:
            return Response({'code': 'username_taken', 'detail': 'Username is taken'}, status=status.HTTP_400_BAD_REQUEST)


class FollowUserView(generics.GenericAPIView):
    serializer_class = FollowUserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({'code': 'input_error', 'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = StoryUser.objects.get(nim=serializer.validated_data['nim'])
            to_follow = StoryUser.objects.get(username=serializer.validated_data['username'])
            user.following.add(to_follow)
            return Response({ 'success': True })
        except StoryUser.DoesNotExist:
            return Response({'code': 'not_found', 'detail': 'user not found'}, status=status.HTTP_404_NOT_FOUND)


class UnfollowUserView(generics.GenericAPIView):
    serializer_class = FollowUserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({'code': 'input_error', 'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = StoryUser.objects.get(nim=serializer.validated_data['nim'])
            to_follow = StoryUser.objects.get(username=serializer.validated_data['username'])
            user.following.remove(to_follow)
            return Response({ 'success': True })
        except StoryUser.DoesNotExist:
            return Response({'code': 'not_found', 'detail': 'user not found'}, status=status.HTTP_404_NOT_FOUND)


class RemoveFollowerUserView(generics.GenericAPIView):
    serializer_class = FollowUserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({'code': 'input_error', 'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = StoryUser.objects.get(username=serializer.validated_data['username'])
            to_follow = StoryUser.objects.get(nim=serializer.validated_data['nim'])
            user.following.remove(to_follow)
            return Response({ 'success': True })
        except StoryUser.DoesNotExist:
            return Response({'code': 'not_found', 'detail': 'user not found'}, status=status.HTTP_404_NOT_FOUND)