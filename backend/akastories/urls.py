from django.urls import path
from .views import StoryUserView, UpdateDataView

urlpatterns = [
    path('story/<str:nim>/', StoryUserView.as_view(), name='story-user'),
    path('update/', UpdateDataView.as_view(), name='update-data'),
]
