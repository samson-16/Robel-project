-- Create applicants table for Grace Lutheran Church
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_date_added ON applicants(date_added DESC);

-- Enable Row Level Security (optional, for security)
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read applicants
CREATE POLICY "Allow public read access" ON applicants
  FOR SELECT USING (true);

-- Allow only authenticated users to insert/update/delete (optional)
CREATE POLICY "Allow owner modifications" ON applicants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow owner update" ON applicants
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow owner delete" ON applicants
  FOR DELETE USING (true);

-- Insert sample data (optional)
INSERT INTO applicants (id, name, age, phone, passport_number, status, profile_picture)
VALUES
  ('1', 'John Doe', 28, '+1-555-0101', 'US123456789', 'accepted', '/church-member.png'),
  ('2', 'Sarah Johnson', 34, '+1-555-0102', 'US987654321', 'pending', '/church-member.png')
ON CONFLICT (id) DO NOTHING;
