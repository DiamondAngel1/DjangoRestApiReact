from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CitySerializer
from .models import City
# Create your views here.
class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

