/**
 * Sync role credentials to MongoDB database
 * 
 * This script:
 * 1. Loads credentials from environment variable or local file
 * 2. Connects to MongoDB
 * 3. Creates or updates users with hashed passwords
 * 
 * Usage:
 *   node scripts/syncCredentials.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const getCredentials = require('../config/getCredentials');

// Color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

console.log(`\n${colors.bright}${colors.cyan}🔄 Syncing Role Credentials to Database${colors.reset}\n`);

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['core', 'coordinator', 'volunteer', 'user'], required: true },
  event: { type: String },
  eventAbbr: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Create or update a single user
async function createOrUpdateUser(userData) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Check if user exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      // Update existing user
      existingUser.password = hashedPassword;
      existingUser.name = userData.name;
      existingUser.role = userData.role;
      existingUser.event = userData.event || null;
      existingUser.eventAbbr = userData.eventAbbr || null;
      existingUser.updatedAt = new Date();
      
      await existingUser.save();
      
      console.log(`${colors.green}✅ Updated:${colors.reset} ${userData.email} ${colors.cyan}(${userData.role})${colors.reset}`);
    } else {
      // Create new user
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        event: userData.event || null,
        eventAbbr: userData.eventAbbr || null
      });
      
      await newUser.save();
      
      console.log(`${colors.green}✅ Created:${colors.reset} ${userData.email} ${colors.cyan}(${userData.role})${colors.reset}`);
    }
  } catch (error) {
    console.error(`${colors.red}❌ Error with ${userData.email}:${colors.reset} ${error.message}`);
  }
}

// Main sync function
async function syncCredentials() {
  try {
    // Connect to MongoDB
    console.log(`${colors.yellow}📡 Connecting to MongoDB...${colors.reset}`);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`${colors.green}✅ Connected to MongoDB${colors.reset}\n`);

    // Load credentials
    const roleCredentials = getCredentials();

    if (!roleCredentials.core && !roleCredentials.coordinator && !roleCredentials.volunteer) {
      console.error(`${colors.red}❌ No credentials found!${colors.reset}`);
      process.exit(1);
    }

    console.log(`\n${colors.bright}${colors.cyan}Processing users...${colors.reset}\n`);

    let totalProcessed = 0;

    // Process Core team
    if (roleCredentials.core && roleCredentials.core.length > 0) {
      console.log(`${colors.bright}Core Team:${colors.reset}`);
      for (const user of roleCredentials.core) {
        await createOrUpdateUser(user);
        totalProcessed++;
      }
      console.log('');
    }

    // Process Coordinators
    if (roleCredentials.coordinator && roleCredentials.coordinator.length > 0) {
      console.log(`${colors.bright}Coordinators:${colors.reset}`);
      for (const user of roleCredentials.coordinator) {
        await createOrUpdateUser(user);
        totalProcessed++;
      }
      console.log('');
    }

    // Process Volunteers
    if (roleCredentials.volunteer && roleCredentials.volunteer.length > 0) {
      console.log(`${colors.bright}Volunteers:${colors.reset}`);
      for (const user of roleCredentials.volunteer) {
        await createOrUpdateUser(user);
        totalProcessed++;
      }
      console.log('');
    }

    console.log(`${colors.green}${colors.bright}✅ Successfully synced ${totalProcessed} users!${colors.reset}\n`);
    
    process.exit(0);
  } catch (error) {
    console.error(`${colors.red}❌ Error:${colors.reset} ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the sync
syncCredentials();
