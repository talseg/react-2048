#!/usr/bin/env pwsh
# Equivalent to your Node .cjs version — clean and safe

function Run($cmd, $errorMessage) {
    Write-Host "`n> $cmd"
    try {
        & $cmd
        if ($LASTEXITCODE -ne 0) { throw "Command failed" }
    } catch {
        Write-Host "`n❌ $errorMessage" -ForegroundColor Red
        exit 1
    }
}

try {
    # Detect current branch
    $currentBranch = git rev-parse --abbrev-ref HEAD 2>$null
    if (-not $currentBranch) {
        Write-Host "❌ Unable to detect current branch. Are you in a Git repo?" -ForegroundColor Red
        exit 1
    }

    Write-Host "🔍 Current branch: $currentBranch"

    # Pull latest main
    Run "git switch main" "Failed to switch to 'main'. You may have uncommitted changes."
    Run "git pull origin main" "Failed to pull from origin/main."

    # If already on main, stop here
    if ($currentBranch -eq "main") {
        Write-Host "`n✅ 'main' updated successfully." -ForegroundColor Green
        exit 0
    }

    # Merge main into current branch
    Run "git switch $currentBranch" "Failed to switch back to '$currentBranch'."
    Run "git merge main --no-edit" "Merge failed. Resolve conflicts manually."

    Write-Host "`n✅ '$currentBranch' is now up to date with 'main'." -ForegroundColor Green
}
catch {
    Write-Host "`n❌ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
