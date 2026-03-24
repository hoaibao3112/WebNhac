package com.webnhac.repository;

import com.webnhac.entity.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    // ─── Count queries (dùng để tính totalElements cho Page) ─────────────────

    @Query("SELECT COUNT(DISTINCT s) FROM Song s")
    long countDistinct();

    @Query("SELECT COUNT(DISTINCT s) FROM Song s JOIN s.artists a WHERE a.id = :artistId")
    long countByArtistId(@Param("artistId") Long artistId);

    @Query("SELECT COUNT(DISTINCT s) FROM Song s JOIN s.genres g WHERE g.id = :genreId")
    long countByGenreId(@Param("genreId") Long genreId);

    @Query("SELECT COUNT(DISTINCT s) FROM Song s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%',:title,'%'))")
    long countByTitleContaining(@Param("title") String title);

    // ─── Fetch queries (JOIN FETCH loại bỏ N+1) ──────────────────────────────

    /**
     * Tất cả bài hát — fetch artists, genres, album trong 1 query.
     * Dùng DISTINCT vì JOIN FETCH với collection có thể tạo duplicate rows.
     * Pageable offset/limit áp dụng sau khi JOIN nên cần tách count query riêng.
     */
    @Query(value = """
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists
            LEFT JOIN FETCH s.genres
            LEFT JOIN FETCH s.album
            ORDER BY s.playCount DESC
            """,
           countQuery = "SELECT COUNT(DISTINCT s) FROM Song s")
    List<Song> findAllWithDetails(Pageable pageable);

    /** Trending — sắp xếp theo play_count DESC */
    @Query("""
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists
            LEFT JOIN FETCH s.genres
            LEFT JOIN FETCH s.album
            ORDER BY s.playCount DESC
            """)
    List<Song> findTrendingWithDetails(Pageable pageable);

    /** Tìm theo artist — không N+1 */
    @Query("""
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists a2
            LEFT JOIN FETCH s.genres
            LEFT JOIN FETCH s.album
            WHERE EXISTS (
                SELECT 1 FROM Song s2 JOIN s2.artists a WHERE s2 = s AND a.id = :artistId
            )
            ORDER BY s.playCount DESC
            """)
    List<Song> findByArtistIdWithDetails(@Param("artistId") Long artistId, Pageable pageable);

    /** Tìm theo genre — không N+1 */
    @Query("""
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists
            LEFT JOIN FETCH s.genres g2
            LEFT JOIN FETCH s.album
            WHERE EXISTS (
                SELECT 1 FROM Song s2 JOIN s2.genres g WHERE s2 = s AND g.id = :genreId
            )
            ORDER BY s.playCount DESC
            """)
    List<Song> findByGenreIdWithDetails(@Param("genreId") Long genreId, Pageable pageable);

    /** Tìm kiếm theo title — không N+1 */
    @Query("""
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists
            LEFT JOIN FETCH s.genres
            LEFT JOIN FETCH s.album
            WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%'))
            ORDER BY s.playCount DESC
            """)
    List<Song> findByTitleContainingWithDetails(@Param("title") String title, Pageable pageable);

    /** Chi tiết 1 bài hát — fetch đầy đủ */
    @Query("""
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists
            LEFT JOIN FETCH s.genres
            LEFT JOIN FETCH s.album
            WHERE s.id = :id
            """)
    Optional<Song> findByIdWithDetails(@Param("id") Long id);

    /** Yêu thích — sort theo like count */
    @Query("""
            SELECT DISTINCT s FROM Song s
            LEFT JOIN FETCH s.artists
            LEFT JOIN FETCH s.genres
            LEFT JOIN FETCH s.album
            ORDER BY s.likeCount DESC
            """)
    List<Song> findByLikeCountWithDetails(Pageable pageable);

    // ─── Bulk update (tránh load entity chỉ để update số) ────────────────────

    /** Tăng play_count trực tiếp bằng UPDATE — không cần SELECT trước */
    @Transactional
    @Modifying
    @Query("UPDATE Song s SET s.playCount = s.playCount + 1 WHERE s.id = :id")
    void incrementPlayCount(@Param("id") Long id);

    /** Tăng like_count */
    @Transactional
    @Modifying
    @Query("UPDATE Song s SET s.likeCount = s.likeCount + 1 WHERE s.id = :id")
    void incrementLikeCount(@Param("id") Long id);

    /** Giảm like_count — không để xuống dưới 0 */
    @Transactional
    @Modifying
    @Query("UPDATE Song s SET s.likeCount = GREATEST(0, s.likeCount - 1) WHERE s.id = :id")
    void decrementLikeCount(@Param("id") Long id);
}
