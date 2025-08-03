# Удаляем middleware, так как отказались от него
Write-Host "🔧 Removing middleware..." -ForegroundColor Yellow

# Проверяем существует ли middleware.ts
if (Test-Path "src/middleware.ts") {
    Remove-Item "src/middleware.ts" -Force
    Write-Host "✅ Removed src/middleware.ts" -ForegroundColor Green
} else {
    Write-Host "ℹ️ middleware.ts not found" -ForegroundColor Blue
}

# Очищаем кэш Next.js
Write-Host "🧹 Cleaning Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "✅ Removed .next cache" -ForegroundColor Green
}

Write-Host "🎉 Middleware removed and cache cleared!" -ForegroundColor Green
Write-Host "Now restart the development server:" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor White
