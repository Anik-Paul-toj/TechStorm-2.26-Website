const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary (same as uploadToCloudinary.js)
cloudinary.config({
  cloud_name: 'dyj3kxni2',
  api_key: '964966765481576',
  api_secret: '2bzTfHSjCxPpFgh5lOje_bzlIYM'
});

const teamFolder = path.join(__dirname, 'src', 'assets', 'img', 'team');
const uploadedUrls = {};

async function uploadTeamImages() {
  console.log('Starting team images upload to Cloudinary...\n');
  
  if (!fs.existsSync(teamFolder)) {
    console.error('Team folder not found:', teamFolder);
    return;
  }
  
  const files = fs.readdirSync(teamFolder);
  console.log(`Found ${files.length} files in team folder\n`);
  
  for (const file of files) {
    if (file.startsWith('.') || file.includes('.TMP')) continue;
    
    const filePath = path.join(teamFolder, file);
    
    if (fs.statSync(filePath).isFile()) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'eoorox/team',
          public_id: path.parse(file).name,
          overwrite: true
        });
        
        uploadedUrls[file] = result.secure_url;
        console.log(`✓ ${file}`);
        console.log(`  ${result.secure_url}\n`);
        
      } catch (error) {
        console.error(`✗ Failed: ${file} - ${error.message}\n`);
      }
    }
  }
  
  // Save URLs to JSON file
  fs.writeFileSync(
    'team-cloudinary-urls.json',
    JSON.stringify(uploadedUrls, null, 2)
  );
  
  console.log('\n✓ Upload complete!');
  console.log(`✓ URLs saved to: team-cloudinary-urls.json`);
  console.log(`✓ Total uploaded: ${Object.keys(uploadedUrls).length} images`);
}

uploadTeamImages();
