# Grace Lutheran Church - Deploy to Vercel Step by Step

## Prerequisites
- GitHub account (free at [github.com](https://github.com))
- Vercel account (free at [vercel.com](https://vercel.com))
- Your code pushed to GitHub

---

## Part 1: Push Code to GitHub

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `v0-grace-lutheran-website`
3. Description: "Grace Lutheran Church Website"
4. Choose "Public" (easier for deployment)
5. Click "Create repository"

### Step 2: Initialize Git Locally
If you haven't already, download Git from [git-scm.com](https://git-scm.com)

### Step 3: Push Your Project
In your terminal/command prompt (in your project folder):

\`\`\`bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Grace Lutheran Church website"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/v0-grace-lutheran-website.git

# Push to GitHub
git branch -M main
git push -u origin main
\`\`\`

### Step 4: Verify on GitHub
1. Go to [github.com/YOUR_USERNAME/v0-grace-lutheran-website](https://github.com/YOUR_USERNAME/v0-grace-lutheran-website)
2. You should see all your files there

---

## Part 2: Deploy to Vercel

### Step 1: Connect Your Repository
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Search for `v0-grace-lutheran-website`
5. Click "Import"

### Step 2: Configure Project Settings
1. **Framework Preset:** Select "Next.js"
2. **Root Directory:** Leave as `./`
3. **Environment Variables:** 
   - If using a database, add `DATABASE_URL` here (see Database Setup Guide)
   - Otherwise, leave blank
4. Click "Deploy"

### Step 3: Wait for Deployment
- Vercel will build and deploy automatically (2-3 minutes)
- You'll see a progress bar
- When complete, you'll see "Congratulations! Your site is ready"

### Step 4: Get Your Live URL
1. Click on the deployment card
2. Your URL is shown at the top (looks like: `https://v0-grace-lutheran-website.vercel.app`)
3. Click it to visit your live site!

---

## Part 3: After Deployment

### Step 1: Test Your Site
1. Visit your live URL
2. Check all pages load correctly:
   - Home page with hero and sections
   - Blog posts
   - Members page
   - Contact form
3. Test Owner Access:
   - Click "Owner Access" link
   - Password: `rodmel@122122`
   - Try adding a new applicant
   - Refresh - applicant should appear

### Step 2: Configure Custom Domain (Optional)
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (if you have one)
4. Follow the instructions to update DNS records

### Step 3: Set Up GitHub Auto-Deploy
1. Your project is already connected
2. Every time you push to GitHub `main` branch, Vercel auto-deploys
3. No manual deployment needed!

---

## Troubleshooting

### Deployment Failed?
1. Check the build logs in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - Port conflicts
   - Syntax errors in code

### Site Looks Wrong?
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check responsive design on mobile

### Forms Not Working?
1. Verify API routes exist in your code
2. Check browser console (F12) for errors
3. Ensure environment variables are set if using database

---

## Making Updates

### To Update Your Site:
1. Make changes to your local code
2. Commit changes:
   \`\`\`bash
   git add .
   git commit -m "Description of changes"
   \`\`\`
3. Push to GitHub:
   \`\`\`bash
   git push
   \`\`\`
4. Vercel auto-deploys automatically!

---
