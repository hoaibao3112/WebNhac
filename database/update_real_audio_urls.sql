-- =============================================
-- CẬP NHẬT FILE NHẠC THỰC TẾ
-- Update audio URLs từ test sang file thực tế
-- =============================================

USE webnhac;

-- Lưu ý: File nhạc nằm trong public/images/audio/
-- Next.js sẽ serve từ thư mục public, nên URL sẽ là: /images/audio/...

-- Cập nhật các bài hát cũ (ID 1-20) với URL test thành không có file
-- Hoặc có thể map sang các file thực tế nếu muốn

-- Các bài từ ID 21 trở đi đã có file_url đúng rồi (từ database dump)
-- Ví dụ: '/images/audio/DIDAN/1 2 3 4.mp3'

-- Kiểm tra các bài hát có URL test
SELECT id, title, file_url 
FROM songs 
WHERE file_url LIKE '%soundhelix%'
ORDER BY id;

-- Nếu muốn xóa các bài test cũ (ID 1-20), uncomment dòng sau:
-- DELETE FROM songs WHERE id <= 20;

-- Hoặc update URL cho các bài cũ sang placeholder
UPDATE songs 
SET file_url = CONCAT('/images/audio/placeholder/', REPLACE(title, ' ', '_'), '.mp3')
WHERE file_url LIKE '%soundhelix%';

-- Kiểm tra kết quả
SELECT id, title, file_url 
FROM songs 
WHERE id <= 20
ORDER BY id;

SELECT '✅ Đã cập nhật file nhạc thành công!' AS status;
