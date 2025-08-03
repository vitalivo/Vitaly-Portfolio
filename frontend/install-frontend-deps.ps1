Write-Host "🚀 Установка зависимостей фронтенда..." -ForegroundColor Green
Write-Host "=" * 50

# Проверяем, что мы в правильной папке
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Файл package.json не найден!" -ForegroundColor Red
    Write-Host "Убедитесь, что вы находитесь в папке frontend" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Установка основных зависимостей..." -ForegroundColor Cyan

# Устанавливаем все необходимые зависимости
npm install @radix-ui/react-separator @radix-ui/react-avatar next-intl next-themes sonner

Write-Host "✅ Зависимости установлены!" -ForegroundColor Green

Write-Host "🧹 Очистка кэша..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Папка .next удалена" -ForegroundColor Green
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✅ Кэш node_modules очищен" -ForegroundColor Green
}

Write-Host "🎉 Готово! Теперь можно запустить:" -ForegroundColor Green
Write-Host "npm run dev" -ForegroundColor Yellow
