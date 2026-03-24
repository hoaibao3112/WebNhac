-- ============================================================
-- WebNhac - Performance Migration
-- Chạy file này 1 lần sau khi deploy code mới
-- ============================================================

-- ─── 1. Songs table indexes ──────────────────────────────────────────────────

-- Trending endpoint: ORDER BY play_count DESC
CREATE INDEX IF NOT EXISTS idx_songs_play_count
    ON songs (play_count DESC);

-- Like sort: ORDER BY like_count DESC
CREATE INDEX IF NOT EXISTS idx_songs_like_count
    ON songs (like_count DESC);

-- Newest songs: ORDER BY release_date DESC
CREATE INDEX IF NOT EXISTS idx_songs_release_date
    ON songs (release_date DESC);

-- Search: WHERE LOWER(title) LIKE '%...%'
-- Note: LIKE '%x%' không dùng được B-Tree index bình thường.
-- Với MySQL 8+, dùng FULLTEXT index để tìm kiếm nhanh hơn.
ALTER TABLE songs ADD FULLTEXT INDEX IF NOT EXISTS ft_songs_title (title);

-- ─── 2. Artists table indexes ────────────────────────────────────────────────

-- Top artists: ORDER BY followers_count DESC
CREATE INDEX IF NOT EXISTS idx_artists_followers_count
    ON artists (followers_count DESC);

-- Verified filter: WHERE verified = true
CREATE INDEX IF NOT EXISTS idx_artists_verified
    ON artists (verified);

-- ─── 3. Comments table indexes ───────────────────────────────────────────────

-- Top-level comments: WHERE song_id = ? AND parent_id IS NULL ORDER BY created_at DESC
-- Composite index phục vụ cả filter + sort
CREATE INDEX IF NOT EXISTS idx_comments_song_parent_created
    ON comments (song_id, parent_id, created_at DESC);

-- Batch load replies: WHERE parent_id IN (...)
CREATE INDEX IF NOT EXISTS idx_comments_parent_id
    ON comments (parent_id, created_at ASC);

-- User comments: WHERE user_id = ? ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_comments_user_created
    ON comments (user_id, created_at DESC);

-- ─── 4. Play history indexes ─────────────────────────────────────────────────

-- Lịch sử nghe của user: WHERE user_id = ? ORDER BY played_at DESC
CREATE INDEX IF NOT EXISTS idx_play_history_user_played
    ON play_history (user_id, played_at DESC);

-- Stats theo bài hát: WHERE song_id = ?
CREATE INDEX IF NOT EXISTS idx_play_history_song_id
    ON play_history (song_id);

-- ─── 5. Junction tables indexes ──────────────────────────────────────────────

-- song_artists: JOIN ON artist_id (đã có song_id từ FK, thêm artist_id)
CREATE INDEX IF NOT EXISTS idx_song_artists_artist_id
    ON song_artists (artist_id);

-- song_genres: JOIN ON genre_id
CREATE INDEX IF NOT EXISTS idx_song_genres_genre_id
    ON song_genres (genre_id);

-- user_favorites: WHERE user_id = ?
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id
    ON user_favorites (user_id);

-- ─── 6. Kiểm tra indexes sau khi tạo ────────────────────────────────────────
-- Chạy câu này để verify:
-- SHOW INDEX FROM songs;
-- SHOW INDEX FROM comments;
-- SHOW INDEX FROM artists;

-- ─── 7. Analyze tables để optimizer cập nhật statistics ──────────────────────
ANALYZE TABLE songs;
ANALYZE TABLE artists;
ANALYZE TABLE comments;
ANALYZE TABLE play_history;
ANALYZE TABLE song_artists;
ANALYZE TABLE song_genres;
