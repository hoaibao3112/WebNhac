package com.webnhac.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    private Long userId;
    private String username;
    private String userAvatar;
    private Long songId;
    private String songTitle;
    private String content;
    private Long parentId;
    
    @Builder.Default
    private List<CommentDTO> replies = new ArrayList<>();
    
    private Integer replyCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}