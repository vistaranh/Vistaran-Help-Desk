/**
 * PM2 ecosystem file (CommonJS) to run production and realtime servers.
 * Saved as .cjs because the project uses "type": "module" in package.json
 */
module.exports = {
  apps: [
    {
      name: 'vistaran-production',
      script: 'server/production-server.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000
      }
    },
    {
      name: 'vistaran-realtime',
      script: 'server/realtime-server.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.REALTIME_PORT || 4001
      }
    }
  ]
}
