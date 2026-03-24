package com.webnhac.service;

import com.webnhac.dto.CommentDTO;
import com.webnhac.dto.CommentRequest;
import com.webnhac.entity.Comment;
import com.webnhac.entity.Song;
import com.webnhac.entity.User;
import com.webnhac.exception.ResourceNotFoundException;
import com.webnhac.exception.UnauthorizedException;
import com.webnhac.repository.CommentRepository;
import com.webnhac.repository.SongRepository;
import com.webnhac.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final SongRepository songRepository;

    // ─── Read ─────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Page<CommentDTO> getCommentsBySongId(Long songId, Pageable pageable) {
        if (!songRepository.existsById(songId)) {
            throw new ResourceNotFoundException("Song not found: " + songId);
        }

        // Bước 1: load top-level comments (1 query, đã JOIN FETCH user + song)
        Page<Comment> topLevel = commentRepository.findTopLevelCommentsBySongId(songId, pageable);

        if (topLevel.isEmpty()) {
            return topLevel.map(c -> convertToDTO(c, Collections.emptyList()));
        }

        // Bước 2: batch load TẤT CẢ replies của trang hiện tại (1 query, không phải N)
        List<Long> parentIds = topLevel.stream()
                .map(Comment::getId)
                .collect(Collectors.toList());

        List<Comment> allReplies = commentRepository.findRepliesByParentIds(parentIds);

        // Bước 3: group replies theo parentId trong memory (O(n), không query thêm)
        Map<Long, List<Comment>> repliesByParentId = allReplies.stream()
                .collect(Collectors.groupingBy(r -> r.getParent().getId()));

        // Bước 4: map sang DTO, gắn replies đã group sẵn
        return topLevel.map(comment -> {
            List<Comment> replies = repliesByParentId.getOrDefault(comment.getId(), List.of());
            return convertToDTO(comment, replies);
        });
        // Tổng: 2 queries cố định bất kể page size, thay vì 1 + N queries trước đây
    }

    @Override
    @Transactional(readOnly = true)
    public CommentDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findByIdWithDetails(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found: " + commentId));

        // Load replies của comment đơn lẻ — ít quan trọng hơn nhưng vẫn 1 query
        List<Comment> replies = commentRepository.findRepliesByParentIds(List.of(commentId));
        return convertToDTO(comment, replies);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommentDTO> getCommentsByUserId(Long userId, Pageable pageable) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found: " + userId);
        }
        // Comments của user thường không cần replies — trả về flat list
        return commentRepository.findByUserIdWithDetails(userId, pageable)
                .map(c -> convertToDTO(c, List.of()));
    }

    @Override
    @Transactional(readOnly = true)
    public long getCommentCountBySongId(Long songId) {
        return commentRepository.countAllBySongId(songId);
    }

    // ─── Write ────────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public CommentDTO createComment(CommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.getUserId()));

        Song song = songRepository.findById(request.getSongId())
                .orElseThrow(() -> new ResourceNotFoundException("Song not found: " + request.getSongId()));

        Comment.CommentBuilder builder = Comment.builder()
                .user(user)
                .song(song)
                .content(request.getContent());

        if (request.getParentId() != null) {
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent comment not found: " + request.getParentId()));
            builder.parent(parent);
        }

        Comment saved = commentRepository.save(builder.build());
        log.info("Comment created id={}", saved.getId());
        return convertToDTO(saved, List.of());
    }

    @Override
    @Transactional
    public CommentDTO updateComment(Long commentId, String content, Long userId) {
        Comment comment = commentRepository.findByIdWithDetails(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found: " + commentId));

        if (!comment.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to update this comment");
        }

        comment.setContent(content);
        return convertToDTO(commentRepository.save(comment), List.of());
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findByIdWithDetails(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found: " + commentId));

        if (!comment.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Not authorized to delete this comment");
        }

        commentRepository.delete(comment);
        log.info("Comment deleted id={}", commentId);
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────

    private CommentDTO convertToDTO(Comment comment, List<Comment> replies) {
        List<CommentDTO> replyDTOs = replies.stream()
                .map(r -> convertToDTOFlat(r))
                .collect(Collectors.toList());

        return CommentDTO.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .userAvatar(comment.getUser().getAvatarUrl())
                .songId(comment.getSong().getId())
                .songTitle(comment.getSong().getTitle())
                .content(comment.getContent())
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .replies(replyDTOs)
                .replyCount(replyDTOs.size())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }

    /** Reply DTO — không đệ quy thêm, chỉ flat */
    private CommentDTO convertToDTOFlat(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .userAvatar(comment.getUser().getAvatarUrl())
                .content(comment.getContent())
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .replies(List.of())
                .replyCount(0)
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
