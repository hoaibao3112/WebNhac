package com.webnhac.service;

import com.webnhac.dto.ArtistResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArtistService {
    Page<ArtistResponse> getAllArtists(Pageable pageable);
    ArtistResponse getArtistById(Long id);
    Page<ArtistResponse> searchArtists(String name, Pageable pageable);
    Page<ArtistResponse> getTopArtists(Pageable pageable);
    Page<ArtistResponse> getVerifiedArtists(Pageable pageable);
}