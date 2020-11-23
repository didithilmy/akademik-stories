from django.urls import path
from .views import UserView, UpdateDataView, StoryView, FollowUserView, UnfollowUserView, RemoveFollowerUserView

urlpatterns = [
    path('user/<str:nim>/', UserView.as_view(), name='user'),
    path('story/<str:nim>/', StoryView.as_view(), name='story'),
    path('update/', UpdateDataView.as_view(), name='update-data'),
    path('follow/', FollowUserView.as_view(), name='follow'),
    path('unfollow/', UnfollowUserView.as_view(), name='unfollow'),
    path('remove-follower/', RemoveFollowerUserView.as_view(), name='remove-follower'),
]
