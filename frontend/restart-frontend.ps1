Write-Host "🔄 Restarting frontend..." -ForegroundColor Yellow

# Kill existing Next.js processes
Write-Host "🛑 Stopping existing processes..." -ForegroundColor Red
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" } | Stop-Process -Force

# Clear Next.js cache
Write-Host "🧹 Clearing cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

# Start development server
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

Write-Host "✅ Frontend restarted successfully!" -ForegroundColor Green
Write-Host "📱 Open: http://localhost:3000" -ForegroundColor Cyan
