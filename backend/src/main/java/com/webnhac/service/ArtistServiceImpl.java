package com.webnhac.service;

import com.webnhac.dto.ArtistDTO;
import com.webnhac.dto.ArtistResponse;
import com.webnhac.entity.Artist;
import com.webnhac.exception.ResourceNotFoundException;
import com.webnhac.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.webnhac.repository.AlbumRepository;
import com.webnhac.dto.AlbumSimpleDTO;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistServiceImpl implements ArtistService {

    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;

    @Override
    public Page<ArtistResponse> getAllArtists(Pageable pageable) {
        log.debug("Getting all artists - page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        return artistRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public ArtistResponse getArtistById(Long id) {
        log.debug("Getting artist by id: {}", id);
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found with id: " + id));
        return convertToResponse(artist);
    }

    @Override
    public Page<ArtistResponse> searchArtists(String name, Pageable pageable) {
        log.debug("Searching artists by name: {}", name);
        return artistRepository.findByNameContainingIgnoreCase(name, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<ArtistResponse> getTopArtists(Pageable pageable) {
        log.debug("Getting top artists");
        return artistRepository.findAllByOrderByFollowersCountDesc(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<ArtistResponse> getVerifiedArtists(Pageable pageable) {
        log.debug("Getting verified artists");
        return artistRepository.findByVerified(true, pageable)
                .map(this::convertToResponse);
    }

    private ArtistResponse convertToResponse(Artist artist) {
    // fetch top albums (limit 3)
    var albums = albumRepository.findByArtistIdOrderByReleaseDateDesc(artist.getId(), PageRequest.of(0, 3))
        .stream()
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
        .albums(albums)
        .build();
    }
}