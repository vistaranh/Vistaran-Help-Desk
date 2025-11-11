# Vistaran Help Desk - Replit Deployment

This document explains how to deploy the Vistaran Help Desk application on Replit.

## Deployment Steps

1. **Build the Application**:
   ```bash
   npx vite build
   ```

2. **Start the Production Server**:
   ```bash
   npm run start:prod
   ```

3. **Access the Application**:
   - The application will be available at your Replit URL
   - The WebSocket server will be available at the same URL with the `/ws` path

## Configuration

The application is configured to:
- Use port 5000 (Replit's default port)
- Serve static files from the `dist` directory
- Handle WebSocket connections on the `/ws` path
- Automatically handle port conflicts by trying the next available port

## Environment Variables

To enable AI features, set the `API_KEY` environment variable in Replit's secrets:
- Key: `API_KEY`
- Value: Your Google Gemini API key

## Data Persistence

The application stores data in JSON files in the `data` directory:
- `users.json`
- `tickets.json`
- `files.json`
- `technicians.json`
- `symptoms.json`
- `templates.json`
- `departments.json`

These files are automatically created and updated as users interact with the application.