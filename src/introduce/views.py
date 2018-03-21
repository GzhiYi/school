from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .models import School
from .serializers import SchoolSerializer


class IntroduceSchoolView(APIView):
    def get(self, request, format=None):
        schools = School.objects.all()
        print(request)
        serializer = SchoolSerializer(schools, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        serializer = SchoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)