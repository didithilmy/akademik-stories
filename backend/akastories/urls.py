from django.urls import path
from .views import UserView, UpdateDataView, StoryView

urlpatterns = [
    path('user/<str:nim>/', UserView.as_view(), name='user'),
    path('story/<str:nim>/', StoryView.as_view(), name='story'),
    path('update/', UpdateDataView.as_view(), name='update-data'),
]
