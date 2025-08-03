Write-Host "🔧 Исправляем роутинг блога..." -ForegroundColor Yellow
Write-Host "=" * 50

# Остановка серверов
Write-Host "⏹️ Остановка серверов..." -ForegroundColor Blue
taskkill /f /im node.exe 2>$null
taskkill /f /im python.exe 2>$null

# Очистка кэша Next.js
Write-Host "🧹 Очистка кэша Next.js..." -ForegroundColor Blue
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Кэш .next удален" -ForegroundColor Green
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✅ Кэш node_modules удален" -ForegroundColor Green
}

# Удаление middleware если существует
Write-Host "🗑️ Удаление middleware..." -ForegroundColor Blue
if (Test-Path "src/middleware.ts") {
    Remove-Item "src/middleware.ts"
    Write-Host "✅ middleware.ts удален" -ForegroundColor Green
}

# Проверка структуры файлов
Write-Host "📁 Проверка структуры файлов..." -ForegroundColor Blue
$blogPagePath = "src/app/[locale]/blog/[slug]/page.tsx"
if (Test-Path $blogPagePath) {
    Write-Host "✅ Файл $blogPagePath существует" -ForegroundColor Green
} else {
    Write-Host "❌ Файл $blogPagePath не найден!" -ForegroundColor Red
}

Write-Host "=" * 50
Write-Host "🎉 Исправления применены!" -ForegroundColor Green
Write-Host "📝 Теперь запустите:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
