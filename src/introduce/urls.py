from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import introduce.views


urlpatterns = [
    url(_(r'^school/$'),
        introduce.views.IntroduceSchoolView.as_view(),
        name='school'),
]
