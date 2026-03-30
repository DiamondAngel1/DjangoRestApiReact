from .models import CustomUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# використовується для перетворення об'єктів CustomUser у формат JSON та навпаки. 
# Він визначає, які поля моделі CustomUser будуть включені в серіалізацію та десеріалізацію.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'image_small', 
            'image_medium', 
            'image_large'
        ]

# цей клас розширює стандартний TokenObtainPairSerializer, щоб додати додаткові поля до JWT токена, 
# який генерується при аутентифікації користувача.
# після логіну клієнт отримує не тільки access і refresh, а й додаткові дані
# про користувача всередині токена, що дозволяє клієнту отримувати інформацію про користувача без необхідності
# робити додаткові запити до API для отримання цих даних.
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        # token['phone'] = user.phone if user.phone else None
        token['image'] = user.image_small.url if user.image_small else None
        token['date_joined'] = user.date_joined.strftime('%Y-%m-%d %H:%M:%S')

        return token