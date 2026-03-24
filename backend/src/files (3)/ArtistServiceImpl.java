package com.webnhac.service;

import com.webnhac.dto.AlbumSimpleDTO;
import com.webnhac.dto.ArtistResponse;
import com.webnhac.entity.Album;
import com.webnhac.entity.Artist;
import com.webnhac.exception.ResourceNotFoundException;
import com.webnhac.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistServiceImpl implements ArtistService {

    private final ArtistRepository artistRepository;

    @Override
    public Page<ArtistResponse> getAllArtists(Pageable pageable) {
        Page<Artist> page = artistRepository.findAll(pageable);
        return toResponsePage(page, pageable);
    }

    @Override
    public ArtistResponse getArtistById(Long id) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found: " + id));
        // Single artist — load top 3 albums trực tiếp
        List<Album> albums = artistRepository.findAlbumsByArtistIds(List.of(id))
                .stream().limit(3).collect(Collectors.toList());
        return convertToResponse(artist, albums);
    }

    @Override
    public Page<ArtistResponse> searchArtists(String name, Pageable pageable) {
        Page<Artist> page = artistRepository.findByNameContainingIgnoreCase(name, pageable);
        return toResponsePage(page, pageable);
    }

    @Override
    public Page<ArtistResponse> getTopArtists(Pageable pageable) {
        Page<Artist> page = artistRepository.findAllByOrderByFollowersCountDesc(pageable);
        return toResponsePage(page, pageable);
    }

    @Override
    public Page<ArtistResponse> getVerifiedArtists(Pageable pageable) {
        Page<Artist> page = artistRepository.findByVerified(true, pageable);
        return toResponsePage(page, pageable);
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    /**
     * Chuyển Page<Artist> thành Page<ArtistResponse> với batch album loading.
     *
     * Trước: convertToResponse() gọi albumRepository N lần trong vòng lặp
     * Sau:   1 query lấy tất cả albums, group trong memory
     */
    private Page<ArtistResponse> toResponsePage(Page<Artist> artistPage, Pageable pageable) {
        List<Artist> artists = artistPage.getContent();
        if (artists.isEmpty()) {
            return artistPage.map(a -> convertToResponse(a, List.of()));
        }

        // Batch load albums cho tất cả artists trong trang — 1 query duy nhất
        List<Long> artistIds = artists.stream()
                .map(Artist::getId)
                .collect(Collectors.toList());

        List<Album> allAlbums = artistRepository.findAlbumsByArtistIds(artistIds);

        // Group albums theo artistId trong memory — O(n), không thêm query
        Map<Long, List<Album>> albumsByArtist = allAlbums.stream()
                .collect(Collectors.groupingBy(a -> a.getArtist().getId()));

        List<ArtistResponse> responses = artists.stream()
                .map(artist -> {
                    List<Album> artistAlbums = albumsByArtist
                            .getOrDefault(artist.getId(), List.of())
                            .stream().limit(3)
                            .collect(Collectors.toList());
                    return convertToResponse(artist, artistAlbums);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, artistPage.getTotalElements());
    }

    private ArtistResponse convertToResponse(Artist artist, List<Album> albums) {
        List<AlbumSimpleDTO> albumDTOs = albums.stream()
                .map(a -> AlbumSimpleDTO.builder()
                        .id(a.getId())
                        .title(a.getTitle())
                        .coverImageUrl(a.getCoverImageUrl())
                        .releaseDate(a.getReleaseDate() != null ? a.getReleaseDate().toString() : null)
                        .build())
                .collect(Collectors.toList());

        return ArtistResponse.builder()
                .id(artist.getId())
                .name(artist.getName())
                .bio(artist.getBio())
                .avatarUrl(artist.getAvatarUrl())
                .coverImageUrl(artist.getCoverImageUrl())
                .verified(artist.isVerified())
                .followersCount(artist.getFollowersCount())
                .createdAt(artist.getCreatedAt())
                .updatedAt(artist.getUpdatedAt())
                .albums(albumDTOs)
                .build();
    }
}
