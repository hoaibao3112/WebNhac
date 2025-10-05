package com.webnhac.repository;

import com.webnhac.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Lấy comment cấp cao nhất (không có parent) của một bài hát
    @Query("SELECT c FROM Comment c WHERE c.song.id = :songId AND c.parent IS NULL ORDER BY c.createdAt DESC")
    Page<Comment> findTopLevelCommentsBySongId(@Param("songId") Long songId, Pageable pageable);
    
    // Lấy reply của một comment
    @Query("SELECT c FROM Comment c WHERE c.parent.id = :parentId ORDER BY c.createdAt ASC")
    Page<Comment> findRepliesByParentId(@Param("parentId") Long parentId, Pageable pageable);
    
    // Đếm số lượng comment của một bài hát
    Long countBySongId(Long songId);
    
    // Đếm tất cả comment của một bài hát (bao gồm cả replies)
    Long countAllBySongId(Long songId);
    
    // Đếm số lượng reply của một comment
    Long countByParentId(Long parentId);
    
    // Lấy comment theo user ID
    Page<Comment> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    // Lấy replies theo parent ID (trả về List thay vì Page)
    List<Comment> findByParentIdOrderByCreatedAtAsc(Long parentId);
}
