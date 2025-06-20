-- Change age column from integer to text to store age ranges
ALTER TABLE applications 
ALTER COLUMN age TYPE TEXT USING age::TEXT;

-- Add comment to describe the new age range format
COMMENT ON COLUMN applications.age IS 'Age range selection: "18-25" or "26+"';

-- Optionally, if you want to clean up existing data (uncomment if needed)
-- UPDATE applications SET age = '18-25' WHERE age::INTEGER BETWEEN 18 AND 25;
-- UPDATE applications SET age = '26+' WHERE age::INTEGER >= 26; 