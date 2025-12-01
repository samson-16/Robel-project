# Supabase Database Setup - Complete Step-by-Step Guide

This guide walks you through setting up Supabase to replace the in-memory applicant storage with a persistent PostgreSQL database.

## Phase 1: Add Supabase Integration to v0 (5 minutes)

### Step 1: Open the Connect Panel
1. Open your Grace Lutheran Church website in v0.app
2. Look at the **left sidebar** - you'll see several icons
3. Click the **"Connect"** icon (looks like a plug/connection symbol)
4. This opens the integrations panel

### Step 2: Add Supabase
1. In the Connect panel, scroll or search for **"Supabase"**
2. Click on **"Supabase"** to add it
3. A popup will appear asking you to:
   - **Sign in to Supabase** (or create a free account at supabase.com)
   - **Select a project** or create a new one
   - **Authorize v0** to access your Supabase project

### Step 3: Authorize Connection
1. Click the Supabase project you want to use
2. Click **"Connect"** or **"Authorize"**
3. You'll see a confirmation message: "Supabase Connected"
4. Environment variables will be automatically added to your project

### Step 4: Verify Environment Variables
1. Click the **"Vars"** icon in the left sidebar
2. You should see these variables (they'll be hidden for security):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`
   - And other Supabase-related keys

If you don't see them, go back to Connect and make sure Supabase is connected.

---

## Phase 2: Create Database Table in Supabase (10 minutes)

### Step 1: Go to Supabase Dashboard
1. Open **supabase.com** in a new tab
2. Sign in with the same account you used in v0
3. Select your project
4. You're in the Supabase dashboard

### Step 2: Create the Applicants Table
1. In the left sidebar, click **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste this SQL code:

\`\`\`sql
-- Create applicants table
CREATE TABLE applicants (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  phone TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  profile_picture TEXT,
  date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_applicants_status ON applicants(status);
CREATE INDEX idx_applicants_date_added ON applicants(date_added DESC);
\`\`\`

4. Click **"Run"** (green play button)
5. You should see: "Success. 3 rows affected."

### Step 3: Enable Row Level Security (RLS) - Optional but Recommended
1. Still in SQL Editor
2. Paste this code:

\`\`\`sql
-- Enable RLS
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read applicants
CREATE POLICY "Allow public read access" ON applicants
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON applicants
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON applicants
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON applicants
FOR DELETE
TO authenticated
USING (true);
\`\`\`

3. Click **"Run"**

---

## Phase 3: Update Your Code to Use Supabase (Ready to Deploy)

The code files have been updated to use Supabase instead of in-memory storage:

### Files That Changed:
- **`lib/supabase-client.ts`** - New Supabase client setup
- **`app/api/applicants/route.ts`** - Updated to query Supabase
- **`app/api/applicants/[id]/route.ts`** - Updated to use Supabase

### What This Means:
✅ New applicants are saved to Supabase  
✅ Data persists after server restarts  
✅ All applicants are visible across deployments  
✅ Status updates work with Supabase  
✅ Delete operations remove from database  

---

## Phase 4: Test Everything (5 minutes)

### Test 1: Add a New Applicant
1. Go to your website
2. Click **"Owner Access"** (header)
3. Enter password: `rodmel@122122`
4. Click **"Add New Applicant"**
5. Fill in the form:
   - Name: `Test Member`
   - Age: `30`
   - Phone: `+1-555-1234`
   - Passport: `TEST123456`
   - Status: `pending`
   - Upload a profile picture
6. Click **"Add Applicant"**

### Test 2: Verify Data in Supabase
1. Go to Supabase dashboard
2. Click **"Table Editor"** in left sidebar
3. Select **"applicants"** table
4. You should see your new applicant in the list!

### Test 3: Verify on Website
1. Go back to your website
2. Click **"Church Members"** in the header
3. You should see your new applicant displayed
4. The status should show "pending"

### Test 4: Update Status
1. Go to **"Owner Access"**
2. Find your test applicant
3. Change status to **"accepted"**
4. Go to **"Church Members"** page
5. The member should now appear in the accepted members list

### Test 5: Delete Applicant
1. Go to **"Owner Access"**
2. Find your test applicant
3. Click **"Delete"**
4. Verify it's removed from Supabase and website

---

## Phase 5: Deploy to Vercel (5 minutes)

### Step 1: Push Code to GitHub
\`\`\`bash
git add .
git commit -m "Connected to Supabase database"
git push origin main
\`\`\`

### Step 2: Vercel Auto-Deploy
1. Vercel automatically detects the push
2. Your site redeploys with Supabase connection
3. Check deployment status at vercel.com

### Step 3: Verify Production
1. Open your live website (the Vercel URL)
2. Test adding an applicant
3. Verify it shows in Supabase dashboard

---

## Troubleshooting

### Issue: "Supabase connection failed"
- Solution: Check that environment variables are in the **Vars** section
- Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

### Issue: "Table does not exist"
- Solution: Go to Supabase dashboard and run the SQL code to create the table
- Click **"SQL Editor"** → **"New Query"** → paste the table creation code

### Issue: "403 Forbidden" error
- Solution: You need to disable Row Level Security or configure it properly
- In Supabase, go to **"Table Editor"** → **"applicants"** → **"RLS"** toggle it off

### Issue: Data not showing after adding
- Solution: Wait 2-3 seconds for SWR to revalidate
- Try refreshing the page (F5 or Cmd+R)
- Check browser console for errors (F12 → Console)

---

## What's Next?

Now that you have a database:

1. **Backup your data** - Supabase has automatic backups (check dashboard)
2. **Monitor usage** - Free tier has generous limits
3. **Add more features** - Consider adding user authentication
4. **Scale up** - When you need more capacity, upgrade your Supabase plan

---

## Quick Reference

| Action | Where | Steps |
|--------|-------|-------|
| View all applicants | Supabase Dashboard → Table Editor | Select `applicants` table |
| Add member via form | Website → Owner Access | Fill form and submit |
| Update member status | Website → Owner Access | Change status dropdown |
| Delete member | Website → Owner Access | Click delete button |
| View database SQL | Supabase → SQL Editor | Create and run queries |
| Check logs | Vercel Dashboard | Go to Deployments → Logs |

---

## Support

If something doesn't work:
1. Check the console errors (F12 in browser)
2. Verify Supabase connection in **Vars** section
3. Make sure the `applicants` table exists in Supabase
4. Try refreshing the page
5. Restart your development server

You're all set! 🎉
