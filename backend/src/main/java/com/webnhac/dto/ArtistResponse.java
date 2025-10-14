package com.webnhac.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArtistResponse {
    private Long id;
    private String name;
    private String bio;
    private String avatarUrl;
    private String coverImageUrl;
    private boolean verified;
    private Long followersCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<AlbumSimpleDTO> albums;
}