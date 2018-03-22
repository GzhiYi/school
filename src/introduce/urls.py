from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^school/$', views.IntroduceViewSet.as_view(), name='post_introduce'),
    url(r'^school/public/$', views.IntroduceViewSetWithNoToken.as_view(), name='introduce_with_no_token'),
    url(r'^school/basic/$', views.BasicIntroduceViewSet.as_view(), name='introduce_in_basic'),
]
