from django.db import models
from cities.models import City
from users.models import CustomUser

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=250, blank=False)
    description = models.TextField(max_length=4000, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='departments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='departments')

    class Meta:
        db_table = "tblDepartments"
        ordering = ['name']

    def __str__(self):
        return self.name