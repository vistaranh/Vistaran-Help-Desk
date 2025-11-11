# Deployment guide for vistaran-help-desk

This document provides quick steps to deploy the project using Docker or PM2 on a Linux server or cloud VM.

1) Prepare environment
   - Copy `.env.example` to `.env` and update values.
   - Ensure `node` and `npm` (or `yarn`) are installed if not using Docker.

2) Using Docker (recommended for consistent builds)
   - Build the image locally:

     ```powershell
     cd path/to/project
     npm ci
     npm run build
     docker build -t vistaran-help-desk .
     docker run --rm -p 5000:5000 --env-file .env vistaran-help-desk
     ```

   - Or use the provided GitHub Actions workflow to build & push to GHCR.

3) Using PM2 (on a server)
   - Install PM2 globally: `npm i -g pm2` (or use the `pm2` devDependency)
   - Start apps: `pm2 start ecosystem.config.js --env production`
   - Save process list: `pm2 save`
   - Setup startup script: `pm2 startup` and follow instructions

4) Reverse proxy & SSL
   - Use Nginx (or Apache) to reverse-proxy port 80/443 to your Node app at `http://localhost:5000`.
   - For WebSocket support, add `proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade";` in your Nginx config.

5) Data and persistence
   - The app stores data in `data/*.json`. For production, mount a persistent volume or use a real database (recommended).

6) Troubleshooting
   - Check logs: `pm2 logs` or `docker logs <container>`.
   - Ensure `.env` is correctly configured and secrets are set.
# Vistaran Help Desk - Deployment Guide

This guide explains how to deploy the Vistaran Help Desk application with real-time capabilities so that both clients and administrators can work with synchronized data 24/7.

## Architecture Overview

The application now includes:

1. **Frontend**: React application with real-time WebSocket connectivity
2. **Real-time Server**: Node.js WebSocket server for synchronizing data between clients
3. **Production Server**: Express server that serves the frontend and handles WebSocket connections

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Application

```bash
npx vite build
```

This creates a production-ready build in the `dist` directory.

### 3. Start the Production Server

```bash
npm run start:prod
```

This starts the Express server on port 3000 (by default) which:
- Serves the frontend application
- Handles WebSocket connections for real-time data synchronization

### 4. Access the Application

- Open your browser and navigate to `http://localhost:3000`
- The WebSocket server will be available at `ws://localhost:3000/ws`

## Real-time Functionality

The application now supports real-time data synchronization between all connected clients:

- When an admin updates a ticket, all clients see the changes immediately
- When a user creates a new ticket, it appears instantly for admins
- All data modifications are broadcast to all connected clients

## Environment Variables

Make sure your `.env.production` file contains the necessary API keys:

```
API_KEY=your_google_genai_api_key_here
```

## Running in Background (Windows)

To run the server continuously in the background on Windows:

```cmd
# Using PowerShell
Start-Process -FilePath "npm" -ArgumentList "run", "start:prod" -WindowStyle Hidden

# Or using the Windows Task Scheduler to start on boot
```

## Deployment to Cloud Platforms

### Deploying to Heroku

1. Create a new Heroku app
2. Add the following buildpacks:
   - `heroku/nodejs`
3. Set environment variables in Heroku dashboard
4. Deploy using Git:
   ```bash
   git push heroku main
   ```

### Deploying to DigitalOcean App Platform

1. Create a new app
2. Link your GitHub repository
3. Set environment variables
4. Configure the build command: `npx vite build`
5. Configure the run command: `npm run start:prod`

## Monitoring and Maintenance

### Health Check

The server provides a health check endpoint at:
```
GET /health
```

This returns:
```json
{
  "status": "ok",
  "clients": 5
}
```

### Logs

Check the console output for:
- Connection status
- Error messages
- Data synchronization events

## Troubleshooting

### WebSocket Connection Issues

1. Ensure the server is running
2. Check that the WebSocket URL is correct (`ws://localhost:3000/ws`)
3. Verify that firewall settings allow connections on port 3000

### Data Not Synchronizing

1. Check browser console for JavaScript errors
2. Verify that the WebSocket connection is established
3. Confirm that the server is receiving and broadcasting messages

## Support

For additional help with deployment, contact the development team.