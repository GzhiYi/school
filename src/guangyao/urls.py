from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from rest_framework.routers import DefaultRouter
from base import views as base_views
from accounts.views import HandlerUserViewSet
from forum.views import *

router = DefaultRouter()
router.register(r'user', HandlerUserViewSet)
router.register(r'posts', GetPostsViewSet)
router.register(r'add', AddPostsDataViewSet)


urlpatterns = [
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/introduce/', include('introduce.urls', namespace='introduce')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),
    url(r'^api/v1/admission/', include('admission.urls', namespace='admission')),
    url(r'^api/v1/handler/', include(router.urls)),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]
