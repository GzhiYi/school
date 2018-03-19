
from rest_framework import serializers
from .models import School, Profession, Teacher, College
from accounts.models import User


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ('title', 'body', 'cover_image', 'created_by', 'date_created', 'date_updated')

