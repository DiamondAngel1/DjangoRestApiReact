from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    user_name = serializers.StringRelatedField(source='user.first_name', read_only=True)  # або можна зробити вкладений серіалізатор
    city_name = serializers.StringRelatedField(source='city.name', read_only=True)  # або можна зробити вкладений серіалізатор

    class Meta:
        model = Department
        fields = [
            'id', 
            'name', 
            'description',
            "city",
            "user",
            "created_at",
            "city_name",
            "user_name"
        ]