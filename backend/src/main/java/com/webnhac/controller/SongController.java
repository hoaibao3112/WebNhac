// filepath: c:\WebNhac\backend\src\main\java\com\webnhac\controller\SongController.java
package com.webnhac.controller;

import com.webnhac.dto.ApiResponse;
import com.webnhac.dto.SongDTO;
import com.webnhac.entity.Song;
import com.webnhac.service.SongService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/songs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SongController {

    private final SongService songService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<SongDTO>>> getAllSongs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "playCount") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction
    ) {
        log.info("GET /api/songs - page: {}, size: {}", page, size);
        Sort.Direction sortDirection = direction.equalsIgnoreCase("ASC") 
            ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<SongDTO> songs = songService.getAllSongs(pageable);
        return ResponseEntity.ok(ApiResponse.success(songs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SongDTO>> getSongById(@PathVariable Long id) {
        log.info("GET /api/songs/{}", id);
        SongDTO song = songService.getSongDTOById(id);
        return ResponseEntity.ok(ApiResponse.success(song));
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<ApiResponse<Page<SongDTO>>> getSongsByArtist(
            @PathVariable Long artistId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/songs/artist/{} - page: {}, size: {}", artistId, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<SongDTO> songs = songService.getSongsByArtist(artistId, pageable);
        return ResponseEntity.ok(ApiResponse.success(songs));
    }

    @GetMapping("/genre/{genreId}")
    public ResponseEntity<ApiResponse<Page<SongDTO>>> getSongsByGenre(
            @PathVariable Long genreId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/songs/genre/{} - page: {}, size: {}", genreId, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<SongDTO> songs = songService.getSongsByGenre(genreId, pageable);
        return ResponseEntity.ok(ApiResponse.success(songs));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<SongDTO>>> searchSongs(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        log.info("GET /api/songs/search - query: {}, page: {}, size: {}", q, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<SongDTO> songs = songService.searchSongs(q, pageable);
        return ResponseEntity.ok(ApiResponse.success(songs));
    }

    @GetMapping("/trending")
    public ResponseEntity<ApiResponse<Page<SongDTO>>> getTrendingSongs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        log.info("GET /api/songs/trending - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<SongDTO> songs = songService.getTrendingSongs(pageable);
        return ResponseEntity.ok(ApiResponse.success(songs));
    }

    @PostMapping("/{id}/play")
    public ResponseEntity<ApiResponse<String>> playSong(@PathVariable Long id) {
        log.info("POST /api/songs/{}/play", id);
        songService.incrementPlayCount(id);
        return ResponseEntity.ok(ApiResponse.success("Play count incremented"));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<String>> likeSong(@PathVariable Long id) {
        log.info("POST /api/songs/{}/like", id);
        songService.toggleLike(id, true);
        return ResponseEntity.ok(ApiResponse.success("Song liked"));
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<ApiResponse<String>> unlikeSong(@PathVariable Long id) {
        log.info("DELETE /api/songs/{}/like", id);
        songService.toggleLike(id, false);
        return ResponseEntity.ok(ApiResponse.success("Song unliked"));
    }
}