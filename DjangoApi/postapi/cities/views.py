from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CitySerializer
from drf_spectacular.utils import extend_schema
from .models import City
from rest_framework.parsers import MultiPartParser, FormParser

@extend_schema(tags=['Cities'])
# Create your views here.
class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    parser_classes = [MultiPartParser, FormParser]

    