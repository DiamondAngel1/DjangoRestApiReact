from django.db import models
from django.contrib.auth.models import AbstractUser

# наслідується від AbstractUser, щоб мати всі стандартні поля користувача, такі як username, email, password ітд
class CustomUser(AbstractUser):
    # додаткові поля для зберігання зображень різних розмірів в папці 'images/'
    image_small = models.ImageField(upload_to='images/', blank=True, null=True)
    image_medium = models.ImageField(upload_to='images/', blank=True, null=True)
    image_large = models.ImageField(upload_to='images/', blank=True, null=True)

    # повертає рядкове представлення користувача, в даному випадку його email
    def __str__(self):
        return self.email