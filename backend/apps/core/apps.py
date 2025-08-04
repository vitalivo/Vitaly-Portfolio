from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.core'
    
    def ready(self):
        # Создаем суперпользователя при старте приложения
        try:
            from django.core.management import call_command
            call_command('create_superuser')
        except Exception as e:
            print(f"Error creating superuser: {e}")