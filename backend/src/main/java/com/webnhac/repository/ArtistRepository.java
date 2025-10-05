package com.webnhac.repository;

import com.webnhac.entity.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    
    Page<Artist> findByNameContainingIgnoreCase(String name, Pageable pageable);
    
    Page<Artist> findByVerified(Boolean verified, Pageable pageable);
    
    Page<Artist> findAllByOrderByFollowersCountDesc(Pageable pageable);
}