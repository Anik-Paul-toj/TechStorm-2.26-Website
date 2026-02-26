/**
 * Get role credentials from environment variable (production) or local file (development)
 * 
 * In production (Vercel), credentials are stored as base64 encoded JSON in ROLE_CREDENTIALS env var
 * In development, credentials are read from roleCredentials.json file
 */

const getCredentials = () => {
  // PRODUCTION: Try to load from environment variable (Vercel)
  if (process.env.ROLE_CREDENTIALS) {
    try {
      console.log('📦 Loading credentials from environment variable (ROLE_CREDENTIALS)');
      
      // Decode base64 to JSON string
      const decoded = Buffer.from(process.env.ROLE_CREDENTIALS, 'base64').toString('utf-8');
      
      // Parse JSON string to JavaScript object
      const credentials = JSON.parse(decoded);
      
      console.log('✅ Successfully loaded credentials from environment variable');
      console.log(`   - Core: ${credentials.core?.length || 0} users`);
      console.log(`   - Coordinators: ${credentials.coordinator?.length || 0} users`);
      console.log(`   - Volunteers: ${credentials.volunteer?.length || 0} users`);
      
      return credentials;
    } catch (error) {
      console.error('❌ Failed to decode ROLE_CREDENTIALS from environment variable:', error.message);
      console.error('   Make sure the environment variable is valid base64 encoded JSON');
    }
  }

  // DEVELOPMENT: Try to load from local file
  try {
    console.log('📄 Loading credentials from local file (roleCredentials.json)');
    const credentials = require('./roleCredentials.json');
    
    console.log('✅ Successfully loaded credentials from local file');
    console.log(`   - Core: ${credentials.core?.length || 0} users`);
    console.log(`   - Coordinators: ${credentials.coordinator?.length || 0} users`);
    console.log(`   - Volunteers: ${credentials.volunteer?.length || 0} users`);
    
    return credentials;
  } catch (error) {
    console.error('❌ Failed to load roleCredentials.json:', error.message);
  }

  // FALLBACK: Return empty structure
  console.warn('⚠️ No credentials found! Returning empty structure.');
  console.warn('   Set ROLE_CREDENTIALS environment variable or create roleCredentials.json');
  
  return {
    core: [],
    coordinator: [],
    volunteer: []
  };
};

module.exports = getCredentials;
