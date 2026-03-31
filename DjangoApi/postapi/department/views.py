from rest_framework.viewsets import ModelViewSet

from .models import Department
from .serializer import DepartmentSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    parser_classes = [MultiPartParser, FormParser]