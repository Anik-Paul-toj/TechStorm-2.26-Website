# 🎯 QUICK START - Deploy Backend to Vercel

## ⚡ 5-Minute Deployment Guide

### Step 1: Go to Vercel
👉 [https://vercel.com](https://vercel.com) → Sign in with GitHub

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find: `Anik-Paul-toj/TechStorm-2.26-Website`
3. Click **"Import"**

### Step 3: Configure (MOST IMPORTANT!)
```
Framework Preset: Other
Root Directory: server  ⚠️ CRITICAL - Set this to "server"!
Build Command: (leave empty)
Install Command: npm install
```

### Step 4: Environment Variables
Copy-paste these in Vercel:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://AnikPaul:AnikPaul123@cluster0.gvubzsp.mongodb.net/techstorm
JWT_SECRET=techstorm_secret_2026_change_this_later
CORS_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200
CLOUDINARY_CLOUD_NAME=dapalnm6r
CLOUDINARY_API_KEY=463174385936929
CLOUDINARY_API_SECRET=Ueq99NIXDLchPR_v16HDYqHauCY
```

### Step 5: Deploy
Click **"Deploy"** button → Wait 2 minutes → Done! 🎉

---

## 📤 After Deployment

### Your Backend URL:
```
https://tech-storm-backend-xyz.vercel.app
```

### Test It:
```bash
curl https://your-backend-url.vercel.app/api/health
```

Should return: `{"status":"OK"...}`

---

## 🔄 Update CORS for Frontend

**IMPORTANT:** Once your friend deploys the frontend, update these in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit these variables:
   ```env
   CORS_ORIGINS=https://friends-frontend.vercel.app
   FRONTEND_URL=https://friends-frontend.vercel.app
   ```
3. Click "Redeploy" button

---

## 📨 Share with Frontend Developer

**Backend API URL:**
```
https://your-backend.vercel.app
```

**Tell them to:**
1. Add environment variable in their Vercel project:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```

2. Update `src/config/api.js`:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   ```

---

## ✅ Checklist

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Root directory set to `server`
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] Health endpoint working
- [ ] Backend URL shared with frontend team
- [ ] CORS updated after frontend deployment

---

## 🆘 Troubleshooting

**Error: "Cannot find module 'express'"**
→ Make sure Root Directory is set to `server` in Vercel

**Error: "Database connection failed"**
→ Check MongoDB Atlas allows connections from `0.0.0.0/0`

**CORS Error**
→ Update `CORS_ORIGINS` with frontend URL in Vercel env vars

---

## 💰 Cost: $0/month (FREE Forever!)

- ✅ Unlimited API requests
- ✅ 100 GB bandwidth
- ✅ Auto-deploys on git push
- ✅ SSL/HTTPS included
- ✅ Can handle 3000+ registrations easily

---

**⏱️ Total Time: 5 minutes**
**💵 Total Cost: FREE**
**🎉 Result: Production-ready backend!**

For detailed guides, see:
- `VERCEL_DEPLOYMENT_GUIDE.md` - Step-by-step guide
- `DEPLOYMENT.md` - Alternative deployment options
- `FRONTEND-INTEGRATION.md` - How frontend connects
