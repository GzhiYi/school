
from rest_framework import serializers
from .models import School, Profession, Teacher, College
from accounts.serializers import UserSerializer


class SchoolSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = School
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')


class ProfessionSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Profession
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')


class TeacherSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')


class CollegeSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = College
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')

