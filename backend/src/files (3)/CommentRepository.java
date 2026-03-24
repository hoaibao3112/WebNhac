package com.webnhac.repository;

import com.webnhac.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // ─── Top-level comments (parent IS NULL) ─────────────────────────────────

    @Query("""
            SELECT c FROM Comment c
            LEFT JOIN FETCH c.user
            LEFT JOIN FETCH c.song
            WHERE c.song.id = :songId AND c.parent IS NULL
            ORDER BY c.createdAt DESC
            """)
    Page<Comment> findTopLevelCommentsBySongId(@Param("songId") Long songId, Pageable pageable);

    // ─── Batch load replies — KEY FIX cho N+1 ────────────────────────────────
    /**
     * Thay vì gọi findByParentId() cho từng comment (N queries),
     * load TẤT CẢ replies của nhiều parentId cùng 1 lúc (1 query).
     *
     * Cách dùng trong service:
     *   List<Long> parentIds = comments.map(c -> c.getId())
     *   List<Comment> allReplies = repo.findRepliesByParentIds(parentIds)
     *   Map<Long, List<Comment>> grouped = allReplies.groupingBy(r -> r.getParent().getId())
     */
    @Query("""
            SELECT c FROM Comment c
            LEFT JOIN FETCH c.user
            WHERE c.parent.id IN :parentIds
            ORDER BY c.createdAt ASC
            """)
    List<Comment> findRepliesByParentIds(@Param("parentIds") Collection<Long> parentIds);

    // ─── Single comment with all relations ───────────────────────────────────

    @Query("""
            SELECT c FROM Comment c
            LEFT JOIN FETCH c.user
            LEFT JOIN FETCH c.song
            WHERE c.id = :id
            """)
    java.util.Optional<Comment> findByIdWithDetails(@Param("id") Long id);

    // ─── User comments ───────────────────────────────────────────────────────

    @Query("""
            SELECT c FROM Comment c
            LEFT JOIN FETCH c.song
            WHERE c.user.id = :userId
            ORDER BY c.createdAt DESC
            """)
    Page<Comment> findByUserIdWithDetails(@Param("userId") Long userId, Pageable pageable);

    // ─── Counts ──────────────────────────────────────────────────────────────

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.song.id = :songId")
    Long countAllBySongId(@Param("songId") Long songId);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.parent.id IN :parentIds")
    Long countRepliesByParentIds(@Param("parentIds") Collection<Long> parentIds);
}
