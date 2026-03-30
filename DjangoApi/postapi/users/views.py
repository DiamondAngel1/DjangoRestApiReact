import random
from rest_framework import viewsets, parsers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer


from .models import CustomUser

# Create your views here.
FIRST_NAMES = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
LAST_NAMES = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Lee"]
DOMAINS = ["example.com", "test.com", "mail.com"]


# ця функція генерує випадкових користувачів з унікальними іменами користувачів, випадковими іменами, 
# прізвищами та електронними адресами. Вона створює об'єкти CustomUser у базі даних та повертає список створених користувачів.
def generate_random_users(n=5):
    created_users = []

    for _ in range(n):
        while True:
            username = f"user{random.randint(1000, 9999)}"
            if not CustomUser.objects.filter(username=username).exists():
                break

        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(DOMAINS)}"

        user = CustomUser.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        created_users.append(user)

    return created_users

# цей клас визначає набір представлень для роботи з користувачами. Він дозволяє отримувати
#  список користувачів, отримувати деталі конкретного користувача та генерувати випадкових 
# користувачів через спеціальний маршрут.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    @action(detail=False, methods=["post"])
    def generate(self, request):
        users = generate_random_users(5)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    


# цей клас визначає представлення для обробки запитів на логін користувача. 
# Він використовує кастомний серіалізатор CustomTokenObtainPairSerializer,
# який додає додаткові поля до JWT токена, що генерується при аутентифікації користувача
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # print('-------working login--------')
        serializer = self.get_serializer(data=request.data)
        # print("-----data server------", serializer)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"detail": "Invalid credentials"}, status=401)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)