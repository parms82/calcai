# Start FinCalcAI — runs frontend and backend in parallel
Write-Host "Starting FinCalcAI..." -ForegroundColor Cyan

$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; .\.venv\Scripts\Activate.ps1; uvicorn main:app --reload --port 8000" -PassThru
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -PassThru

Write-Host "Backend  → http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend → http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop both servers."

Wait-Process -Id $frontend.Id
Stop-Process -Id $backend.Id -Force
