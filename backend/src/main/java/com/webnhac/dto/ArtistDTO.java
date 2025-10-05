package com.webnhac.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArtistDTO {
    private Long id;
    private String name;
    private String bio;
    private String avatarUrl;
    private String coverImageUrl;
    private Integer followersCount;
    private Boolean verified;
}
