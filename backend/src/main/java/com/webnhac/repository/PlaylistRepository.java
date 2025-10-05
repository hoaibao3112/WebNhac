package com.webnhac.repository;

import com.webnhac.entity.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    // Tìm playlist của user
    Page<Playlist> findByUserId(Long userId, Pageable pageable);

    // Tìm playlist công khai
    Page<Playlist> findByIsPublic(Boolean isPublic, Pageable pageable);

    // Tìm playlist theo tên
    Page<Playlist> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Kiểm tra quyền sở hữu
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END " +
           "FROM Playlist p WHERE p.id = :playlistId AND p.user.id = :userId")
    Boolean isOwner(@Param("playlistId") Long playlistId, @Param("userId") Long userId);
}
