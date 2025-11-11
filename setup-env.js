// Script to set up environment variables for testing
// This script creates a .env file with the required API key

import { writeFileSync } from 'fs';

// Check if .env file already exists
import { existsSync } from 'fs';

if (existsSync('.env')) {
  console.log('Environment file (.env) already exists. Skipping creation.');
  console.log('If you need to update your API key, please edit the .env file manually.');
} else {
  // Create .env file with placeholder for API key
  const envContent = `# Vistaran Help Desk Environment Variables
API_KEY=your_google_genai_api_key_here

# To obtain an API key:
# 1. Go to https://aistudio.google.com/app/apikey
# 2. Create a new API key
# 3. Replace "your_google_genai_api_key_here" with your actual API key
`;

  writeFileSync('.env', envContent);
  console.log('Created .env file with placeholder for API key.');
  console.log('Please edit the .env file and add your actual Google Gemini API key.');
}

console.log('\nTo run the AI assistant tests:');
console.log('1. Make sure you have added your API key to the .env file');
console.log('2. Run: npm run test:ai');