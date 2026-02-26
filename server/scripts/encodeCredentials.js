/**
 * Encode roleCredentials.json to base64 for use as environment variable
 * 
 * Usage:
 *   node scripts/encodeCredentials.js
 * 
 * This will:
 * 1. Read roleCredentials.json
 * 2. Convert to base64
 * 3. Display the encoded string for Vercel environment variables
 * 4. Save to .credentials.base64 file
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

console.log(`\n${colors.bright}${colors.cyan}🔐 Encoding Role Credentials for Vercel${colors.reset}\n`);

// Read the credentials file
const credentialsPath = path.join(__dirname, '../config/roleCredentials.json');

try {
  // Check if file exists
  if (!fs.existsSync(credentialsPath)) {
    console.error(`${colors.red}❌ Error: roleCredentials.json not found!${colors.reset}`);
    console.error(`   Expected location: ${credentialsPath}`);
    process.exit(1);
  }

  // Read and parse the JSON file
  const credentialsContent = fs.readFileSync(credentialsPath, 'utf-8');
  const credentials = JSON.parse(credentialsContent);

  // Validate structure
  if (!credentials.core && !credentials.coordinator && !credentials.volunteer) {
    console.error(`${colors.red}❌ Error: Invalid credentials structure!${colors.reset}`);
    console.error('   Expected: { core: [], coordinator: [], volunteer: [] }');
    process.exit(1);
  }

  // Count users
  const coreCount = credentials.core?.length || 0;
  const coordinatorCount = credentials.coordinator?.length || 0;
  const volunteerCount = credentials.volunteer?.length || 0;
  const totalCount = coreCount + coordinatorCount + volunteerCount;

  console.log(`${colors.green}✅ Found credentials for ${totalCount} users:${colors.reset}`);
  console.log(`   - Core: ${coreCount}`);
  console.log(`   - Coordinators: ${coordinatorCount}`);
  console.log(`   - Volunteers: ${volunteerCount}\n`);

  // Convert to base64
  const jsonString = JSON.stringify(credentials);
  const base64Encoded = Buffer.from(jsonString).toString('base64');

  // Display instructions
  console.log(`${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}  📋 COPY THIS TO VERCEL ENVIRONMENT VARIABLES${colors.reset}`);
  console.log(`${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.cyan}Variable Name:${colors.reset}`);
  console.log(`  ${colors.bright}ROLE_CREDENTIALS${colors.reset}\n`);

  console.log(`${colors.cyan}Value:${colors.reset}`);
  console.log(`  ${base64Encoded}\n`);

  console.log(`${colors.bright}${colors.yellow}═══════════════════════════════════════════════════════${colors.reset}\n`);

  // Save to file
  const outputPath = path.join(__dirname, '../.credentials.base64');
  const outputContent = `# Base64 Encoded Role Credentials
# Generated: ${new Date().toISOString()}
# Users: ${totalCount} (Core: ${coreCount}, Coordinators: ${coordinatorCount}, Volunteers: ${volunteerCount})

ROLE_CREDENTIALS=${base64Encoded}
`;

  fs.writeFileSync(outputPath, outputContent);

  console.log(`${colors.green}✅ Also saved to:${colors.reset} ${colors.bright}server/.credentials.base64${colors.reset}\n`);

  // Instructions
  console.log(`${colors.bright}${colors.cyan}📝 Next Steps:${colors.reset}\n`);
  console.log(`  1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables`);
  console.log(`  2. Click "Add New"`);
  console.log(`  3. Name: ${colors.bright}ROLE_CREDENTIALS${colors.reset}`);
  console.log(`  4. Value: ${colors.bright}(paste the base64 string above)${colors.reset}`);
  console.log(`  5. Click "Save"`);
  console.log(`  6. Redeploy your backend\n`);

  console.log(`${colors.green}✅ Encoding complete!${colors.reset}\n`);

} catch (error) {
  console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  
  if (error instanceof SyntaxError) {
    console.error(`   The roleCredentials.json file contains invalid JSON`);
    console.error(`   Please check for syntax errors`);
  }
  
  process.exit(1);
}
