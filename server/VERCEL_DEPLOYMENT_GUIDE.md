# 🚀 Deploy Backend to Vercel - Simple Guide

## Option 1: Deploy from Existing Repo (EASIEST - Use This!)

Since your code is already at `https://github.com/Anik-Paul-toj/TechStorm-2.26-Website`, you can deploy the backend directly from there!

### Step-by-Step:

#### 1️⃣ Go to Vercel
- Visit [https://vercel.com](https://vercel.com)
- Sign in with GitHub

#### 2️⃣ Import Project
- Click "Add New..." → "Project"
- Find `Anik-Paul-toj/TechStorm-2.26-Website`
- Click "Import"

#### 3️⃣ Configure Settings
**IMPORTANT: Set Root Directory!**

- **Framework Preset**: Other
- **Root Directory**: `server` ⚠️ (THIS IS CRITICAL!)
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

#### 4️⃣ Add Environment Variables

Click "Environment Variables" and add all of these:

```env
NODE_ENV=production

MONGODB_URI=mongodb+srv://AnikPaul:AnikPaul123@cluster0.gvubzsp.mongodb.net/techstorm

JWT_SECRET=techstorm_jwt_secret_key_2026_change_this_to_something_random_and_secure

CORS_ORIGINS=http://localhost:3000

FRONTEND_URL=http://localhost:3000

RATE_LIMIT_WINDOW_MS=900000

RATE_LIMIT_MAX_REQUESTS=200

CLOUDINARY_CLOUD_NAME=dapalnm6r

CLOUDINARY_API_KEY=463174385936929

CLOUDINARY_API_SECRET=Ueq99NIXDLchPR_v16HDYqHauCY
```

#### 5️⃣ Deploy!
- Click "Deploy"
- Wait 1-2 minutes
- Your backend will be live! 🎉

#### 6️⃣ Get Your Backend URL
After deployment, you'll get a URL like:
```
https://tech-storm-2-26-website-xyz123.vercel.app
```

#### 7️⃣ Update CORS for Frontend
Once your friend deploys the frontend, update these env vars in Vercel:

```env
CORS_ORIGINS=https://your-friends-frontend.vercel.app,https://techstorm.bppimt.ac.in

FRONTEND_URL=https://your-friends-frontend.vercel.app
```

Then click "Redeploy" in Vercel dashboard.

---

## Option 2: Create Separate Backend Repository (More Work)

If you want a completely separate repo for the backend:

### Using PowerShell:

```powershell
# 1. Create a new directory
New-Item -ItemType Directory -Path "D:\TechStorm-Backend"
cd D:\TechStorm-Backend

# 2. Initialize git
git init

# 3. Copy all files from server folder
Copy-Item -Path "D:\code\techstorm\TechStorm-2.26-Website\server\*" -Destination . -Recurse

# 4. Create new repo on GitHub named "TechStorm-Backend"

# 5. Add and commit
git add .
git commit -m "Initial backend setup for Vercel"

# 6. Push to GitHub
git remote add origin https://github.com/Anik-Paul-toj/TechStorm-Backend.git
git branch -M main
git push -u origin main
```

Then follow steps 1-7 from Option 1 above, but:
- Import `TechStorm-Backend` repository
- **Root Directory**: Leave as `./` (since files are at root)

---

## 🧪 Test Your Deployment

After deployment, test these endpoints:

```bash
# Health check (replace with your Vercel URL)
curl https://your-project.vercel.app/api/health

# Should return: {"status":"OK","timestamp":"...","uptime":...}

# Get events
curl https://your-project.vercel.app/api/events
```

---

## 📝 Share This with Your Friend (Frontend Developer)

**Backend API Base URL:**
```
https://your-project-name.vercel.app
```

**Available Endpoints:**
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/events` - Get all events
- `POST /api/event-registration` - Register for event
- `GET /api/users/profile` - Get user profile (requires auth)
- `POST /api/admin-auth/login` - Admin login
- And more...

**Tell your friend to:**
1. Set environment variable in their Vercel frontend project:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```

2. Update `src/config/api.js` to use:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   export default API_BASE_URL;
   ```

---

## 🔄 How to Update Backend

Whenever you make changes:

```bash
cd d:\code\techstorm\TechStorm-2.26-Website
git add .
git commit -m "Updated backend"
git push origin main
```

Vercel will **automatically redeploy**! 🚀

---

## ⚠️ Important Notes

1. **MongoDB Atlas IP Whitelist**: 
   - Go to MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - This is necessary because Vercel uses dynamic IPs

2. **Vercel Free Tier Limits**:
   - ✅ 100 GB bandwidth/month
   - ✅ Unlimited API requests
   - ✅ 60 second function timeout
   - ✅ Perfect for 3000+ registrations

3. **Environment Variables**:
   - ⚠️ Never commit `.env` file to GitHub
   - ✅ Always set in Vercel dashboard
   - ✅ Can update anytime in Settings → Environment Variables

---

## 🐛 Common Issues

### CORS Error
**Fix**: Add frontend URL to `CORS_ORIGINS` environment variable, then redeploy

### Database Connection Error
**Fix**: 
- Check MongoDB Atlas is allowing connections from `0.0.0.0/0`
- Verify `MONGODB_URI` in Vercel environment variables
- Check MongoDB cluster is active

### "Cannot find module"
**Fix**: Make sure all dependencies are in `dependencies` (not `devDependencies`) in `package.json`

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `server`
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Health endpoint working (`/api/health`)
- [ ] MongoDB connection working
- [ ] CORS configured with frontend URL
- [ ] Backend URL shared with frontend team

---

## 🎉 Done!

Your backend is now:
- ✅ Deployed on Vercel
- ✅ Auto-deploys on every push
- ✅ Has SSL/HTTPS
- ✅ Ready for 3000+ registrations
- ✅ Completely FREE!

**Deployment Time**: 5 minutes
**Cost**: $0/month forever
