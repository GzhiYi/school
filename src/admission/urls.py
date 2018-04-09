from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^handler/$', views.AdmissionStatusViewSet.as_view(), name='admission'),

]
