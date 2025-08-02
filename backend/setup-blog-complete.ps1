Write-Host "🚀 ЗАВЕРШАЕМ НАСТРОЙКУ БЛОГА" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

Write-Host "📸 Добавляем изображения к постам..." -ForegroundColor Yellow
python add_blog_images.py

Write-Host "🔄 Перезапускаем Django сервер..." -ForegroundColor Yellow
Stop-Process -Name "python" -Force -ErrorAction SilentlyContinue
Start-Process python -ArgumentList "manage.py", "runserver" -NoNewWindow

Write-Host "🎯 Проверяем API endpoints..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/blog/posts/" -Method Get
    Write-Host "✅ API работает!" -ForegroundColor Green
} catch {
    Write-Host "❌ Проблема с API" -ForegroundColor Red
}

Write-Host "✅ БЛОГ ПОЛНОСТЬЮ НАСТРОЕН!" -ForegroundColor Green
Write-Host "🌐 Проверь фронтенд: npm run dev" -ForegroundColor Cyan
Write-Host "📱 API доступен: http://127.0.0.1:8000/api/blog/" -ForegroundColor Cyan
