#!/usr/bin/env pwsh
# Simple, explicit PowerShell version — no helper functions

try {
    # Detect current branch
    $currentBranch = git rev-parse --abbrev-ref HEAD 2>$null
    if (-not $currentBranch) {
        Write-Host "❌ Unable to detect current branch. Are you in a Git repo?" -ForegroundColor Red
        exit 1
    }

    Write-Host "🔍 Current branch: $currentBranch"

    # Switch to main
    Write-Host "`n> git switch main"
    git switch main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Failed to switch to 'main'. You may have uncommitted changes." -ForegroundColor Red
        exit 1
    }

    # Pull latest main
    Write-Host "`n> git pull origin main"
    git pull origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Failed to pull from origin/main." -ForegroundColor Red
        exit 1
    }

    # If we're already on main, stop here
    if ($currentBranch -eq "main") {
        Write-Host "`n✅ 'main' updated successfully." -ForegroundColor Green
        exit 0
    }

    # Switch back
    Write-Host "`n> git switch $currentBranch"
    git switch $currentBranch
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Failed to switch back to '$currentBranch'." -ForegroundColor Red
        exit 1
    }

    # Merge main
    Write-Host "`n> git merge main --no-edit"
    git merge main --no-edit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Merge failed. Resolve conflicts manually." -ForegroundColor Red
        exit 1
    }

    Write-Host "`n✅ '$currentBranch' is now up to date with 'main'." -ForegroundColor Green
}
catch {
    Write-Host "`n❌ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
