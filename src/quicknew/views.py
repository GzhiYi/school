from rest_framework.decorators import api_view
from rest_framework import viewsets, authentication, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from knox.auth import TokenAuthentication

# Create your views here.


class QuickNewViewSet(GenericAPIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = QuickNewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        news = QuickNew.objects.all()
        serializer = QuickNew(news, many=True)
        return Response(serializer.data)