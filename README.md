# 🚀 Threat Evasion & Offensive Tooling – Live Masterclass Landing Page

A high-converting, cyberpunk-themed landing page for the **Threat Evasion & Offensive Tooling Live Masterclass** event hosted by **Samcommunity (XYLYN SAMCOMMUNITY PRIVATE LIMITED)**.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Database Configuration](#-database-configuration)
- [Admin Dashboard](#-admin-dashboard)
- [Build for Production](#-build-for-production)
- [Deployment](#-deployment-guide)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)
- [Support](#-support)

## ✨ Features

### 🎨 Design & UI/UX
- **Cyberpunk Aesthetic** - Dark theme with neon purple (#7B2FF7) and cyan (#00D4FF) accents
- **Fully Responsive** - Mobile-first design optimized for all devices
- **Advanced Animations** - Smooth scroll-triggered effects, loading screens, and transitions
- **Interactive Components** - Countdown timer, scroll popups, and dynamic content
- **Real Icons** - Professional Font Awesome icons throughout

### 📝 Registration System
- **Comprehensive Form** - Multi-step registration with validation
- **International Support** - Country code selection for phone numbers
- **Unique ID Generation** - Auto-generated registration IDs (SAM-TEOF-XXXX)
- **Database Storage** - MongoDB Atlas integration for secure data storage
- **Toast Notifications** - Advanced toast notifications for user feedback

### 🔐 Security Features
- **Admin Authentication** - Secure JWT-based authentication for admin routes
- **Protected Routes** - Admin dashboard accessible only via `/sam-yash-prince/export`
- **Data Protection** - No client-side exposure of registration data
- **Input Validation** - Client-side and server-side validation

### 📊 Admin Features
- **Data Export** - CSV export functionality for all registrations
- **Statistics Dashboard** - Real-time registration statistics
- **Secure Access** - Password-protected admin panel

### 🎯 User Experience
- **Thank You Page** - Auto-redirect to WhatsApp group after 5 seconds
- **WhatsApp Integration** - Direct links to WhatsApp group and AI widget
- **Email Notifications** - Ready for email integration
- **Social Media Links** - Instagram, LinkedIn, YouTube, Discord integration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas (Mongoose)
- **Authentication**: JWT (jose library)
- **Icons**: React Icons (Font Awesome)
- **Animations**: CSS Animations + Framer Motion
- **Deployment**: Node.js hosting required (not static)

## 📁 Project Structure

```
ThreatEvasionMasterclass/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── export/        # CSV export endpoint
│   │   ├── register/      # Registration endpoint
│   │   └── stats/         # Statistics endpoint
│   ├── sam-yash-prince/
│   │   └── export/        # Admin dashboard (protected)
│   ├── thank-you/         # Thank you page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── AboutSamcommunity.tsx
│   ├── AboutSpeaker.tsx
│   ├── CountdownTimer.tsx
│   ├── EventIntroduction.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── LoadingScreen.tsx
│   ├── MasterclassBanner.tsx
│   ├── RegistrationForm.tsx
│   ├── ScrollPopup.tsx
│   ├── SocialIcons.tsx
│   ├── Testimonials.tsx
│   ├── WhatsAppWidget.tsx
│   ├── WhatYouWillLearn.tsx
│   └── WhyAttend.tsx
├── lib/
│   ├── auth.ts            # Authentication utilities
│   ├── db.ts              # MongoDB connection
│   └── registration.ts    # Registration utilities
├── models/
│   └── Registration.ts    # Mongoose schema
├── public/
│   └── images/            # Static images
├── .env.local             # Environment variables (create this)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB Atlas** account (free tier works)
- **Git** (optional)

### Step 1: Clone or Navigate to Project

```bash
cd C:\Users\techg\Desktop\ThreatEvasionMasterclass
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

Create `.env.local` in the root directory (see [Environment Setup](#-environment-setup))

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/threat_evasion?retryWrites=true&w=majority

# Admin Authentication Credentials
ADMIN_USERNAME=sam@yash
ADMIN_PASSWORD=samcommunity

# JWT Secret Key (Generate a secure random string)
AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-characters
```

### Generate Secure Secret Key

```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🗄️ Database Configuration

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier (M0 cluster)

2. **Create Cluster**
   - Choose free tier (M0)
   - Select your preferred region
   - Wait for cluster to be created (2-3 minutes)

3. **Create Database User**
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Username: `your_username`
   - Password: Generate secure password (save it!)
   - Database User Privileges: **Read and write to any database**

4. **Whitelist IP Address**
   - Go to **Network Access** → **Add IP Address**
   - For development: Click **Allow Access from Anywhere** (`0.0.0.0/0`)
   - For production: Add specific IP addresses

5. **Get Connection String**
   - Go to **Clusters** → Click **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `threat_evasion`)
   - Example:
     ```
     mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/threat_evasion?retryWrites=true&w=majority
     ```

6. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/threat_evasion?retryWrites=true&w=majority
   ```

### MongoDB Atlas Free Tier Limits

- **Storage**: 512 MB (sufficient for thousands of registrations)
- **RAM**: Shared
- **Database Size**: Each registration ~1-2 KB
- **Estimated Capacity**: ~250,000 registrations (with 512 MB)

### Database Schema

The `Registration` model stores:
- Unique Registration ID (SAM-TEOF-XXXX)
- Full Name, Email, WhatsApp Number
- Professional Details (Role, Skill Level, Domain Interest)
- Previous Attendance Information
- Expectations and Referral Source
- Timestamps

## 🔐 Admin Dashboard

### Access Admin Panel

**URL**: `/sam-yash-prince/export`

**Default Credentials**:
- Username: `sam@yash`
- Password: `samcommunity`

⚠️ **IMPORTANT**: Change these credentials in production!

### Admin Features

1. **View Statistics**
   - Total registrations
   - Registrations today
   - Registrations this week

2. **Export Data**
   - Export all registrations to CSV
   - Includes all form fields
   - Timestamped filename

3. **Secure Access**
   - JWT-based authentication
   - HttpOnly cookies
   - Session management

### Change Admin Credentials

Update in `.env.local`:
```env
ADMIN_USERNAME=your_new_username
ADMIN_PASSWORD=your_new_secure_password
```

## 🏗️ Build for Production

### Development Build

```bash
npm run dev
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Static vs Node.js Hosting

⚠️ **This project requires Node.js hosting** (not static hosting) because:
- API routes need server-side execution
- Database connections require server environment
- Authentication uses server-side JWT verification

❌ **Cannot be hosted on:**
- ServerByT (only supports PHP, Python, static HTML/CSS/JS)
- Traditional shared hosting without Node.js support
- Static hosting platforms (GitHub Pages, etc.)

✅ **Recommended Hosting Platforms**:
- **Vercel** ⭐ (Best for Next.js - FREE tier available)
- **Netlify** (FREE with serverless functions)
- **Railway** (FREE $5 credit/month)
- **Render** (FREE tier available)
- **DigitalOcean App Platform** ($5/month)
- **AWS Amplify**

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

## 🚀 Deployment Guide

### ⚠️ Important: ServerByT Not Supported

**ServerByT does NOT support Node.js applications.** They only support:
- PHP
- Python
- Perl
- Ruby on Rails
- Static HTML/CSS/JavaScript

**This Next.js application requires Node.js hosting** because it uses:
- Server-side API routes (`/api/register`, `/api/export`, etc.)
- MongoDB database connections
- Server-side authentication (JWT)

### ✅ Deploy to Vercel (Recommended - FREE)

**YES! You CAN directly upload your project to Vercel!** 🎉

Vercel supports **3 deployment methods**:

#### Method 1: Direct Upload (Easiest! ⭐)

1. **Build locally first:**
   ```bash
   npm run build
   ```

2. **Create ZIP file:**
   - Right-click project folder → Compress to ZIP
   - Name it: `threat-evasion-masterclass.zip`
   - ⚠️ Include `node_modules` folder (or Vercel will install it)

3. **Go to Vercel Dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign up/Login (free account)

4. **Upload & Deploy:**
   - Click **"Add New..." → "Project"**
   - Click **"Browse"** or drag your ZIP file
   - Upload `threat-evasion-masterclass.zip`
   - Vercel auto-detects Next.js
   - Click **"Deploy"**

5. **Add Environment Variables** (CRITICAL!):
   - Go to **Settings** → **Environment Variables**
   - Add these 4 variables (select Production, Preview, Development for each):
     - `MONGODB_URI` = `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/threat_evasion?retryWrites=true&w=majority`
     - `ADMIN_USERNAME` = `sam@yash`
     - `ADMIN_PASSWORD` = `samcommunity`
     - `AUTH_SECRET` = `your-generated-secret-key-minimum-32-characters`

6. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment → **"Redeploy"**

7. **Done!** Your app is live at: `https://your-project-name.vercel.app`

#### Method 2: CLI Deployment

```bash
npm install -g vercel
vercel login
cd C:\Users\techg\Desktop\ThreatEvasionMasterclass
vercel
vercel --prod
```

#### Method 3: GitHub Integration

1. Push code to GitHub
2. Connect repository in Vercel dashboard
3. Automatic deployments on every push

### 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Project builds locally (`npm run build` works)
- [ ] MongoDB Atlas cluster is running
- [ ] MongoDB Atlas IP whitelist includes Vercel IPs (or `0.0.0.0/0` for development)
- [ ] You have all 4 environment variables ready:
  - [ ] `MONGODB_URI` (from MongoDB Atlas)
  - [ ] `ADMIN_USERNAME` (default: `sam@yash`)
  - [ ] `ADMIN_PASSWORD` (default: `samcommunity`)
  - [ ] `AUTH_SECRET` (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)

### 🔧 Generate AUTH_SECRET

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -base64 32
```

### ✅ After Deployment

1. **Test your app:**
   - Visit: `https://your-project-name.vercel.app`
   - Test registration form
   - Test admin dashboard at `/sam-yash-prince/export`

2. **Add custom domain (optional):**
   - Settings → Domains → Add Domain
   - Update DNS records
   - Wait 5-60 minutes for propagation

### Other Hosting Options

#### Netlify (FREE) - ⭐ Recommended (Supports Drag & Drop!)

**YES! Netlify supports custom domains and drag & drop deployment!**

**Method 1: Drag & Drop (Easiest!)**

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Create ZIP file** (without `node_modules`):
   - Right-click project folder → Compress to ZIP
   - Name: `threat-evasion-masterclass.zip`

3. **Deploy:**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - **Drag and drop your ZIP file** directly
   - Wait for deployment (2-5 minutes)

4. **Add Environment Variables:**
   - Site settings → Environment variables
   - Add: `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`
   - Set for **All scopes**

5. **Redeploy:**
   - Deploys tab → Trigger deploy → Deploy site

6. **Add Custom Domain:**
   - Site settings → Domain management → Add custom domain
   - Enter: `masterclass.samcommunity.in`
   - Update DNS records (CNAME to your Netlify site)
   - SSL is automatic!

**Method 2: GitHub Integration**

1. Push to GitHub
2. Connect repository in Netlify dashboard
3. Automatic deployments on every push

📖 **See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed step-by-step guide.**

#### Railway (FREE $5 credit/month)

1. Sign up at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically on push

#### Render (FREE tier)

1. Sign up at [render.com](https://render.com)
2. Create Web Service
3. Connect GitHub
4. Build: `npm install && npm run build`
5. Start: `npm start`

### Pre-Deployment Checklist

- [ ] MongoDB Atlas IP whitelist includes hosting platform IPs (or `0.0.0.0/0`)
- [ ] All environment variables are set in hosting dashboard
- [ ] Admin credentials changed from defaults
- [ ] `AUTH_SECRET` is a strong random string (32+ characters)
- [ ] Test registration form locally
- [ ] Test admin dashboard locally

### Environment Variables for Production

Set these in your hosting platform's dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/threat_evasion?retryWrites=true&w=majority
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
AUTH_SECRET=your-generated-secret-key-minimum-32-characters
```

### Custom Domain Setup (Use Your Own Domain!)

**✅ IMPORTANT:** You CAN use your own custom domain on Vercel, Netlify, and Render!

The platform domain (like `.vercel.app`) is just a **default** - you can replace it with your own domain (e.g., `masterclass.samcommunity.in`).

#### Vercel Custom Domain (FREE) - Step by Step

**Step 1: Deploy to Vercel**
```bash
npm install -g vercel
vercel login
vercel
```

**Step 2: Add Custom Domain**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Domains**
4. Click **"Add Domain"**
5. Enter your domain: `masterclass.samcommunity.in` (or your domain)
6. Click **"Add"**

**Step 3: Update DNS Records**

In your domain provider (GoDaddy, Namecheap, etc.):

**For Subdomain (e.g., `masterclass.samcommunity.in`):**
```
Type: CNAME
Name: masterclass
Value: cname.vercel-dns.com
TTL: 3600
```

**For Root Domain (e.g., `samcommunity.in`):**
```
Type: A
Name: @
Value: [Vercel IP shown in dashboard]
TTL: 3600
```

**Step 4: Wait for DNS Propagation**
- Usually takes **5-60 minutes**
- Check status in Vercel dashboard
- Status changes from "Pending" to "Valid Configuration"

**Step 5: SSL Certificate (Automatic!)**
- Vercel automatically provides free SSL certificate
- Your site will be accessible at `https://masterclass.samcommunity.in`
- No additional setup needed!

**✅ Result:** Your app is live at `https://masterclass.samcommunity.in` (no `.vercel.app` in URL!)

**Verify DNS:** Use [dnschecker.org](https://dnschecker.org) to check if DNS has propagated

#### Netlify Custom Domain (FREE)

1. Go to **Site Settings** → **Domain Management**
2. Click **Add custom domain**
3. Enter your domain
4. Follow DNS instructions (CNAME or A record)
5. SSL is automatic

#### Render Custom Domain (FREE)

1. Go to **Settings** → **Custom Domains**
2. Add your domain
3. Update DNS records
4. SSL is automatic

### Why ServerByT Won't Work

**ServerByT Limitations:**
- ❌ No Node.js support (only PHP, Python, static HTML/CSS/JS)
- ❌ Cannot run Next.js server-side code
- ❌ Cannot handle API routes (`/api/register`, etc.)
- ❌ Cannot connect to MongoDB from server-side

**Your Next.js app needs:**
- ✅ Node.js runtime
- ✅ Server-side API routes
- ✅ Database connections
- ✅ Server-side authentication

### Alternative: VPS Hosting (If You Must Use Your Own Server)

If you really want to host on your own server (like ServerByT), you need a **VPS (Virtual Private Server)** that supports Node.js:

**Recommended VPS Providers:**
- **DigitalOcean Droplet** ($5/month) - Full control, Node.js support
- **Linode** ($5/month) - Similar to DigitalOcean
- **Vultr** ($5/month) - Budget-friendly
- **AWS EC2** (Pay-as-you-go) - More complex setup

**VPS Setup Steps:**
1. Create Ubuntu/Debian VPS
2. Install Node.js 18+
3. Install PM2 (process manager)
4. Clone your project
5. Set up Nginx reverse proxy
6. Configure SSL with Let's Encrypt
7. Point your domain DNS to VPS IP

**But this is more complex and costs more than Vercel (which is FREE with custom domain)!**

### Recommendation

**Use Vercel with your custom domain** - it's:
- ✅ FREE
- ✅ Easy setup (5 minutes)
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Your own domain (no `.vercel.app` visible)
- ✅ Perfect for Next.js

The `.vercel.app` domain is just a temporary default until you add your custom domain.

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#7B2FF7',    // Purple
  secondary: '#00D4FF',  // Cyan
  dark: '#0a0a0f',       // Background
  darkSecondary: '#1a1a2e',
  darkTertiary: '#2a2a3e',
}
```

### Fonts

The project uses **Inter** font. To change:

1. Update `app/layout.tsx` - Font import
2. Update `tailwind.config.ts` - Font family

### Images

Place images in `public/images/` or `public/_next/static/media/`:
- Speaker image: `AASHISH.jpeg` or `aashish1.jpeg`
- Banner image: `banner.jpeg`

### Social Media Links

Update in `components/Footer.tsx`:
- LinkedIn
- Instagram
- YouTube
- Discord

### WhatsApp Group Link

Update in:
- `app/thank-you/ThankYouContent.tsx` - `WHATSAPP_GROUP_LINK`
- `components/RegistrationForm.tsx` (if used)

### WhatsApp Widget

Widget ID is configured in `components/WhatsAppWidget.tsx`:
- Current widget ID: `aaa6xn`
- Update if needed

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to git
   - Use strong, unique passwords
   - Rotate secrets regularly

2. **Database Security**
   - Use strong database passwords
   - Whitelist only necessary IPs in production
   - Enable MongoDB Atlas authentication

3. **Admin Access**
   - Change default admin credentials
   - Use strong passwords
   - Limit admin route access

4. **Input Validation**
   - All inputs validated client-side and server-side
   - Email format validation
   - Phone number validation
   - XSS protection via React

## 🐛 Troubleshooting

### Database Connection Issues

**Error**: `MongoDB connection error`

**Solutions**:
1. Check `MONGODB_URI` in `.env.local`
2. Verify database user credentials
3. Check IP whitelist in MongoDB Atlas
4. Ensure cluster is running
5. Test connection string in MongoDB Compass

### Port Already in Use

**Error**: `Port 3000 already in use`

**Solution**:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
PORT=3001 npm run dev
```

### Build Errors

**Error**: `Module not found`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

**Solution**:
1. Ensure file is named `.env.local` (not `.env`)
2. Restart development server
3. Check for typos in variable names
4. Ensure no spaces around `=` sign

### Thank You Page Not Redirecting

**Check**:
1. Browser console for errors
2. WhatsApp link is correct
3. Countdown timer is working
4. No ad blockers interfering

## 📊 API Endpoints

### Public Endpoints

- `POST /api/register` - Submit registration form
- `GET /api/stats` - Get registration statistics (requires auth)

### Protected Endpoints

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/export` - Export registrations to CSV

## 📝 Project Pages

- `/` - Landing page
- `/thank-you?uniqueId=SAM-TEOF-XXXX` - Thank you page
- `/sam-yash-prince/export` - Admin dashboard (protected)

## 🤝 Support

- **Email**: events@samcommunity.in
- **Website**: https://samcommunity.in
- **Support Hours**: 9 AM - 8 PM (IST)

## 📄 License

This project is created for **XYLYN SAMCOMMUNITY PRIVATE LIMITED**.

All rights reserved. © 2025 XYLYN SAMCOMMUNITY PRIVATE LIMITED

## 🎯 Quick Start Checklist

- [ ] Install Node.js 18+
- [ ] Run `npm install`
- [ ] Create MongoDB Atlas account
- [ ] Set up database cluster
- [ ] Create database user
- [ ] Whitelist IP address
- [ ] Get connection string
- [ ] Create `.env.local` file
- [ ] Add `MONGODB_URI`
- [ ] Add `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- [ ] Generate and add `AUTH_SECRET`
- [ ] Run `npm run dev`
- [ ] Test registration form
- [ ] Test admin dashboard
- [ ] Update social media links
- [ ] Update WhatsApp group link
- [ ] Deploy to hosting platform

---

**Built with ❤️ by Prince Yadav for the cybersecurity community**

For questions or issues, contact: events@samcommunity.in
