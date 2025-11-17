# 🖼️ Image Fix Guide for Netlify

## Problem
Images weren't showing on Netlify because they were using `/_next/static/media/` paths which are build-generated and unreliable.

## ✅ Solution Applied

I've updated all image paths to use `/images/` which references the `public/images/` folder.

**Updated files:**
- `components/HeroSection.tsx` - Changed to `/images/AASHISH.jpeg`
- `components/AboutSpeaker.tsx` - Changed to `/images/aashish1.jpeg`
- `components/MasterclassBanner.tsx` - Changed to `/images/banner.jpeg`

## 📁 Required Image Files

Make sure these images are in `public/images/` folder:

```
public/
  images/
    AASHISH.jpeg      (Speaker image for hero section)
    aashish1.jpeg     (Speaker image for about section)
    banner.jpeg       (Masterclass banner/poster)
```

## 🚀 Deployment Steps

### Step 1: Verify Images Are in Place

1. Check that `public/images/` folder contains:
   - `AASHISH.jpeg`
   - `aashish1.jpeg`
   - `banner.jpeg`

2. If images are missing, add them to `public/images/` folder

### Step 2: Create ZIP for Deployment

**IMPORTANT:** When creating ZIP file:

1. **Include `public` folder** - This is critical!
2. **DO NOT include `node_modules`** - Netlify will install it
3. **Include all other files**

**Files to include in ZIP:**
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `lib/` folder
- ✅ `models/` folder
- ✅ `public/` folder (with images!)
- ✅ `package.json`
- ✅ `next.config.mjs`
- ✅ `netlify.toml`
- ✅ `tailwind.config.ts`
- ✅ `tsconfig.json`
- ✅ All other config files
- ❌ `node_modules/` (exclude)
- ❌ `.next/` (exclude)
- ❌ `.env.local` (exclude)

### Step 3: Deploy to Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your ZIP file
3. Wait for deployment

### Step 4: Verify Images

After deployment:
1. Visit your Netlify URL
2. Check if images are showing:
   - Hero section speaker image
   - About speaker section image
   - Banner image

## 🔍 Troubleshooting

### Images Still Not Showing?

**Check 1: Image Paths**
- Open browser DevTools (F12)
- Go to Network tab
- Look for failed image requests
- Check if paths are `/images/filename.jpeg`

**Check 2: Public Folder**
- Make sure `public/images/` folder is in your ZIP
- Verify images are actually in the folder

**Check 3: File Names**
- Ensure file names match exactly (case-sensitive):
  - `AASHISH.jpeg` (uppercase)
  - `aashish1.jpeg` (lowercase)
  - `banner.jpeg` (lowercase)

**Check 4: Clear Cache**
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or use incognito/private window

**Check 5: Netlify Build Logs**
- Check Netlify deployment logs
- Look for any errors related to images
- Verify `public` folder is being deployed

## 📝 Quick Checklist

Before deploying:
- [ ] Images are in `public/images/` folder
- [ ] Image file names match exactly (case-sensitive)
- [ ] `public` folder is included in ZIP
- [ ] `node_modules` is NOT in ZIP
- [ ] All image paths use `/images/` prefix
- [ ] Build succeeds locally (`npm run build`)

## 🎯 Alternative: Use CDN or External Hosting

If images still don't work, you can:

1. **Upload to Cloudinary/Imgur:**
   - Upload images to Cloudinary or Imgur
   - Use full URLs in image `src` attributes

2. **Use GitHub:**
   - Push images to GitHub repo
   - Reference via GitHub raw URLs

3. **Use Netlify Large Media:**
   - Enable Netlify Large Media
   - Upload images via Netlify dashboard

## ✅ Expected Result

After fixing:
- ✅ All images load correctly
- ✅ Images are optimized by Next.js
- ✅ Images work on all devices
- ✅ No broken image icons

---

**Need help?** Check Netlify deployment logs or contact: events@samcommunity.in

