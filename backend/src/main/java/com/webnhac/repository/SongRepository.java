package com.webnhac.repository;

import com.webnhac.entity.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    
    // Tìm kiếm bài hát theo title
    Page<Song> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    // Tìm bài hát theo artist
    @Query("SELECT s FROM Song s JOIN s.artists a WHERE a.id = :artistId")
    Page<Song> findByArtistId(@Param("artistId") Long artistId, Pageable pageable);

    // Tìm bài hát theo album
    Page<Song> findByAlbumId(Long albumId, Pageable pageable);

    // Tìm bài hát theo genre
    @Query("SELECT s FROM Song s JOIN s.genres g WHERE g.id = :genreId")
    Page<Song> findByGenreId(@Param("genreId") Long genreId, Pageable pageable);

    // Lấy bài hát trending (theo lượt nghe)
    Page<Song> findAllByOrderByPlayCountDesc(Pageable pageable);

    // Lấy bài hát theo lượt thích
    Page<Song> findAllByOrderByLikeCountDesc(Pageable pageable);

    // Lấy bài hát mới nhất
    Page<Song> findAllByOrderByReleaseDateDesc(Pageable pageable);

    // Tìm bài hát theo nhiều tiêu chí
    @Query("SELECT s FROM Song s JOIN s.artists a JOIN s.genres g " +
           "WHERE (:title IS NULL OR LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
           "AND (:artistName IS NULL OR LOWER(a.name) LIKE LOWER(CONCAT('%', :artistName, '%'))) " +
           "AND (:genreId IS NULL OR g.id = :genreId)")
    Page<Song> searchSongs(@Param("title") String title, 
                          @Param("artistName") String artistName,
                          @Param("genreId") Long genreId, 
                          Pageable pageable);

    // Lấy bài hát với thông tin đầy đủ (eager fetch)
    @Query("SELECT DISTINCT s FROM Song s " +
           "LEFT JOIN FETCH s.artists " +
           "LEFT JOIN FETCH s.genres " +
           "LEFT JOIN FETCH s.album " +
           "WHERE s.id = :id")
    Optional<Song> findByIdWithDetails(@Param("id") Long id);

    // Đếm số bài hát của artist
    @Query("SELECT COUNT(s) FROM Song s JOIN s.artists a WHERE a.id = :artistId")
    Long countByArtistId(@Param("artistId") Long artistId);
}
