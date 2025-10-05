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
public class SongDTO {
    private Long id;
    private String title;
    private Integer duration;
    private String fileUrl;
    private String coverImageUrl;
    private Long playCount;
    private Long likeCount;
    private String releaseDate;
    private Boolean isPremium;
    private String lyrics;
    private String syncedLyrics;
    private List<ArtistSimpleDTO> artists;
    private List<GenreDTO> genres;
    private AlbumSimpleDTO album;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}