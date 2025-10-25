# 🚀 GenOrcasX Deployment Guide for genorcasx.com

## ⚡ FASTEST DEPLOYMENT - Choose One:

### 🥇 Option 1: Vercel (RECOMMENDED - 5 minutes setup)
- ✅ FREE hosting
- ✅ Custom domain genorcasx.com 
- ✅ Automatic HTTPS/SSL
- ✅ No database needed (uses in-memory storage)

### 🥈 Option 2: Netlify (Alternative - 5 minutes setup)
- ✅ FREE hosting
- ✅ Custom domain support
- ✅ Automatic deployments

### 🥉 Option 3: Railway (If you want more control)
- ✅ Full-stack hosting
- ✅ Custom domain support
- ✅ More advanced features

## Step-by-Step Deployment

## 🚀 DEPLOY IN 5 MINUTES:

### Step 1: Push to GitHub (2 minutes)
```bash
git init
git add .
git commit -m "Ready for production"
git branch -M main
# Create repository at github.com/yourusername/genorcasx
git remote add origin https://github.com/yourusername/genorcasx.git
git push -u origin main
```

### Step 2: Deploy on Vercel (2 minutes)
1. Go to [vercel.com](https://vercel.com) → **Import Project**
2. Connect your GitHub and select your `genorcasx` repository  
3. Click **Deploy** (Vercel auto-detects settings!)

### Step 3: Add Environment Variables (1 minute)
In Vercel dashboard → Settings → Environment Variables, add:
```
NODE_ENV=production
GMAIL_USER=suriya.g@genorcasx.com  
GMAIL_PASS=your_gmail_app_password
GROQ_API_KEY=your_groq_key
SESSION_SECRET=your_random_64_char_string
```

### Step 4: Configure Custom Domain genorcasx.com
In Vercel dashboard → Domains:
1. Click **Add Domain** 
2. Enter: `genorcasx.com` and `www.genorcasx.com`
3. Update your domain's DNS records as shown:
   - **A Record**: `@` → Vercel's IP address (provided)
   - **CNAME**: `www` → `your-project.vercel.app`

🎉 **Your website is now live at genorcasx.com!**

---

## Alternative Deployment Options

## Vercel Deployment (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/genorcasx.git
git push -u origin main
```

2. **Deploy on Vercel**:
- Go to https://vercel.com
- Import your GitHub repository
- Set environment variables in Vercel dashboard
- Deploy

3. **Configure Custom Domain**:
- In Vercel dashboard → Domains
- Add "genorcasx.com" and "www.genorcasx.com"
- Update your domain's DNS records as instructed

## Railway Deployment (Full-Stack Alternative)

1. **Deploy to Railway**:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

2. **Add Database**:
```bash
railway add postgresql
```

3. **Set Environment Variables**:
- Go to Railway dashboard
- Add all environment variables
- Deploy

4. **Configure Custom Domain**:
- In Railway dashboard → Settings → Domains
- Add "genorcasx.com"
- Update DNS records

## DNS Configuration

For **any hosting platform**, update your domain's DNS records:

1. **A Record**: `@` → `Your hosting provider's IP`
2. **CNAME**: `www` → `your-app.vercel.app` (or your hosting URL)

## Production Environment Variables

Make sure to set these in your hosting platform:

```
NODE_ENV=production
GMAIL_USER=suriya.g@genorcasx.com
GMAIL_PASS=your_gmail_app_password
GROQ_API_KEY=your_groq_key
SESSION_SECRET=your_64_char_secret
PORT=5000
HOST=0.0.0.0
```

## Final Steps

1. Test your website at genorcasx.com
2. Set up SSL certificate (automatic with Vercel/Railway)
3. Configure email sending with proper Gmail app password
4. Monitor performance and errors

## Need Help?

1. Check hosting platform docs
2. Verify DNS propagation at https://dnschecker.org
3. Test email functionality
4. Monitor application logs
