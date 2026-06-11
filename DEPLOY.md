Deploying "bd" to GitHub Pages

This guide automates deployment to GitHub Pages. I included a PowerShell script `deploy.ps1` to help — it will use the GitHub CLI (`gh`) if available, otherwise it prints manual commands.

Quick manual steps (if you prefer):

1. Create a GitHub repository (e.g., `priya-birthday`).
2. From the project folder:

```powershell
cd "C:\Users\welcome\Desktop\bd"
git init
git add .
git commit -m "Initial commit - birthday site"
git branch -M main
# replace URL below with your repo URL
git remote add origin https://github.com/YOUR_USERNAME/priya-birthday.git
git push -u origin main
```

3. On GitHub: Settings → Pages → Source: `main` branch (root) → Save. Your site will be available at:

```
https://YOUR_USERNAME.github.io/priya-birthday/
```

Automated (recommended if you have `gh`):

1. Install Git: https://git-scm.com/downloads
2. Install GitHub CLI: https://cli.github.com/
3. Authenticate `gh`: `gh auth login`
4. Run the script in PowerShell (run as your user):

```powershell
.\deploy.ps1 -RepoName "priya-birthday" -Public
```

What the script does when `gh` is available:
- Initializes `git` if needed, commits files
- Creates a new GitHub repo (`gh repo create`) with the provided name
- Pushes `main` branch
- Opens the repository page and shows the expected Pages URL

If `gh` is not available the script prints the manual commands above.

Notes:
- The script does not transmit your files to any external service without your consent — it runs locally and calls `gh` and `git` on your machine.
- If you want me to attempt creating the repo for you, I can prepare a `gh` command here, but you must run it locally to authorize.

Enjoy — tell me if you want me to also create a small CI workflow to auto-deploy on pushes.
