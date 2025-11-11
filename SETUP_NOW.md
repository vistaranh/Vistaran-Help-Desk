# Quick setup for non-technical users

Yeh file aapke liye step-by-step instructions hai — seedha aur simple. Agar aap chahte hain main aapke saath live hokar har command run karwaun, to kahiyega "Start guide now" aur aap commands copy/paste kar ke run karenge. Main errors turant solve kar dunga.

1) What I can and cannot do for you
- I can prepare the project files, scripts, and instructions (already done). I can NOT create your GitHub or Railway accounts, or push code to your GitHub on your behalf.
- You will need to sign in to GitHub and Railway yourself (takes a few clicks). I will guide you live while you do that.

2) Basic local checks (one-time, run in project folder)
Open PowerShell in `D:\Amar\vistaran-help-desk` and run:
```powershell
# install dependencies
npm ci

# build the frontend
npm run build

# check health (start server in another terminal first)
npm run start
# then, in a different terminal:
Invoke-RestMethod -Uri http://localhost:5000/health
```

If the above returns JSON with "status":"ok", local server is working.

3) Push repository to GitHub (two options)
- Option A — Use GitHub website (manual, easiest):
  1. Go to https://github.com and sign in / create account.
 2. Click New → Repository. Name it `vistaran-help-desk` (or any name).
 3. Do NOT initialize with README (we already have files locally).
 4. After repo is created, GitHub shows commands to push an existing repo. Run those in PowerShell (example):
```powershell
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

- Option B — Use GitHub CLI (`gh`) if installed (one command, optional):
```powershell
gh repo create <your-username>/<your-repo> --public --source=. --remote=origin --push
```

4) Prepare files for Railway & cPanel (I added helpers)
- I added `DEPLOY_RAILWAY.md` and `.nvmrc` for Node 20.
- I also added two PowerShell helper scripts in `scripts/`:
  - `prepare_deploy.ps1` — runs `npm ci`, `npm run build`, and zips `dist` to `dist.zip`.
  - `push_to_github.ps1` — helper to add remote and push if you prefer a script (requires you provide remote URL).

Run these as needed. Example:
```powershell
.\\.\scripts\prepare_deploy.ps1
.\\.\scripts\push_to_github.ps1 -remoteUrl 'https://github.com/<your-username>/<your-repo>.git'
```

5) Deploy to Railway (high level, we'll do it together)
- Sign in to Railway (https://railway.app) with GitHub.
- Create a New Project → Deploy from GitHub → select the repo you just pushed.
- Set Build command: `npm ci && npm run build`
- Set Start command: `npm run start`
- After first deploy completes, copy the Railway host (like `xxx.up.railway.app`) and set these variables in Railway: `VITE_API_URL` and `VITE_WS_URL` (ex: `wss://xxx.up.railway.app/ws`).
- Rebuild frontend locally and re-upload `dist/` to cPanel (we already have an FTP script you used before).

6) If you want me to run commands locally here
- I can create or run scripts in the project, but I cannot run commands on your computer or sign in to services for you. If you want me to walk you, say "Start guide now" and then paste the output of commands I ask you to run.

7) When you're ready
- Tell me: "Start guide now" and I will prompt the first command to run (for example: `git remote -v` or `gh auth status`).

---
If you want immediate help, say: "Start guide now" and we'll begin with verifying your Git remotes and pushing to GitHub.
