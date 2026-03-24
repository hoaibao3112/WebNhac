package com.webnhac.repository;

import com.webnhac.entity.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    // ─── Tìm kiếm ────────────────────────────────────────────────────────────

    Page<Artist> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Artist> findByVerified(Boolean verified, Pageable pageable);

    Page<Artist> findAllByOrderByFollowersCountDesc(Pageable pageable);

    // ─── Batch load albums cho danh sách artists (tránh N+1) ─────────────────
    /**
     * ArtistServiceImpl hiện tại gọi albumRepository.findByArtistId() cho
     * từng artist trong convertToResponse() → N+1.
     *
     * Thay bằng: load albums của nhiều artists cùng lúc, group trong memory.
     *
     * Dùng trong ArtistServiceImpl:
     *   List<Long> artistIds = artists.map(a -> a.getId())
     *   List<Album> albums = albumRepo.findTop3ByArtistIdIn(artistIds)
     *   Map<Long, List<Album>> grouped = albums.groupingBy(a -> a.getArtist().getId())
     */
    @Query("""
            SELECT a FROM Album a
            WHERE a.artist.id IN :artistIds
            ORDER BY a.artist.id ASC, a.releaseDate DESC
            """)
    List<com.webnhac.entity.Album> findAlbumsByArtistIds(@Param("artistIds") List<Long> artistIds);
}
