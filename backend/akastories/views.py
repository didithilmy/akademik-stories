from django.shortcuts import render
from django.utils.timezone import make_aware
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from .serializers import UserSerializer, UpdateDataSerializer, UserStorySerializer
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

        return Response({ 'success': True })