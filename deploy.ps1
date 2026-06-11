param(
  [string]$RepoName = 'priya-birthday',
  [switch]$Public
)

# deploy.ps1 — Automate git+GitHub repo creation and push. Uses `gh` if available.
# Run: .\deploy.ps1 -RepoName "priya-birthday" -Public

$cwd = Get-Location
Write-Host "Deploy script running in: $cwd"

function CmdExists($cmd) {
  $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

if (-not (CmdExists git)) {
  Write-Error "Git is not installed. Install git: https://git-scm.com/downloads"; exit 1
}

# Initialize git if needed
if (-not (Test-Path .git)) {
  git init
  git add .
  git commit -m "Initial commit - birthday site"
} else {
  git add .
  git commit -m "Update site" -q 2>$null
}

if (CmdExists gh) {
  Write-Host "GitHub CLI (gh) detected. Creating repo '$RepoName'..."
  $visibility = if ($Public) { '--public' } else { '--private' }
  gh repo create $RepoName $visibility --source=. --remote=origin --push
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "gh command failed. Try running 'gh auth login' and rerun the script."
    exit 1
  }
  Write-Host "Repository created and pushed. Opening repo page..."
  gh repo view --web
  Write-Host "If Pages isn't enabled yet, open Settings → Pages and set source to 'main' branch (root)."
} else {
  Write-Warning "GitHub CLI 'gh' not found. Please create a repository manually and run the following commands:";
  Write-Host "git remote add origin https://github.com/YOUR_USERNAME/$RepoName.git";
  Write-Host "git push -u origin main";
}

Write-Host "Done. If you need help enabling GitHub Pages, open https://github.com/<your-username>/$RepoName/settings/pages";