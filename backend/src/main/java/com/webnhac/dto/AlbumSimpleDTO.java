package com.webnhac.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlbumSimpleDTO {
    private Long id;
    private String title;
    private String coverImageUrl;
    private String releaseDate;
}