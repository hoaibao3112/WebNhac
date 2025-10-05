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
import com.webnhac.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final SongRepository songRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<CommentDTO> getCommentsBySongId(Long songId, Pageable pageable) {
        log.debug("Getting comments for song id: {}", songId);
        
        // Verify song exists
        if (!songRepository.existsById(songId)) {
            throw new ResourceNotFoundException("Song not found with id: " + songId);
        }
        
        return commentRepository.findTopLevelCommentsBySongId(songId, pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public CommentDTO getCommentById(Long commentId) {
        log.debug("Getting comment by id: {}", commentId);
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        return convertToDTO(comment);
    }

    @Override
    @Transactional
    public CommentDTO createComment(CommentRequest request) {
        log.debug("Creating comment for song id: {} by user id: {}", request.getSongId(), request.getUserId());
        
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));
        
        Song song = songRepository.findById(request.getSongId())
                .orElseThrow(() -> new ResourceNotFoundException("Song not found with id: " + request.getSongId()));

        Comment comment = Comment.builder()
                .user(user)
                .song(song)
                .content(request.getContent())
                .build();

        if (request.getParentId() != null) {
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent comment not found with id: " + request.getParentId()));
            comment.setParent(parent);
        }

        Comment savedComment = commentRepository.save(comment);
        log.info("Comment created successfully with id: {}", savedComment.getId());
        
        return convertToDTO(savedComment);
    }

    @Override
    @Transactional
    public CommentDTO updateComment(Long commentId, String content, Long userId) {
        log.debug("Updating comment id: {} by user id: {}", commentId, userId);
        
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        
        if (!comment.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this comment");
        }

        comment.setContent(content);
        Comment updatedComment = commentRepository.save(comment);
        log.info("Comment updated successfully with id: {}", updatedComment.getId());
        
        return convertToDTO(updatedComment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        log.debug("Deleting comment id: {} by user id: {}", commentId, userId);
        
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        
        if (!comment.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to delete this comment");
        }

        commentRepository.delete(comment);
        log.info("Comment deleted successfully with id: {}", commentId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getCommentCountBySongId(Long songId) {
        log.debug("Getting comment count for song id: {}", songId);
        return commentRepository.countAllBySongId(songId);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommentDTO> getCommentsByUserId(Long userId, Pageable pageable) {
        log.debug("Getting comments for user id: {}", userId);
        
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        
        return commentRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::convertToDTO);
    }

    private CommentDTO convertToDTO(Comment comment) {
        List<CommentDTO> replies = commentRepository.findByParentIdOrderByCreatedAtAsc(comment.getId())
                .stream()
                .map(this::convertToDTOWithoutReplies)
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
                .replies(replies)
                .replyCount(replies.size())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }

    private CommentDTO convertToDTOWithoutReplies(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .userAvatar(comment.getUser().getAvatarUrl())
                .songId(comment.getSong().getId())
                .songTitle(comment.getSong().getTitle())
                .content(comment.getContent())
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .replyCount(0)
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}