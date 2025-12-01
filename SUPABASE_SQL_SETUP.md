# Supabase Database Setup - SQL Method

## Step 1: Login to Supabase Dashboard
1. Go to https://supabase.com
2. Click "Sign In"
3. Login with your account (or create one if needed)
4. Select your project

## Step 2: Open SQL Editor
1. In the left sidebar, click **"SQL Editor"**
2. Click **"New Query"**
3. Give it a name like "Create Applicants Table"

## Step 3: Copy the SQL Code
Copy the entire SQL from the file `scripts/01-create-applicants-table.sql`:

\`\`\`sql
CREATE TABLE IF NOT EXISTS applicants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  phone TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'rejected', 'accepted')),
  profile_picture TEXT,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_date_added ON applicants(date_added DESC);

ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON applicants
  FOR SELECT USING (true);

CREATE POLICY "Allow owner modifications" ON applicants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow owner update" ON applicants
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow owner delete" ON applicants
  FOR DELETE USING (true);

INSERT INTO applicants (id, name, age, phone, passport_number, status, profile_picture)
VALUES
  ('1', 'John Doe', 28, '+1-555-0101', 'US123456789', 'accepted', '/church-member.png'),
  ('2', 'Sarah Johnson', 34, '+1-555-0102', 'US987654321', 'pending', '/church-member.png')
ON CONFLICT (id) DO NOTHING;
\`\`\`

## Step 4: Paste into SQL Editor
1. Paste the SQL code into the query editor
2. Click **"Run"** button (or press Ctrl+Enter)
3. You should see "Query successful" at the bottom

## Step 5: Verify Table Creation
1. In left sidebar, click **"Table Editor"**
2. You should see "applicants" in the list
3. Click on it to view the table structure

## Step 6: Verify Environment Variables in v0
In v0:
1. Click **"Vars"** in the left sidebar
2. You should see these variables (auto-added when you connected Supabase):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (server-side only)

## Step 7: Test the Connection
1. Go to your v0 preview
2. Add a new applicant in owner mode
3. Check Supabase dashboard → Table Editor → applicants
4. You should see the new applicant in the table!

## Common Issues

### "Missing Supabase URL or Anon Key"
- Make sure you added Supabase integration in v0 Connect panel
- Wait 30 seconds for variables to propagate

### "Table doesn't exist"
- Go to Supabase SQL Editor
- Run the CREATE TABLE query again
- Make sure you clicked "Run"

### Data not appearing
- Check Row Level Security (RLS) is enabled
- Click on table → RLS → make sure policies are enabled
- Try adding test data directly in Supabase dashboard first

## Next Steps
- Your API will automatically use Supabase when environment variables are set
- Data persists permanently in the database
- Accessible from Vercel deployment
- Can manage data from Supabase dashboard or your web app
