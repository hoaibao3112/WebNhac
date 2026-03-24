package com.webnhac.service;

import com.webnhac.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayCountService {

    private final StringRedisTemplate stringRedisTemplate;
    private final SongRepository songRepository;

    private static final String PLAY_COUNT_KEY_PREFIX = "play_count:";

    // Circuit breaker: skip Redis for 5 minutes after failure
    private final AtomicBoolean redisAvailable = new AtomicBoolean(true);
    private final AtomicLong redisRetryAfter = new AtomicLong(0);
    private static final long REDIS_RETRY_INTERVAL_MS = 300_000; // 5 minutes

    private boolean isRedisAvailable() {
        if (redisAvailable.get()) {
            return true;
        }
        // Check if enough time has passed to retry
        if (System.currentTimeMillis() > redisRetryAfter.get()) {
            log.info("Redis retry interval elapsed, will attempt reconnection...");
            redisAvailable.set(true);
            return true;
        }
        return false;
    }

    private void markRedisUnavailable() {
        redisAvailable.set(false);
        redisRetryAfter.set(System.currentTimeMillis() + REDIS_RETRY_INTERVAL_MS);
        log.warn("Redis marked as unavailable. Will retry after {} ms", REDIS_RETRY_INTERVAL_MS);
    }

    /**
     * Tăng số lượt nghe bằng Redis counter (O(1), in-memory, ko block DB).
     * Nếu Redis không khả dụng, fallback trực tiếp vào DB.
     */
    public void incrementPlayCount(Long songId) {
        if (!isRedisAvailable()) {
            log.debug("Redis unavailable, updating DB directly for song: {}", songId);
            songRepository.incrementPlayCount(songId);
            return;
        }

        String key = PLAY_COUNT_KEY_PREFIX + songId;
        try {
            stringRedisTemplate.opsForValue().increment(key);
            log.debug("Incremented Redis play count for song: {}", songId);
        } catch (Exception e) {
            log.warn("Redis failed for key {}, falling back to DB: {}", key, e.getMessage());
            markRedisUnavailable();
            try {
                songRepository.incrementPlayCount(songId);
            } catch (Exception dbEx) {
                log.error("DB fallback also failed for song: {}", songId, dbEx);
            }
        }
    }

    /**
     * Flush all play counts from Redis to Database every 5 minutes.
     * Dùng cron hoặc fixedDelay để batch SQL update 1 lần.
     */
    @Scheduled(fixedDelay = 300000) // 5 minutes = 300,000 ms
    @Transactional
    public void flushPlayCountsToDatabase() {
        if (!isRedisAvailable()) {
            log.debug("Skipping flush — Redis is unavailable.");
            return;
        }

        log.info("Starting scheduled flush of play counts from Redis to DB...");

        Set<String> keys;
        try {
            keys = stringRedisTemplate.keys(PLAY_COUNT_KEY_PREFIX + "*");
        } catch (Exception e) {
            log.warn("Cannot read Redis keys for flush: {}", e.getMessage());
            markRedisUnavailable();
            return;
        }

        if (keys == null || keys.isEmpty()) {
            return;
        }

        int updatedCount = 0;
        for (String key : keys) {
            try {
                Long songId = Long.parseLong(key.replace(PLAY_COUNT_KEY_PREFIX, ""));

                String valStr = stringRedisTemplate.opsForValue().get(key);
                Integer incrementValue = valStr != null ? Integer.parseInt(valStr) : 0;

                if (incrementValue != null && incrementValue > 0) {
                    songRepository.findById(songId).ifPresent(song -> {
                        song.setPlayCount(song.getPlayCount() + incrementValue);
                        songRepository.save(song);
                    });

                    stringRedisTemplate.delete(key);
                    updatedCount++;
                }
            } catch (Exception e) {
                log.error("Failed to flush play count for key: {}", key, e);
            }
        }

        log.info("Successfully flushed {} songs play counts to DB.", updatedCount);
    }
}
