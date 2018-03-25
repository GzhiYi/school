
from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer


class IntroduceSchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = IntroduceSchool
        fields = ('id', 'title', 'body', 'cover_image', 'date_created', 'date_updated')


class IntroduceProfessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = IntroduceProfession
        fields = ('id', 'title', 'body', 'cover_image', 'date_created', 'date_updated')


class IntroduceTeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = IntroduceTeacher
        fields = ('id', 'title', 'body', 'cover_image', 'date_created', 'date_updated')


class IntroduceSocietySerializer(serializers.ModelSerializer):

    class Meta:
        model = IntroduceSociety
        fields = ('id', 'title', 'body', 'cover_image', 'date_created', 'date_updated')


class IntroduceCollegeSerializer(serializers.ModelSerializer):

    class Meta:
        model = IntroduceCollege
        fields = ('id', 'title', 'body', 'cover_image', 'date_created', 'date_updated')


class IntroduceBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntroduceBase
        fields = ('id', 'title', 'cover_image', 'description',)
