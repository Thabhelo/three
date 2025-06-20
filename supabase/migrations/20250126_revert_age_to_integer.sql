-- Revert age column back from text to integer
ALTER TABLE applications 
ALTER COLUMN age TYPE INTEGER USING age::INTEGER;

-- Update comment to reflect the integer age format
COMMENT ON COLUMN applications.age IS 'Age as integer value';

-- Clean up any existing text age data that might not be valid integers
-- This will convert any text ages to integers, invalid ones will become NULL
UPDATE applications 
SET age = CASE 
  WHEN age ~ '^[0-9]+$' THEN age::INTEGER
  ELSE NULL
END
WHERE age IS NOT NULL; 