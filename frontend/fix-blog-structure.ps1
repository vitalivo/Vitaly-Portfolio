# Очистка кэша Next.js и перезапуск
Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🚀 Starting development server..." -ForegroundColor Green
npm run dev
