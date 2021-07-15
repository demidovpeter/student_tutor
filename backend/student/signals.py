from django.dispatch import receiver
from django.db.models.signals import post_save, Signal

from student.models import CustomUser, Profile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
