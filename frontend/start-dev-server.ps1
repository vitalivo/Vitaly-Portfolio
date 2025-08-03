Write-Host "🚀 Starting development server..." -ForegroundColor Green

# Проверяем, запущен ли уже сервер
$existingProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { 
    $_.ProcessName -eq "node" -and $_.MainWindowTitle -like "*Next.js*" 
}

if ($existingProcess) {
    Write-Host "⚠️  Next.js server already running. Stopping..." -ForegroundColor Yellow
    $existingProcess | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Очистка кеша
if (Test-Path ".next") {
    Write-Host "🧹 Clearing .next cache..." -ForegroundColor Blue
    Remove-Item -Recurse -Force ".next"
}

# Запуск сервера
Write-Host "▶️  Starting npm run dev..." -ForegroundColor Green
Start-Process -WindowStyle Normal -FilePath "cmd" -ArgumentList "/c", "npm run dev"

Write-Host "✅ Development server starting..." -ForegroundColor Green
Write-Host "🌐 Server will be available at: http://localhost:3000" -ForegroundColor Cyan
