from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model

@receiver(post_migrate)
def create_superuser(sender, **kwargs):
    if sender.name == 'apps.core':
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@vitalyportfolio.com',
                password='admin123'
            )
            print("✅ Superuser created via signal!")