package com.webnhac.repository;

import com.webnhac.entity.Album;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    @Query("SELECT a FROM Album a WHERE a.artist.id = :artistId ORDER BY a.releaseDate DESC")
    List<Album> findByArtistIdOrderByReleaseDateDesc(@Param("artistId") Long artistId, Pageable pageable);
}
