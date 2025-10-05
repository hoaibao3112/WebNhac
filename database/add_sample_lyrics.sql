-- Add sample lyrics for popular songs
-- Note: These are placeholder lyrics for demonstration purposes only

SET SQL_SAFE_UPDATES = 0;

-- Sample lyrics structure (you should replace with actual lyrics that you have rights to use)
UPDATE songs SET lyrics = 'Verse 1:\n[Lyrics line 1]\n[Lyrics line 2]\n\nChorus:\n[Chorus lyrics]\n\nVerse 2:\n[More lyrics]\n\nBridge:\n[Bridge lyrics]'
WHERE title LIKE '%Lạc Trôi%' OR title LIKE '%L___c Tr__i%';

UPDATE songs SET lyrics = 'Verse 1:\n[Lyrics line 1]\n[Lyrics line 2]\n\nChorus:\n[Chorus lyrics]\n\nVerse 2:\n[More lyrics]'
WHERE title LIKE '%Chạy Ngay Đi%' OR title LIKE '%CH___Y NGAY ___I%';

UPDATE songs SET lyrics = 'Verse 1:\n[Opening lyrics]\n[More lines]\n\nChorus:\n[Catchy chorus]\n\nVerse 2:\n[Second verse]'
WHERE title LIKE '%Nơi Này Có Anh%';

UPDATE songs SET lyrics = 'Intro:\n[Opening]\n\nVerse 1:\n[Lyrics]\n\nChorus:\n[Main hook]\n\nBridge:\n[Bridge section]'
WHERE title LIKE '%Hãy Trao Cho Anh%';

-- Default lyrics for songs without specific lyrics
UPDATE songs SET lyrics = '♪ Lyrics for this song\n♪ Will be available soon\n♪ Stay tuned for updates!\n\n[Instrumental sections]\n\n♪ More lyrics coming\n♪ Thank you for listening'
WHERE lyrics IS NULL OR lyrics = '';

SET SQL_SAFE_UPDATES = 1;

SELECT COUNT(*) as songs_with_lyrics FROM songs WHERE lyrics IS NOT NULL AND lyrics != '';
