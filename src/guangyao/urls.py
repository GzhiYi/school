from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from rest_framework.routers import DefaultRouter
from base import views as base_views
from accounts.views import HandlerUserViewSet, UserUpdateView, UserResetPasswordView
from forum.views import *
from quicknew.views import *
from eat.views import *
from introduce.views import *

router = DefaultRouter()
router.register(r'user', HandlerUserViewSet)
router.register(r'user_update', UserUpdateView)
router.register(r'posts', GetPostsViewSet)
router.register(r'posts_top', GetTopPostsViewSet)
router.register(r'posts_recommended', GetRecommendedPostsViewSet)
router.register(r'add_post', AddPostsDataViewSet)
router.register(r'comments', GetCommentsView)
router.register(r'add_comments', AddCommentsViewSet)
router.register(r'quick_new', QuickNewViewSet, base_name='quick new api')
router.register(r'get_quick_new', GetQuickNewViewSet, base_name='get quick new api')
router.register(r'eat', EatViewSet, base_name='quick eat api')
router.register(r'get_eat', GetEatViewSet, base_name='get eat api')
router.register(r'update_base', UpdateBasicIntroduceViewSet, base_name='update base introduce')
router.register(r'reset_pwd', UserResetPasswordView, base_name='reset password')

urlpatterns = [
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/introduce/', include('introduce.urls', namespace='introduce')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),
    url(r'^api/v1/admission/', include('admission.urls', namespace='admission')),
    url(r'^api/v1/handler/', include(router.urls)),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]
