from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    email = models.EmailField(unique=True, blank=False, max_length=254, verbose_name="email address")

    USERNAME_FIELD = "email"   # e.g: "username", "email"
    EMAIL_FIELD = "email"         # e.g: "email", "primary_email"
    REQUIRED_FIELDS = ['username', 'password']


class Profile(models.Model):
    """
    Student profile fields
    User `name` is stored a part of user registration data to avoid ambiguity
    """
    STATUS_CHOICES = (
        ('pending', 'pending'),
        ('approved', 'approved'),
        ('rejected', 'rejected'),
    )
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    portrayed_as = models.TextField(unique=False, null=False, default='')
    portrayed_as_prev = models.TextField(unique=False, null=False, default='')
    nickname = models.TextField(unique=False, null=False, default='')
    nickname_prev = models.TextField(unique=False, null=False, default='')
    submitted = models.BooleanField(default=False)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='approved')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
