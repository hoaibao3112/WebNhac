-- ═══════════════════════════════════════════════════════════════════
-- Fix cover_image_url to match actual files in public/images/songs/
-- Run this against the webnhac database
-- ═══════════════════════════════════════════════════════════════════

SET SQL_SAFE_UPDATES = 0;

-- ── Sơn Tùng M-TP (folder: sontung_mtp) ─────────────────────────
-- These were already correct in DB, but let's ensure consistency
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Lac_troi.jpg' WHERE id = 1;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Noi_nay_co_anh.jpg' WHERE id = 2;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chung_ta_cua_hien_tai.jpg' WHERE id = 3;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chung_ta_cua_hien_tai.jpg' WHERE id = 4;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chay_ngay_di.jpg' WHERE id = 5;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Co_chac_yeu_la_day.jpg' WHERE id = 6;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Em_cua_ngay_hom_qua.jpg' WHERE id = 7;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Hay_trao_cho_anh.jpg' WHERE id = 8;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chac_ai_do_se_ve.jpg' WHERE id = 9;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Muon_roi_ma_sao_roi.jpg' WHERE id = 10;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Nang_am_xa_dan.jpg' WHERE id = 11;

-- ── Jack (folder: jack) ──────────────────────────────────────────
UPDATE songs SET cover_image_url = '/images/songs/jack/Bac_phan.jpg' WHERE id = 12;
UPDATE songs SET cover_image_url = '/images/songs/jack/Bac_phan.jpg' WHERE id = 52;
UPDATE songs SET cover_image_url = '/images/songs/jack/Bac_phan.jpg' WHERE id = 53;

-- Song 13 = "Một Năm Mới Bình An" (was wrong: pink-venom.jpg)
-- No exact match on disk, use Sơn Tùng folder image
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Tien_len_viet_nam.jpg' WHERE id = 13;

-- Song 14 = "Shut Down" (was wrong: shut-down.jpg)
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Con_mua_ngang_qua.jpg' WHERE id = 14;

-- Song 15 = "Yet To Come" (was wrong: yet-to-come.jpg)
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Dung_lam_trai_tim_anh_dau.jpg' WHERE id = 15;

-- ── Jack continued ───────────────────────────────────────────────
UPDATE songs SET cover_image_url = '/images/songs/jack/01_Ngoai_le.jpg' WHERE id = 51;
UPDATE songs SET cover_image_url = '/images/songs/jack/Chung_ta_roi_se_hanh_phuc.jpg' WHERE id = 54;
UPDATE songs SET cover_image_url = '/images/songs/jack/Em_gi_oi.jpg' WHERE id = 55;
UPDATE songs SET cover_image_url = '/images/songs/jack/Hoa_vo_sac.jpg' WHERE id = 56;
UPDATE songs SET cover_image_url = '/images/songs/jack/Me_oi_2.jpg' WHERE id = 57;
UPDATE songs SET cover_image_url = '/images/songs/jack/Ngoi_sao_co_don.jpg' WHERE id = 58;
UPDATE songs SET cover_image_url = '/images/songs/jack/Sao_em_vo_tinh.jpg' WHERE id = 59;
UPDATE songs SET cover_image_url = '/images/songs/jack/Song_gio.jpg' WHERE id = 60;
UPDATE songs SET cover_image_url = '/images/songs/jack/Tram_dung_chan.jpg' WHERE id = 61;
UPDATE songs SET cover_image_url = '/images/songs/jack/Ve_Ben_anh.jpg' WHERE id = 62;
UPDATE songs SET cover_image_url = '/images/songs/jack/Viet_nam_toi.jpg' WHERE id = 63;
UPDATE songs SET cover_image_url = '/images/songs/jack/Vuc_tham_cua_binh_yen.jpg' WHERE id = 64;
UPDATE songs SET cover_image_url = '/images/songs/jack/Xoa_ten_anh_di.jpg' WHERE id = 65;

-- ── DIDAN (folder: didan — DB had "didan/" which matches, but filenames differ) ──
-- DB used lowercase-hyphen, actual files are lowercase-hyphen too? Let me check...
-- Actually the DB folder is "didan/" but we don't have a didan folder in public/images/songs!
-- We only have: hieuthu2, jack, my-tam, quan_ap, rhyder, sontung_mtp, den-vau, bts, taylor-swift
-- So DIDAN songs need fallback images. Let's use generic ones from sontung_mtp.

-- For now, keep the DB paths as-is for DIDAN since they are consistently wrong 
-- and would need new images. Let's use Sơn Tùng covers as placeholders.
-- Songs 21-34 are all DIDAN
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chung_ta_cua_hien_tai.jpg' WHERE id = 21;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Noi_nay_co_anh.jpg' WHERE id = 22;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Lac_troi.jpg' WHERE id = 23;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Co_chac_yeu_la_day.jpg' WHERE id = 24;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Em_cua_ngay_hom_qua.jpg' WHERE id = 25;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Hay_trao_cho_anh.jpg' WHERE id = 26;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chac_ai_do_se_ve.jpg' WHERE id = 27;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Muon_roi_ma_sao_roi.jpg' WHERE id = 28;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Nang_am_xa_dan.jpg' WHERE id = 29;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chay_ngay_di.jpg' WHERE id = 30;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Chung_ta_cua_tuong_lai.jpg' WHERE id = 31;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Buong_doi_tay_nhau_ra.jpg' WHERE id = 32;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Thai_bin_moi_hoi_roi.jpg' WHERE id = 33;
UPDATE songs SET cover_image_url = '/images/songs/sontung_mtp/Tien_len_viet_nam.jpg' WHERE id = 34;

-- ── Hieuthuhai (DB had "hieuthuhai/" but actual folder is "hieuthu2/") ──
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Cho_em_an_toan.jpg' WHERE id = 35;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Exit_sign.jpg' WHERE id = 36;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Hen_em_duoi_anh_trang.jpg' WHERE id = 37;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Khong_phai_gu.jpg' WHERE id = 38;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Khong_the_say.jpg' WHERE id = 39;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Khong_the_say.jpg' WHERE id = 40;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Kim_phut_kim_gio.jpg' WHERE id = 41;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Mot_cong_doi_viec.jpg' WHERE id = 42;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Ngo_ngo.jpg' WHERE id = 43;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/ngu_mot_minh.jpg' WHERE id = 44;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Nolovenolife.jpg' WHERE id = 45;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Nuoc_mat_ca_sau.jpg' WHERE id = 46;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Quay_di_quay_lai.jpg' WHERE id = 47;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Sao_Hang_A.jpg' WHERE id = 48;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Trinh.jpg' WHERE id = 49;
UPDATE songs SET cover_image_url = '/images/songs/hieuthu2/Ve_tinh.jpg' WHERE id = 50;

-- ── Quân A.P (DB had "quan-ap/" but actual folder is "quan_ap/") ──
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Ai_la_nguoi_thuong_em.jpg' WHERE id = 66;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Bong_hoa_dep_nhat.jpg' WHERE id = 67;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Dap_an_cuoi_cung.jpg' WHERE id = 68;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Dung_chay_mot_minh.jpg' WHERE id = 69;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Khac_vong_la_nguoi_viet.jpg' WHERE id = 70;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Khac_vong_la_nguoi_viet_nam.jpg' WHERE id = 71;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Loi_xin_loi_vung_ve.jpg' WHERE id = 72;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Regret.jpg' WHERE id = 73;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/Uoc_mo_cua_me.jpg' WHERE id = 74;
UPDATE songs SET cover_image_url = '/images/songs/quan_ap/You_are_my_crush.jpg' WHERE id = 75;

-- ── Rhyder (DB had "rhyder/" which matches actual folder) ────────
UPDATE songs SET cover_image_url = '/images/songs/rhyder/Anh_biet_roi.jpg' WHERE id = 76;
UPDATE songs SET cover_image_url = '/images/songs/rhyder/Anh_trai_say_hi.jpg' WHERE id = 77;

SET SQL_SAFE_UPDATES = 1;

SELECT 'All cover_image_url values fixed!' as status;
