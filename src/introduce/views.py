from rest_framework.decorators import api_view
from rest_framework import viewsets, authentication, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from knox.auth import TokenAuthentication
import django_filters.rest_framework

class DefaultsMixin(viewsets.ModelViewSet):

    """
    Default settings for view auth, permissions,
    filtering and pagination
    """

    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )
    paginate_by = 25
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
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


#  介绍老师
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


#  介绍专业
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


#  介绍社团
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


#  介绍学院
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


#  基本介绍
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


class UpdateBasicIntroduceViewSet(DefaultsMixin):
    queryset = IntroduceBase.objects.all()
    serializer_class = IntroduceBaseSerializer

    def list(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)

    def put(self, request, *args, **kwargs):
        t = request.data['introduce_type']
        title = request.data['title']
        cover = request.data['cover']
        put_target = IntroduceBase.objects.get(introduce_type=t)
        put_target.title = title
        put_target.cover_image = cover
        put_target.save()
        print(request, "有什么")
        return Response({
            'introduce_base': self.get_serializer(request.user).data
        })
