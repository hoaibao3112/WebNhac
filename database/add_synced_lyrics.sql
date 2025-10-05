-- Add column for synced lyrics (LRC format)
ALTER TABLE songs ADD COLUMN synced_lyrics TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sample LRC format lyrics (placeholder - you need proper timestamps)
-- Format: [mm:ss.xx]Lyric line
UPDATE songs 
SET synced_lyrics = '[00:00.00]🎵 Synced lyrics not available yet
[00:05.00]🎵 This feature requires LRC format
[00:10.00]🎵 With timestamps for each line'
WHERE synced_lyrics IS NULL OR synced_lyrics = '';

SELECT 'Synced lyrics column added!' as status;
