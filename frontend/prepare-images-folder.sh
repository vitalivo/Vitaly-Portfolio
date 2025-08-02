#!/bin/bash

echo "📁 СОЗДАНИЕ СТРУКТУРЫ ПАПОК ДЛЯ ИЗОБРАЖЕНИЙ"
echo "============================================"

# Создаем папки для изображений
mkdir -p public/images/certificates
mkdir -p public/images/projects

echo "✅ Создана папка: public/images/certificates/"
echo "✅ Создана папка: public/images/projects/"

echo ""
echo "📋 СЛЕДУЮЩИЕ ШАГИ:"
echo "1. Добавь сертификаты в public/images/certificates/"
echo "2. Добавь скриншоты проектов в public/images/projects/"
echo "3. Убедись что фото public/images/vitaly-photo.jpg существует"

echo ""
echo "📂 СТРУКТУРА:"
echo "public/"
echo "├── images/"
echo "│   ├── vitaly-photo.jpg (твоя фотография)"
echo "│   ├── certificates/"
echo "│   │   ├── cert1.jpg"
echo "│   │   ├── cert2.jpg"
echo "│   │   └── cert3.jpg"
echo "│   └── projects/"
echo "│       ├── project1.jpg"
echo "│       ├── project2.jpg"
echo "│       └── project3.jpg"
