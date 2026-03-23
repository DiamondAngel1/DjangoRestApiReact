from django.db import models

# Create your models here.
class City(models.Model):
    name = models.CharField(
        max_length=255,
        blank=False
    )
    description = models.TextField(
        max_length=4000,
        null=True,
        blank=True
    )
    class Meta:
        db_table = "tblCities"
        ordering = ['name']

    def __str__(self):
        return self.name    
    