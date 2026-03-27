from rest_framework import serializers
from .models import City

class CitySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = City
        fields = ['id', 'name', 'description', 'image']