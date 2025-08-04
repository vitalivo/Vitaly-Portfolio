from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SiteSettings, SEOSettings
from .serializers import SiteSettingsSerializer, SEOSettingsSerializer

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def setup_data(request):
    try:
        User = get_user_model()
        
        # Создаем суперпользователя
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@vitalyportfolio.com',
                password='admin123'
            )
            user_created = True
        else:
            user_created = False
            
        # Создаем тестовые посты
        from apps.blog.models import Post
        posts_created = 0
        
        if Post.objects.count() == 0:
            Post.objects.create(
                title="Welcome to My Blog",
                content="This is my first blog post. Welcome to my portfolio!",
                is_published=True
            )
            Post.objects.create(
                title="About My Projects",
                content="Here I share information about my development projects and experience.",
                is_published=True
            )
            Post.objects.create(
                title="Latest Updates",
                content="Stay tuned for the latest updates and news from my work.",
                is_published=True
            )
            posts_created = 3
            
        return JsonResponse({
            "status": "success",
            "superuser_created": user_created,
            "posts_created": posts_created,
            "message": "✅ Setup completed successfully!"
        })
        
    except Exception as e:
        return JsonResponse({
            "status": "error", 
            "message": f"❌ Error: {str(e)}"
        })

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'ok', 'message': 'API is working'})

class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.filter(is_active=True)
    serializer_class = SiteSettingsSerializer

class SEOSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SEOSettings.objects.filter(is_active=True)
    serializer_class = SEOSettingsSerializer
