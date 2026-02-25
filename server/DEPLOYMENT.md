# 🚀 Backend Deployment Guide for Vercel

## 📋 Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (for database)

---

## 🎯 Step-by-Step Deployment Instructions

### **Step 1: Prepare Your Backend Repository**

You need to create a **SEPARATE** GitHub repository for just the backend:

1. Create a new repository on GitHub: `TechStorm-Backend`
2. Copy ONLY the `server` folder contents to this new repo

**Method 1: Manual Copy**
```bash
# Create a new folder for backend
mkdir TechStorm-Backend
cd TechStorm-Backend

# Initialize git
git init

# Copy all files from the server folder to this new folder
# (Copy all files from d:\code\techstorm\TechStorm-2.26-Website\server\)

# Add and commit
git add .
git commit -m "Initial backend setup"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/TechStorm-Backend.git
git branch -M main
git push -u origin main
```

**Method 2: Using Git Subtree (Recommended)**
```bash
# From your main project directory
cd d:\code\techstorm\TechStorm-2.26-Website

# Create a new branch with only the server folder
git subtree split --prefix=server -b backend-only

# Create a new repository on GitHub named "TechStorm-Backend"

# Push the backend-only branch to the new repo
git push https://github.com/YOUR_USERNAME/TechStorm-Backend.git backend-only:main
```

---

### **Step 2: Deploy to Vercel**

1. **Go to [Vercel](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your Backend Repository**
   - Select `TechStorm-Backend` from your repositories
   - Click "Import"

4. **Configure Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is, since your server files are at root)
   - **Build Command**: Leave empty or `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables** (VERY IMPORTANT!)
   
   Click "Environment Variables" and add these:

   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://AnikPaul:AnikPaul123@cluster0.gvubzsp.mongodb.net/techstorm
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   CORS_ORIGINS=https://your-frontend-domain.vercel.app,https://techstorm.bppimt.ac.in
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   CLOUDINARY_CLOUD_NAME=dapalnm6r
   CLOUDINARY_API_KEY=463174385936929
   CLOUDINARY_API_SECRET=Ueq99NIXDLchPR_v16HDYqHauCY
   ```

   ⚠️ **Important**: Replace `https://your-frontend-domain.vercel.app` with your friend's frontend URL once deployed!

6. **Click "Deploy"**

7. **Wait for deployment** (usually takes 1-2 minutes)

8. **Your backend will be live at**: `https://techstorm-backend-xyz.vercel.app`

---

### **Step 3: Update CORS After Frontend Deployment**

Once your friend deploys the frontend, update the environment variables:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Update `CORS_ORIGINS` to include your friend's frontend URL
4. Update `FRONTEND_URL` to your friend's frontend URL
5. Redeploy (Vercel will auto-redeploy when you save env vars)

---

### **Step 4: Share Backend URL with Frontend Team**

Give your friend this information:

**Backend API URL**: `https://your-project-name.vercel.app`

**Available Endpoints**:
- `GET /` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/events` - Get all events
- `POST /api/event-registration` - Event registration
- `GET /api/admin/*` - Admin routes
- And more...

---

## 🔧 Configuration Files Explained

### `vercel.json`
This file tells Vercel how to deploy your Node.js backend as serverless functions.

### `.vercelignore`
This file tells Vercel which files to ignore during deployment (similar to `.gitignore`).

### `.env.example`
Template for environment variables. **NEVER** commit your actual `.env` file!

---

## 📊 Monitor Your Deployment

1. **View Logs**: Vercel Dashboard → Your Project → Deployments → Click on deployment → View Logs
2. **Check Runtime Logs**: Vercel Dashboard → Your Project → Runtime Logs
3. **Analytics**: Vercel Dashboard → Your Project → Analytics

---

## 🐛 Troubleshooting

### Issue: "Module not found"
**Solution**: Make sure all dependencies are in `package.json` and not just in `devDependencies`

### Issue: "Database connection failed"
**Solution**: 
- Verify MongoDB URI in environment variables
- Make sure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Check MongoDB Atlas cluster is running

### Issue: "CORS Error"
**Solution**: 
- Update `CORS_ORIGINS` environment variable with frontend URL
- Redeploy the backend
- Make sure frontend is making requests to correct backend URL

### Issue: "Function timeout"
**Solution**: 
- Free tier has 60-second timeout (already configured in `vercel.json`)
- Optimize database queries
- Consider upgrading to Pro if needed ($20/month for 300 seconds timeout)

---

## 💰 Cost & Limits (Free Tier)

- ✅ **Unlimited** API requests
- ✅ **100 GB** bandwidth per month
- ✅ **100** builds per day
- ✅ **60 seconds** function execution time
- ✅ **1024 MB** memory per function
- ✅ Perfect for **3000+ student registrations**

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Verify MongoDB connection string is secure
- [ ] Add only necessary origins to `CORS_ORIGINS`
- [ ] Enable MongoDB IP whitelist (or use 0.0.0.0/0 for Vercel)
- [ ] Review rate limiting settings
- [ ] Keep `.env` file in `.gitignore`
- [ ] Never commit sensitive credentials to GitHub

---

## 🔄 Future Updates

To update your backend:

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will **automatically redeploy** on every push to main branch!

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Guide](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

**🎉 Your backend is now deployed and ready to handle 3000+ registrations!**
