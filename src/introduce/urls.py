from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^school/$', views.IntroduceSchoolViewSet.as_view(), name='post_introduce'),
    url(r'^school/public/$', views.IntroduceSchoolViewSetWithNoToken.as_view(), name='introduce_with_no_token'),
    url(r'^basic/$', views.BasicIntroduceViewSet.as_view(), name='introduce_in_basic'),
    url(r'^basic/post/$', views.PostBasicIntroduceViewSet.as_view(), name='introduce_with_no_token'),

    url(r'^teacher/$', views.IntroduceTeacherViewSet.as_view(), name='post_introduce1'),
    url(r'^teacher/public/$', views.IntroduceTeacherViewSetWithNoToken.as_view(), name='introduce_with_no_token1'),

    url(r'^society/$', views.IntroduceSocietyViewSet.as_view(), name='post_introduce2'),
    url(r'^society/public/$', views.IntroduceSocietyViewSetWithNoToken.as_view(), name='introduce_with_no_token2'),

    url(r'^college/$', views.IntroduceCollegeViewSet.as_view(), name='post_introduce3'),
    url(r'^college/public/$', views.IntroduceCollegeViewSetWithNoToken.as_view(), name='introduce_with_no_token3'),

    url(r'^profession/$', views.IntroduceProfessionViewSet.as_view(), name='post_introduce4'),
    url(r'^profession/public/$', views.IntroduceProfessionViewSetWithNoToken.as_view(), name='introduce_with_no_token4'),
]
