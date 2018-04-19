from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer


class AdmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdmissionStatus
        fields = ('id', 'name', 'id_num', 'status')
