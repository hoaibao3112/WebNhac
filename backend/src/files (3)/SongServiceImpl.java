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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;

    // ─── Read operations ──────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getAllSongs(Pageable pageable) {
        log.debug("getAllSongs - page={} size={}", pageable.getPageNumber(), pageable.getPageSize());
        // JOIN FETCH: 1 query thay vì 1 + N×2
        List<Song> songs = songRepository.findAllWithDetails(pageable);
        long total = songRepository.countDistinct();
        return new PageImpl<>(toDTO(songs), pageable, total);
    }

    @Override
    @Transactional(readOnly = true)
    public Song getSongById(Long id) {
        // dùng findByIdWithDetails để fetch associations trong 1 query
        return songRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public SongDTO getSongDTOById(Long id) {
        return convertToDTO(getSongById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> searchSongs(String query, Pageable pageable) {
        log.debug("searchSongs query={}", query);
        List<Song> songs = songRepository.findByTitleContainingWithDetails(query, pageable);
        long total = songRepository.countByTitleContaining(query);
        return new PageImpl<>(toDTO(songs), pageable, total);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getTrendingSongs(Pageable pageable) {
        List<Song> songs = songRepository.findTrendingWithDetails(pageable);
        long total = songRepository.countDistinct();
        return new PageImpl<>(toDTO(songs), pageable, total);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getSongsByArtist(Long artistId, Pageable pageable) {
        List<Song> songs = songRepository.findByArtistIdWithDetails(artistId, pageable);
        long total = songRepository.countByArtistId(artistId);
        return new PageImpl<>(toDTO(songs), pageable, total);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getSongsByGenre(Long genreId, Pageable pageable) {
        List<Song> songs = songRepository.findByGenreIdWithDetails(genreId, pageable);
        long total = songRepository.countByGenreId(genreId);
        return new PageImpl<>(toDTO(songs), pageable, total);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SongDTO> getFavoriteSongs(Long userId, Pageable pageable) {
        // TODO: filter theo user_favorites sau khi có auth
        List<Song> songs = songRepository.findByLikeCountWithDetails(pageable);
        long total = songRepository.countDistinct();
        return new PageImpl<>(toDTO(songs), pageable, total);
    }

    // ─── Write operations — dùng bulk UPDATE, không load entity ──────────────

    @Override
    @Transactional
    public void incrementPlayCount(Long songId) {
        log.debug("incrementPlayCount songId={}", songId);
        // Trước: SELECT song → set +1 → UPDATE (2 queries + object allocation)
        // Sau:   UPDATE songs SET play_count = play_count + 1 WHERE id = ? (1 query)
        if (!songRepository.existsById(songId)) {
            throw new ResourceNotFoundException("Song not found: " + songId);
        }
        songRepository.incrementPlayCount(songId);
    }

    @Override
    @Transactional
    public void toggleLike(Long songId, boolean isLike) {
        log.debug("toggleLike songId={} like={}", songId, isLike);
        if (!songRepository.existsById(songId)) {
            throw new ResourceNotFoundException("Song not found: " + songId);
        }
        if (isLike) {
            songRepository.incrementLikeCount(songId);
        } else {
            songRepository.decrementLikeCount(songId);
        }
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────

    private List<SongDTO> toDTO(List<Song> songs) {
        return songs.stream().map(this::convertToDTO).collect(Collectors.toList());
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
                .artists(song.getArtists() == null ? List.of() :
                        song.getArtists().stream()
                                .map(a -> ArtistSimpleDTO.builder()
                                        .id(a.getId())
                                        .name(a.getName())
                                        .avatarUrl(a.getAvatarUrl())
                                        .verified(a.isVerified())
                                        .build())
                                .collect(Collectors.toList()))
                .genres(song.getGenres() == null ? List.of() :
                        song.getGenres().stream()
                                .map(g -> GenreDTO.builder()
                                        .id(g.getId())
                                        .name(g.getName())
                                        .description(g.getDescription())
                                        .color(g.getColor())
                                        .icon(g.getIcon())
                                        .build())
                                .collect(Collectors.toList()))
                .album(song.getAlbum() == null ? null :
                        AlbumSimpleDTO.builder()
                                .id(song.getAlbum().getId())
                                .title(song.getAlbum().getTitle())
                                .coverImageUrl(song.getAlbum().getCoverImageUrl())
                                .releaseDate(song.getAlbum().getReleaseDate() != null ?
                                        song.getAlbum().getReleaseDate().toString() : null)
                                .build())
                .createdAt(song.getCreatedAt())
                .updatedAt(song.getUpdatedAt())
                .build();
    }
}
