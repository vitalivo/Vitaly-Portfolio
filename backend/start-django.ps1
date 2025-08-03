Write-Host "🚀 Запуск Django сервера..." -ForegroundColor Green
Write-Host "=" * 50

# Проверяем, что мы в правильной папке
if (-not (Test-Path "manage.py")) {
    Write-Host "❌ Файл manage.py не найден!" -ForegroundColor Red
    Write-Host "Убедитесь, что вы находитесь в папке backend" -ForegroundColor Yellow
    exit 1
}

# Проверяем виртуальное окружение
if (-not $env:VIRTUAL_ENV) {
    Write-Host "⚠️  Виртуальное окружение не активировано!" -ForegroundColor Yellow
    Write-Host "Активируйте его командой: venv\Scripts\Activate.ps1" -ForegroundColor Yellow
}

Write-Host "🔧 Применение миграций..." -ForegroundColor Cyan
python manage.py migrate

Write-Host "📊 Сбор статических файлов..." -ForegroundColor Cyan
python manage.py collectstatic --noinput

Write-Host "🌐 Запуск сервера на http://127.0.0.1:8000..." -ForegroundColor Green
python manage.py runserver
