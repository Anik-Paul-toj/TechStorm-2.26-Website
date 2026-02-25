# Backend Deployment Script for Windows PowerShell
# This script helps you create a separate repository for backend deployment

Write-Host "================================" -ForegroundColor Cyan
Write-Host "TechStorm Backend Deployment Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
$repoName = "TechStorm-Backend"

Write-Host ""
Write-Host "Step 1: Creating backend repository locally..." -ForegroundColor Yellow

# Create new directory
$backendDir = Join-Path $PSScriptRoot "..\TechStorm-Backend"
if (Test-Path $backendDir) {
    Write-Host "Warning: Directory $backendDir already exists!" -ForegroundColor Red
    $confirm = Read-Host "Do you want to delete it and start fresh? (y/n)"
    if ($confirm -eq "y") {
        Remove-Item -Recurse -Force $backendDir
    } else {
        Write-Host "Aborting..." -ForegroundColor Red
        exit
    }
}

New-Item -ItemType Directory -Path $backendDir | Out-Null
Write-Host "✓ Created directory: $backendDir" -ForegroundColor Green

# Copy server files
Write-Host ""
Write-Host "Step 2: Copying server files..." -ForegroundColor Yellow
$serverDir = Join-Path $PSScriptRoot "."
Copy-Item -Path "$serverDir\*" -Destination $backendDir -Recurse -Exclude @("node_modules", ".env", "*.log")
Write-Host "✓ Copied all server files" -ForegroundColor Green

# Initialize git
Write-Host ""
Write-Host "Step 3: Initializing Git repository..." -ForegroundColor Yellow
Set-Location $backendDir
git init
git add .
git commit -m "Initial backend setup for Vercel deployment"
Write-Host "✓ Git initialized and files committed" -ForegroundColor Green

# Instructions for GitHub
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a new repository on GitHub:" -ForegroundColor Yellow
Write-Host "   - Go to: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: $repoName" -ForegroundColor White
Write-Host "   - Make it Public or Private" -ForegroundColor White
Write-Host "   - DO NOT initialize with README" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating the repo, run these commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   cd $backendDir" -ForegroundColor Green
Write-Host "   git remote add origin https://github.com/$username/$repoName.git" -ForegroundColor Green
Write-Host "   git branch -M main" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "3. Deploy to Vercel:" -ForegroundColor Yellow
Write-Host "   - Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "   - Import your $repoName repository" -ForegroundColor White
Write-Host "   - Add environment variables from .env.example" -ForegroundColor White
Write-Host "   - Click Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✓ Setup complete! Follow the steps above." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, see: $backendDir\DEPLOYMENT.md" -ForegroundColor Cyan
