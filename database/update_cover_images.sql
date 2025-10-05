-- Update cover image URLs to match actual folder structure
-- Images are in public/images/songs/{artist_folder}/

-- Disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Sơn Tùng M-TP songs
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Lac_troi.jpg' 
WHERE title LIKE '%Lạc Trôi%' OR title LIKE '%L___c Tr__i%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chay_ngay_di.jpg' 
WHERE title LIKE '%Chạy Ngay Đi%' OR title LIKE '%CH___Y NGAY ___I%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Noi_nay_co_anh.jpg' 
WHERE title LIKE '%Nơi Này Có Anh%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Hay_trao_cho_anh.jpg' 
WHERE title LIKE '%Hãy Trao Cho Anh%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Buong_doi_tay_nhau_ra.jpg' 
WHERE title LIKE '%Buông Đôi Tay%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chac_ai_do_se_ve.jpg' 
WHERE title LIKE '%Chắc Ai Đó%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Co_chac_yeu_la_day.jpg' 
WHERE title LIKE '%Có Chắc%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Muon_roi_ma_sao_roi.jpg' 
WHERE title LIKE '%Muộn Rồi%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Nang_am_xa_dan.jpg' 
WHERE title LIKE '%Nắng Ấm%';

UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Thai_bin_moi_hoi_roi.jpg' 
WHERE title LIKE '%Thái Bình%';

-- Hiếu Thứ Hai songs
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Exit_Sign.jpg' 
WHERE title LIKE '%Exit Sign%';

UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Khong_The_Say.jpg' 
WHERE title LIKE '%Không Thể Say%';

UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Ngu_mot_minh.jpg' 
WHERE title LIKE '%ngủ một mình%';

-- Jack songs
UPDATE songs SET cover_image_url = '/images/songs/jack/Bac_phan.jpg' 
WHERE title LIKE '%Bạc Phận%';

UPDATE songs SET cover_image_url = '/images/songs/jack/Song_gio.jpg' 
WHERE title LIKE '%Sóng Gió%';

UPDATE songs SET cover_image_url = '/images/songs/jack/Hoa_vo_sac.jpg' 
WHERE title LIKE '%Hoa Vô Sắc%';

-- Rhyder songs  
UPDATE songs SET cover_image_url = '/images/songs/rhyder/Dan_choi_sao_phai_khoc.jpg' 
WHERE title LIKE '%Dân Chơi%';

UPDATE songs SET cover_image_url = '/images/songs/rhyder/Sau_con_mua.jpg' 
WHERE title LIKE '%Sau Cơn Mưa%';

-- Quân A.P songs
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Bong_hoa_dep_nhat.jpg' 
WHERE title LIKE '%Bông Hoa%';

-- Default fallback: use album cover if no song cover found
UPDATE songs s
JOIN albums a ON s.album_id = a.id
SET s.cover_image_url = a.cover_image_url
WHERE s.cover_image_url IS NULL OR s.cover_image_url = '';

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

SELECT 'Cover images updated successfully!' as status;
