package com.webnhac.repository;

import com.webnhac.entity.PlayHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayHistoryRepository extends JpaRepository<PlayHistory, Long> {
    
    // Tìm lịch sử nghe của 1 user
    Page<PlayHistory> findByUserIdOrderByPlayedAtDesc(Long userId, Pageable pageable);
    
    // Tìm lịch sử của 1 bài hát do 1 user nghe
    Page<PlayHistory> findByUserIdAndSongIdOrderByPlayedAtDesc(Long userId, Long songId, Pageable pageable);
}
