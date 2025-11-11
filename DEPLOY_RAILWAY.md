# Deploying vistaran-help-desk to Railway

This document contains step-by-step instructions to deploy the project to Railway, including exact build/start commands and environment variables.

Prereqs
- A Railway account (https://railway.app). Sign in with GitHub for easiest flow.
- Repo pushed to GitHub (if you haven't pushed yet, see "Push repo to GitHub" below).

Recommended approach
- Use Railway's GitHub integration (Deploy from GitHub) and let Railway run the Node build. If you prefer reproducible images, deploy using the project's `Dockerfile`.

Quick checklist
1. Push repo to GitHub (if needed).
2. Create Railway Project -> Deploy from GitHub (select repo) OR Deploy using Dockerfile.
3. If using GitHub build: set Build and Start commands below. If Docker: no build/start override needed.
4. After first successful deploy, copy the Railway service hostname and set `VITE_API_URL` and `VITE_WS_URL`, then rebuild the frontend and upload `dist/` to your cPanel.

Push repo to GitHub (if not already)
```powershell
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

Railway settings (recommended when NOT using Docker)
- Build command:
```
npm ci && npm run build
```
- Start command:
```
npm run start
```

Environment variables (add these in Railway Project → Variables)
- NODE_ENV = production
- API_KEY = (optional, any string)
- VITE_API_URL = https://<your-railway-host>  # set after first deploy
- VITE_WS_URL = wss://<your-railway-host>/ws     # set after first deploy
- (Optional) REALTIME_PORT = 4001               # only if using separate realtime service

Notes & gotchas
- The server reads `process.env.PORT` (Railway sets this for you). `npm run start` is already correct.
- The project writes to `data/*.json` on disk. Railway's filesystem is ephemeral — file writes will not persist between restarts or deploys. For production persistence, migrate data to an external DB (MySQL/Postgres) or object storage.
- After the first deploy Railway will show the service hostname (like `my-app.up.railway.app`). Use that value for `VITE_API_URL`/`VITE_WS_URL`, then rebuild the frontend and upload `dist/` to cPanel so your static site connects to the live backend.

Testing after deploy
- Health check: `https://<your-railway-host>/health` -> should return JSON {"status":"ok"}.
- WebSocket: connect to `wss://<your-railway-host>/ws`.

If build fails
- Paste the Railway build log here. Common fixes:
  - Ensure Node version matches (use `.nvmrc` to pin).
  - Add missing dependencies (`npm ci` should install exact lockfile). If non-deterministic errors occur, try clearing cache in Railway.

Rebuild frontend and re-upload to cPanel (after setting VITE envs)
```powershell
npm ci
npm run build
# then upload contents of ./dist to your cPanel public_html path
.
```

Optional repo helpers I added/that you can add
- `.nvmrc` — recommended to pin Node version for Railway.
- `Dockerfile` — project already contains a Dockerfile. Use Docker deployment if you need exact runtime.

If you want, I can: create `.nvmrc` (Node 20), add a short `railway.json` helper, or walk you live through the Railway steps and interpret logs. Tell me which you prefer.

---
End of file
