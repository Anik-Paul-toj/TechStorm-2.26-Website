const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dyj3kxni2',
  api_key: '964966765481576',
  api_secret: '2bzTfHSjCxPpFgh5lOje_bzlIYM'
});

async function uploadGalleryImages() {
  const galleryPath = path.join(__dirname, 'src', 'assets', 'img', 'gallery');
  const imagesToUpload = ['c15.JPG', 'c16.JPG', 'c17.jpeg', 'c18.jpeg', 'c19.JPG', 'c20.jpg', 'c21.jpg'];
  
  console.log('Starting upload of c15-c21 gallery images...\n');
  
  for (const file of imagesToUpload) {
    const filePath = path.join(galleryPath, file);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'eoorox/gallery',
          public_id: path.parse(file).name.toLowerCase(),
          overwrite: true
        });
        
        console.log(`✓ Uploaded: ${file} -> ${result.secure_url}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error.message);
      }
    } else {
      console.log(`⊗ File not found: ${file}`);
    }
  }
  
  console.log('\n✓ Upload complete!');
}

uploadGalleryImages();
