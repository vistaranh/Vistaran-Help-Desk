# Backend Deployment Guide for Vistaran Help Desk

This guide explains how to deploy the backend servers of your Vistaran Help Desk application to Node.js hosting services like Render, Railway, or Heroku.

## Prerequisites

1. A GitHub/GitLab account with your code repository
2. A Google Gemini API key for AI features
3. A Node.js hosting service account (Render, Railway, or Heroku)

## Deployment Steps

### 1. Prepare Your Code Repository

Make sure your code is in a Git repository with the following structure:
```
vistaran-help-desk/
├── server/
│   ├── production-server.js
│   └── realtime-server.js
├── package.json
├── .env (don't commit this to Git)
└── ... (other files)
```

### 2. Environment Variables

You'll need to set these environment variables in your hosting service:

- `API_KEY` - Your Google Gemini API key
- `PORT` - The port for your server (usually provided by the hosting service)

### 3. Deployment to Render

1. Go to [render.com](https://render.com) and create an account
2. Click "New+" and select "Web Service"
3. Connect your GitHub/GitLab repository
4. Configure the service:
   - Name: `vistaran-help-desk-backend`
   - Environment: `Node`
   - Build command: `npm install`
   - Start command: `npm run start:prod`
5. Add environment variables in the "Advanced" section
6. Click "Create Web Service"

### 4. Deployment to Railway

1. Go to [railway.app](https://railway.app) and create an account
2. Click "New Project" and select "Deploy from GitHub"
3. Connect your repository
4. Railway will auto-detect the Node.js environment
5. In the service settings, set:
   - Start command: `npm run start:prod`
6. Add environment variables in the "Variables" section

### 5. Deployment to Heroku

1. Install Heroku CLI
2. Log in: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set API_KEY=your_google_gemini_api_key
   ```
5. Deploy: `git push heroku main`

## Important Notes

1. **Two Servers**: Your application has two separate servers:
   - Production server (serves frontend files and handles some WebSocket connections)
   - Real-time server (handles real-time WebSocket communication)

2. **Port Configuration**: Hosting services typically provide a `PORT` environment variable. Your servers are already configured to use this.

3. **Data Persistence**: The servers save data to JSON files in a `data/` directory. On some hosting services, this data may not persist between deployments. Consider using a database for production use.

4. **WebSocket Connections**: Make sure your hosting service supports WebSocket connections on the `/ws` path.

## Troubleshooting

- If you see "Port in use" errors, check that you're not trying to run both servers on the same port
- Ensure your `API_KEY` is correctly set for AI features
- Check server logs for any error messages