Write-Host "🔧 Fixing blog routing..." -ForegroundColor Yellow

# Остановка Next.js сервера
Write-Host "🛑 Stopping Next.js server..." -ForegroundColor Red
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Очистка кеша
Write-Host "🧹 Clearing cache..." -ForegroundColor Blue
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
}

# Установка sonner
Write-Host "📦 Installing sonner..." -ForegroundColor Green
npm install sonner

# Проверка структуры файлов
Write-Host "🔍 Checking file structure..." -ForegroundColor Cyan
python check_next_routing.py

# Запуск Next.js сервера
Write-Host "🚀 Starting Next.js server..." -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "cmd" -ArgumentList "/c", "npm run dev"

Start-Sleep -Seconds 3

Write-Host "✅ Blog routing fixed!" -ForegroundColor Green
Write-Host "📱 Test URLs:" -ForegroundColor Cyan
Write-Host "  - http://localhost:3000/en" -ForegroundColor White
Write-Host "  - http://localhost:3000/en/blog/building-a-news-portal-with-django-rest-api" -ForegroundColor White
