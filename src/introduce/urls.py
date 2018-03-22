from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^school/$', views.IntroduceSchoolViewSet.as_view(), name='school_introduce'),
]
