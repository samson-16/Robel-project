# Grace Lutheran Church Website - Deployment Guide

## Step-by-Step Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)
- Node.js 18+ installed locally (optional, for testing)

---

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Push Code to GitHub
1. Open your terminal/command prompt
2. Navigate to your project folder
3. Run these commands:
\`\`\`bash
git init
git add .
git commit -m "Grace Lutheran Church website initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/grace-lutheran-website.git
git push -u origin main
\`\`\`

### Step 2: Connect to Vercel
1. Go to https://vercel.com and sign in
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub repository URL and click **"Import"**
5. Vercel will auto-detect Next.js - no configuration needed
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete
8. Your site will be live at `your-project.vercel.app`

### Step 3: Connect Your Custom Domain (Optional)
1. In Vercel dashboard, go to **Settings → Domains**
2. Enter your domain name
3. Follow Vercel's DNS setup instructions
4. DNS changes propagate within 24-48 hours

---

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
\`\`\`bash
npm install -g vercel
\`\`\`

### Step 2: Deploy from Local Folder
\`\`\`bash
cd path/to/grace-lutheran-website
vercel
\`\`\`

### Step 3: Follow Prompts
- Select "Y" for "Set up and deploy?"
- Choose your project name
- Choose your preferred scope
- Accept default settings
- Vercel will deploy automatically

---

## Option 3: Deploy via v0 UI

### Step 1: In v0 Application
1. Click the **"Publish"** button (top right of code editor)
2. Select **"Deploy to Vercel"**
3. Authorize v0 to access your GitHub/Vercel account
4. Choose deployment settings
5. Click **"Deploy"**

---

## After Deployment

### Update Environment Variables (if needed)
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add any `.env` variables your site needs
3. Redeploy from the Deployments tab

### View Your Site
- Production URL: `https://your-project.vercel.app`
- Preview deployments: Created automatically for pull requests

### Making Updates
- Push changes to main branch on GitHub
- Vercel automatically redeploys (2-3 minutes)
- No manual action needed!

---

## Troubleshooting

### Site shows 404 or blank page
- Check the Vercel Deployment logs (Deployments tab)
- Ensure all files are committed to GitHub
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)

### Build fails
- Click "View Function Logs" in Vercel dashboard
- Check for TypeScript or missing import errors
- Ensure package.json includes all dependencies

### Custom domain not working
- DNS changes take 24-48 hours to propagate
- Check DNS records in Vercel dashboard
- Verify domain registrar settings

---

## Maintenance & Updates

### To update site content:
1. Edit files locally or use v0
2. Commit and push to GitHub
3. Vercel auto-deploys

### To add new features:
1. Create a new branch: `git checkout -b feature-name`
2. Make changes and commit
3. Push: `git push origin feature-name`
4. Create Pull Request on GitHub
5. Vercel creates preview deployment
6. Merge PR when satisfied
7. Main branch auto-deploys to production

---

## Support

- **v0 Help**: https://v0.app (in-app chat support)
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Help**: https://docs.github.com

Congratulations! Your Grace Lutheran Church website is now live! 🎉
