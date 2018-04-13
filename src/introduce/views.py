from rest_framework.decorators import api_view
from rest_framework import viewsets, authentication, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from knox.auth import TokenAuthentication


class IntroduceSchoolViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceSchoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntroduceSchoolViewSetWithNoToken(GenericAPIView):

    def get(self, request):
        introduces = IntroduceSchool.objects.order_by('-date_updated')[:1]
        serializer = IntroduceSchoolSerializer(introduces, many=True)
        return Response(serializer.data)


class IntroduceTeacherViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceTeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntroduceTeacherViewSetWithNoToken(GenericAPIView):

    def get(self, request):
        introduces = IntroduceTeacher.objects.order_by('-date_updated')[:1]
        serializer = IntroduceTeacherSerializer(introduces, many=True)
        return Response(serializer.data)


class IntroduceProfessionViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceProfessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntroduceProfessionViewSetWithNoToken(GenericAPIView):

    def get(self, request):
        introduces = IntroduceProfession.objects.order_by('-date_updated')[:1]
        serializer = IntroduceProfessionSerializer(introduces, many=True)
        return Response(serializer.data)


class IntroduceSocietyViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceSocietySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntroduceSocietyViewSetWithNoToken(GenericAPIView):

    def get(self, request):
        introduces = IntroduceSociety.objects.order_by('-date_updated')[:1]
        serializer = IntroduceSocietySerializer(introduces, many=True)
        return Response(serializer.data)


class IntroduceCollegeViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceSocietySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntroduceCollegeViewSetWithNoToken(GenericAPIView):

    def get(self, request):
        introduces = IntroduceCollege.objects.order_by('-date_updated')[:1]
        serializer = IntroduceCollegeSerializer(introduces, many=True)
        return Response(serializer.data)


class PostBasicIntroduceViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceBaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BasicIntroduceViewSet(GenericAPIView):

    def get(self, request):
        introduces = IntroduceBase.objects.all()
        serializer = IntroduceBaseSerializer(introduces, many=True)
        return Response(serializer.data)
