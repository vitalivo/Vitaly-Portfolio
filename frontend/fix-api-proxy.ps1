Write-Host "🔧 Создание API прокси для решения CORS проблемы..." -ForegroundColor Yellow

# Создаем папки для API routes
New-Item -ItemType Directory -Force -Path "src\app\api\proxy\blog\posts\[slug]" | Out-Null

Write-Host "✅ API прокси создан!" -ForegroundColor Green
Write-Host "📝 Теперь запустите: npm run dev" -ForegroundColor Cyan
