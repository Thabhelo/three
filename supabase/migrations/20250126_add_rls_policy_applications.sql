-- Enable RLS on applications table (in case it's not already enabled)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow ANYONE (including anonymous users) to submit applications
CREATE POLICY "Allow anonymous form submissions" ON applications
FOR INSERT 
TO anon, authenticated, public
WITH CHECK (true);

-- Create policy to allow reading applications (for admin dashboard)
CREATE POLICY "Allow reading applications" ON applications
FOR SELECT
TO anon, authenticated, public
USING (true);

-- Create policy to allow updating applications (for admin status changes)
CREATE POLICY "Allow updating applications" ON applications
FOR UPDATE
TO anon, authenticated, public
USING (true); 