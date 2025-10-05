-- Add lyrics column to songs table (skip if already exists)
-- Check if column exists first
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.columns 
WHERE table_schema = 'webnhac' 
  AND table_name = 'songs' 
  AND column_name = 'lyrics';

-- Only add column if it doesn't exist
SET @sql = IF(@col_exists = 0,
  'ALTER TABLE songs ADD COLUMN lyrics TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
  'SELECT "Column lyrics already exists" as status');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update placeholder lyrics for songs that don't have any
UPDATE songs SET lyrics = 'Lyrics for this song will be available soon...' 
WHERE lyrics IS NULL OR lyrics = '';

SELECT 'Lyrics setup completed!' as status;
