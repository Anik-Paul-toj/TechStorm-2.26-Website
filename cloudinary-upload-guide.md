# Cloudinary Team Images Upload Guide

## Quick Steps

### Option 1: Web Interface (Easiest)
1. Go to cloudinary.com/console
2. Media Library → Upload
3. Drag all images from src/assets/img/team/
4. Copy URLs from each uploaded image

### Option 2: Use the Script
1. npm install cloudinary
2. Set environment variables:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY  
   - CLOUDINARY_API_SECRET
3. node upload-team-images.js
4. Get URLs from team-image-urls.json

After uploading, share the URLs and I'll update teamData.js to use them.
