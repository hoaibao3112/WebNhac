package com.webnhac.service;

import com.webnhac.dto.CommentDTO;
import com.webnhac.dto.CommentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Page<CommentDTO> getCommentsBySongId(Long songId, Pageable pageable);
    CommentDTO getCommentById(Long commentId);
    CommentDTO createComment(CommentRequest request);
    CommentDTO updateComment(Long commentId, String content, Long userId);
    void deleteComment(Long commentId, Long userId);
    long getCommentCountBySongId(Long songId);
    Page<CommentDTO> getCommentsByUserId(Long userId, Pageable pageable);
}