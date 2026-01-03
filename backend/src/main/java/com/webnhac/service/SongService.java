package com.webnhac.service;

import com.webnhac.dto.SongDTO;
import com.webnhac.entity.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SongService {
    Page<SongDTO> getAllSongs(Pageable pageable);
    Song getSongById(Long id);
    SongDTO getSongDTOById(Long id);
    Page<SongDTO> searchSongs(String query, Pageable pageable);
    Page<SongDTO> getTrendingSongs(Pageable pageable);
    Page<SongDTO> getSongsByArtist(Long artistId, Pageable pageable);
    Page<SongDTO> getSongsByGenre(Long genreId, Pageable pageable);
    Page<SongDTO> getFavoriteSongs(Long userId, Pageable pageable);
    void incrementPlayCount(Long songId);
    void toggleLike(Long songId, boolean isLike);
}