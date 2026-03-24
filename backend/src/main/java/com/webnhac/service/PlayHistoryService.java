package com.webnhac.service;

import com.webnhac.entity.PlayHistory;
import com.webnhac.entity.Song;
import com.webnhac.entity.User;
import com.webnhac.repository.PlayHistoryRepository;
import com.webnhac.repository.SongRepository;
import com.webnhac.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayHistoryService {

    private final PlayHistoryRepository playHistoryRepository;
    private final UserRepository userRepository;
    private final SongRepository songRepository;

    /**
     * Ghi lịch sử nghe nhạc một cách bất đồng bộ để không block response trả về user.
     * Cần @EnableAsync trên Application class để hoạt động.
     */
    @Async
    @Transactional
    public CompletableFuture<Void> recordPlayAsync(Long userId, Long songId) {
        log.debug("Async recording play history for userId: {}, songId: {}", userId, songId);
        
        try {
            User user = userRepository.getReferenceById(userId);
            Song song = songRepository.getReferenceById(songId);
            
            PlayHistory history = PlayHistory.builder()
                .user(user)
                .song(song)
                .playedAt(LocalDateTime.now())
                .build();
                
            playHistoryRepository.save(history);
            log.info("Play history recorded successfully for userId={}, songId={}", userId, songId);
            
        } catch (Exception e) {
            log.error("Failed to record play history for userId={}, songId={}", userId, songId, e);
        }
        
        return CompletableFuture.completedFuture(null);
    }
}
