-- Simply update lyrics with placeholder text
-- (Cột lyrics đã tồn tại rồi)

SET SQL_SAFE_UPDATES = 0;

-- Update placeholder cho tất cả bài hát chưa có lyrics
UPDATE songs 
SET lyrics = '🎵 Lyrics will be available soon\n🎵 Stay tuned for updates\n\n[Instrumental]\n\n🎵 Thank you for listening!' 
WHERE lyrics IS NULL OR lyrics = '';

-- Check kết quả
SELECT COUNT(*) as total_songs, 
       SUM(CASE WHEN lyrics IS NOT NULL AND lyrics != '' THEN 1 ELSE 0 END) as songs_with_lyrics
FROM songs;

SET SQL_SAFE_UPDATES = 1;
