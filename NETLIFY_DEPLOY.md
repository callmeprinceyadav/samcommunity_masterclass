# 🚀 Netlify Deployment Guide (With Custom Domain)

## ✅ YES! Netlify Supports Custom Domains!

**Netlify is perfect for Next.js apps and supports custom domains with FREE SSL!**

---

## 📋 Step-by-Step Deployment

### Step 1: Sign Up for Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** (free account)
3. Sign up with:
   - GitHub (recommended)
   - GitLab
   - Bitbucket
   - Email

### Step 2: Deploy Your Project

**Option A: Drag & Drop (Easiest!)**

1. **Build your project locally:**
   ```bash
   npm run build
   ```

2. **Create a ZIP file:**
   - Right-click `ThreatEvasionMasterclass` folder
   - Compress to ZIP
   - Name: `threat-evasion-masterclass.zip`
   - ⚠️ **DO NOT include `node_modules`** (Netlify will install it)

3. **Deploy:**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - **Drag and drop your ZIP file** directly onto the page
   - Wait for upload and deployment (2-5 minutes)

**Option B: GitHub Integration (Recommended for Updates)**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site" → "Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify
   - Select your repository
   - Click **"Deploy site"**

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** `18` (or `20`)

If not auto-detected, go to **Site settings → Build & deploy → Build settings** and set:
- Build command: `npm run build`
- Publish directory: `.next`

### Step 4: Add Environment Variables (CRITICAL!)

**⚠️ IMPORTANT:** You MUST add environment variables BEFORE deploying, or add them and then redeploy.

1. Go to **Site settings → Environment variables**
2. Click **"Add variable"**
3. Add these 4 variables (for **All scopes** - Production, Deploy previews, Branch deploys):

   ```
   Key: MONGODB_URI
   Value: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/threat_evasion?retryWrites=true&w=majority
   Scope: All scopes
   ```

   ```
   Key: ADMIN_USERNAME
   Value: sam@yash
   Scope: All scopes
   ```

   ```
   Key: ADMIN_PASSWORD
   Value: samcommunity
   Scope: All scopes
   ```

   ```
   Key: AUTH_SECRET
   Value: your-generated-secret-key-minimum-32-characters
   Scope: All scopes
   ```

4. Click **"Save"** for each variable

### Step 5: Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click **"Trigger deploy" → "Deploy site"**
3. Wait for deployment to complete

### Step 6: Your App is Live! 🎉

Your app will be available at:
- **Production URL:** `https://random-name-123456.netlify.app`

**Test it:**
- Visit the URL
- Test registration form
- Test admin dashboard at `/sam-yash-prince/export`

---

## 🌐 Add Custom Domain (FREE SSL Included!)

### Step 1: Add Domain in Netlify

1. Go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `masterclass.samcommunity.in` (or your domain)
4. Click **"Verify"**

### Step 2: Update DNS Records

Netlify will show you what DNS records to add. Update in your domain provider:

**For Subdomain (e.g., `masterclass.samcommunity.in`):**

```
Type: CNAME
Name: masterclass
Value: random-name-123456.netlify.app
TTL: 3600
```

**For Root Domain (e.g., `samcommunity.in`):**

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

Or use CNAME (if your provider supports it):
```
Type: CNAME
Name: @
Value: random-name-123456.netlify.app
TTL: 3600
```

### Step 3: Wait for DNS Propagation

- Usually takes **5-60 minutes**
- Check status in Netlify dashboard
- Status changes from "Pending" to "Active"

### Step 4: SSL Certificate (Automatic!)

- Netlify automatically provides **FREE SSL certificate**
- Your site will be accessible at `https://masterclass.samcommunity.in`
- No additional setup needed!

**✅ Result:** Your app is live at `https://masterclass.samcommunity.in` (no `.netlify.app` in URL!)

---

## 🔧 Generate AUTH_SECRET

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -base64 32
```

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Project builds locally (`npm run build` works) ✅
- [ ] MongoDB Atlas cluster is running
- [ ] MongoDB Atlas IP whitelist includes Netlify IPs (or `0.0.0.0/0`)
- [ ] You have all 4 environment variables ready
- [ ] `netlify.toml` file is in project root ✅

---

## 🐛 Troubleshooting

### Build Fails

**Error:** Module not found

**Solution:**
- Make sure `node_modules` is NOT in ZIP (Netlify installs it)
- Check `package.json` has all dependencies
- Check build logs in Netlify dashboard

### Environment Variables Not Working

**Check:**
1. Variables are added in Netlify dashboard
2. Variables are set for **All scopes** (Production, Deploy previews, Branch deploys)
3. No extra spaces or quotes in values
4. Redeploy after adding variables

### Database Connection Fails

**Check:**
1. MongoDB Atlas IP whitelist includes Netlify IPs (or `0.0.0.0/0`)
2. Connection string is correct (no typos)
3. Database user has correct permissions
4. Cluster is running

### Custom Domain Not Working

**Check:**
1. DNS records are correct
2. DNS has propagated (use [dnschecker.org](https://dnschecker.org))
3. Domain is verified in Netlify
4. SSL certificate is issued (automatic, may take 1-24 hours)

---

## ✅ Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|--------|
| **Custom Domain** | ✅ FREE | ✅ FREE |
| **SSL Certificate** | ✅ Automatic | ✅ Automatic |
| **Next.js Support** | ✅ Excellent | ✅ Excellent |
| **Drag & Drop** | ✅ YES | ❌ No (Git only) |
| **Free Tier** | ✅ Generous | ✅ Generous |
| **CDN** | ✅ Global | ✅ Global |

**Netlify is perfect for your needs!**

---

## 🎯 Quick Start Summary

1. ✅ Build: `npm run build`
2. ✅ Create ZIP (without node_modules)
3. ✅ Go to [app.netlify.com/drop](https://app.netlify.com/drop)
4. ✅ Drag & drop ZIP
5. ✅ Add environment variables
6. ✅ Redeploy
7. ✅ Add custom domain
8. ✅ Update DNS
9. ✅ Done! 🎉

---

## 📞 Need Help?

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Support:** events@samcommunity.in

---

**Your app will be live on Netlify with your custom domain!** 🚀

