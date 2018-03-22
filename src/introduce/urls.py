from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^school/$', views.IntroduceViewSet.as_view(), name='post_school_introduce'),
    url(r'^school/public/$', views.IntroduceSchoolViewSetWithNoToken.as_view(), name='school_introduce'),
]
