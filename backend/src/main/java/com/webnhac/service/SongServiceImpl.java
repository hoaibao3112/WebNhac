package com.webnhac.service;

import com.webnhac.dto.AlbumSimpleDTO;
import com.webnhac.dto.ArtistSimpleDTO;
import com.webnhac.dto.GenreDTO;
import com.webnhac.dto.SongDTO;
import com.webnhac.entity.Song;
import com.webnhac.exception.ResourceNotFoundException;
import com.webnhac.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getAllSongs(Pageable pageable) {
        log.debug("Getting all songs - page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        return songRepository.findAll(pageable).map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Song getSongById(Long id) {
        log.debug("Getting song by id: {}", id);
        return songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public SongDTO getSongDTOById(Long id) {
        log.debug("Getting song DTO by id: {}", id);
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found with id: " + id));
        return convertToDTO(song);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> searchSongs(String query, Pageable pageable) {
        log.debug("Searching songs with query: {}", query);
        return songRepository.findByTitleContainingIgnoreCase(query, pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getTrendingSongs(Pageable pageable) {
        log.debug("Getting trending songs");
        return songRepository.findAllByOrderByPlayCountDesc(pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getSongsByArtist(Long artistId, Pageable pageable) {
        log.debug("Getting songs by artist id: {}", artistId);
        return songRepository.findByArtistId(artistId, pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getSongsByGenre(Long genreId, Pageable pageable) {
        log.debug("Getting songs by genre id: {}", genreId);
        return songRepository.findByGenreId(genreId, pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getFavoriteSongs(Long userId, Pageable pageable) {
        log.debug("Getting favorite songs for user id: {}", userId);
        // For now, return trending songs as favorites
        // TODO: Implement actual user favorites when authentication is ready
        return songRepository.findAllByOrderByLikeCountDesc(pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional
    public void incrementPlayCount(Long songId) {
        log.debug("Incrementing play count for song id: {}", songId);
        Song song = getSongById(songId);
        song.incrementPlayCount();
        songRepository.save(song);
    }

    @Override
    @Transactional
    public void toggleLike(Long songId, boolean isLike) {
        log.debug("Toggling like for song id: {} - like: {}", songId, isLike);
        Song song = getSongById(songId);
        if (isLike) {
            song.incrementLikeCount();
        } else {
            song.decrementLikeCount();
        }
        songRepository.save(song);
    }

    private SongDTO convertToDTO(Song song) {
        return SongDTO.builder()
                .id(song.getId())
                .title(song.getTitle())
                .duration(song.getDuration())
                .fileUrl(song.getFileUrl())
                .coverImageUrl(song.getCoverImageUrl())
                .playCount(song.getPlayCount())
                .likeCount(song.getLikeCount())
                .releaseDate(song.getReleaseDate() != null ? song.getReleaseDate().toString() : null)
                .isPremium(song.getIsPremium())
                .lyrics(song.getLyrics())
                .syncedLyrics(song.getSyncedLyrics())
                .artists(song.getArtists() != null ? song.getArtists().stream()
                        .map(artist -> ArtistSimpleDTO.builder()
                                .id(artist.getId())
                                .name(artist.getName())
                                .avatarUrl(artist.getAvatarUrl())
                                .verified(artist.isVerified())
                                .build())
                        .collect(Collectors.toList()) : null)
                .genres(song.getGenres() != null ? song.getGenres().stream()
                        .map(genre -> GenreDTO.builder()
                                .id(genre.getId())
                                .name(genre.getName())
                                .description(genre.getDescription())
                                .color(genre.getColor())
                                .icon(genre.getIcon())
                                .build())
                        .collect(Collectors.toList()) : null)
                .album(song.getAlbum() != null ? AlbumSimpleDTO.builder()
                        .id(song.getAlbum().getId())
                        .title(song.getAlbum().getTitle())
                        .coverImageUrl(song.getAlbum().getCoverImageUrl())
                        .releaseDate(song.getAlbum().getReleaseDate() != null ? 
                                song.getAlbum().getReleaseDate().toString() : null)
                        .build() : null)
                .createdAt(song.getCreatedAt())
                .updatedAt(song.getUpdatedAt())
                .build();
    }
}