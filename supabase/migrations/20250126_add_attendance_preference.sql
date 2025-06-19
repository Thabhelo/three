-- Add attendance_preference column to applications table
ALTER TABLE applications 
ADD COLUMN attendance_preference TEXT;

-- Add comment to describe the column
COMMENT ON COLUMN applications.attendance_preference IS 'User preference for event attendance (e.g., "In-person", "Virtual", "Either")'; 