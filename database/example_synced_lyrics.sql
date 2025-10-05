-- Example: How to add synced lyrics in LRC format
-- Format: [mm:ss.xx]Lyric text

SET SQL_SAFE_UPDATES = 0;

-- Example for song ID 1 (Lạc Trôi)
-- Note: These timestamps are EXAMPLES ONLY - you need real timestamps
UPDATE songs 
SET synced_lyrics = '[00:12.50]Người theo hương hoa mây mù giăng lối
[00:17.20]Làn sương khói phôi phai đưa bước ai xa rồi
[00:23.10]Đơn côi mình ta vấn vương
[00:27.80]Hồi ức trong men say chiều mưa buồn
[00:32.40]Ngăn giọt lệ ngừng khiến khoé mi sầu bi
[00:37.90]Đường xưa nơi cố nhân từ giã biệt li
[00:43.20]Phận duyên mong manh rẽ lối trong mơ ngày tương phùng
[00:49.50]Oh tiếng khóc cuốn theo làn gió bay
[00:54.80]Thuyền qua sông lỡ quên vớt ánh trăng tàn nơi này
[01:00.30]Trống vắng bóng ai dần hao gầy
[01:05.60]Lòng ta xin nguyện khắc ghi trong tim tình nồng mê say
[01:11.20]Mặc cho tóc mây vương lên đôi môi cay
[01:16.80]Bâng khuâng mình ta lạc trôi giữa đời
[01:22.40]Ta lạc trôi giữa trời'
WHERE id = 1;

SET SQL_SAFE_UPDATES = 1;

-- HOW TO GET REAL TIMESTAMPS:
-- 1. Use LRC editor tools (search "LRC editor online")
-- 2. Listen to the song and mark timing for each line
-- 3. Or use automatic tools like:
--    - Syncedlyrics (Python library)
--    - LRC Generator websites
--    - Musixmatch API (has timestamps)

SELECT 'Example synced lyrics added. Replace with real timestamps!' as note;
