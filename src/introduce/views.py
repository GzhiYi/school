from rest_framework.decorators import api_view
from rest_framework import viewsets, authentication, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from knox.auth import TokenAuthentication


class IntroduceViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = IntroduceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntroduceViewSetWithNoToken(GenericAPIView):

    def get(self, request):
        introduces = Introduce.objects.order_by('-date_updated')[:1]
        serializer = IntroduceSerializer(introduces, many=True)
        return Response(serializer.data)


class BasicIntroduceViewSet(GenericAPIView):

    def get(self, request):
        introduces = Introduce.objects.all()
        serializer = BasicIntroduceSerializer(introduces, many=True)
        return Response(serializer.data)