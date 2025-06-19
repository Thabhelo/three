-- Add date preferences column to applications table
ALTER TABLE applications 
ADD COLUMN date_preferences JSONB;

-- Add comment to describe the column structure
COMMENT ON COLUMN applications.date_preferences IS 'Array of date periods ranked by user preference: [{"period": "Aug 1-11", "rank": 1}, {"period": "Thanksgiving week", "rank": 2}, {"period": "December", "rank": 3}]'; 