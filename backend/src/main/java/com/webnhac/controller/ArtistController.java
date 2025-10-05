package com.webnhac.controller;

import com.webnhac.dto.ApiResponse;
import com.webnhac.dto.ArtistResponse;
import com.webnhac.service.ArtistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ArtistResponse>>> getAllArtists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/artists - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<ArtistResponse> artists = artistService.getAllArtists(pageable);
        return ResponseEntity.ok(ApiResponse.success(artists));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArtistResponse>> getArtistById(@PathVariable Long id) {
        log.info("GET /api/artists/{}", id);
        ArtistResponse artist = artistService.getArtistById(id);
        return ResponseEntity.ok(ApiResponse.success(artist));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<ArtistResponse>>> searchArtists(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/artists/search - name: {}, page: {}, size: {}", name, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<ArtistResponse> artists = artistService.searchArtists(name, pageable);
        return ResponseEntity.ok(ApiResponse.success(artists));
    }

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<Page<ArtistResponse>>> getTopArtists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/artists/top - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<ArtistResponse> artists = artistService.getTopArtists(pageable);
        return ResponseEntity.ok(ApiResponse.success(artists));
    }

    @GetMapping("/verified")
    public ResponseEntity<ApiResponse<Page<ArtistResponse>>> getVerifiedArtists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/artists/verified - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<ArtistResponse> artists = artistService.getVerifiedArtists(pageable);
        return ResponseEntity.ok(ApiResponse.success(artists));
    }
}