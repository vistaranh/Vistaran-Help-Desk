// Test script for Vistaran AI Assistant
// This script tests the basic functionality of the AI assistant

import { aiAssistant } from './utils/ai-assistant.ts';

async function main() {
  try {
    console.log("Testing Vistaran AI Assistant...");
    
    // Test basic AI explanation
    console.log("\n1. Testing AI explanation:");
    const explanation = await aiAssistant.explainAI();
    console.log("AI Explanation:", explanation);
    
    // Test custom query
    console.log("\n2. Testing custom query:");
    const response = await aiAssistant.generateResponse("What are the benefits of using AI in a help desk system?");
    console.log("Custom Query Response:", response);
    
    console.log("\nAI Assistant test completed successfully!");
  } catch (error) {
    console.error("Error testing AI Assistant:", error.message);
  }
}

// Run the test
main();