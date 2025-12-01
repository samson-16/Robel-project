# Grace Lutheran Church - Database Setup Guide

## Current State
Your website currently uses an **in-memory API system** that stores data temporarily. Data will be lost when the server restarts.

---

## Option 1: Upgrade to Persistent Database (Recommended)

### Step 1: Choose a Database Provider
Pick ONE of these options:
- **Supabase** (PostgreSQL) - Best for beginners, free tier available
- **Neon** (PostgreSQL) - Fast, serverless, good for Vercel
- **PlanetScale** (MySQL) - Developer-friendly, great scaling

### Step 2: Create an Account
1. Go to [supabase.com](https://supabase.com), [neon.tech](https://neon.tech), or [planetscale.com](https://planetscale.com)
2. Click "Sign Up" and create an account
3. Verify your email

### Step 3: Create a New Database Project
**For Supabase:**
1. Click "New Project"
2. Name it: `grace-lutheran-church`
3. Create a strong password
4. Select your region (closest to you)
5. Click "Create new project" and wait 2-3 minutes

**For Neon:**
1. Click "Create a new project"
2. Name it: `grace-lutheran`
3. Select PostgreSQL version
4. Click "Create project"

### Step 4: Create the Applicants Table
**For Supabase:**
1. Go to "SQL Editor" in left sidebar
2. Click "New Query"
3. Copy and paste this SQL:

\`\`\`sql
CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  phone TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  profile_picture TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster queries
CREATE INDEX idx_applicants_status ON applicants(status);
\`\`\`

4. Click "Run"
5. You should see "Success" message

**For Neon:**
1. Click "SQL Editor"
2. Click "New Query"
3. Paste the same SQL above
4. Click "Execute"

### Step 5: Get Your Database URL
**For Supabase:**
1. Go to "Settings" → "Database"
2. Copy the connection string (starts with `postgresql://`)
3. Replace `[YOUR-PASSWORD]` with your database password

**For Neon:**
1. Go to "Connection string"
2. Copy the connection string
3. It will be formatted like: `postgresql://user:password@host/dbname`

### Step 6: Add Environment Variable to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project `v0-grace-lutheran-website`
3. Go to "Settings" → "Environment Variables"
4. Click "Add New"
5. Name: `DATABASE_URL`
6. Value: Paste your connection string
7. Select "Production"
8. Click "Save"

### Step 7: Update Your Code
The code will be updated to use the database instead of in-memory storage. This happens automatically when you connect a database integration in v0.

---

## Option 2: Keep Current In-Memory System (Temporary)
Your current system works fine for:
- Testing and development
- Small deployments
- Learning purposes

**Limitation:** Data resets when server restarts

---

## Verification

### Test Your Database Connection
1. Deploy to Vercel (see Deployment Guide below)
2. Go to your deployed site
3. Add a new applicant via Owner Access (password: `rodmel@122122`)
4. Refresh the page - applicant should still be there
5. Wait a few minutes for server restart
6. Refresh again - if using persistent database, applicant still appears
7. If using in-memory, applicant will be gone

---
