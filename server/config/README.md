# 🔐 Role Credentials Management

This folder contains tools for managing coordinator and volunteer credentials securely.

## 📁 Files

- **`roleCredentials.json`** - Actual credentials (NOT committed to git, local only)
- **`roleCredentials.template.json`** - Template file (safe to commit)
- **`getCredentials.js`** - Loads credentials from env var or file
- **`../scripts/encodeCredentials.js`** - Encodes JSON to base64 for Vercel
- **`../scripts/syncCredentials.js`** - Syncs credentials to MongoDB

---

## 🚀 Quick Start

### **Step 1: Create Your Credentials File**

Copy the template and fill in real data:

```bash
cp roleCredentials.template.json roleCredentials.json
```

Edit `roleCredentials.json` with actual passwords:

```json
{
  "core": [
    {
      "name": "TechStorm Core Team",
      "email": "core@techstorm.com",
      "password": "YourActualPassword123!",
      "role": "core"
    }
  ],
  "coordinator": [...]
}
```

### **Step 2: Encode for Vercel**

```bash
cd ..
node scripts/encodeCredentials.js
```

This will output a base64 string. Copy it!

### **Step 3: Add to Vercel**

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   - **Name:** `ROLE_CREDENTIALS`
   - **Value:** (paste the base64 string)
4. Save

### **Step 4: Deploy**

Push your code to GitHub. Vercel will auto-deploy and use the environment variable!

---

## 🔄 How It Works

### **Development (Your Computer)**

```
getCredentials() → Reads roleCredentials.json
```

### **Production (Vercel)**

```
getCredentials() → Decodes ROLE_CREDENTIALS env var → Returns JSON
```

---

## 🔐 Security

✅ **Secure:**
- roleCredentials.json is in .gitignore (never committed)
- Base64 on Vercel (not visible in code)
- Passwords hashed with bcrypt in database

❌ **Don't:**
- Commit roleCredentials.json to GitHub
- Share the base64 string publicly
- Use weak passwords

---

## 🔧 Updating Passwords

1. Edit `roleCredentials.json` locally
2. Run `node scripts/encodeCredentials.js`
3. Copy new base64 string
4. Update Vercel environment variable
5. Redeploy

---

## 🧪 Testing

### Sync credentials to database:

```bash
node scripts/syncCredentials.js
```

### Test login:

```bash
# Use any coordinator/volunteer email and password
# They should now be able to login!
```

---

## ❓ Troubleshooting

### "No credentials found!"

**Solution:** 
- Create `roleCredentials.json` from template
- Or set `ROLE_CREDENTIALS` env var on Vercel

### "Failed to decode ROLE_CREDENTIALS"

**Solution:**
- Re-run `encodeCredentials.js`
- Make sure you copied the full base64 string
- Check for extra spaces or newlines

### "User already exists" error

**Solution:**
- This is fine! The sync script updates existing users
- Passwords will be updated to match your JSON file

---

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/environment-variables)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

---

## 🆘 Need Help?

Check the console logs when running:
```bash
node scripts/encodeCredentials.js
node scripts/syncCredentials.js
```

They provide detailed information about what's happening!
