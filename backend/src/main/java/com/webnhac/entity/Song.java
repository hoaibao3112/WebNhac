package com.webnhac.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "songs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Song {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private Integer duration;
    
    @Column(name = "file_url", nullable = false)
    private String fileUrl;
    
    @Column(name = "cover_image_url")
    private String coverImageUrl;
    
    @Column(name = "play_count")
    @Builder.Default
    private Long playCount = 0L;
    
    @Column(name = "like_count")
    @Builder.Default
    private Long likeCount = 0L;
    
    @Column(name = "release_date")
    private LocalDate releaseDate;
    
    @Column(name = "is_premium")
    @Builder.Default
    private Boolean isPremium = false;
    
    @Column(name = "lyrics", columnDefinition = "TEXT")
    private String lyrics;
    
    @Column(name = "synced_lyrics", columnDefinition = "TEXT")
    private String syncedLyrics;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "song_artists",
        joinColumns = @JoinColumn(name = "song_id"),
        inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    @Builder.Default
    private Set<Artist> artists = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "song_genres",
        joinColumns = @JoinColumn(name = "song_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    @Builder.Default
    private Set<Genre> genres = new HashSet<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public void incrementPlayCount() {
        this.playCount = (this.playCount != null ? this.playCount : 0L) + 1;
    }
    
    public void incrementLikeCount() {
        this.likeCount = (this.likeCount != null ? this.likeCount : 0L) + 1;
    }
    
    public void decrementLikeCount() {
        this.likeCount = Math.max(0L, (this.likeCount != null ? this.likeCount : 0L) - 1);
    }
}