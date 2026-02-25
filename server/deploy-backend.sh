#!/bin/bash

# Backend Deployment Script
# This script helps you create a separate repository for backend deployment

echo "================================"
echo "TechStorm Backend Deployment Setup"
echo "================================"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " username
repoName="TechStorm-Backend"

echo ""
echo "Step 1: Creating backend repository locally..."

# Create new directory
backendDir="../TechStorm-Backend"
if [ -d "$backendDir" ]; then
    echo "Warning: Directory $backendDir already exists!"
    read -p "Do you want to delete it and start fresh? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        rm -rf "$backendDir"
    else
        echo "Aborting..."
        exit 1
    fi
fi

mkdir -p "$backendDir"
echo "✓ Created directory: $backendDir"

# Copy server files
echo ""
echo "Step 2: Copying server files..."
cp -r ./* "$backendDir/" 2>/dev/null || true
rm -rf "$backendDir/node_modules"
rm -f "$backendDir/.env"
rm -f "$backendDir"/*.log
echo "✓ Copied all server files"

# Initialize git
echo ""
echo "Step 3: Initializing Git repository..."
cd "$backendDir"
git init
git add .
git commit -m "Initial backend setup for Vercel deployment"
echo "✓ Git initialized and files committed"

# Instructions for GitHub
echo ""
echo "================================"
echo "NEXT STEPS:"
echo "================================"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: $repoName"
echo "   - Make it Public or Private"
echo "   - DO NOT initialize with README"
echo ""
echo "2. After creating the repo, run these commands:"
echo ""
echo "   cd $backendDir"
echo "   git remote add origin https://github.com/$username/$repoName.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to: https://vercel.com/new"
echo "   - Import your $repoName repository"
echo "   - Add environment variables from .env.example"
echo "   - Click Deploy!"
echo ""
echo "================================"
echo "✓ Setup complete! Follow the steps above."
echo "================================"
echo ""
echo "For detailed instructions, see: $backendDir/DEPLOYMENT.md"
