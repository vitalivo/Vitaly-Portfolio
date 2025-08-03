#!/usr/bin/env python3
"""
Проверка файлов фронтенда с правильными путями
"""

import os
import sys

def check_file_exists(file_path, description):
    """Проверяет существование файла"""
    if os.path.exists(file_path):
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} - НЕ НАЙДЕН")
        return False

def main():
    print("🔍 Проверка файлов фронтенда...")
    print("=" * 50)
    
    # Переходим в папку frontend
    frontend_path = "../frontend"
    if os.path.exists(frontend_path):
        os.chdir(frontend_path)
        print(f"📁 Перешли в папку: {os.getcwd()}")
    else:
        print("❌ Папка frontend не найдена")
        return False
    
    # Список файлов для проверки
    files_to_check = [
        ("src/app/[locale]/layout.tsx", "Layout файл"),
        ("src/app/[locale]/blog/[slug]/page.tsx", "Страница блога"),
        ("src/components/ui/sonner.tsx", "Toaster компонент"),
        ("src/services/blog-api.ts", "API сервис блога"),
        ("src/constants/api.ts", "API константы"),
        ("src/types/api.ts", "API типы"),
        ("src/components/theme-provider.tsx", "Theme Provider"),
        ("src/components/ui/badge.tsx", "Badge компонент"),
        ("src/components/ui/button.tsx", "Button компонент"),
        ("src/components/ui/avatar.tsx", "Avatar компонент"),
        ("src/components/ui/separator.tsx", "Separator компонент"),
    ]
    
    missing_files = []
    
    for file_path, description in files_to_check:
        if not check_file_exists(file_path, description):
            missing_files.append(file_path)
    
    print("=" * 50)
    
    if missing_files:
        print(f"❌ Найдено {len(missing_files)} отсутствующих файлов:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    else:
        print("✅ Все необходимые файлы найдены!")
        return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
